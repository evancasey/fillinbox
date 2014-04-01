from datetime import datetime
from app import db

class User(db.DynamicDocument):

    email = db.StringField()
    shares = db.IntField()
    timestamp = db.DateTimeField(default=datetime.now())
