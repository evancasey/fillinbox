from datetime import datetime
from wtforms import Form, BooleanField, TextField, validators, ValidationError
from app import db

class User(db.DynamicDocument):

    email = db.StringField()
    shares = db.IntField()
    timestamp = db.DateTimeField(default=datetime.now())


def create_user(email,shares=0):
    if not user_exists(email):
        user = User()
        user.email = email
        user.shares = shares
        user.save()

def user_exists(email):
    if not User.objects(email=email):
        return False
    else:
        raise ValidationError(email + ' has already been signed up for InboxNuke!')