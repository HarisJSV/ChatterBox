import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../components/ui/button";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "../../components/ui/form"
import { Textarea } from "../../components/ui/textarea"
import FileUploader from "../../components/shared/FileUploader"
import { Input } from "../ui/input";
import { PostValidation } from "../../lib/validation";
import { Models } from "appwrite";
import { useUserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../lib/react-query/queriesAndMutations";
type PostFormProps={
  post?:Models.Document;
}
const PostForm = ({post}:PostFormProps) => {

  const {mutateAsync:createPost, isPending:isLoadingCreate}=useCreatePost()
    const{user}=useUserContext();
    const navigate=useNavigate();
  const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
          caption: post? post?.caption : "",
          file:[],
          location:post? post.location : "",
          tags:post? post.tags.join(',') :  ""
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof PostValidation>) {
        const newPost=await createPost({
          ...values,
          userId:user.id,
        })
        if(!newPost){
          window.alert("Please try again");
        }
        navigate('/');
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Caption</FormLabel>
            <FormControl>
              <Textarea className='shad-textarea custom-scrollbar' {...field} />
            </FormControl>
            <FormMessage className='shad-form_message'/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add Photos</FormLabel>
            <FormControl>
             <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageURL}/>
            </FormControl>
            <FormMessage className='shad-form_message'/>
          </FormItem>

        
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add Location</FormLabel>
            <FormControl>
             <Input type="text" className="shad-input" {...field}/>
            </FormControl>
            <FormMessage className='shad-form_message'/>
          </FormItem>

        
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add Tags</FormLabel>
            <FormControl>
             <Input type="text" className="shad-input"  {...field} placeholder="Whatever you please."/>
            </FormControl>
            <FormMessage className='shad-form_message'/>
          </FormItem>

        
        )}
      />
      <div className="flex gap-4 items-center justify-end">
      <Button type="button" className="shad-button_dark_4">Cancel</Button>
      <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>
      </div>
    </form>
  </Form>
  )
}

export default PostForm