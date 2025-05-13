from flask import request, jsonify
from app.api.v1 import api_v1_bp
from app.services.role_permission_service import RolePermissionService
from flasgger import swag_from


@api_v1_bp.route("/role-permissions", methods=["GET"], endpoint="get_role_permissions")
@swag_from({
    'tags': ['RolePermissions'],
    'responses': {
        200: {
            'description': 'List all role-permission assignments',
            'examples': {
                'application/json': {
                    "status": "success",
                    "data": []
                }
            }
        }
    }
})
def get_role_permissions():
    """Get all role-permission assignments"""
    try:
        assignments = RolePermissionService.get_all_role_permissions()
        return jsonify({"status": "success", "data": assignments}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@api_v1_bp.route("/role-permissions", methods=["POST"], endpoint="assign_permission_to_role")
@swag_from({
    'tags': ['RolePermissions'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'required': ['role_id', 'permission_id'],
                'properties': {
                    'role_id': {'type': 'integer'},
                    'permission_id': {'type': 'integer'}
                }
            }
        }
    ],
    'responses': {
        201: {'description': 'Permission assigned to role'},
        400: {'description': 'Missing fields or invalid input'}
    }
})
def assign_permission_to_role():
    """Assign a permission to a role"""
    try:
        data = request.get_json()
        if not data or 'role_id' not in data or 'permission_id' not in data:
            return jsonify({"status": "error", "message": "role_id and permission_id required"}), 400

        assignment = RolePermissionService.assign_permission_to_role(data['role_id'], data['permission_id'])
        return jsonify({"status": "success", "data": assignment}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@api_v1_bp.route("/role-permissions", methods=["DELETE"], endpoint="remove_permission_from_role")
@swag_from({
    'tags': ['RolePermissions'],
    'parameters': [
        {
            'name': 'role_id',
            'in': 'query',
            'type': 'integer',
            'required': True,
            'description': 'ID of the role'
        },
        {
            'name': 'permission_id',
            'in': 'query',
            'type': 'integer',
            'required': True,
            'description': 'ID of the permission'
        }
    ],
    'responses': {
        200: {'description': 'Permission removed from role'},
        400: {'description': 'Missing fields'},
        404: {'description': 'Assignment not found'}
    }
})
def remove_permission_from_role():
    """Remove a permission from a role"""
    try:
        role_id = request.args.get('role_id', type=int)
        permission_id = request.args.get('permission_id', type=int)

        if not role_id or not permission_id:
            return jsonify({"status": "error", "message": "role_id and permission_id required"}), 400

        result = RolePermissionService.remove_permission_from_role(role_id, permission_id)
        if not result:
            return jsonify({"status": "error", "message": "Assignment not found"}), 404

        return jsonify({"status": "success", "message": "Permission removed from role"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500