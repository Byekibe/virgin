from sqlalchemy.exc import SQLAlchemyError
from app.extensions import db
from app.models.user import User
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash # Import the hashing function

class UserService:
    """Service class for user operations"""
    
    @staticmethod
    def get_all_users():
        """Get all users."""
        try:
            # Example of raw SQL query with mappings
            users = db.session.execute(text("SELECT * FROM users")).mappings().all()
            return [dict(user) for user in users]
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    
    @staticmethod
    def get_user_by_id(user_id):
        """Get user by ID."""
        try:
            # Example using ORM
            user = User.query.get(user_id)
            return user.to_dict() if user else None
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def create_user(username, email, password):
        """Create a new user with a hashed password."""
        try:
            # Hash the plain text password using Werkzeug's generate_password_hash
            # We are using a common method here, Werkzeug supports different algorithms
            hashed_password = generate_password_hash(password)

            # Example using ORM (assuming User model has a password_hash field)
            user = User(
                username=username,
                email=email,
                password_hash=hashed_password # Store the hashed password
            )
            db.session.add(user)
            db.session.commit()
            # Assuming to_dict() is a method on your User model to return a dictionary representation
            return user.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            # It's good practice to log the error here
            print(f"Error creating user: {e}")
            raise e
    
    @staticmethod
    def update_user(user_id, **kwargs):
        """Update user data."""
        try:
            user = User.query.get(user_id)
            if not user:
                return None
            
            for key, value in kwargs.items():
                if hasattr(user, key):
                    setattr(user, key, value)
            
            db.session.commit()
            return user.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def delete_user(user_id):
        """Delete a user."""
        try:
            user = User.query.get(user_id)
            if not user:
                return False
            
            db.session.delete(user)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e