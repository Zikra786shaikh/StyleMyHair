from flask import Blueprint, render_template

main = Blueprint("main", __name__)


@main.route("/")
def home():
    return render_template("home.html")


@main.route("/choose-style")
def choose_style():
    return render_template("choose-style.html")

@main.route("/female")
def female():
    return render_template("female.html")
@main.route("/female/try-on")
def female_try_on():
    return render_template("female_try_on.html")
@main.route("/male")
def male():
    return render_template("male.html")