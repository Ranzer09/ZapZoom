import BusinessCard from "./businessCard"
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../hooks/Auth/useAuthContext"
function BusinessManagement() {
    const {user,loading:userLoading}=useAuthContext()
    const [businesses,setBusinesses]=useState()
    const [loading, setLoading] = useState(true);
     const getBusiness = async () => {
        try {
            const response = await fetch('/api/business', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const json = await response.json();
            setBusinesses(json)
        } catch (error) {
            console.error('Error fetching businesses:', error.message);
        }
    }

    useEffect(() => {
        getBusiness()
        if(businesses)
            setLoading(false)
    });

    return(
        <div className="BusinessManagement grid my-5 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
            {
                businesses?
                <>
                    { businesses && businesses.map((business)=>
        (<BusinessCard key={business._id} business={business} user={user} loading={loading} />))}
                </>:
                <p>Businesses not found :(</p>
                }
        </div>
    )
}
export default BusinessManagement