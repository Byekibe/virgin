from datetime import datetime
from app.extensions import db

class EndpointPermission(db.Model):
    """Mapping between API endpoints and required permissions."""
    __tablename__ = "endpoint_permissions"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    endpoint_name = db.Column(db.String(100), unique=True, nullable=False, index=True)
    permission_id = db.Column(db.Integer, db.ForeignKey('permissions.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False)

    permission = db.relationship('Permission', backref=db.backref('endpoint_permissions', lazy='dynamic'))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<EndpointPermission endpoint='{self.endpoint_name}' permission='{self.permission.name}'>"

    def to_dict(self):
        return {
            "id": self.id,
            "endpoint_name": self.endpoint_name,
            "permission_id": self.permission_id,
            "permission_name": self.permission.name,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
