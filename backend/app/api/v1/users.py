from flask import request, jsonify
from app.api.v1 import api_v1_bp
from app.services.user_service import UserService
from flasgger import swag_from

# User endpoints

@api_v1_bp.route("/users", methods=["GET"], endpoint="get_users")
@swag_from({
    'tags': ['Users'],
    'responses': {
        200: {
            'description': 'List all users',
            'examples': {
                'application/json': {
                    "status": "success",
                    "data": []
                }
            }
        }
    }
})

def get_users():
    """Get all users endpoint."""
    try:
        users = UserService.get_all_users()
        return jsonify({"status": "success", "data": users}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/users/<int:user_id>", methods=["GET"], endpoint="get_user")
@swag_from({
    'tags': ['Users'],
    'parameters': [
        {
            'name': 'user_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the user'
        }
    ],
    'responses': {
        200: {
            'description': 'Get specific user'
        },
        404: {
            'description': 'User not found'
        }
    }
})

def get_user(user_id):
    """Get a specific user endpoint."""
    try:
        user = UserService.get_user_by_id(user_id)
        if not user:
            return jsonify({"status": "error", "message": "User not found"}), 404
        return jsonify({"status": "success", "data": user}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/users", methods=["POST"], endpoint="create_user")
@swag_from({
    'tags': ['Users'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'required': ['username', 'email', 'password'],
                'properties': {
                    'username': {'type': 'string'},
                    'email': {'type': 'string'},
                    'password': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        201: {
            'description': 'User created'
        },
        400: {
            'description': 'Missing fields'
        }
    }
})

def create_user():
    """Create user endpoint."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No input data provided"}), 400
        
        required_fields = ["username", "email", "password"]
        for field in required_fields:
            if field not in data:
                return jsonify({"status": "error", "message": f"Missing required field: {field}"}), 400
        
        user = UserService.create_user(
            username=data["username"],
            email=data["email"],
            password=data["password"]
        )
        
        return jsonify({"status": "success", "data": user}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/users/<int:user_id>", methods=["PUT"], endpoint="update_user")
@swag_from({
    'tags': ['Users'],
    'parameters': [
        {
            'name': 'user_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the user to update'
        },
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {'type': 'string'},
                    'email': {'type': 'string'},
                    'password': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'User updated'
        },
        404: {
            'description': 'User not found'
        }
    }
})
def update_user(user_id):
    """Update user endpoint."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No input data provided"}), 400
        
        user = UserService.update_user(user_id, **data)
        if not user:
            return jsonify({"status": "error", "message": "User not found"}), 404
        
        return jsonify({"status": "success", "data": user}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@api_v1_bp.route("/users/<int:user_id>", methods=["DELETE"], endpoint="delete_user")
@swag_from({
    'tags': ['Users'],
    'parameters': [
        {
            'name': 'user_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the user to delete'
        }
    ],
    'responses': {
        200: {
            'description': 'User deleted'
        },
        404: {
            'description': 'User not found'
        }
    }
})
def delete_user(user_id):
    """Delete user endpoint."""
    try:
        result = UserService.delete_user(user_id)
        if not result:
            return jsonify({"status": "error", "message": "User not found"}), 404
        
        return jsonify({"status": "success", "message": "User deleted"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
