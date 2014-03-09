from mongoengine import *
from google import search

connect('fillinbox', host='mongodb://fillinbox:westside@ds033579.mongolab.com:33579/fillinbox')

class Link(DynamicDocument):
    url = StringField(required=True)

for url in search('newsletter signup',stop=10000):
    new_link = Link()
    new_link.url = url
    new_link.save()
    print url
