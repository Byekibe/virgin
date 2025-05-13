import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from '@/features/roles/rolesApi'; // Adjust the import path as needed
import { Role, CreateRoleRequest, UpdateRoleRequest } from '@/types/roleTypes'; // Adjust the import path as needed

// --- Role Detail Page Component ---
const RoleDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const roleId = Number(id);
  
    const { data: roles, isLoading, isError } = useGetRolesQuery();
    const role = roles?.find(role => role.id === roleId);
  
    if (isLoading) return <div className="text-center mt-8">Loading role details...</div>;
    if (isError || !role) return <div className="text-center mt-8 text-red-600">Error loading role or role not found.</div>;
  
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Role Details</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <p className="text-gray-700 font-bold">ID:</p>
            <p className="text-gray-900">{role.id}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-bold">Name:</p>
            <p className="text-gray-900">{role.name}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-bold">Description:</p>
            <p className="text-gray-900">{role.description || '-'}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-bold">Created At:</p>
            <p className="text-gray-900">{new Date(role.created_at).toLocaleString()}</p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => navigate('/roles')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Roles
            </button>
          </div>
        </div>
      </div>
    );
  };
  
export default RoleDetailPage;