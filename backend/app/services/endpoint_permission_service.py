from sqlalchemy.exc import SQLAlchemyError
from app.extensions import db
from app.models.rbac import Permission
from app.models.endpoint_permission import EndpointPermission

class EndpointPermissionService:
    """Service class for endpoint permission operations"""

    @staticmethod
    def get_all_endpoint_permissions():
        try:
            endpoint_permissions = EndpointPermission.query.all()
            return [ep.to_dict() for ep in endpoint_permissions]
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def get_endpoint_permission_by_id(endpoint_permission_id):
        try:
            ep = EndpointPermission.query.get(endpoint_permission_id)
            return ep.to_dict() if ep else None
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def create_endpoint_permission(endpoint_name, permission_id):
        try:
            # Ensure the permission exists
            permission = Permission.query.get(permission_id)
            if not permission:
                return None  # You might later want to raise a custom exception here

            ep = EndpointPermission(endpoint_name=endpoint_name, permission_id=permission_id)
            db.session.add(ep)
            db.session.commit()
            return ep.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def update_endpoint_permission(endpoint_permission_id, **kwargs):
        try:
            ep = EndpointPermission.query.get(endpoint_permission_id)
            if not ep:
                return None

            for key, value in kwargs.items():
                if hasattr(ep, key):
                    setattr(ep, key, value)

            db.session.commit()
            return ep.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def delete_endpoint_permission(endpoint_permission_id):
        try:
            ep = EndpointPermission.query.get(endpoint_permission_id)
            if not ep:
                return False

            db.session.delete(ep)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e
