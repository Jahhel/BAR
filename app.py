from flask import Flask, render_template

app = Flask(__name__)
@app.route('/')
def index():
    return render_template("startseite.html")

@app.route('/rezepte')
def rezepte():
    rezepte = ["Whisky Sour", "Classic Bishop", "French 75", "Red Snapper", "Gunpowder"]
    return render_template("rezeptliste.html", rezepte=rezepte)

@app.route('/rezept_eingabe')
def eingabe():
    ingredients = ["Whisky", "Vodka", "Lime Juice", "Lemon Juice", "Sirup (simple)", "Maple Sirup"]
    unit = ["ml", "pieces", "dash", "g", "fluid ounze"]
    return render_template("rezept_eingabe.html", ingredients = ingredients, unit = unit)
