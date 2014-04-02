from datetime import datetime
from app import db

class User(db.DynamicDocument):

    email = db.StringField()
    shares = db.IntField()
    timestamp = db.DateTimeField(default=datetime.now())


def create_user(email,shares=0):
  user = User()
  user.email = email
  user.shares = shares
  user.save()
