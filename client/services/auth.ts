interface AuthLogin {
  user: {
    email: string;
    password: string;
  }
}

export default async function AuthService(user: AuthLogin) {
  const response = await fetch('http://localhost:8000/api/v1/auth/login/', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.status === 201;
}