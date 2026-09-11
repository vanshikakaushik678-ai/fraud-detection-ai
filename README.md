# 🤖 AI Fraud Detection System

An AI-powered fraud detection web application that analyzes financial transactions using Machine Learning and provides real-time fraud risk assessment.

The system also supports OCR-based payment screenshot scanning to extract transaction information and evaluate suspicious activity.

---

## ✨ Features

- 🔐 Login & Signup interface
- 💳 Transaction fraud detection
- 🤖 Machine Learning based fraud prediction
- 📊 Fraud risk score / probability
- 📸 Payment screenshot scanning using OCR
- 🔎 Automatic transaction amount extraction
- 📈 Fraud analytics dashboard
- 🧾 Transaction history
- 🌍 Fraud location visualization
- 🌙 Light/Dark mode
- 💻 Responsive web interface
- 🚨 Anomaly detection using Isolation Forest

---

## 🖥️ Screenshots

### Dashboard

![Fraud Detection Dashboard](screenshots/dashboard.png)

### Transaction Analysis

![Transaction Analysis](screenshots/transaction-analysis.png)

### Payment Screenshot Scanner

![Payment Screenshot Scanner](screenshots/payment-scanner.png)

### Payment Page

![Payment Page](screenshots/payment.png)

> Add your screenshots inside the `screenshots` folder with the filenames mentioned above.

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js
- Leaflet.js

### Backend

- Python
- Flask
- Flask-CORS

### Machine Learning

- Scikit-learn
- Random Forest Classifier
- Isolation Forest
- Pandas
- NumPy
- Joblib

### OCR & Image Processing

- Tesseract OCR
- Pytesseract
- OpenCV

---

## 📁 Project Structure

```text
fraud-detection-ai/
│
├── backend/
│   ├── app.py
│   ├── model.py
│   └── fraud.csv
│
├── frontend/
│   ├── index.html
│   ├── payment.html
│   ├── signup.html
│   ├── script.js
│   └── style.css
│
├── fraud_model.pkl
├── anomaly_model.pkl
├── requirements.txt
├── .gitignore
└── README.md
