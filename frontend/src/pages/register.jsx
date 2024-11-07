import {useState,useEffect} from "react";
import { Button,Label,TextInput } from "flowbite-react";
import { useRegister } from "../hooks/useRegister";
import {useAuthContext} from '../hooks/useAuthContext'
import { useNavigate,useLocation } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const {user,loading}=useAuthContext()
  const location = useLocation();
  if(location.state===null)
      location.state=''
  
  useEffect(()=>{
    if (user) {
        navigate('/Api/products'); 
        return;
    }
  },[navigate,user])

  const [email, setEmail] = useState(location.state.email || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { Error, Loading, register } = useRegister();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email,username,password)
      const response =await register(email, username, password);
      console.log(response)
      console.log(response,'loading',Loading)
      console.log('error in register',Error)
    } catch (error) {
      console.error("register failed:", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>; // Or your loading spinner
}

  return (
   <div>
      <section className="grid grid-cols-1 justify-items-center mt-10 border-gray-200 
      border-2 max-w-fit p-4 rounded-4 mx-auto shadow-lg">
      <form className="flex px-10  flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2" value="Enter Your email" />
              </div>
              <TextInput id="email2" 
              type="email" 
              placeholder="Your email" 
              value={email}
          onChange={(e) => setEmail(e.target.value)}
              required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Enter Your Username" />
              </div>
              <TextInput id="username" 
              type="text" 
              placeholder="Your Username" 
              value={username}
          onChange={(e) => setUsername(e.target.value)}
              required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Enter Your password" />
              </div>
              <TextInput id="password"
               type="password"
               placeholder="Your Password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required shadow />
            </div>
            <Button type="submit" disabled={Loading}>Register new account</Button>  
          </form>
      </section>  
      {Error&& <div className="mb-2 block w-fit">
          <Label color="failure" value={Error} />
        </div>}
      </div>
        );

}
export default Register;
