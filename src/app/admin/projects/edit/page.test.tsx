// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import EditProject from "./page";

afterEach(() => cleanup());

const mockPush = vi.fn();
const mockDispatch = vi.fn();
const mockCreateProject = vi.fn();
const mockUpdateProject = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => null }),
  usePathname: () => "/admin/projects/edit",
}));

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock("~/services/project", () => ({
  default: () => ({
    getProjectById: vi.fn(),
    createProject: mockCreateProject,
    updateProject: mockUpdateProject,
    deleteProject: vi.fn(),
    uploadImage: vi.fn(),
  }),
}));

function fillRequired() {
  fireEvent.change(screen.getByPlaceholderText("PROJECT CODENAME"), {
    target: { value: "Mi proyecto" },
  });
  fireEvent.change(screen.getByPlaceholderText("Brief mission abstract..."), {
    target: { value: "Descripción" },
  });
}

describe("EditProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("bloquea el guardado sin título y no llama al backend (4.1)", async () => {
    render(<EditProject />);
    fireEvent.click(screen.getByText("Save Draft"));
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ payload: "El título es obligatorio." })
      )
    );
    expect(mockCreateProject).not.toHaveBeenCalled();
  });

  it("bloquea el guardado sin descripción (4.1)", async () => {
    render(<EditProject />);
    fireEvent.change(screen.getByPlaceholderText("PROJECT CODENAME"), {
      target: { value: "Mi proyecto" },
    });
    fireEvent.click(screen.getByText("Save Draft"));
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ payload: "La descripción es obligatoria." })
      )
    );
    expect(mockCreateProject).not.toHaveBeenCalled();
  });

  it("muestra el detalle de validación ante un 422 (4.2)", async () => {
    mockCreateProject.mockRejectedValue({
      response: {
        status: 422,
        data: { detail: [{ loc: ["body", "title"], msg: "Field required" }] },
      },
    });
    render(<EditProject />);
    fillRequired();
    fireEvent.click(screen.getByText("Save Draft"));
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: "Error de validación: title: Field required.",
        })
      )
    );
  });

  it("redirige a login ante un 401 (4.2)", async () => {
    mockCreateProject.mockRejectedValue({ response: { status: 401, data: {} } });
    render(<EditProject />);
    fillRequired();
    fireEvent.click(screen.getByText("Save Draft"));
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: "Sesión expirada. Vuelve a iniciar sesión.",
        })
      )
    );
    expect(mockPush).toHaveBeenCalledWith("/auth");
  });

  it("muestra error de red cuando no hay respuesta (4.2)", async () => {
    mockCreateProject.mockRejectedValue(new Error("timeout"));
    render(<EditProject />);
    fillRequired();
    // "Execute Deploy" existe en el toolbar y en la barra inferior;
    // la barra inferior es la última en el DOM.
    const deployButtons = screen.getAllByText("Execute Deploy");
    fireEvent.click(deployButtons[deployButtons.length - 1]);
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload:
            "Error de red o tiempo de espera. Revisa tu conexión e inténtalo de nuevo.",
        })
      )
    );
  });

  it("Save Draft crea con published:false y navega al listado", async () => {
    mockCreateProject.mockResolvedValue({ id: 1 });
    render(<EditProject />);
    fillRequired();
    fireEvent.click(screen.getByText("Save Draft"));
    await waitFor(() =>
      expect(mockCreateProject).toHaveBeenCalledWith(
        expect.objectContaining({ published: false })
      )
    );
    expect(mockPush).toHaveBeenCalledWith("/admin/projects");
  });
});
