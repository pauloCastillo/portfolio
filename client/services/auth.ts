export default function AuthService(email: string, password: string) {
  const login = (email: string, password: string) => {
    // Aquí puedes agregar la lógica para manejar el inicio de sesión del administrador
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return {
    login,
  };
}