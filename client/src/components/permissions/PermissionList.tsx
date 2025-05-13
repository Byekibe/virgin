// import React, { useState } from 'react';
// import {
//   useGetPermissionsQuery,
//   useCreatePermissionMutation,
//   useUpdatePermissionMutation,
//   useDeletePermissionMutation,
//   useGetPermissionByIdQuery, // Assuming you add this query based on our discussion
// } from '@/features/permissions/permissions'; // Adjust the import path as needed
// import { Permission, CreatePermissionRequest, UpdatePermissionRequest } from '@/types/permissionTypes'; // Adjust the import path as needed
// import { Eye, Edit, Trash, PlusCircle, ArrowLeft, Save, XCircle } from 'lucide-react'; // Icons
// import { skipToken } from '@reduxjs/toolkit/query'; // For conditional queries

// // --- Component: Permissions List Page ---
// const PermissionsListPage: React.FC<{
//   onView: (id: number) => void;
//   onEdit: (id: number) => void;
//   onCreate: () => void;
// }> = ({ onView, onEdit, onCreate }) => {
//   const { data: permissions, isLoading, isError, error } = useGetPermissionsQuery();
//   const [deletePermission, { isLoading: isDeleting }] = useDeletePermissionMutation();

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this permission?')) {
//       try {
//         await deletePermission(id).unwrap();
//         // RTK Query handles cache invalidation and refetching automatically
//       } catch (err) {
//         console.error('Failed to delete permission:', err);
//         alert('Failed to delete permission.'); // Simple error handling
//       }
//     }
//   };

//   if (isLoading) return <div className="text-center text-gray-500">Loading permissions...</div>;
//   if (isError) return <div className="text-center text-red-500">Error loading permissions: {JSON.stringify(error)}</div>;
//   if (!permissions || permissions.length === 0) {
//     return (
//       <div className="text-center text-gray-500">
//         No permissions found.
//         <button
//           onClick={onCreate}
//           className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           <PlusCircle className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
//           Create New Permission
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 bg-white shadow rounded-lg">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Permissions</h2>
//         <button
//           onClick={onCreate}
//           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           <PlusCircle className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
//           Create New Permission
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
//               <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {permissions.map((permission) => (
//               <tr key={permission.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{permission.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{permission.description || '-'}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(permission.created_at).toLocaleDateString()}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <button onClick={() => onView(permission.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">
//                     <Eye className="h-5 w-5" />
//                   </button>
//                   <button onClick={() => onEdit(permission.id)} className="text-yellow-600 hover:text-yellow-900 mr-3">
//                     <Edit className="h-5 w-5" />
//                   </button>
//                   <button onClick={() => handleDelete(permission.id)} className="text-red-600 hover:text-red-900" disabled={isDeleting}>
//                     <Trash className="h-5 w-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PermissionsListPage;