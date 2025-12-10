// src/App.jsx
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Register from "./components/Register";
import Login from "./components/Login";
import PostForm from "./components/PostForm";
import PostsList from "./components/PostsList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
<h1 className="app-title">Muro Interactivo</h1>

      {!user ? (
        <div className="flex-row">
          <div style={{ flex: 1 }}><Register /></div>
          <div style={{ flex: 1 }}><Login setUser={setUser} /></div>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p>¡Bienvenido, {user.displayName}!</p>
            <button onClick={() => signOut(auth)} style={{ width:"auto" }}>Cerrar sesión</button>
          </div>
          <PostForm user={user} />
        </div>
      )}

      <PostsList user={user} />
    </div>
  );
}

export default App;
