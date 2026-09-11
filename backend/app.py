from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
import cv2
import numpy as np
import joblib
import re

app = Flask(__name__)
CORS(app)

# Load trained fraud model
model = joblib.load("fraud_model.pkl")

# Tesseract OCR path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


# -----------------------------
# TRANSACTION FRAUD PREDICTION
# -----------------------------
from flask import Flask, request, jsonify,render_template
app = Flask(__name__, static_folder='static', template_folder='templates')
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    amount = float(data["amount"])
    time = float(data["time"])
    device = float(data["device"])
    location = float(data["location"])

    # Model expects 30 features → add remaining as 0
    features = [[
        amount, time, device, location,
        0,0,0,0,0,0,
        0,0,0,0,0,0,
        0,0,0,0,0,0,
        0,0,0,0,0,0,
        0,0
    ]]

    prediction = model.predict(features)[0]
    risk_score = model.predict_proba(features)[0][1] * 100

    return jsonify({
        "prediction": int(prediction),
        "risk_score": round(risk_score, 2)
    })


# -----------------------------
# IMAGE FRAUD SCAN (OCR)
# -----------------------------

@app.route("/scan", methods=["POST"])
def scan():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"})

    file = request.files["image"]

    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    text = pytesseract.image_to_string(img)

    numbers = re.findall(r'\d+', text)

    amount = 0
    if numbers:
        amount = int(numbers[0])

    # Again send 30 features
    features = [[
        amount, 100, 1, 1,
        0,0,0,0,0,0,
        0,0,0,0,0,0,
        0,0,0,0,0,0,
        0,0,0,0,0,0,
        0,0
    ]]

    prediction = model.predict(features)[0]

    return jsonify({
        "detected_text": text,
        "amount_detected": amount,
        "prediction": int(prediction)
    })


# -----------------------------
# START SERVER
# -----------------------------

if __name__ == "__main__":
    app.run(debug=True)