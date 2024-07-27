import { INewUser } from "../../types";
import { ID,Query,ImageGravity} from "appwrite";
import { account, appwriteconfig, avatars,databases } from "./config";
import { storage } from "./config";
import { INewPost } from "../../types";
export async function CreateUserAccount(user:INewUser) {
   try{
    const newAccount=await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
    );

    if(!newAccount) throw Error;

    const avatarurl=avatars.getInitials(user.name);

    const newUser=await saveUsertoDB({
     accountID:newAccount.$id,
     name:newAccount.name,
     email:newAccount.email,
     username:user.username,
     imageURL:avatarurl
    });
    return newUser;
  }
   catch(error){
    console.log(error);
    return error;
   } 
}
export async function saveUsertoDB(user:{
    accountID:string;
    name:string;
    imageURL:URL;
    email:string;
    username?:string;
   }) {
    try{
        const newUser=await databases.createDocument(
            appwriteconfig.databaseid,
            appwriteconfig.usercollectionid,
            ID.unique(),
            user,
        )
        return newUser;
    }
    catch(error){
        console.log(error);
    }
   }
export async function SignInAccount(user:{
    email:string,
    password:string
}){
    try {
        const session=await account.createEmailPasswordSession(user.email,user.password);
        return session;
    } catch (error) {
        console.log(error)
    }
}
export async function getCurrentUser() {
    try {
        const currentAccount=await account.get();
        if(!currentAccount) throw Error;

        const currentUser=await databases.listDocuments(appwriteconfig.databaseid,
            appwriteconfig.usercollectionid,
            [Query.equal('accountID',currentAccount.$id)]
        )
        if(!currentUser) throw Error;
        
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}
export async function SignOutAccount(){
    try {
        const session=await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
    }
}
export async function createPost(post: INewPost) {
    try {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
  
      if (!uploadedFile) throw Error;
  
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      // Create post
      const newPost = await databases.createDocument(
        appwriteconfig.databaseid,
        appwriteconfig.postcollectionid,
        ID.unique(),
        {
          users: post.userId,
          Caption: post.caption,
          imageURL: fileUrl,
          imageID: uploadedFile.$id,
          location: post.location,
          Tags: tags,
        }
      );
  
      if (!newPost) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }
  export async function uploadFile(file: File) {
    try {
      const uploadedFile = await storage.createFile(
        appwriteconfig.storageid,
        ID.unique(),
        file
      );
  
      return uploadedFile;
    } catch (error) {
      console.log(error);
    }
  }
  export function getFilePreview(fileId: string) {
    try {
      const fileUrl = storage.getFilePreview(
        appwriteconfig.storageid,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      console.log(error);
    }
  }

  export async function deleteFile(fileId: string) {
    try {
      await storage.deleteFile(appwriteconfig.storageid, fileId);
  
      return { status: "ok" };
    } catch (error) {
      console.log(error);
    }
  }
  export async function getRecentPosts(){
    const posts=await databases.listDocuments(
      appwriteconfig.databaseid,
      appwriteconfig.postcollectionid,
      [Query.orderDesc('$createdAt'),Query.limit(20)]
    )
    if(!posts) throw Error;

    return posts;
  }

  export async function likePost(postId:string,likesArray:string[]) {
      try {
        const updatedPost=await databases.updateDocument(
          appwriteconfig.databaseid,
          appwriteconfig.postcollectionid,
          postId,
          {
            likes:likesArray
          }
        )
        if(!updatedPost) throw Error;

        return updatedPost;
      } catch (error) {
        console.log(error)
      }  
  }

  export async function savePost(postId:string,userId:string) {
    try {
      const updatedPost=await databases.createDocument(
        appwriteconfig.databaseid,
        appwriteconfig.savescollectionid,
        ID.unique(),
        {
          user:userId,
          post:postId
        }
      )
      if(!updatedPost) throw Error;

      return updatedPost;
    } catch (error) {
      console.log(error)
    }  
}

export async function deleteSavedPost(savedRecordId:string) {
  try {
    const statusCode=await databases.deleteDocument(
      appwriteconfig.databaseid,
      appwriteconfig.savescollectionid,
      savedRecordId
    )
    if(!statusCode) throw Error;

    return {status:'ok'};
  } catch (error) {
    console.log(error)
  }  
}