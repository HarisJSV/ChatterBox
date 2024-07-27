import {Client,Account,Databases,Avatars,Storage} from "appwrite"
export const appwriteconfig={
    projectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url:import.meta.env.VITE_APPWRITE_URL,
    databaseid:import.meta.env.VITE_APPWRITE_DB,
    storageid:import.meta.env.VITE_APPWRITE_STORAGE,
    usercollectionid:import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postcollectionid:import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savescollectionid:import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
}
export const client=new Client();
client.setProject(appwriteconfig.projectId);
client.setEndpoint("https://cloud.appwrite.io/v1")
export const account=new Account(client);
export const databases=new Databases(client);
export const storage=new Storage(client);
export const avatars=new Avatars(client);
