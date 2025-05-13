from flask import request, jsonify
from app.api.v1 import api_v1_bp
from app.services.user_role_service import UserRoleService
from flasgger import swag_from

# --------- UserRoles Endpoints ---------

@api_v1_bp.route("/user-roles", methods=["GET"], endpoint="get_user_roles")
@swag_from({
    'tags': ['UserRoles'],
    'responses': {
        200: {
            'description': 'List all user-role assignments',
            'examples': {
                'application/json': {
                    "status": "success",
                    "data": []
                }
            }
        }
    }
})
def get_user_roles():
    """Get all user-role assignments"""
    try:
        assignments = UserRoleService.get_all_user_roles()
        return jsonify({"status": "success", "data": assignments}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@api_v1_bp.route("/user-roles", methods=["POST"], endpoint="assign_role_to_user")
@swag_from({
    'tags': ['UserRoles'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'required': ['user_id', 'role_id'],
                'properties': {
                    'user_id': {'type': 'integer'},
                    'role_id': {'type': 'integer'}
                }
            }
        }
    ],
    'responses': {
        201: {'description': 'Role assigned to user'},
        400: {'description': 'Missing fields or invalid input'}
    }
})
def assign_role_to_user():
    """Assign a role to a user"""
    try:
        data = request.get_json()
        if not data or 'user_id' not in data or 'role_id' not in data:
            return jsonify({"status": "error", "message": "user_id and role_id required"}), 400

        assignment = UserRoleService.assign_role_to_user(data['user_id'], data['role_id'])
        return jsonify({"status": "success", "data": assignment}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@api_v1_bp.route("/user-roles", methods=["DELETE"], endpoint="remove_role_from_user")
@swag_from({
    'tags': ['UserRoles'],
    'parameters': [
        {
            'name': 'user_id',
            'in': 'query',
            'type': 'integer',
            'required': True,
            'description': 'ID of the user'
        },
        {
            'name': 'role_id',
            'in': 'query',
            'type': 'integer',
            'required': True,
            'description': 'ID of the role'
        }
    ],
    'responses': {
        200: {'description': 'Role removed from user'},
        400: {'description': 'Missing fields'},
        404: {'description': 'Assignment not found'}
    }
})
def remove_role_from_user():
    """Remove a role from a user"""
    try:
        user_id = request.args.get('user_id', type=int)
        role_id = request.args.get('role_id', type=int)

        if not user_id or not role_id:
            return jsonify({"status": "error", "message": "user_id and role_id required"}), 400

        result = UserRoleService.remove_role_from_user(user_id, role_id)
        if not result:
            return jsonify({"status": "error", "message": "Assignment not found"}), 404

        return jsonify({"status": "success", "message": "Role removed from user"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500