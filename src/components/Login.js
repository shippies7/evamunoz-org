import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login Component: User state:", user); // Debugging log
    if (user) {
      // Redirect to "ELOS" if the user is already logged in
      navigate("/elos");
    }
  }, [user, navigate]);

  return (
    <div>
      {!user && (
        <form>
          {/* Your login form */}
        </form>
      )}
    </div>
  );
};

export default Login;
