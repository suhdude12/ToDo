from flask import Flask 
from flask_sqlalchemy import SQLAlchemy 
import os 

file_path = os.path.abspath(os.getcwd()) + "/todo.db"

app = Flask(__name__) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + file_path 
db = SQLAlchemy(app) 

# Import the models to create the tables
from app import routes, models

# Create the database tables
with app.app_context():
    db.create_all()