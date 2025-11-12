import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "../Context/ContextProvider.jsx";
import Tag from "./Tag.jsx";

const EditNote = ({ note, onClose }) => {
  const { updateNote } = useAuth();

  const [formData, setFormData] = useState({
    title: note.title,
    content: note.content,
  });

  const [tags, setTags] = useState(note.tags || []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData, tags };
      await updateNote(note._id, updatedData);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update note");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 max-sm:text-sm max-sm:p-4">
      <motion.div
        className="bg-white rounded-2xl p-4 md:p-6 w-96 shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h2 className="text-xl font-bold mb-4 text-blue-800">Edit Note</h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-3">

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
            placeholder="Note title"
          />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            className="border p-2 rounded-md border-b-2 bg-gray-200/50 border-transparent outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Note content"
          ></textarea>

          <div>
            <label className="text-blue-600 font-medium text-sm">
              Tags
            </label>
            <Tag tags={tags} setTags={setTags} />
          </div>

          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditNote;
