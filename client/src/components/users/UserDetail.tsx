import React from 'react';
import { useParams, useNavigate } from 'react-router'; // Import useParams and useNavigate
import { useDeleteUserMutation, useGetUserByIdQuery } from '@/features/users/userApi'; // Adjust path
import { ArrowLeftIcon, Pencil, Trash2 } from 'lucide-react'; // Example back icon

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get userId from URL params
  const navigate = useNavigate(); // Initialize navigate
    const [deleteUserMutation, { isLoading: isDeleting }] = useDeleteUserMutation(); // Renamed mutation function

  // Convert userId string from URL to number for the API query
  const id = userId ? parseInt(userId, 10) : undefined;

  // Fetch user data using the ID from the URL
  const { data: user, isLoading, isError, error } = useGetUserByIdQuery(id!, {
      skip: id === undefined, // Skip the query if id is not available/valid
  });

  // Handlers for actions (can navigate to edit page or trigger delete confirmation)
  const handleEditClick = () => {
    if (user) {
      navigate(`/users/${user.id}/edit`); // Navigate to the edit page
    }
  };

  // Delete handler (can use window.confirm or trigger a modal)
const handleDeleteClick = async () => {
    if (user && window.confirm(`Are you sure you want to delete user ${user.username}?`)) {
        try {
            await deleteUserMutation(user.id).unwrap();
            navigate('/users'); // Navigate back to users list after successful deletion
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user. Please try again.');
        }
    }
};


  if (isLoading) {
    return "Loading...";
  }

  if (isError || !user) {
    const errorMessage = error && typeof error === 'object' && 'status' in error
      ? `Error: ${error.status}`
      : 'User not found or an error occurred';

     return (
       <div className="container mx-auto p-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-600 hover:text-gray-800 inline-flex items-center"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1"/> Back to Users
          </button>
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{errorMessage}</p>
          </div>
       </div>
     );
  }

  // If data loaded successfully
  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page (likely the list)
        className="mb-4 text-gray-600 hover:text-gray-800 inline-flex items-center"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1"/> Back to Users
      </button>

      <h2 className="text-2xl font-semibold mb-4">User Details: {user.username}</h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p><span className="font-medium">ID:</span> {user.id}</p>
        <p><span className="font-medium">Username:</span> {user.username}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Active:</span> {user.is_active ? 'Yes' : 'No'}</p>
        <p><span className="font-medium">Created At:</span> {new Date(user.created_at).toLocaleDateString()}</p>

        {/* You might display roles or permissions here later */}
        {/* <div>
           <h3 className="text-lg font-medium mt-4">Assigned Roles:</h3>
           // Render roles list here (fetch roles data separately if needed)
        </div> */}

        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleEditClick}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
             <Pencil className="h-5 w-5 mr-2"/> Edit User
          </button>
          <button
             onClick={handleDeleteClick} // Implement actual delete logic here
             className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
           >
            <Trash2 className="h-5 w-5 mr-2"/> Delete User
           </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;