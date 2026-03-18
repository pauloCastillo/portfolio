"use client";

import { useState, ChangeEvent } from "react";
import Field from "@/components/UI/Form/Field";
import type { UserContactProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faPaperPlane);

export default function ContactMePage() {
  const [contactFormData, setContactFormData] = useState<UserContactProps>({
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const formDataHandler = (
    el: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactFormData((prevState) => ({
      ...prevState,
      [el.target.id]: el.target.value,
    }));
  };

  const submitHandler = () => {
    console.log("enviar formulario");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <h1 className="capitalize text-4xl font-bold text-gray-800 dark:text-gray-200">
        Hablemos
      </h1>
      <p className="ml-4 text-gray-800 dark:text-gray-200 mt-6">
        Estoy disponible para nuevos proyectos, colaboraciones o simplemente
        para charlar sobre tecnología. <br /> Si deseas ponerte en contacto
        conmigo, no dudes en enviarme un correo electrónico:
      </p>
      <form
        onSubmit={submitHandler}
        className="max-w-1/2 border-2 border-gray-300 rounded-md p-5 mt-6"
      >
        <div className="flex w-full gap-4">
          <Field
            labelField="username"
            labelText="Tu Nombre:"
            type="text"
            fieldValue={contactFormData.username}
            fieldControlMethod={formDataHandler}
            placeholder="escribe tu nombre completo"
          />
          <Field
            labelField="email"
            labelText="Correo Electrónico:"
            type="email"
            fieldValue={contactFormData.email}
            fieldControlMethod={formDataHandler}
            placeholder="correo@ejemplo.com"
          />
        </div>
        <Field
          labelField="subject"
          labelText="Asunto:"
          type="text"
          fieldValue={contactFormData.subject}
          fieldControlMethod={formDataHandler}
          placeholder="¿De qué quieres hablar?"
        />

        <label
          htmlFor="message"
          className="block text-gray-800 dark:text-gray-200 mt-4"
        >
          Mensaje:
        </label>
        <textarea
          id="message"
          name="message"
          className="mt-1 p-2 w-64 h-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 min-w-full"
          placeholder="escribe tu mensaje aquí"
          onChange={formDataHandler}
          value={contactFormData.message}
        ></textarea>
        <button
          type="submit"
          className="capitalize bg-purple-600 text-white mt-5 relative left-[70%] rounded-md p-1.5 hover:cursor-pointer hover:bg-purple-500 hover:transition-colors"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-1.5" />
          enviar mensaje
        </button>
      </form>
    </div>
  );
}
