import { Form } from "@remix-run/react";

export default function Newsletter() {
    return (
        <div className="bg-green-500 rounded-lg p-4">
            <h3 className="uppercase text-2xl">¡ únete a la lista ! <br/> y recibe noticias sobre diseño y programación</h3>
            <p>prometo no spamearte, solo mantenerte informado</p>
            <Form method="post" action="/newsletter" className="flex flex-col items-center mt-4">
                <input type="text" name="usermail" placeholder="coloca tu correo@gmail.com" className="w-2/3 p-1.5 rounded-lg text-center"/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">Enviar</button>
            </Form>
        </div>
    );
}