import { z } from "zod"
export const SignupValidation = z.object({
    name:z.string().min(2,{message:'too short'}),
    username: z.string().min(2,{message:'too short'}),
    email:z.string().email(),
    password:z.string().min(8,{message:'Less than 8 characters!'})
  })
  export const SigninValidation = z.object({
    email:z.string().email(),
    password:z.string().min(8,{message:'Less than 8 characters!'})
  })

  export const PostValidation = z.object({
    caption:z.string().min(5).max(2200),
    file:z.custom<File[]>(),
    location:z.string().min(2).max(100),
    tags:z.string()
  })