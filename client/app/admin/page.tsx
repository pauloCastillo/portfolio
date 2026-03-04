'use client';

import { useEffect, useState } from "react";
import Field from "@/components/UI/Form/Field";
import { clearForm } from "@/utils/clearForm";
import { validateUserData } from "@/utils/validations";
import Link from "next/link";
import Image from "next/image";

export default function AdminPage(){ 
  const [user, setUser] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el inicio de sesión del administrador
    console.log("Email:", email);
    console.log("Password:", password);
    setUser({ email, password });

    if(validateUserData(user)){
      console.log("Validación exitosa", user);
    } else {
      console.log("Validación fallida revise usuario o contraseña");
    }
  }

  useEffect(()=>{
    // Aquí puedes agregar lógica para verificar si el usuario es un administrador
    return () => {
        // Aquí puedes agregar lógica para limpiar cualquier estado relacionado con el administrador
        setUser({ email: "", password: "" });
        clearForm([setEmail, setPassword]);
    }
  },[])

 return(
    <div className="bg-void flex flex-col items-center justify-center h-screen">
      <Link href="/" className="flex items-center-safe bg-black p-5 rounded-lg text-white">
        <Image src={"/vercel.svg"} alt="logo" width={45} height={45} />
        <p className="text-xl">PortfolioLogo</p>
      </Link>
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm text-primary bg-glass-surface backdrop-blur-lg border border-border-glass rounded-lg p-6">
        <Field 
          labelField="email" 
          labelText="Email"
          type="text"
          placeholder="corre@ registrado"
          fieldControlMethod={handleEmailChange}   
          fieldValue={email}
        />
        <Field 
          labelField="password" 
          labelText="Password"
          type="password"
          placeholder="contraseña"
          fieldControlMethod={handlePasswordChange}   
          fieldValue={password}      
        />
        <button 
          className="w-full mt-4 hover:cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
 )   
}