import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const quote =
    "Every expert was once a beginner who refused to stop learning.";

  const token = localStorage.getItem("token");

  const fetchNotes = useCallback(async () => {
    try {
      const res = await api.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const addNote = async () => {
    try {
      await api.post(
        "/notes",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");

      fetchNotes();
    } catch {
      alert("Failed");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  
  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchNotes();
  };
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
    }, [token]);

    const quotes = [
      "Every expert was once a beginner who refused to stop learning.",
      "The only way to do great work is to love what you do.",
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="form-card">

      <h1>Notes App Dashboard</h1>

      <div className="quote-box">
        {quote}
      </div>

      <h3>Create Note</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Write something..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <button onClick={addNote}>
        Save Note
      </button>

      <button onClick={logout}>
        Logout
      </button>

      <h3>My Notes</h3>

      <div className="notes-grid">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <div className="quote-box ">{randomQuote}</div>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Dashboard;