import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { MdClose } from 'react-icons/md';
import { useAuth } from '../Context/ContextProvider.jsx';
import { toast } from 'react-toastify';
import Tag from './Tag.jsx';

const AddNote = ({ onClose, editNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const { addNote } = useAuth();

  const handleSubmit = async () => {
    if (!title.trim()) return toast.warning("Title cannot be empty!");
    await addNote({ title, content, tags });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 max-sm:p-2 max-sm:text-sm">
      <motion.div
        className='relative bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-blue-200 w-full max-w-lg mx-auto'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-white shadow-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer'
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MdClose className='text-lg sm:text-xl' />
        </motion.button>

        <h2 className="text-2xl font-semibold text-blue-800 mb-3">
          Add Note
        </h2>

        <div className='flex flex-col gap-2'>
          <label className='text-blue-600 font-medium tracking-wider text-sm sm:text-base'>
            TITLE
          </label>
          <motion.input
            type='text'
            className='text-xl sm:text-2xl text-slate-800 outline-none border-b-2 pb-0.5 border-gray-400 focus:border-blue-600 transition-colors w-full'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <div className='flex flex-col gap-2 mt-4 sm:mt-6'>
          <label className='text-blue-600 font-medium tracking-wider text-sm sm:text-base'>
            CONTENT
          </label>
          <motion.textarea
            className='text-sm text-slate-700 bg-blue-50 p-3 sm:p-4 rounded-lg resize-none outline-none border-b-2 border-transparent focus:border-blue-100 focus:shadow-inner transition-colors w-full'
            placeholder='Write your content...'
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <div className='mt-4 sm:mt-5 cursor-pointer'>
          <label className='text-blue-600 font-medium tracking-wider text-sm sm:text-base'>
            TAGS
          </label>
          <Tag tags={tags} setTags={setTags} />
        </div>

        <motion.button
          className='mt-6 w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition cursor-pointer'
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
        >
          Add Note
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AddNote;
