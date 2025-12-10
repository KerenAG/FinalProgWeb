// src/components/PostsList.jsx
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";

function PostsList({ user }) {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const carouselRef = useRef(null);

  // Cargar posts en tiempo real
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este post?")) {
      await deleteDoc(doc(db, "posts", id));
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditContent(post.content);
  };

  const saveEdit = async () => {
    if (!editContent.trim()) return alert("El post no puede estar vacío");
    await updateDoc(doc(db, "posts", editingId), { content: editContent });
    setEditingId(null);
    setEditContent("");
  };

  return (
    <div style={{ marginTop: "30px", position: "relative" }}>
      <h2 style={{ marginLeft: "5px" }}>Publicaciones</h2>

      {posts.length === 0 ? (
        <p>No hay publicaciones todavía.</p>
      ) : (
        <div className="carousel-container">

          {/* Flecha izquierda */}
          <button className="arrow-btn left" onClick={scrollLeft}>
            ‹
          </button>

          {/* Carrusel */}
          <div className="carousel" ref={carouselRef}>
            {posts.map(post => (
              <div key={post.id} className="post-slide-card">

                <p className="author">@{post.author}</p>

                {editingId === post.id ? (
                  <>
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                    />
                    <button onClick={saveEdit}>Guardar</button>
                    <button onClick={() => setEditingId(null)}>Cancelar</button>
                  </>
                ) : (
                  <p className="post-text">{post.content}</p>
                )}

                {user && user.displayName === post.author && editingId !== post.id && (
                  <div className="btn-row">
                    <button onClick={() => handleEdit(post)}>Editar</button>
                    <button className="danger" onClick={() => handleDelete(post.id)}>Eliminar</button>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Flecha derecha */}
          <button className="arrow-btn right" onClick={scrollRight}>
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default PostsList;

