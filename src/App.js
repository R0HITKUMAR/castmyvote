import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./components/common/axios.js";
import Swal from "sweetalert2";
import Main from "./components/main/Main";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import Admin from "./components/admin/Admin";
import User from "./components/user/User";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState([]);

  async function logout() {
    Swal.fire({
      title: "Logout ?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    });
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;
    if (token) {
      axios
        .get(`/auth/validate/${token}`)
        .then((res) => {
          if (res.data.isLogged) {
            setUser(res.data.user);
            if (
              path === "/login" ||
              path === "/register" ||
              path === "/reset"
            ) {
              navigate("/");
            }
          } else {
            console.log("Failed to Authenticate");
            if (
              path === "/login" ||
              path === "/register" ||
              path === "/reset"
            ) {
              navigate(path);
            } else {
              navigate("/");
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/*"
        element={
          <>
            {user.length === 0 ? (
              <Main setUser={setUser} />
            ) : user.role === "admin" ? (
              <Admin user={user} logout={logout} />
            ) : (
              <User user={user} logout={logout} />
            )}
          </>
        }
      />
      <Route exact path="/login" element={<Login setUser={setUser} />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/reset" element={<Reset />} />
    </Routes>
  );
}

export default App;
