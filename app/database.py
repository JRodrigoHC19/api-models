from pymongo import MongoClient
import os

MONGO_URL = os.environ.get('MONGO_URI', default='URI NOT FOUND')

cont = MongoClient(MONGO_URL)
client = cont["tecsup"]