import { useState } from 'react';
import type { FunctionComponent } from "../common/types";
import { Navigation } from '../components/Navigation.tsx';

export const Contact = (): FunctionComponent => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <Navigation darkMode={darkMode} />
      
      <div className="pt-20 px-4 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 rounded ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 rounded ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-2 rounded ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
              rows={5}
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}; 