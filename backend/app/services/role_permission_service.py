from sqlalchemy.exc import SQLAlchemyError
from app.extensions import db
from app.models.rbac import RolePermission

class RolePermissionService:
    """Service class for role-permission assignments"""

    @staticmethod
    def assign_permission_to_role(role_id, permission_id):
        try:
            role_perm = RolePermission(role_id=role_id, permission_id=permission_id)
            db.session.add(role_perm)
            db.session.commit()
            return {
                "id": role_perm.id,
                "role_id": role_perm.role_id,
                "permission_id": role_perm.permission_id
            }
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def remove_permission_from_role(role_id, permission_id):
        try:
            role_perm = RolePermission.query.filter_by(role_id=role_id, permission_id=permission_id).first()
            if not role_perm:
                return False

            db.session.delete(role_perm)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def get_permissions_by_role(role_id):
        try:
            role_perms = RolePermission.query.filter_by(role_id=role_id).all()
            return [{"permission_id": rp.permission_id} for rp in role_perms]
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e
        
    @staticmethod
    def get_all_role_permissions():
        """Retrieve all role-permission assignments"""
        try:
            role_perms = RolePermission.query.all()
            return [
                {
                    "id": rp.id,
                    "role_id": rp.role_id,
                    "permission_id": rp.permission_id
                }
                for rp in role_perms
            ]
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e
        

