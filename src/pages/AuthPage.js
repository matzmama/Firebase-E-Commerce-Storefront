import { useState } from "react";
import { registerUser, loginUser, logoutUser } from "../services/authService"; // ✅ FIXED
import { auth } from "../js/firebase";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(auth.currentUser);

  const handleRegister = async () => {
    const u = await registerUser(email, password);
    setUser(u);
  };

  const handleLogin = async () => {
    const u = await loginUser(email, password);
    setUser(u.user);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <div>
      <h2>Auth</h2>

      {user ? (
        <>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default AuthPage;