import { z } from "zod";

export const registrationSchema=z.object({
    email:z.string().email(),
    password:z.string()
})

export type RegistrationBody={
    email:string,
    password:string
}