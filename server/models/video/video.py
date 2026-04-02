from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from ...config import db 


class Video(db.Model, serialize_mixin):
    pass