import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUser = async () => {
    try {
      const res = await api.post("/register", form);

      alert(res.data.message);

      navigate("/");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <h1>Notes App</h1>

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

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

      <button onClick={registerUser}>
        Create Account
      </button>

      <p>
        Already registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;