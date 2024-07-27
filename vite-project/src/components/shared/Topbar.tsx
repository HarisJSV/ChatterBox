import { Link,useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '../../lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '../../context/AuthContext'
const Topbar = () => {
    const navigate=useNavigate();
    const {user}=useUserContext();
    const {mutate:signOut,isSuccess}=useSignOutAccount();
    useEffect(()=>{
        if(isSuccess) navigate(0);
    },[isSuccess])
  return (
    <section className='topbar'>
        <div className="justify-between py-4 px-5">
            <Link to="/" className='flex gap-3 items-center'>
            <h1>ChatterBox</h1>
            </Link>
        </div>
        <div className='gap-4 flex'>
            <Button variant="ghost" className='shad-button_ghost' onClick={()=>signOut()}>
                <h1>Logout</h1>
            </Button>
            <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
            <img src={user.imageURL} alt="profile" className='h-8 w-8 rounded-full'/>
            </Link>
        </div>
    </section>
  )
}

export default Topbar