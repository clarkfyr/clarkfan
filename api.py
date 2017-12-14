"""
webserver.py

File that is the central location of code for your webserver.
"""
import requests
import os
from flask import Flask, render_template, request, flash


# Create application, and point static path (where static resources like images, css, and js files are stored) to the
# "static folder"
app = Flask(__name__, static_url_path="/static")


@app.route('/')
def hello_world():
    """
    If someone goes to the root of your website (i.e. http://localhost:5000/), run this function. The string that this
    returns will be sent to the browser
    """
    return render_template("index.html")  # Render the template located in "templates/index.html"


@app.route('/index')
def index():
    return render_template("index.html")


@app.route('/about')
def about():
    return render_template("about_me.html")


@app.route('/contact', methods=["GET"])
def contact():
    return render_template("contact_me.html")


@app.route('/contact', methods=["POST"])
def send_email():
    name = request.form["Name"]
    email = request.form["Email"]
    subject = request.form["Subject"]
    message = request.form["Message"]
    # print("Name: " + name + "\n" + "Email: " + email + "\n" +
    #       "Subject: " + subject + "\n" + "Message: " + message)
    notifications = []
    data = {
        'from': os.environ["INFO253_MAILGUN_FROM_EMAIL"],
        'to': os.environ["INFO253_MAILGUN_TO_EMAIL"],
        'subject': "You just was sent a message",
        'text': "Name: " + name + "\n" + "Email: " + email + "\n" + "Subject: " + subject + "\n" + "Message: " + message
    }
    auth = (os.environ["INFO253_MAILGUN_USER"],
            os.environ["INFO253_MAILGUN_PASSWORD"])
    r = requests.post(
        'https://api.mailgun.net/v3/{}/messages'.format(
            os.environ["INFO253_MAILGUN_DOMAIN"]),
        auth=auth,
        data=data)
    if r.status_code == requests.codes.ok:
        notifications.append("Hi " + name + ", your message has been sent")
    else:
        notifications.append("You email was not sent. Please try again later")
    # print(r.status_code, notifications)
    return render_template("contact_me.html", notifications=notifications)


@app.route('/blog/<name>')
# http://flask.pocoo.org/docs/0.12/quickstart/
def blog(name=None):
    data = requests.get("http://localhost:5001/blog?slug=" + name).json()
    return render_template('blog.html', title=data["title"], content=data["content"])


@app.route('/admin', methods=["GET"])
def admin():
    return render_template("admin.html")


@app.route('/admin', methods=["POST"])
def create_blog():
    slug = request.form["Slug"]
    title = request.form["Title"]
    content = request.form["Content"]
    notifications = []
    data = {
        "slug": slug,
        "title": title,
        "content": content
    }
    # print(data)
    headers = {"Content-Type": "application/json"}
    r = requests.post(
        'http://localhost:5001/blog', json=data, headers=headers)
    if r.status_code == requests.codes.ok:
        notifications.append("Your blog has been created")
    else:
        notifications.append(
            "You blog was not created. Please try again later")
    # print(r.status_code, notifications)
    return render_template("admin.html", notifications=notifications)


# @app.route('/blog/8-experiments-in-motivation')
# def blog1():
#     return render_template("blog1.html")
#
#
# @app.route('/blog/a-mindful-shift-of-focus')
# def blog2():
#     return render_template("blog2.html")
#
#
# @app.route('/blog/how-to-develop-an-awesome-sense-of-direction')
# def blog3():
#     return render_template("blog3.html")
#
#
# @app.route('/blog/training-to-be-a-good-writer')
# def blog4():
#     return render_template("blog4.html")
#
#
# @app.route('/blog/what-productivity-systems-wont-solve')
# def blog5():
#     return render_template("blog5.html")
