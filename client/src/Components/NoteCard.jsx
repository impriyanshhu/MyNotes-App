import React, { useState } from "react";
import { MdCalendarToday, MdEdit, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { useAuth } from "../Context/ContextProvider.jsx";
import EditNote from "./EditNote.jsx";

const NoteCard = ({ note }) => {
  const { deleteNote } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const created = new Date(note.createdOn).toLocaleDateString();
  const updated = note.updatedOn
    ? new Date(note.updatedOn).toLocaleDateString()
    : null;

  return (
    <>
      <motion.div
        layout
        className="rounded-2xl overflow-hidden border border-[#2563EB]/30 shadow-md p-2 md:p-4 bg-white flex flex-col justify-between hover:shadow-md transition-all relative"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex-1 min-h-20">
          <h6 className="text-lg sm:text-xl font-semibold text-blue-600 wrap-break-word">
            {note.title}
          </h6>
          <p className="text-gray-700 text-sm sm:text-base mt-2 line-clamp-4 wrap-break-word">
            {note.content}
          </p>

          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mt-4 text-gray-500 text-xs">
          <div className="flex flex-row gap-2">
            <span className="flex items-center gap-1">
              <MdCalendarToday className="text-gray-400 text-sm" />
              Created: {created}
            </span>
            {updated && (
              <span className="flex items-center gap-1">
                <MdCalendarToday className="text-gray-400 text-sm" />
                Updated: {updated}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <motion.button
              className="p-2 rounded-full text-gray-500 hover:text-blue-600 cursor-pointer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
            >
              <MdEdit className="text-lg sm:text-xl" />
            </motion.button>

            <motion.button
              className="p-2 rounded-full text-gray-500 hover:text-red-600 cursor-pointer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => deleteNote(note._id)}
            >
              <MdDelete className="text-lg sm:text-xl" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {isEditing && <EditNote note={note} onClose={() => setIsEditing(false)} />}
    </>
  );
};

export default NoteCard;
