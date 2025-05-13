from flask import Flask, g
from app.extensions import db, cors, swagger
from config import config
from sqlalchemy.exc import InvalidRequestError
from flask_migrate import Migrate

migrate = Migrate()

def create_app(config_name="default"):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Set Swagger config BEFORE init_app
    app.config["SWAGGER"] = {
        "headers": [],
        "specs": [
            {
                "endpoint": 'apispec_1',
                "route": '/apispec_1.json',
                "rule_filter": lambda rule: True,  # include all routes
                "model_filter": lambda tag: True,  # include all models
            }
        ],
        "swagger_ui": True,
        "specs_route": "/apidocs/"
    }

    # Initialize CORS
    cors.init_app(app, supports_credentials=True)

    # Register extensions (db, swagger, etc)
    register_extensions(app)

    # before_request hook
    @app.before_request
    def detect_db_dialect():
        try:
            bind = db.session.get_bind()
            if bind:
                g.db_dialect = bind.dialect.name
            else:
                g.db_dialect = None
        except InvalidRequestError:
            g.db_dialect = None

    # Register blueprints
    register_blueprints(app)

    return app

def register_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)
    swagger.init_app(app)

    if not app.config["DEBUG"]:
        with app.app_context():
            db.create_all()

def register_blueprints(app):
    from app.api import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")
