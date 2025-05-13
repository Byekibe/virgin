from flask import request, jsonify
from app.api.v1 import api_v1_bp
from app.services.permission_service import PermissionService
from flasgger import swag_from

# ---- Permissions Endpoints ----

@api_v1_bp.route("/permissions", methods=["GET"], endpoint="get_permissions")
@swag_from({'tags': ['Permissions'], 'responses': {200: {'description': 'List all permissions'}}})
def get_permissions():
    try:
        permissions = PermissionService.get_all_permissions()
        return jsonify({"status": "success", "data": permissions}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    
# app/api/v1/routes/permissions.py or wherever your routes are defined

@api_v1_bp.route("/permissions/<int:permission_id>", methods=["GET"], endpoint="get_permission_by_id")
@swag_from({
    'tags': ['Permissions'],
    'parameters': [
        {
            'name': 'permission_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'The ID of the permission to retrieve'
        }
    ],
    'responses': {
        200: {'description': 'Permission found'},
        404: {'description': 'Permission not found'}
    }
})
def get_permission_by_id(permission_id):
    try:
        permission = PermissionService.get_permission_by_id(permission_id)
        if not permission:
            return jsonify({"status": "error", "message": "Permission not found"}), 404
        return jsonify({"status": "success", "data": permission}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@api_v1_bp.route("/permissions", methods=["POST"], endpoint="create_permission")
@swag_from({
    'tags': ['Permissions'],
    'parameters': [{
        'name': 'body', 'in': 'body',
        'schema': {
            'type': 'object',
            'required': ['name'],
            'properties': {'name': {'type': 'string'}}
        }
    }],
    'responses': {
        201: {'description': 'Permission created'},
        400: {'description': 'Missing fields'}
    }
})
def create_permission():
    try:
        data = request.get_json()

        if not data or 'name' not in data:
            return jsonify({"status": "error", "message": "Missing required field: name"}), 400

        name = data['name']
        description = data.get('description')  # optional field

        permission = PermissionService.create_permission(name, description)

        return jsonify({"status": "success", "data": permission}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/permissions/<int:permission_id>", methods=["PUT"], endpoint="update_permission")
@swag_from({
    'tags': ['Permissions'],
    'parameters': [
        {'name': 'permission_id', 'in': 'path', 'type': 'integer', 'required': True},
        {'name': 'body', 'in': 'body', 'schema': {'type': 'object', 'properties': {'name': {'type': 'string'}}}}
    ],
    'responses': {200: {'description': 'Permission updated'}, 404: {'description': 'Permission not found'}}
})
def update_permission(permission_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No input data provided"}), 400
        permission = PermissionService.update_permission(permission_id, **data)
        if not permission:
            return jsonify({"status": "error", "message": "Permission not found"}), 404
        return jsonify({"status": "success", "data": permission}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/permissions/<int:permission_id>", methods=["DELETE"], endpoint="delete_permission")
@swag_from({
    'tags': ['Permissions'],
    'parameters': [{'name': 'permission_id', 'in': 'path', 'type': 'integer', 'required': True}],
    'responses': {200: {'description': 'Permission deleted'}, 404: {'description': 'Permission not found'}}
})
def delete_permission(permission_id):
    try:
        result = PermissionService.delete_permission(permission_id)
        if not result:
            return jsonify({"status": "error", "message": "Permission not found"}), 404
        return jsonify({"status": "success", "message": "Permission deleted"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
