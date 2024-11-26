import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser, loginUser } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      /* const response = await loginUser(data);
      const res = await response.json(); */
      const res = {
        data: {
          user: {
            id: 1,
            name: "Vincent Ostrowski",
            email: "email",
            type: "organization",
            bio: "I am just a chill guy that loves to play basketball with my boys and go on hikes with the ladies. I am a team player and I am always looking to help out my community.",
            traits: [
              "Teamwork",
              "Communication",
              "Rizz",
              "Sauce",
              "Guns",
              "Buns",
              "Huzz",
            ],
          },
        },
        token: "token",
      };
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const signUpAction = async (data) => {
    try {
      /* const response = await signUpUser(data);
      const res = await response.json(); */
      const res = {
        data: {
          user: {
            id: 1,
            name: "John Doe",
            email: "email",
            type: "volunteer",
          },
        },
        token: "token",
      };
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", res.data.user);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, signUpAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
