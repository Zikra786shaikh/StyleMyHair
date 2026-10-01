from flask import Blueprint, render_template, request, url_for
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

    style = request.args.get(
        "style",
        "Hairstyle"
    )

    style_images = {
        "long-layers": "images/female-long-layers-1.jpg",
        "modern-bob": "images/female-modern-bob-1.jpg",
        "soft-waves": "images/female-soft-waves-1.jpg",
        "defined-curls": "images/female-defined-curls-1.jpg",
        "elegant-braids": "images/female-braids-1.jpg",
        "classic-updo": "images/female-classic-updo-1.jpg"
    }

    image = style_images.get(
        style,
        ""
    )

    return render_template(
        "styleme.html",
        selected_style=style,
        selected_image=url_for(
            "static",
            filename=image
        ) if image else ""
    )
@main.route("/male")
def male():
    return render_template("male.html")

@main.route("/hairstyles")
def hairstyles():
    return render_template("hairstyles.html")
@main.route("/styleme")
def styleme():
    selected_style = request.args.get(
        "style",
        "Hairstyle"
    )

    selected_image = request.args.get(
        "image",
        ""
    )

    return render_template(
        "styleme.html",
        selected_style=selected_style,
        selected_image=selected_image
    )
@main.route("/haircuts")
def haircuts():
    return render_template("haircuts.html")

@main.route("/male/haircuts")
def male_haircuts():
    return render_template("male_haircuts.html")
@main.route("/female/hairstyle")
def female_hairstyles():
    return render_template("female_hairstyle.html")
