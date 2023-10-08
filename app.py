from flask import Flask, render_template, request
from flask import jsonify
import json
import requests

app = Flask(__name__)

data_file = open('data.json')
data = json.load(data_file)

footer_message = data['footer_message'][0]['_message']
copyright_message = data['copyright_message'][0]['_message']

@app.route("/")
def index():
    display_tags = data["display_tags"]
    ftag = ''
    for tag in display_tags:
        ftag += tag['_title'] + ','
    ftag = ftag[:-1]
    return render_template("index.html", display_tags=ftag, _footer_msg=footer_message, _copyright_msg=copyright_message)

@app.route("/experience/<id>")
def experience(id):
    experiences = data['experiences']
    experiences = [experiences[i] for i in range(len(experiences)) if experiences[i]["_id"] == id][0]
    return render_template("experience.html", experience_info=experiences, _footer_msg=footer_message, _copyright_msg=copyright_message)

@app.route("/project/<id>")
def project(id):
    projects = data['all_projects']
    projects = [projects[i] for i in range(len(projects)) if projects[i]["_id"] == id][0]
    return render_template("project.html", project_info=projects, _footer_msg=footer_message, _copyright_msg=copyright_message)

@app.route("/certificates")
def certificates():
    certificates = data['certificates']
    return render_template("certificates.html", _certificates=certificates, _footer_msg=footer_message, _copyright_msg=copyright_message)

@app.route("/projects")
def projects():
    projects = data['all_projects']
    return render_template("projects.html", _projects=projects, _footer_msg=footer_message, _copyright_msg=copyright_message)

@app.route("/get_certificates")
def get_certificates():
    certificates = data['certificates']
    return jsonify(certificates)

@app.route("/api/get_display_messages", methods=['GET'])
def get_display_tags():
    display_messages = data['display_message']
    return jsonify(display_messages[0]['_message'])

@app.route("/api/get_experiences", methods=['GET'])
def get_experiences():
    experiences = data['experiences']
    return jsonify(experiences)

@app.route("/api/get_educationDetails", methods=['GET'])
def get_educationDetails():
    educations = data['education']
    return jsonify(educations)

@app.route("/api/get_mainProjects", methods=['GET'])
def get_mainProjects():
    projects = data['main_projects']
    return jsonify(projects)

@app.route("/api/messsage_recieved", methods=['POST'])
def get_msg():
    message = "name - " + request.form.get('_name') + '\nemail - ' + request.form.get('_email') + '\n\n' + request.form.get('_comment')
    requests.post(
		"https://api.mailgun.net/v3/sandboxdc6e622c808a495d8771998950d967fd.mailgun.org/messages",
		auth=("api", "b051da82ef10eaaacf1a2568eec015c4-77316142-8248c3d0"),
		data={"from": "mailgun@sandboxdc6e622c808a495d8771998950d967fd.mailgun.org",
			"to": ["jawaharsainathani@gmail.com"],
			"subject": request.form.get('_subject'),
			"text": message})
    return jsonify({'message': "Message Recieved"})

if __name__ == "__main__":
    app.run(debug=False)