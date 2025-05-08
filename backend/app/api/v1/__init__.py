from flask import Blueprint

api_v1_bp = Blueprint("api_v1", __name__)

# Import your route modules to register them
from app.api.v1 import users  # This ensures the routes in users.py get registered
from app.api.v1 import auth  # This ensures the routes in auth.py get registered
