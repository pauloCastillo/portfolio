'use client';

import { useEffect, useState } from "react";
import Field from "@/components/UI/Form/Field";
import { validateUserData } from "~/utils/validations";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth";
import Loading from "@/loading";

export default function AdminPage(){ 
  const [user, setUser] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  
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
  
  const { login, loading, error} = useAuth();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement| HTMLTextAreaElement>) => {
    e.preventDefault();
    if(validateUserData(user)){
      const response = await login(user);
      console.log(response);
      if(response && !loading){
        router.push("/admin/dashboard");
      }
    } else {
      const message = error;
      console.log(message);
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
      <Link href="/" className="flex items-center-safe bg-black p-5 rounded-lg text-white">
        <Image 
          src={"/vercel.svg"} 
          alt="logo" 
          width={45}
          height={45}
        />
        <p className="text-xl">PortfolioLogo</p>
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
        {loading && <Loading />}
        <button 
          className="w-full mt-4 hover:cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
 )   
}