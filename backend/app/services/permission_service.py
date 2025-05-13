from sqlalchemy.exc import SQLAlchemyError
from app.extensions import db
from app.models.rbac import Permission

class PermissionService:
    """Service class for permission operations"""

    @staticmethod
    def get_all_permissions():
        try:
            permissions = Permission.query.all()
            return [perm.to_dict() for perm in permissions]
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def get_permission_by_id(permission_id):
        try:
            permission = Permission.query.get(permission_id)
            return permission.to_dict() if permission else None
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def create_permission(name, description=None):
        try:
            permission = Permission(name=name, description=description)
            db.session.add(permission)
            db.session.commit()
            return permission.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def update_permission(permission_id, **kwargs):
        try:
            permission = Permission.query.get(permission_id)
            if not permission:
                return None

            for key, value in kwargs.items():
                if hasattr(permission, key):
                    setattr(permission, key, value)

            db.session.commit()
            return permission.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def delete_permission(permission_id):
        try:
            permission = Permission.query.get(permission_id)
            if not permission:
                return False

            db.session.delete(permission)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e
