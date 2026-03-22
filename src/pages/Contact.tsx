import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { FunctionComponent } from "../common/types";
import { useThemeStore } from '../store/themeStore';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export const Contact: FunctionComponent = () => {
  const { darkMode } = useThemeStore();
  const [toast, setToast] = useState<string>('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setToast('Message sent successfully!');
    setTimeout(() => { setToast(''); }, 3000);
    void reset();
  };

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen transition-colors duration-500`}>
      <div className="pt-20 px-4 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              {...register('name')}
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"} transition-colors duration-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              {...register('email')}
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"} transition-colors duration-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              {...register('message')}
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"} transition-colors duration-500`}
              rows={5}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
};