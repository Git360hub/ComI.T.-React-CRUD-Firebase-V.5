import './App.css';
import {useState, useEffect } from 'react';
import {
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc,
  doc,  
  updateDoc, 
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";

import Dashboard from "./Dashboard";
import About from "./About";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Simple NotFoundPage component
function NotFoundPage() {
  return <div>404 - Page Not Found</div>;
}



function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Dashboard /> },
    { path: "/about", element: <About /> },
    { path: "*", element: <NotFoundPage /> }
  ]);
  // ...rest of hooks, handlers, render logic...

  

  const [newtodo, setnewtodo] = useState("");
  const [todos, settodos] = useState([]);
  const [editid, seteditid] = useState(null);
  const [edittext, setedittext] = useState("");
  const todosRef = collection(db, "todos");

  //Read
  useEffect(() => {
    onSnapshot(todosRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      settodos(items);
      });
    }, []);

  //Create
  const createtodo = async (e) => {
    e.preventDefault();
    if (!newtodo.trim()) return;
    await addDoc(todosRef, { text: newtodo });
    setnewtodo("");
  };

  //Delete
  const deletetodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  
  //Update
  const saveupdate = async (id) => {
    await updateDoc(doc(db, "todos", id), { text: edittext });
    seteditid(null);
    setedittext("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type = "text" placeholder="Plant/Seed Name..." onChange = { e => setnewtodo(e.target.value) } />
        <button onClick={createtodo}>Submit</button>
        {todos.map((todo) => (
          <div key={todo.id}>
            {editid === todo.id ? (
              <>
                <input type = "text" value = {edittext} onChange={(e) => setedittext(e.target.value)} />
                <button
                  onClick={() => saveupdate(todo.id)}>Update</button>
                <button
                  onClick={() => {
                    seteditid(null);
                    setedittext("");
                  }}>Cancel</button>
              </>
            ) : (
              <>
                {todo.text}
                <button 
                  onClick={() => {
                    seteditid(todo.id);
                    setedittext(todo.text);
                  }}
                  >
                    Edit</button>
                <button onClick={() => deletetodo(todo.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
