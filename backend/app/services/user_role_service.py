from sqlalchemy.exc import SQLAlchemyError
from app.extensions import db
from app.models.rbac import UserRole

class UserRoleService:
    """Service class for user-role assignments"""

    @staticmethod
    def get_all_user_roles():
        """Retrieve all user-role assignments"""
        try:
            user_roles = UserRole.query.all()
            return [
                {
                    "id": ur.id,
                    "user_id": ur.user_id,
                    "role_id": ur.role_id
                }
                for ur in user_roles
            ]
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e


    @staticmethod
    def assign_role_to_user(user_id, role_id):
        try:
            user_role = UserRole(user_id=user_id, role_id=role_id)
            db.session.add(user_role)
            db.session.commit()
            return {
                "id": user_role.id,
                "user_id": user_role.user_id,
                "role_id": user_role.role_id
            }
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def remove_role_from_user(user_id, role_id):
        try:
            user_role = UserRole.query.filter_by(user_id=user_id, role_id=role_id).first()
            if not user_role:
                return False

            db.session.delete(user_role)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def get_roles_by_user(user_id):
        try:
            user_roles = UserRole.query.filter_by(user_id=user_id).all()
            return [{"role_id": ur.role_id} for ur in user_roles]
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e
