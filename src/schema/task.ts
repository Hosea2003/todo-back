import { z } from "zod";

export const createTaskSchema=z.object({
    title:z.string(),
    dueDate:z.string().date()
})

export type TaskBody={
    title:string,
    dueDate:string
}