// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

afterEach(() => cleanup());
import axios from "axios";
import UsersPage from "./page";

vi.mock("axios");

const mockedAxios = vi.mocked(axios, true);

const mockGetAllUsers = vi.fn();
const mockCreateUser = vi.fn();
const mockUpdateUser = vi.fn();
const mockToggleActive = vi.fn();
const mockDeleteUser = vi.fn();

vi.mock("~/services/user", () => ({
  default: () => ({
    getAllUsers: mockGetAllUsers,
    getUserById: vi.fn(),
    createUser: mockCreateUser,
    updateUser: mockUpdateUser,
    toggleActive: mockToggleActive,
    deleteUser: mockDeleteUser,
  }),
}));

const fakeUsers = [
  {
    id: "u-1",
    username: "admin",
    email: "admin@example.com",
    phone: "+1234567890",
    avatar_url: null,
    isActive: true,
    last_login: "2026-09-25T00:00:00Z",
  },
  {
    id: "u-2",
    username: "otro",
    email: "otro@example.com",
    phone: null,
    avatar_url: null,
    isActive: false,
    last_login: "2026-09-25T00:00:00Z",
  },
];

describe("UsersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedAxios.get.mockResolvedValue({ data: { email: "admin@example.com" } });
  });

  it("muestra estado de carga", () => {
    mockGetAllUsers.mockReturnValue(new Promise(() => {}));
    render(<UsersPage />);
    expect(screen.getByText("Loading users...")).toBeDefined();
  });

  it("muestra estado vacio", async () => {
    mockGetAllUsers.mockResolvedValue([]);
    render(<UsersPage />);
    expect(await screen.findByText("No users yet.")).toBeDefined();
  });

  it("lista usuarios con estado y marca la cuenta propia", async () => {
    mockGetAllUsers.mockResolvedValue(fakeUsers);
    render(<UsersPage />);
    expect(await screen.findByText("otro")).toBeDefined();
    expect(screen.getByText("(tú)")).toBeDefined();
    expect(screen.getByText("ACTIVE")).toBeDefined();
    expect(screen.getByText("INACTIVE")).toBeDefined();
    expect(screen.getByText("(tú)")).toBeDefined();
  });

  it("deshabilita el boton eliminar de la cuenta propia", async () => {
    mockGetAllUsers.mockResolvedValue(fakeUsers);
    render(<UsersPage />);
    await screen.findByText("otro");
    const deleteButtons = screen.getAllByTitle(/Eliminar|No puedes eliminarte/);
    expect(deleteButtons).toHaveLength(2);
    const ownDelete = screen.getByTitle("No puedes eliminarte a ti mismo");
    expect((ownDelete as HTMLButtonElement).disabled).toBe(true);
  });

  it("abre el modal de creacion con NEW USER", async () => {
    mockGetAllUsers.mockResolvedValue(fakeUsers);
    render(<UsersPage />);
    await screen.findByText("otro");
    fireEvent.click(screen.getByText("NEW USER"));
    expect(screen.getByText("Username")).toBeDefined();
    expect(screen.getByPlaceholderText("contraseña")).toBeDefined();
  });
});
