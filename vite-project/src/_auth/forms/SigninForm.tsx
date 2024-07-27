import { z } from "zod"
import {SigninValidation } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import {Link,useNavigate} from "react-router-dom"
import {useSignInAccount} from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import lol from "../../wlogo.png"
import { useToast } from "../../components/ui/use-toast"
const SigninForm = () => {
  const { toast } = useToast()
  const {checkAuthUser}=useUserContext();
  const navigate=useNavigate();
  const{mutateAsync:SignInAccount}=useSignInAccount();
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email:"",
      password:"",
    },
  })
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session=await SignInAccount({email:values.email,password:values.password})
    if(!session){
      return toast({
        title: "Sign-In failed. Please try again",
      })
    }
    const isLoggedIn=await checkAuthUser();
    if(isLoggedIn){
      form.reset();
      navigate('/')
    }
    else{
      return toast({
        title: "Sign-In failed. Please try again",
      })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-5 bg-dark-1 p-14">
      <div className="ml-10"><img src={lol} alt="" width={130} height={130}/></div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">Submit</Button>
        <p className="text-lime-50 mt-2">New to ChatterBox?<Link to="/sign-up" className="ml-1 text-sky-400">Sign Up</Link></p>
      </form>
    </Form>
  )
}

export default SigninForm