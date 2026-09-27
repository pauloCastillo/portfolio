"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Field from "@/shared/Form/Field";
import { validateUserData } from "~/utils/validations";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux";
import { AppDispatch } from "~/store/store";
import { setError } from "~/store/features/errorSlice"; 
import useAuth from "@/hooks/useAuth";
import Loading from "@/loading";
import { AuthLogin } from "@/types/user";

export default function AdminPage(){ 
  const [user, setUser] = useState<AuthLogin>({ email: "", password: ""});
  const dispatch = useDispatch<AppDispatch>();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    setUser(()=>{
      return {
        ...user,
        email: e.target.value
      }
    });
  }
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    setUser(()=>{
      return {
        ...user,
        password: e.target.value
      }
    });
  }
  
  const router = useRouter();
  const { login, loading, errorMessage } = useAuth();
  
  // Get callback URL from query params to redirect after login
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const oauthError = searchParams.get('error');
  const oauthErrorMessage =
    oauthError === 'google-unavailable'
      ? 'El ingreso con Google aún no está habilitado en el servidor. Usa tu email y contraseña.'
      : oauthError === 'google'
        ? 'No se pudo completar el ingreso con Google. Intenta de nuevo.'
        : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement| HTMLTextAreaElement>) => {
    e.preventDefault();
    if(validateUserData(user)){
      const response = await login(user);
      if(response && !loading){
        router.push(callbackUrl);
      }
    } else {
      const message = errorMessage;
      dispatch(setError(message || "Invalid user data! Please check your email and password."));
    }
  }

  const clearform = ()=>{
    setUser({ email: "", password: "" });
  }

  useEffect(()=>{
    // Aquí puedes agregar lógica para verificar si el usuario es un administrador
    return () => {
        clearform();
    }
  },[])

 return(
    <div className="bg-void flex flex-col items-center justify-center h-screen">
      <Link href="/" className="font-mono text-lg font-bold text-text no-underline">
        Kasti<span className="text-cyan">dev</span>
      </Link>
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm text-primary bg-glass-surface backdrop-blur-lg border border-border-glass rounded-lg p-6">
        <Field 
          labelField="email" 
          labelText="Email"
          type="text"
          placeholder="corre@ registrado"
          fieldControlMethod={handleEmailChange}   
          fieldValue={user.email}
        />
        <Field 
          labelField="password" 
          labelText="Password"
          type="password"
          placeholder="contraseña"
          fieldControlMethod={handlePasswordChange}   
          fieldValue={user.password}      
        />
        <Link href="/auth/recover" className="block text-cyan text-sm mt-2 text-center no-underline hover:underline">
          ¿olvidaste tu contraseña?
        </Link>
        {loading && <Loading />}
        {oauthErrorMessage && (
          <p className="mt-3 text-sm text-center text-red-400" role="alert">
            {oauthErrorMessage}
          </p>
        )}
        <button 
          className="w-full mt-4 hover:cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <div className="flex items-center gap-3 my-4">
          <span className="flex-1 h-px bg-border-glass" />
          <span className="text-sm text-text/60">o</span>
          <span className="flex-1 h-px bg-border-glass" />
        </div>
        <button
          type="button"
          onClick={() => {
            window.location.href = `/api/auth/google?callbackUrl=${encodeURIComponent(callbackUrl)}`;
          }}
          className="w-full hover:cursor-pointer bg-white text-gray-800 font-medium py-2 px-4 rounded hover:bg-gray-100 transition duration-200 flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.1A12 12 0 0 0 12 24z"/>
            <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l3.98-3.1z"/>
            <path fill="#EA4335" d="M12 4.76c1.76 0 3.34.6 4.58 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.1C6.22 6.87 8.87 4.76 12 4.76z"/>
          </svg>
          Continuar con Google
        </button>
      </form>
    </div>
 )   
}