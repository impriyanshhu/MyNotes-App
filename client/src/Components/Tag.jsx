import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const Tag = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const addNewTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className='flex items-center gap-2 flex-wrap mt-2'>
      {tags.map((tag, index) => (
        <span
          key={index}
          className='flex items-center gap-2 text-sm text-blue-500 bg-blue-50 px-3 py-1 rounded-full shadow-sm'
        >
          #{tag}
          <button
            className='hover:text-[#B45309] transition-colors hover:scale-110 cursor-pointer'
            onClick={() => handleRemoveTag(tag)}
          >
            <MdClose />
          </button>
        </span>
      ))}

      <div className='flex items-center gap-2'>
        <input
          type='text'
          value={inputValue}
          className='text-sm border border-blue-500 px-3 py-2 rounded outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30 transition-all duration-200 bg-white placeholder:text-gray-400'
          placeholder='Add tags'
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && addNewTag()}
        />
        <button
          className='w-8 h-8 flex items-center justify-center rounded border border-blue-500 hover:bg-blue-500 transition-all duration-200 shadow-sm'
          onClick={addNewTag}
        >
          <MdAdd className='cursor-pointer text-2xl text-blue-500 hover:text-white transition-colors duration-200' />
        </button>
      </div>
    </div>
  )
}

export default Tag
