import { z } from "zod";

const UserSchema = z.object({
    email: z.email({message: "El correo electrónico no es válido"}),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
     .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
     .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
     .regex(/\d/, "La contraseña debe contener al menos un número")
     .regex(/[!@#$%^&*(),.?":{}|<>]/, "La contraseña debe contener al menos un carácter especial"),
});

type UserForm = z.infer<typeof UserSchema>;

export function validateUserData({ email, password }: UserForm) {
    try {
        return UserSchema.parse({ email, password });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return "Validation errors: " + error.message;
        }
    }
}

const UserCreateSchema = z.object({
    username: z.string().min(1, "El nombre de usuario es requerido").max(255, "El nombre de usuario es muy largo"),
    email: z.email({message: "El correo electrónico no es válido"}),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(30, "La contraseña es muy larga"),
    // "" del formulario se trata como ausente; si viene valor, min 10 / max 20 (igual que el backend)
    phone: z.preprocess(
        (v) => (v === "" ? undefined : v),
        z.string().min(10, "El teléfono debe tener al menos 10 caracteres").max(20, "El teléfono es muy largo").optional()
    ),
});

export type UserCreateForm = z.infer<typeof UserCreateSchema>;

export function validateNewUserData(data: UserCreateForm) {
    try {
        return UserCreateSchema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return "Validation errors: " + error.message;
        }
    }
}