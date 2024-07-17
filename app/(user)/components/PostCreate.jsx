
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; 

function PostCreate() {
    const user = useSelector((state) => state.user);
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
        formData.append('author',user.id)
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
                <form onSubmit={handleSubmit} className='flex flex-col bg-gray-700 items-center '>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" className='text-gray-700' value={title} onChange={(e) => setTitle(e.target.value)} required/>

                    <label htmlFor="content">Description</label>
                    <textarea id="content" className='text-gray-700' value={content} onChange={(e) => setContent(e.target.value)} required/>

                    <label htmlFor="image">Upload Image</label>
                    <input type="file" id="image" className='text-gray-700' onChange={handleFileChange} required/>

                    {selectedFile && (
                        <div className='flex flex-col items-center'>
                            <h2>Preview:</h2>
                            {selectedFile.type.startsWith('image/') ? (
                                <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ maxWidth: '30%' }} />
                            ) : (
                                <p>File type not supported for preview.</p>
                            )}
                        </div>
                    )}

                    <button type='submit'>Create</button>
                    <p className='cursor-pointer' onClick={()=>setChoice('default')}>cancel</p>
                </form>
            )}
        </div>
    );
}

export default PostCreate;