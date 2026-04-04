from ....routes.create_blueprint import api_v1
from .image_routes import *


api_v1.add_resource(
    ImageResource,
    '/records/me/<int:id>',
    endpoint='/images/<int:id>',
)

