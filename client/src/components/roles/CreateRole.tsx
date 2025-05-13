import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from '@/features/roles/rolesApi'; // Adjust the import path as needed
import { Role, CreateRoleRequest, UpdateRoleRequest } from '@/types/roleTypes'; // Adjust the import path as needed

const CreateRolePage: React.FC = () => {
    const navigate = useNavigate();
    const [createRoleMutation, { isLoading }] = useCreateRoleMutation();
  
    const [formData, setFormData] = useState<CreateRoleRequest>({
      name: '',
      description: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await createRoleMutation(formData).unwrap();
        navigate('/roles'); // Navigate back to the role management page
      } catch (error) {
        console.error('Failed to create role:', error);
        // Handle error (e.g., show a notification)
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Create Role</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Role Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Role'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/roles')}
              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };


export default CreateRolePage