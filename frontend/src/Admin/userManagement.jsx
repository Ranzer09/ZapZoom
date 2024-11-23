import { useAuthContext } from "../hooks/Auth/useAuthContext";
import UserCard from "./userCard"
import {useState,useEffect} from 'react'
function UserManagement() {
    const {user,loading:userLoading}=useAuthContext()
    const [users,setUsers]=useState([])
    const [loading, setLoading] = useState(true);
     const getUsers = async () => {
        try {
            const response = await fetch('/api/user', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const json = await response.json();
            setUsers(json.user)
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    }

    useEffect(() => {
        getUsers()
        if(users)
            setLoading(false)
    },[]);
    if(loading)
        return(<p>Loading...</p>)
   return(
        <div className="BusinessManagement w-full grid my-5 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
        {
            users?
            <>
                { users && users?.map((userData)=>
    (<UserCard key={userData._id} user={userData} loading={loading} />))}
            </>:
            <p>Users not found :(</p>
            }
    </div>
    )
}
export default UserManagement