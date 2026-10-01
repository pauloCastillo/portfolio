export interface AuthLogin {
  email: string;
  password: string;
}

export type UserContactProps = {
  username: string;
  email: string;
  subject: string;
  message: string;
};

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  isActive: boolean;
  last_login: string;
}

export interface UserCreatePayload {
  username: string;
  email: string;
  password: string;
  phone?: string | null;
  avatar_url?: string | null;
}

export interface UserUpdatePayload {
  username?: string;
  email?: string;
  phone?: string | null;
  avatar_url?: string | null;
  isActive?: boolean;
}
