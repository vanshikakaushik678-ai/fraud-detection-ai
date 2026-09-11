import pandas as pd
from sklearn.ensemble import RandomForestClassifier, IsolationForest
from sklearn.model_selection import train_test_split
import joblib

data = pd.read_csv("backend/fraud.csv")

X = data.drop("Class", axis=1)
y = data["Class"]

# Supervised model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

rf_model = RandomForestClassifier()
rf_model.fit(X_train, y_train)

# Anomaly detection model
anomaly_model = IsolationForest(contamination=0.01)
anomaly_model.fit(X)

joblib.dump(rf_model, "fraud_model.pkl")
joblib.dump(anomaly_model, "anomaly_model.pkl")

print("Models trained successfully")