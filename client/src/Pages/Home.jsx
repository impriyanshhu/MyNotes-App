import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import { motion } from "framer-motion";
import { MdAdd, MdOutlineNotes } from "react-icons/md";
import NoteCard from "../Components/NoteCard.jsx";
import AddNote from "../Components/AddNote.jsx";
import { useAuth } from "../Context/ContextProvider.jsx";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { notes, loading, getNotes } = useAuth();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    getNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.content.toLowerCase().includes(searchText.toLowerCase()) ||
      (note.tags &&
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchText.toLowerCase())
        ))
  );

  const sortedNotes = [...filteredNotes].sort();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white relative overflow-hidden">

      <Navbar
        onSearchNote={setSearchText}
        handleClearSearch={() => setSearchText("")}
      />

      <div className="container mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 sm:gap-3 pt-8 sm:pt-12"
        >
          <MdOutlineNotes className="text-3xl sm:text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">
            My Notes
          </h1>
        </motion.div>

        <div className="pb-6 sm:pb-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500 mt-8">Loading notes...</p>
          ) : notes.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 mt-10"
            >
              No notes found. Create your first one!
            </motion.p>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8"
            >
              {sortedNotes.map((note) => (
                <motion.div
                className="w-fit"
                  key={note._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <NoteCard note={note} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <motion.button
          className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 fixed right-6 sm:right-10 bottom-8 sm:bottom-10 shadow-lg cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpenModal}
        >
          <MdAdd className="text-2xl sm:text-3xl text-white" />
        </motion.button>
        
      </div>

      {isModalOpen && <AddNote onClose={handleCloseModal} />}
    </div>
  );
};

export default Home;
