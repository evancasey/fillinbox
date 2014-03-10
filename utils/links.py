from mongoengine import *
from google import search

connect('fillinbox', host='mongodb://fillinbox:westside@ds033579.mongolab.com:33579/fillinbox')

# mongo schema
class Link(DynamicDocument):
    query = StringField(required=True)
    url = StringField(required=True)

QUERY = 'newsletter signup'

for url in search(QUERY,stop=10000):
    # TODO: pause between each page to avoid 503 errors (Captcha)
    if not list(Link.objects(url=url)):
        new_link = Link()
        new_link.url = url
        new_link.query = QUERY
        new_link.save()
        print url