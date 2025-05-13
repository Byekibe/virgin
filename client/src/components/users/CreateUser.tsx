import React, { useState } from 'react';
import { useCreateUserMutation } from '@/features/users/userApi'; // Adjust path
import { CreateUserRequest } from '@/types/userTypes'; // Adjust path
import { useNavigate } from 'react-router'; // Import useNavigate
import { ArrowLeftIcon } from 'lucide-react'; // Example back icon

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    username: '',
    email: '',
    password: '',
  });

  const [createUser, { isLoading, isError }] = useCreateUserMutation();
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Basic validation
      if (!formData.username || !formData.email || !formData.password) {
        alert('Please fill in all required fields.');
        return;
      }
      // TODO: Add more robust validation (email format, password policy etc.)

      await createUser(formData).unwrap();

      // Success: Navigate back to the user list
      alert('User created successfully!'); // Or a toast notification
      navigate('/users'); // Navigate back to the list page
    } catch (err) {
      return 'Failed to create user.'
    }
  };

  // Optional: Effect to redirect on success if you don't want the alert blocking
  // React.useEffect(() => {
  //   if (isSuccess) {
  //      alert('User created successfully!');
  //      navigate('/users');
  //   }
  // }, [isSuccess, navigate]);


  return (
    <div className="container mx-auto p-4">
       <button
         onClick={() => navigate(-1)} // Navigate back to the previous page (likely the list)
         className="mb-4 text-gray-600 hover:text-gray-800 inline-flex items-center"
       >
         <ArrowLeftIcon className="h-5 w-5 mr-1"/> Back to Users
       </button>

      <h2 className="text-2xl font-semibold mb-4">Create New User</h2>

       {isError && "An error occurred while creating the user."}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/users')} // Navigate back on Cancel
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;