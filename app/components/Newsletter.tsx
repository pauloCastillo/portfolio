import { Form } from "@remix-run/react";
import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className="bg-green-500 rounded-lg p-4 my-5 text-center">
            <h3 className="uppercase text-2xl">¡ únete a la lista ! <br/> y recibe noticias sobre diseño y programación</h3>
            <p>prometo no spamearte, solo mantenerte informado</p>
            <Form method="post" action="/newsletter" className="flex flex-col items-center mt-4">
                <input 
                    type="text" 
                    name="usermail"
                    onChange={handleChange} 
                    value={email} 
                    placeholder="coloca tu correo@gmail.com" 
                    className="w-2/3 p-1.5 rounded-lg text-center text-gray-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-green-200 transition"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">Enviar</button>
            </Form>
        </div>
    );
}