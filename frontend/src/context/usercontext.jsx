import {createContext, useReducer,useEffect, useState} from 'react'

export const AuthContext=createContext()

export const AuthReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return{user:action.payload}
        case 'LOGOUT':
            return{user:null}
        default:
            return state
    }
}

export const AuthContextProvider=({children})=>
{
    const [state,dispatch]=useReducer(AuthReducer,{
        user:null
    })
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = () => {
            // Retrieve user auth data from localStorage
            const user=JSON.parse(localStorage.getItem('user'))
        if(user)
        {
            dispatch({type:'LOGIN',payload:user})
        } else {
                setUser(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    //console.log('Auth Context state:',state)
    if (loading) {
        return <div>Loading...</div>; // Or your loading spinner
    }
  
    return(
        <AuthContext.Provider value={{...state,dispatch,loading}}>
            {children}
        </AuthContext.Provider>
    )
}