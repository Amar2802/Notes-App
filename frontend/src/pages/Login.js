import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    try {
      const res = await api.post("/login", form);

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h1>Notes App</h1>

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={loginUser}>
        Login
      </button>

      <p>
        New User? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;