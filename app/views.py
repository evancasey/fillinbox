from flask import Flask, request, redirect, render_template, session, url_for, jsonify
from app import app
from models import create_user
from wtforms import Form, BooleanField, TextField, validators, ValidationError
import pdb

@app.route('/',methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/create',methods=['POST'])
def create():
    if request.method == "POST":
        data = request.form
        try:
            create_user(data["email"])
        except ValidationError, e:
            errors_dict = {}
            errors_dict['errors'] = e.message
            return jsonify(errors_dict)            

        return jsonify(data)