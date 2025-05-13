import React from 'react';
import { Routes, Route } from 'react-router';

// Import the page components (will create these next)
import UserList from '@/components/users/UserList';
import UserDetailPage from '@/components/users/UserDetail';    // Component for viewing user details
import CreateUserPage from '@/components/users/CreateUser';  // Component for creating a user
import EditUserPage from '@/components/users/EditUser';      // Component for editing a user

const UserManagementPage: React.FC = () => {
  return (
    <div className="user-management-container"> {/* Add your container styling */}
      <Routes>
        {/* Route for the User List page - This is the index route for /users */}
        <Route index element={<UserList />} /> {/* Renders UserList at /users */}

        {/* Route for creating a new user */}
        <Route path="create" element={<CreateUserPage />} /> {/* Renders CreateUserPage at /users/create */}

        {/* Route for viewing a specific user by ID */}
        {/* The ':userId' is a URL parameter */}
        <Route path=":userId" element={<UserDetailPage />} /> {/* Renders UserDetailPage at /users/:userId */}

        {/* Route for editing a specific user by ID */}
        {/* The ':userId' is a URL parameter */}
        <Route path=":userId/edit" element={<EditUserPage />} /> {/* Renders EditUserPage at /users/:userId/edit */}

        {/*
          You might want a catch-all for unknown /users paths,
          perhaps redirecting back to the list or showing a 404
          <Route path="*" element={<Navigate to="." />} />
        */}
      </Routes>
    </div>
  );
};

export default UserManagementPage;