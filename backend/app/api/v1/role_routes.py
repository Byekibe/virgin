from flask import request, jsonify
from app.api.v1 import api_v1_bp
from app.services.role_service import RoleService
from flasgger import swag_from

# ---- Roles Endpoints ----

@api_v1_bp.route("/roles", methods=["GET"], endpoint="get_roles")
@swag_from({
    'tags': ['Roles'],
    'responses': {
        200: {'description': 'List all roles'}
    }
})
def get_roles():
    try:
        roles = RoleService.get_all_roles()
        return jsonify({"status": "success", "data": roles}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/roles", methods=["POST"], endpoint="create_role")
@swag_from({
    'tags': ['Roles'],
    'parameters': [{
        'name': 'body',
        'in': 'body',
        'schema': {
            'type': 'object',
            'required': ['name'],
            'properties': {
                'name': {'type': 'string'}
            }
        }
    }],
    'responses': {
        201: {'description': 'Role created'},
        400: {'description': 'Missing fields'}
    }
})
def create_role():
    try:
        data = request.get_json()
        if not data or 'name' not in data:
            return jsonify({"status": "error", "message": "Missing required field: name"}), 400
        role = RoleService.create_role(data['name'], data.get('description'))
        return jsonify({"status": "success", "data": role}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/roles/<int:role_id>", methods=["PUT"], endpoint="update_role")
@swag_from({
    'tags': ['Roles'],
    'parameters': [
        {'name': 'role_id', 'in': 'path', 'type': 'integer', 'required': True, 'description': 'ID of the role'},
        {'name': 'body', 'in': 'body', 'schema': {'type': 'object', 'properties': {'name': {'type': 'string'}}}}
    ],
    'responses': {
        200: {'description': 'Role updated'},
        404: {'description': 'Role not found'}
    }
})
def update_role(role_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No input data provided"}), 400
        role = RoleService.update_role(role_id, **data)
        if not role:
            return jsonify({"status": "error", "message": "Role not found"}), 404
        return jsonify({"status": "success", "data": role}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/roles/<int:role_id>", methods=["DELETE"], endpoint="delete_role")
@swag_from({
    'tags': ['Roles'],
    'parameters': [{'name': 'role_id', 'in': 'path', 'type': 'integer', 'required': True}],
    'responses': {
        200: {'description': 'Role deleted'},
        404: {'description': 'Role not found'}
    }
})
def delete_role(role_id):
    try:
        result = RoleService.delete_role(role_id)
        if not result:
            return jsonify({"status": "error", "message": "Role not found"}), 404
        return jsonify({"status": "success", "message": "Role deleted"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
