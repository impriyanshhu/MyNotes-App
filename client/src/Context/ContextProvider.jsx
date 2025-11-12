import React, { createContext, useContext, useState, useEffect } from "react";
import BACKEND_URL from "../API/URL.js";
import { toast } from "react-toastify";

const authContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const token = localStorage.getItem("token");

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setNotes([]);
    localStorage.removeItem("token");
    toast.info("Logged out successfully!");
  };

  const fetchUser = async () => {
    if (!token) {
      setIsUserLoading(false);
      return;
    }
    try {
      const response = await BACKEND_URL.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    } finally {
      setIsUserLoading(false);
    }
  };

  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await BACKEND_URL.get("/mynotes/get-notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (noteData) => {
    try {
      const response = await BACKEND_URL.post("/mynotes/add-note", noteData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => [...prev, response.data.note]);
      toast.success("Note added successfully!");
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Failed to add note");
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await BACKEND_URL.delete(`/mynotes/delete-note/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const updateNote = async (noteId, updatedData) => {
    try {
      const response = await BACKEND_URL.put(
        `/mynotes/edit-note/${noteId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes((prev) =>
        prev.map((n) => (n._id === noteId ? response.data.note : n))
      );
      toast.success("Note updated!");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (token && user) getNotes();
  }, [token, user]);

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        notes,
        loading,
        getNotes,
        addNote,
        deleteNote,
        updateNote,
        isUserLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default ContextProvider;
