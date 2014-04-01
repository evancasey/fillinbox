from flask import Flask, request, redirect, render_template, session, url_for, jsonify
from app import app

@app.route('/',methods=['GET'])
def index():
    return render_template('index.html')