import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    console.log("ProtectedRoute: Waiting for auth state..."); // Debugging log
    return <div>Loading...</div>; // Show a loading indicator while checking auth state
  }

  console.log("ProtectedRoute: User state:", user); // Debugging log

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
