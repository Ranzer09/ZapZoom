import { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useLogin } from "../hooks/Auth/useLogin";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Loading from "../MUI Components/Loading";
import useRedirectIfUserExists from "../hooks/useRedirectIfUserExists";
import { Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  const location = useLocation();
  if (location.state === null) location.state = "";
  const [email, setEmail] = useState(location.state.email || "");
  const [password, setPassword] = useState("");
  const { Error, Loading, login } = useLogin();

  useRedirectIfUserExists(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <section className="grid grid-cols-1 justify-items-center mt-20 border-gray-200 border-2 max-w-fit p-4 rounded-4 mx-auto shadow-lg">
        <form className="flex px-10  flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Enter Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Enter Your password" />
            </div>
            <TextInput
              id="password"
              placeholder="Your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              shadow
            />
          </div>
          <Button type="submit" disabled={Loading}>
            Login
          </Button>
          <Typography
            textAlign={"center"}
            component={Link}
            to={"/Api/user/register"}
          >
            {" "}
            Click here to Sign Up!
          </Typography>
        </form>
        <hr />
        {Error && (
          <div style={{ textAlign: "center" }} className="mb-2 block w-fit">
            <Label color="failure" value={Error} />
          </div>
        )}
      </section>
    </div>
  );
};
export default Login;
