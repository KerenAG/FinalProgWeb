import { useEffect } from "react";
import { auth, db } from "./firebase";

function TestFirebase() {
  useEffect(() => {
    console.log("Auth:", auth);
    console.log("Firestore:", db);
  }, []);

  return <div>Firebase cargado. Revisa la consola.</div>;
}

export default TestFirebase;
