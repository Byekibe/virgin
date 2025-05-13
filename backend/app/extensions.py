from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flasgger import Swagger

cors = CORS()
db = SQLAlchemy()
swagger = Swagger(template={
    "swagger": "2.0",
    "info": {
        "title": "My Flask API",
        "description": "API documentation for my Flask project",
        "version": "1.0.0"
    },
    "basePath": "/api/v1"
})

