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