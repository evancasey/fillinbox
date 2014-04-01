from flask import Flask, request, redirect, render_template, session, url_for, jsonify
from app import app
from models import create_user
import pdb

@app.route('/',methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/create',methods=['POST'])
def create():
    if request.method == "POST":
        data = request.form
        create_user(data["email"])
        return jsonify(data)