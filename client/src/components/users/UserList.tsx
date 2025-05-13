import React, { useState } from 'react'; // Import useState
// Adjust the import path for your userApi slice
import { useGetUsersQuery, useDeleteUserMutation } from '@/features/users/userApi';
// Adjust the import path for your User type if it's not already included by the API slice
// import { User } from '@/types/userTypes';
import { Pencil, Trash2, Eye, PlusCircle } from "lucide-react"; // Import Lucide icons
import { useNavigate } from 'react-router'; // Import useNavigate for navigation

// Import your Delete Confirmation Modal
import DeleteUserConfirmation from './DeleteUserConfirmation'; // Adjust path

// Import common UI components (assuming you have these or similar)
import LoadingSpinner from '../common/LoadingSpinner'; // Adjust path
import ErrorMessage from '../common/ErrorMessage';   // Adjust path


const UserList: React.FC = () => {
  // Use the useGetUsersQuery hook to fetch user data
  const { data: users, isLoading, isError, error } = useGetUsersQuery();
  // Use the useDeleteUserMutation hook for deleting users
  const [deleteUserMutation, { isLoading: isDeleting }] = useDeleteUserMutation(); // Renamed mutation function

  // Initialize the navigate hook from react-router-dom
  const navigate = useNavigate();

  // State to control the Delete Confirmation Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [deletingUsername, setDeletingUsername] = useState<string | null>(null);


  // Function to open the delete confirmation modal
  const handleOpenDeleteModal = (user: { id: number; username: string }) => { // Use explicit type or import User type
    setDeletingUserId(user.id);
    setDeletingUsername(user.username);
    setShowDeleteModal(true);
  };

  // Function to close the delete confirmation modal and reset state
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingUserId(null);
    setDeletingUsername(null);
  };

  // --- Navigation Handlers (replacing the alert placeholders) ---

  // Navigate to the Create User page
  const handleCreateUserClick = () => {
    navigate('/users/create'); // Navigate to the direct create route
  };

  // Navigate to the User Detail page
  const handleViewUserClick = (userId: number) => {
    navigate(`/users/${userId}`); // Navigate to the standard detail route
  };

  // Navigate to the Edit User page (using the :editId route as requested)
  const handleEditUserClick = (userId: number) => {
    navigate(`/users/${userId}/edit`); // Navigate to /users/:editId (as per your AppRoutes)
  };

  // --- Render Logic ---

  // Handle Loading State
  if (isLoading) {
    return (
       <div className="container mx-auto p-4 text-center">
         <LoadingSpinner /> {/* Use a dedicated loading component */}
         <p className="mt-2 text-gray-600">Loading Users...</p>
       </div>
    );
  }

  // Handle Error State
  if (isError) {
     // Refine error message display based on the actual error object structure from RTK Query
     const errorMessage = error && typeof error === 'object' && 'status' in error
       ? `Error ${error.status}: ${(error as any).data?.message || (error as any).error}`
       : 'An unknown error occurred while fetching users.';
     return (
       <div className="container mx-auto p-4">
          <ErrorMessage message={errorMessage} /> {/* Use a dedicated error component */}
       </div>
     );
  }

  // Handle Empty State
  if (!users || users.length === 0) {
    return (
      <div className="container mx-auto p-4">
         <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <div className="mb-4 text-right">
            <button
              onClick={handleCreateUserClick} // Use the navigation handler
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
               <PlusCircle className="h-5 w-5 mr-2"/> Add New User {/* Use Lucide icon */}
            </button>
          </div>
         <p className="text-center text-gray-500">No users found.</p>
       </div>
    );
  }

  // If data loaded successfully, render the table
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      <div className="mb-4 text-right">
        {/* Button to navigate to create user page */}
        <button
          onClick={handleCreateUserClick} // Use the navigation handler
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
           <PlusCircle className="h-5 w-5 mr-2"/> Add New User {/* Use Lucide icon */}
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* ... Table Headers ... */}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                {/* ... user data cells ... */}
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.is_active ? 'Yes' : 'No'}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {new Date(user.created_at).toLocaleDateString()}
                 </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* Action Buttons */}

                  {/* View Button - Navigates to the user detail page */}
                  <button
                    onClick={() => handleViewUserClick(user.id)} // Use the navigation handler
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                    title="View User"
                  >
                    <Eye className="h-5 w-5" /> {/* Use Lucide icon */}
                  </button>

                  {/* Edit Button - Navigates to the edit page */}
                  <button
                    onClick={() => handleEditUserClick(user.id)} // Use the navigation handler
                    className="text-blue-600 hover:text-blue-900 mr-2"
                    title="Edit User"
                  >
                    <Pencil className="h-5 w-5" /> {/* Use Lucide icon */}
                  </button>

                  {/* Delete Button - Opens the delete confirmation modal */}
                  <button
                    onClick={() => handleOpenDeleteModal(user)} // Use the modal handler
                    className="text-red-600 hover:text-red-900"
                    disabled={isDeleting} // Disable button while deleting is in progress
                    title="Delete User"
                  >
                     {isDeleting ? (
                       // Use a simple spinner for the button state
                       <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     ) : (
                       <Trash2 className="h-5 w-5" />
                     )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* Render the DeleteUserConfirmation modal */}
       <DeleteUserConfirmation
         isOpen={showDeleteModal}
         onClose={handleCloseDeleteModal}
         userId={deletingUserId}
         username={deletingUsername}
         // Pass the actual delete mutation function to the modal
         // This allows the modal to handle the API call and close on success
       />

    </div>
  );
};

export default UserList;