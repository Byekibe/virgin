from sqlalchemy.exc import SQLAlchemyError
from app.extensions import db
from app.models.rbac import Role

class RoleService:
    """Service class for role operations"""

    @staticmethod
    def get_all_roles():
        try:
            roles = Role.query.all()
            return [role.to_dict() for role in roles]
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def get_role_by_id(role_id):
        try:
            role = Role.query.get(role_id)
            return role.to_dict() if role else None
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def create_role(name, description=None):
        try:
            role = Role(name=name, description=description)
            db.session.add(role)
            db.session.commit()
            return role.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def update_role(role_id, **kwargs):
        try:
            role = Role.query.get(role_id)
            if not role:
                return None

            for key, value in kwargs.items():
                if hasattr(role, key):
                    setattr(role, key, value)

            db.session.commit()
            return role.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def delete_role(role_id):
        try:
            role = Role.query.get(role_id)
            if not role:
                return False

            db.session.delete(role)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e
