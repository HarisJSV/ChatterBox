
import { Models } from 'appwrite'
import { Link } from 'react-router-dom';
import { multiFormatDateString } from '../../lib/utils';
import { useUserContext } from '../../context/AuthContext';
import PostStats from '../shared/PostStats'
type PostCardProps={
    post:Models.Document;
}
const PostCard = ({post}:PostCardProps) => {
  const {user}=useUserContext();
  if(!post.users) return;
  return (
    <div className='post-card'>
        <div className='flex-between'>
            <div className='flex items-center gap-3'>
                <Link to={`/profile/${post.users.$id}`}>
                <img src={post?.users?.imageURL} alt="" className='rounded-full w-12 lg:h-12' />
                </Link>
                <div className='flex flex-col'>
                    <p className='base-medium lg:body-bold text-light-2'>
                        {post.users.name}
                    </p>
                    <div className='flex-center gap-2 text-light-4'>
                        <p className='subtle-semibold lg:small-regular'>{multiFormatDateString(post.$createdAt)}</p>
                        <p className='subtle-semibold lg:small-regular'>{post.location}</p>
                    </div>
                </div>
            </div>
        <Link to={`/update-post/${post.$id}`}className={`${user.id!==post.users.$id && "hidden"}`}>
        <img src="" alt="edit" />
        </Link>    
        </div>
        <Link to={`/posts/${post.$id}`}>
        <div className='small-medium lg:base-medium py-5'>
            <p>{post.Caption}</p>
            <ul className='flex-gap-1 mt-2'>
                {post.Tags.map((tag:string)=>(
                    <li key={tag} className='text-light-3'>#{tag}</li>
                ))}
            </ul>
        </div>
        <img src={post.imageURL} alt="post" className='post-card_img' />
        </Link>
        <PostStats post={post} userId={user.id}/>
    </div>
  )
}

export default PostCard