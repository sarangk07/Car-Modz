
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MentionInput = ({ value, onChange, allUsers }) => {
  const [mentionQuery, setMentionQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showSuggestions) {
      const lastAtSymbol = value.lastIndexOf('@', cursorPosition);
      if (lastAtSymbol !== -1) {
        setMentionQuery(value.slice(lastAtSymbol + 1, cursorPosition).toLowerCase());
      }
    }
  }, [value, cursorPosition, showSuggestions]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setCursorPosition(e.target.selectionStart);
    setShowSuggestions(newValue.includes('@'));
  };

  const handleKeyDown = (e) => {
    if (e.key === '@') {
      setShowSuggestions(true);
    }
  };

  const insertMention = (username) => {
    const lastAtSymbol = value.lastIndexOf('@', cursorPosition);
    if (lastAtSymbol !== -1) {
      const newValue = value.slice(0, lastAtSymbol) + `@${username} ` + value.slice(cursorPosition);
      onChange(newValue);
      setShowSuggestions(false);
      inputRef.current.focus();
    }
  };

  const filteredUsers = allUsers.filter(user => 
    user.username.toLowerCase().includes(mentionQuery)
  );

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border text-gray-700 rounded"
      />
      {showSuggestions && (
        <div className="absolute left-0 mt-1 w-full text-gray-700 bg-white border rounded shadow-lg">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => insertMention(user.username)}
            >
              {user.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};




function PostCreate() {
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.user.users);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [choice, setChoice] = useState('default');
  const token = localStorage.getItem('token-access');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    formData.append('author', user.id);
    formData.append('author_type', user.is_shopOwner ? 'shop_owner' : 'user');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/posts/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Post created:', response.data);
      setChoice('default');
      setTitle('');
      setContent('');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setChoice('create')}>Create Post</button>
      {choice === 'create' && (
        <form onSubmit={handleSubmit} className='flex flex-col bg-[#1e1e36] items-center rounded-md p-4'>
          <label htmlFor="title" className="mb-2">Title</label>
          <input
            type="text"
            id="title"
            className='text-gray-700 rounded-md mb-2 p-2 w-56 '
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="content" className="mb-2">Description</label>
          <p className='text-xs mb-2'>Want to mention a user? Type '@' followed by their username.</p>
          <MentionInput
            value={content}
            onChange={setContent}
            allUsers={allUsers}
          />
          <label htmlFor="image" className="mt-4 mb-2">Upload Image</label>
          <input
            type="file"
            id="image"
            className='text-gray-700 mb-2 text-xs bg-blue-300 rounded-full'
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className='flex flex-col items-center mt-4'>
              <h2>Preview:</h2>
              {selectedFile.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ maxWidth: '30%' }} />
              ) : (
                <p>File type not supported for preview.</p>
              )}
            </div>
          )}
          <button type='submit' className='text-green-500'>POST</button>
          <p className='cursor-pointer mt-5' onClick={() => setChoice('default')}>Cancel</p>
        </form>
      )}
    </div>
  );
}

export default PostCreate;