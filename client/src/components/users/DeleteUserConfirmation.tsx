import React from 'react';
import Modal from '@/components/common/Modal'; // Adjust path
import { useDeleteUserMutation } from '@/features/users/userApi'; // Adjust path
import LoadingSpinner from '../common/LoadingSpinner'; // Adjust path
import ErrorMessage from '@/components/common/ErrorMessage'; // Adjust path

interface DeleteUserConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  // Allow userId and username to be null when the modal is closed
  userId: number | null; // <-- Corrected type
  username: string | null; // <-- Corrected type
}

const DeleteUserConfirmation: React.FC<DeleteUserConfirmationProps> = ({ isOpen, onClose, userId, username }) => {
  // Only render the content if the modal is open and user data is available
  const shouldRenderContent = isOpen && userId !== null && username !== null;

  const [deleteUser, { isLoading, isError, error, isSuccess }] = useDeleteUserMutation();

  const handleDeleteConfirm = async () => {
    // Ensure userId is not null before attempting deletion
    if (userId === null) {
      console.error("Attempted to delete user with null ID.");
      return;
    }

    try {
      await deleteUser(userId).unwrap();
      // Success: Close modal. RTK Query invalidatesTags will handle list re-fetch.
      console.log(`User ${userId} deleted successfully`);
      // Optionally show a success notification here (toast etc.)
      onClose(); // Close the modal on success
    } catch (err) {
      // Handle error: stay open and show error message (or use a notification system)
      console.error('Failed to delete user:', err);
      const apiError = err as any; // Cast to any to access potential error details
      const errorMessage = apiError?.data?.message || apiError?.error || 'Failed to delete user.';
      // Using alert for simplicity, replace with proper UI error display within the modal
      alert(`Deletion failed: ${errorMessage}`);
    }
  };

  // Optional: Auto-close on success if you prefer (already commented out in your code)
  // React.useEffect(() => {
  //    if (isSuccess) {
  //      onClose();
  //      // Maybe show a toast notification here
  //    }
  // }, [isSuccess, onClose]);


  // If the modal is not open or data is missing, render nothing (the Modal component itself might handle this)
  // but an explicit check here ensures the content doesn't try to access null.
   if (!shouldRenderContent) {
       // The Modal component should handle not being visible when isOpen is false.
       // This check prevents rendering the *content* inside the modal when data is null.
       return isOpen ? ( // If isOpen is true but data is null, maybe show a loading/error state inside the modal? Or this shouldn't happen if state is managed correctly.
           <Modal isOpen={isOpen} onClose={onClose} title="Confirm User Deletion">
             {/* Optional: Handle case where modal opens but data is briefly null */}
             <p>Loading user details...</p>
           </Modal>
       ) : null;
   }


  // If we reach here, isOpen is true, userId is number, and username is string
  const confirmedUserId = userId as number; // Type assertion for clarity
  const confirmedUsername = username as string; // Type assertion for clarity


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm User Deletion">
      <div className="text-center text-gray-700 mb-6">
        <p className="mb-2">Are you sure you want to delete the user:</p>
        {/* Use the confirmedUsername and confirmedUserId */}
        <p className="text-lg font-semibold text-red-600">"{confirmedUsername}" (ID: {confirmedUserId})</p>
        <p className="mt-4 text-sm text-gray-500">This action cannot be undone.</p>
      </div>

      {isError && (
        // Display error message using the ErrorMessage component
        <ErrorMessage message={error ? (error as any).data?.message || 'An error occurred during deletion.' : 'An error occurred during deletion.'} />
      )}

      <div className="flex justify-center space-x-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading} // Prevent closing while deletion is in progress
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDeleteConfirm}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          disabled={isLoading} // Disable button while deletion is in progress
        >
           {isLoading ? (
              // Use a small spinner if loading
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
           ) : 'Delete User'}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserConfirmation;