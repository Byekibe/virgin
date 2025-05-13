from flask import request, jsonify
from app.api.v1 import api_v1_bp
from app.services.endpoint_permission_service import EndpointPermissionService
from flasgger import swag_from

# ---- EndpointPermission Endpoints ----

@api_v1_bp.route("/endpoint-permissions", methods=["GET"], endpoint="get_endpoint_permissions")
@swag_from({'tags': ['Endpoint Permissions'], 'responses': {200: {'description': 'List all endpoint permissions'}}})
def get_endpoint_permissions():
    try:
        endpoint_permissions = EndpointPermissionService.get_all_endpoint_permissions()
        return jsonify({"status": "success", "data": endpoint_permissions}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/endpoint-permissions", methods=["POST"], endpoint="create_endpoint_permission")
@swag_from({
    'tags': ['Endpoint Permissions'],
    'parameters': [{
        'name': 'body', 'in': 'body',
        'schema': {
            'type': 'object',
            'required': ['endpoint_name', 'permission_id'],
            'properties': {
                'endpoint_name': {'type': 'string'},
                'permission_id': {'type': 'integer'}
            }
        }
    }],
    'responses': {
        201: {'description': 'Endpoint permission created'},
        400: {'description': 'Missing fields or invalid permission_id'}
    }
})
def create_endpoint_permission():
    try:
        data = request.get_json()

        if not data or 'endpoint_name' not in data or 'permission_id' not in data:
            return jsonify({"status": "error", "message": "Missing required fields: endpoint_name and permission_id"}), 400

        endpoint_name = data['endpoint_name']
        permission_id = data['permission_id']

        endpoint_permission = EndpointPermissionService.create_endpoint_permission(endpoint_name, permission_id)
        if endpoint_permission is None:
            return jsonify({"status": "error", "message": "Invalid permission_id"}), 400

        return jsonify({"status": "success", "data": endpoint_permission}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/endpoint-permissions/<int:endpoint_permission_id>", methods=["PUT"], endpoint="update_endpoint_permission")
@swag_from({
    'tags': ['Endpoint Permissions'],
    'parameters': [
        {'name': 'endpoint_permission_id', 'in': 'path', 'type': 'integer', 'required': True},
        {'name': 'body', 'in': 'body', 'schema': {
            'type': 'object',
            'properties': {
                'endpoint_name': {'type': 'string'},
                'permission_id': {'type': 'integer'}
            }
        }}
    ],
    'responses': {200: {'description': 'Endpoint permission updated'}, 404: {'description': 'Endpoint permission not found'}}
})
def update_endpoint_permission(endpoint_permission_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No input data provided"}), 400

        endpoint_permission = EndpointPermissionService.update_endpoint_permission(endpoint_permission_id, **data)
        if not endpoint_permission:
            return jsonify({"status": "error", "message": "Endpoint permission not found"}), 404

        return jsonify({"status": "success", "data": endpoint_permission}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/endpoint-permissions/<int:endpoint_permission_id>", methods=["DELETE"], endpoint="delete_endpoint_permission")
@swag_from({
    'tags': ['Endpoint Permissions'],
    'parameters': [{'name': 'endpoint_permission_id', 'in': 'path', 'type': 'integer', 'required': True}],
    'responses': {200: {'description': 'Endpoint permission deleted'}, 404: {'description': 'Endpoint permission not found'}}
})
def delete_endpoint_permission(endpoint_permission_id):
    try:
        result = EndpointPermissionService.delete_endpoint_permission(endpoint_permission_id)
        if not result:
            return jsonify({"status": "error", "message": "Endpoint permission not found"}), 404
        return jsonify({"status": "success", "message": "Endpoint permission deleted"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
