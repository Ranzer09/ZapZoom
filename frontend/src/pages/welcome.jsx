import './Styles/Welcome.css'
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Button,Label, TextInput } from "flowbite-react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const BASE_URL = import.meta.env.VITE_API_URL || '/api';


function Welcome() {
  const {user,loading}=useAuthContext()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [register, setRegister] = useState(null);
  const [Error, setError] = useState(null);
  
  useEffect(()=>{
    if (user) {
        navigate('/Api/products'); 
        return;
    }
  },[navigate,user])

  const handleChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await checkEmail(email);
    } catch (error) {
      console.error("Error checking registration status:", error);
      setError("An error occurred. Please try again.",Error);
    }
  };

 const checkEmail = async (email) => {
    try {
      const response = await fetch(BASE_URL+'/api/user/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      setRegister(result.isRegistered);
      console.log(result.isRegistered);
    } catch (error) {
      console.error("Error in checkEmail:", error.message);
    }
  };
  if (loading) {
    return <div>Loading...</div>; // Or your loading spinner
}

  return (
    <div className="container">
      {register == null ? (
        <section className="login-register-section">
          <form className="form" onSubmit={handleSubmit}>
            <h1>Login or Register account</h1>
            <div className="input-container">
              <Label className="label" htmlFor="email1" value="Enter your Email address" />
              <TextInput 
                id="email1" 
                type="email" 
                placeholder="Your Email" 
                value={email} 
                onChange={handleChange}  
                name="email"
                required 
              />
            </div>
    <Button type="submit">Submit</Button>
  </form>
</section>
):(register?<Navigate to={'/Api/user/login'} state={{ email }} replace/>
:<Navigate to={'/Api/user/register'} state={{ email }} replace/>)}
      </div>
    );
  }
  export default Welcome;

