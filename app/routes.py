from flask import Blueprint, render_template

main = Blueprint("main", __name__)


@main.route("/")
def home():
    return render_template("home.html")


@main.route("/choose-style")
def choose_style():
    return render_template("choose-style.html")


@main.route("/home/female")
def female_home():
    return render_template("female-home.html")


@main.route("/home/male")
def male_home():
    return render_template("male-home.html")