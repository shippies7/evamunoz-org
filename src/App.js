import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Elos from "./components/Elos"; // Import the restricted page

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/elos" component={Elos} /> {/* Protected Route */}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;