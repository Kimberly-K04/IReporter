from server.models.user.user import User
from server.app import create_app
from sqlalchemy_serializer import SerializerMixin
from server.config import db

class TestUser:
    
    def test_instance(self):
        user=User()
        assert isinstance(user,User)
    
    def test_has_attri(self):
        user=User(
            username='Jack Black',
            email='jackblack@gmail.com',
            password_hash='jackblack123',
        )
        assert user.id is None
        assert user.username=='Jack Black'
        assert user.email=='jackblack@gmail.com'
        assert user.password_hash=='jackblack123'
        
    def test_inheritance(self):
        user=User()
        assert isinstance(user, SerializerMixin)
        assert isinstance(user, db.Model)
    
    def test_to_dict(self):
        user=User(
            username='Jack Black',
            email='jackblack@gmail.com',
            password_hash='jackblack123',
        )
        assert isinstance(user.to_dict(), dict)