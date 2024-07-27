import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import { INewPost, INewUser } from "../../types"
import { createPost, CreateUserAccount, getCurrentUser, getRecentPosts, likePost, savePost } from "../appwrite/api"
import { SignInAccount,SignOutAccount } from "../appwrite/api"
import { QUERY_KEYS } from "./queryKeys"
import { deleteSavedPost } from "../appwrite/api"
export const useCreateUserAccount=()=>{
    return useMutation({
        mutationFn:(user:INewUser)=>CreateUserAccount(user)
    })
}
export const useSignInAccount=()=>{
    return useMutation({
        mutationFn:(user:{email:string,password:string})=>SignInAccount(user)
    })
}
export const useSignOutAccount=()=>{
    return useMutation({
        mutationFn:SignOutAccount
    })
}

export const useCreatePost=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(post:INewPost)=>createPost(post),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetRecentPosts=()=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        queryFn:getRecentPosts,

    })
}

export const useLikePost=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({postId,likesArray}:{postId:string, likesArray:string[]})=>likePost(postId,likesArray),
        onSuccess:(data)=>{ 
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useSavePost=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({postId,userId}:{postId:string, userId:string})=>savePost(postId,userId),
        onSuccess:()=>{ 
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useDeletePost=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(savedRecordId:string)=>deleteSavedPost(savedRecordId),
        onSuccess:()=>{ 
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useGetCurrentUser=()=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_CURRENT_USER],
        queryFn:getCurrentUser
    })
}