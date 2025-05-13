import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/features/users/userApi';
import { UpdateUserRequest } from '@/types/userTypes';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ArrowLeftIcon } from 'lucide-react';
import ErrorMessage from '../common/ErrorMessage';

const EditUserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const id = userId ? parseInt(userId, 10) : undefined;

  const { data: user, isLoading: isFetchingUser, isError: isFetchError, error: fetchError } = useGetUserByIdQuery(id!, {
    skip: id === undefined,
  });

  const [updateUser, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] = useUpdateUserMutation();

  const [formData, setFormData] = useState<UpdateUserRequest>({
    username: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    if (!formData.username || !formData.email) {
      alert('Please fill in required fields (Username, Email).');
      return;
    }

    try {
      await updateUser({ id, userData: formData }).unwrap();
      alert('User updated successfully!');
      navigate(`/users/${id}`);
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Failed to update user.');
    }
  };

  if (isFetchingUser) {
    return <LoadingSpinner />;
  }

  if (isFetchError || !user) {
    const errorMessage =
      fetchError && typeof fetchError === 'object' && 'status' in fetchError
        ? `Error fetching user: ${fetchError.status}`
        : 'Error fetching user or user not found.';

    return (
      <div className="container mx-auto p-4">
        <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-gray-800 inline-flex items-center">
          <ArrowLeftIcon className="h-5 w-5 mr-1" /> Back
        </button>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-600 hover:text-gray-800 inline-flex items-center"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" /> Back to User Details
      </button>

      <h2 className="text-2xl font-semibold mb-4">Edit User: {user.username}</h2>

      {isUpdateError && <ErrorMessage message={updateError} />}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="username">
            Username
          </label>
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
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
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

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate(`/users/${id}`)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isUpdating}
          >
            {isUpdating ? <LoadingSpinner size="sm" /> : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
