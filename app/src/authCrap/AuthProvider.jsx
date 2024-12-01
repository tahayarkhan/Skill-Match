import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser, loginUser } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  let local = localStorage.getItem("user");
  if (local) {
    local = JSON.parse(local);
  }
  const [user, setUser] = useState(local);
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.message === "Login successful") {
        response.user.type = response.type;
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard");
        return;
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  const signUpAction = async (data) => {
    try {
      const response = await signUpUser(data);
      if (response.message === "Signup successful") {
        response.user[0].type = response.type;
        setUser(response.user[0]);
        localStorage.setItem("user", JSON.stringify(response.user[0]));
        navigate("/dashboard");
        return;
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, signUpAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
