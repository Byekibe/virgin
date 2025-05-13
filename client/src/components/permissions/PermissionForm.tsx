import React, { useState } from 'react';
import {
  useGetPermissionsQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useGetPermissionByIdQuery, // Assuming you add this query based on our discussion
} from '@/features/permissions/permissions'; // Adjust the import path as needed
import { Permission, CreatePermissionRequest, UpdatePermissionRequest } from '@/types/permissionTypes'; // Adjust the import path as needed
import { Eye, Edit, Trash, PlusCircle, ArrowLeft, Save, XCircle } from 'lucide-react'; // Icons
import { skipToken } from '@reduxjs/toolkit/query'; // For conditional queries

// --- Component: Permission Form (Create and Edit) ---
interface PermissionFormProps {
    initialData?: Permission; // For editing
    onSubmit: (data: CreatePermissionRequest | UpdatePermissionRequest) => Promise<any>; // Adjusted for mutation promise
    onCancel: () => void;
    isSubmitting: boolean;
  }
  
  const PermissionForm: React.FC<PermissionFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [error, setError] = useState<string | null>(null);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null); // Clear previous errors
  
      if (!name.trim()) {
        setError('Permission name is required.');
        return;
      }
  
      const data = {
        name: name.trim(),
        description: description.trim() || undefined, // Send undefined if empty
      };
  
      try {
        await onSubmit(data); // Regular Promise doesn't need unwrap
        // onSubmit will handle navigation after success
      } catch (err: any) {
        console.error('Submission error:', err);
        // Handle API errors (e.g., display a message)
        setError(err?.data?.message || 'An error occurred during submission.');
      }
    };
  
    return (
      <div className="container mx-auto p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{initialData ? 'Edit Permission' : 'Create New Permission'}</h2>
  
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
            {error}
          </div>
        )}
  
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Permission Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
  
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              <XCircle className="-ml-1 mr-2 h-5 w-5" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
               <Save className="-ml-1 mr-2 h-5 w-5" />
              {isSubmitting ? 'Saving...' : initialData ? 'Update Permission' : 'Create Permission'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default PermissionForm;
  