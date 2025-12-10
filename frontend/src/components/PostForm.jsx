// src/components/PostForm.jsx
import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function PostForm({ user }) {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return alert("Escribe algo antes de publicar");

    try {
      await addDoc(collection(db, "posts"), {
        author: user.displayName || user.email,
        content,
        createdAt: serverTimestamp()
      });

      setContent("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card" style={{ marginTop: "20px" }}>
      <h3>Crear publicación</h3>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Escribe tu post aquí..."
        style={{ height: "80px" }}
      />
      <button onClick={handleSubmit}>Publicar</button>
    </div>
  );
}

export default PostForm;
