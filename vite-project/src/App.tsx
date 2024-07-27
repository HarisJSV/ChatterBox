import "./globals.css"
import {Routes,Route} from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout'
import SignupForm from './_auth/forms/SignupForm'
import SigninForm from "./_auth/forms/SigninForm";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import { Toaster } from "./components/ui/toaster"
import { AllUsers, CreatePost, EditPost, Explore, PostDetails, Profile, Saved, UpdateProfile } from "./_root/pages";
const App=()=>{
    return (
        <main className="h-screen flex bg-indigo-950">
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path="/sign-in" element={<SigninForm/>}/>
                    <Route path="/sign-up" element={<SignupForm/>}/>
                </Route>
                <Route element={<RootLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="/explore" element={<Explore/>}/>
                <Route path="/saved" element={<Saved/>}/>
                <Route path="/all-users" element={<AllUsers/>}/>
                <Route path="/create-post" element={<CreatePost/>}/>
                <Route path="/update-post/:id" element={<EditPost/>}/>
                <Route path="/posts/:id" element={<PostDetails/>}/>
                <Route path="/profile/:id/*" element={<Profile/>}/>
                <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
                </Route>
            </Routes>
            <Toaster />
        </main>
      );
}
export default App;