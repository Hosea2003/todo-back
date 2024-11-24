import { z } from "zod";

export const createProjectSchema=z.object({
    title:z.string()
})

export type ProjectBody={
    title:string
}