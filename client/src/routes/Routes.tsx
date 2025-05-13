import { Routes, Route } from "react-router"; 
import Home from "@/pages/Home";
import AuthApp from "@/pages/AuthApp"; // Assuming this is your login/auth entry point
import ForgotPasswordPage from "@/pages/auths/ForgotPassword";
import RegisterPage from "@/pages/auths/Register";
import UserManagementPage from "@/pages/UserManagement"; // Adjust path if needed
import UserList from '@/components/users/UserList'; // Adjust path
import UserDetailPage from '@/components/users/UserDetail'; // Adjust path
import CreateUserPage from '@/components/users/CreateUser';     // Adjust path
import EditUserPage from '@/components/users/EditUser';       // Adjust path
import CreateRolePage from "@/components/roles/CreateRole";
import EditRolePage from "@/components/roles/EditRole";
import RoleDetailPage from "@/components/roles/RoleDetail";
import RoleManagementPage from "@/pages/RoleManagement";
import PermissionsListPage from "@/pages/PermissionManagement";
import CreatePermissionPage from "@/components/permissions/CreatePermission";
import EditPermissionPage from "@/components/permissions/EditPermission";
import ViewPermissionPage from "@/components/permissions/ViewDetailedPermission";


const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="/login" element={<AuthApp />} />
            <Route path="forgot-password" element= {<ForgotPasswordPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/users" element={<UserManagementPage />}>
                <Route index element={<UserList />} /> {/* Matches /users */}
                <Route path="create" element={<CreateUserPage />} /> {/* Matches /users/create */}
                <Route path=":userId" element={<UserDetailPage />} /> {/* Matches /users/123 (Detail) */}
                <Route path=":editId/edit" element={<EditUserPage />} /> {/* Matches /users/123 (Edit, depends on route order) */}
            </Route>
            <Route path="/roles" element={<RoleManagementPage />} />
            <Route path="/roles/create" element={<CreateRolePage />} />
            <Route path="/roles/edit/:id" element={<EditRolePage />} />
            <Route path="/roles/:id" element={<RoleDetailPage />} />     
            <Route path="/permissions" element={<PermissionsListPage />} />
            <Route path="/permissions/create" element={<CreatePermissionPage />} />
            <Route path="/permissions/edit/:id" element={<EditPermissionPage />} /> 
            <Route path="/permissions/view/:id" element={<ViewPermissionPage />} />           
        </Routes>
    )
}

export default AppRoutes;