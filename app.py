import os
from flask import Flask, render_template, request
import urllib
from flask import jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId


app = Flask(__name__)

username = urllib.parse.quote_plus('gamemaster')
password = urllib.parse.quote_plus('Kuhu2@way')
client = MongoClient("mongodb://%s:%s@cluster0-shard-00-00.s6zrk.mongodb.net:27017,cluster0-shard-00-01.s6zrk.mongodb.net:27017,cluster0-shard-00-02.s6zrk.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-hzo655-shard-0&authSource=admin&retryWrites=true&w=majority" % (username, password))
db = client.get_database('profile_db')

footer_message = list(db.footer_message.find({}))[0]['_message']
copyright_message = list(db.copyright_message.find({}))[0]['_message']

@app.route("/")
def index():
    display_tags = list(db.display_tags.find({}))
    ftag = ''
    for tag in display_tags:
        ftag += tag['_title'] + ','
    ftag = ftag[:-1]
    return render_template("index.html", display_tags=ftag, _footer_msg=footer_message, _copyright_msg=copyright_message)

@app.route("/experience/<id>")
def experience(id):
    experiences = list(db.experiences.find({'_id':ObjectId(id)}))
    experiences = experiences[0]
    return render_template("experience.html", experience_info=experiences, _footer_msg=footer_message, _copyright_msg=copyright_message)

@app.route("/project/<id>")
def project(id):
    projects = list(db.all_projects.find({'_id':ObjectId(id)}))
    projects = projects[0]
    print(projects["_tech"])
    return render_template("project.html", project_info=projects, _footer_msg=footer_message, _copyright_msg=copyright_message)

@app.route("/certificates")
def certificates():
    certificates = list(db.certificates.find({}))
    for certificate in certificates:
        certificate['_id'] = str(certificate['_id'])
    return render_template("certificates.html", _certificates=certificates, _footer_msg=footer_message, _copyright_msg=copyright_message)

@app.route("/projects")
def projects():
    projects = list(db.all_projects.find({}))
    for project in projects:
        project['_id'] = str(project['_id'])
    return render_template("projects.html", _projects=projects, _footer_msg=footer_message, _copyright_msg=copyright_message)

@app.route("/get_certificates")
def get_certificates():
    certificates = list(db.certificates.find({}))
    for certificate in certificates:
        certificate['_id'] = str(certificate['_id'])
    return jsonify(certificate)

@app.route("/api/get_display_messages", methods=['GET'])
def get_display_tags():
    display_messages = list(db.display_message.find({}))
    return jsonify(display_messages[0]['_message'])

@app.route("/api/get_experiences", methods=['GET'])
def get_experiences():
    experiences = list(db.experiences.find({}))
    for experience in experiences:
        experience['_id'] = str(experience['_id'])
    return jsonify(experiences)

@app.route("/api/get_educationDetails", methods=['GET'])
def get_educationDetails():
    educations = list(db.education.find({}))
    for education in educations:
        education['_id'] = str(education['_id'])
    return jsonify(educations)

@app.route("/api/get_mainProjects", methods=['GET'])
def get_mainProjects():
    projects = list(db.main_projects.find({}))
    for project in projects:
        project['_id'] = str(project['_id'])
    return jsonify(projects)

@app.route("/api/messsage_recieved", methods=['POST'])
def get_msg():
    db.messages.insert_one({'_name': request.form.get('_name'), '_email': request.form.get('_email'), '_subject': request.form.get('_subject'), '_comment': request.form.get('_comment')})
    return jsonify({'message': "Message Recieved"})

if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0")