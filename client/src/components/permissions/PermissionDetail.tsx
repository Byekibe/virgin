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

// const PermissionDetailPage: React.FC<{ permissionId: number; onBack: () => void }> = ({ permissionId, onBack }) => {
//     // Note: You might need to add a getPermissionById query to your API slice
//     // For now, we'll just filter from the list data or fetch it if needed.
//     // Assuming you added: getPermissionById: builder.query<Permission, number>({ query: (id) => `/permissions/${id}`, ... })
//     const { data: permission, isLoading, isError, error } = useGetPermissionsQuery(undefined, {
//        selectFromResult: ({ data, ...rest }) => ({
//          data: data?.find(p => p.id === permissionId),
//          ...rest,
//        }),
//        skip: !permissionId, // Skip this query if permissionId is not set
//     });
  
//     // If you have a dedicated getPermissionById query:
//     // const { data: permission, isLoading, isError, error } = useGetPermissionByIdQuery(permissionId, {
//     //   skip: !permissionId,
//     // });
  
  
//     if (isLoading) return <div className="text-center text-gray-500">Loading permission details...</div>;
//     if (isError) return <div className="text-center text-red-500">Error loading permission details: {JSON.stringify(error)}</div>;
//     if (!permission) return <div className="text-center text-gray-500">Permission not found.</div>;
  
//     return (
//       <div className="container mx-auto p-6 bg-white shadow rounded-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-gray-800">Permission Details</h2>
//           <button
//             onClick={onBack}
//             className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             <ArrowLeft className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
//             Back to List
//           </button>
//         </div>
  
//         <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
//           <dl className="sm:divide-y sm:divide-gray-200">
//             <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">Name</dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{permission.name}</dd>
//             </div>
//             <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">Description</dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{permission.description || '-'}</dd>
//             </div>
//             <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">Created At</dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(permission.created_at).toLocaleString()}</dd>
//             </div>
//           </dl>
//         </div>
//       </div>
//     );
//   };

//   export default PermissionDetailPage;