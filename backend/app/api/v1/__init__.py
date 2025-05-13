from flask import Blueprint

api_v1_bp = Blueprint("api_v1", __name__)

# Import your route modules to register them
from app.api.v1 import users  # This ensures the routes in users.py get registered
from app.api.v1 import auth  # This ensures the routes in auth.py get registered
from app.api.v1 import role_routes  # This ensures the routes in role_routes.py get registered
from app.api.v1 import permission_routes  # This ensures the routes in permission_routes.py get registered
from app.api.v1 import user_roles # This ensures the routes in user_roles.py get registered
from app.api.v1 import role_permissions # This ensures the routes in role_permissions.py get registered
from app.api.v1 import endpoint_permission_route
