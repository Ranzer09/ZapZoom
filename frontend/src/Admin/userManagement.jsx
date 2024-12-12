import { useAuthContext } from "../hooks/Auth/useAuthContext";
import Loading from "../MUI Components/Loading";
import UserCard from "./userCard";
import { useState, useEffect } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL;
function UserManagement() {
  const { user, loading: userLoading } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    try {
      const response = await fetch(VITE_API_URL + "/api/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const json = await response.json();
      setUsers(json.user);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    getUsers();
    if (users) setLoading(false);
  }, [getUsers]);

  return (
    <>
      {loading || userLoading ? (
        <Loading />
      ) : users?.length > 0 ? (
        <div className="BusinessManagement w-full grid my-5 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
          {users.map((userData) => (
            <UserCard key={userData._id} user={userData} />
          ))}
        </div>
      ) : (
        <p
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Users not found :(
        </p>
      )}
    </>
  );
}
export default UserManagement;
