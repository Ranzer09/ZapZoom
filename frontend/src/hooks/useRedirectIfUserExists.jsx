import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirectIfUserExists = (user, redirectPath = "/Api/home") => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(redirectPath);
    }
  }, [user, navigate, redirectPath]);
};

export default useRedirectIfUserExists;
