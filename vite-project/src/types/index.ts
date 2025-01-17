export type INewUser={
    name:string;
    email:string;
    password:string;
    username:string;
};
export type IContextType={
    user:IUser,
    isAuthenticated:boolean,
    isLoading:boolean,
    setUser:React.Dispatch<React.SetStateAction<IUser>>;
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser:()=>Promise<boolean>;
};
export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageURL: URL | string;
    file: File[];
  };
  
  export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageURL: URL;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageURL: string;
    bio: string;
  };