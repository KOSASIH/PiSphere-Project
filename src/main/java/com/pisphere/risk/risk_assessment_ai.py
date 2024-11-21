import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from typing import List, Dict, Any

class RiskAssessmentAI:
    def __init__(self):
        self.model = RandomForestClassifier()
        self.is_trained = False

    def train_model(self, data: pd.DataFrame, target: str):
        """Train the risk assessment model using historical data."""
        X = data.drop(columns=[target])
        y = data[target]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        self.is_trained = True

        print(f"Model trained with accuracy: {accuracy:.2f}")

    def assess_risk(self, input_data: Dict[str, Any]) -> str:
        """Assess risk based on input data."""
        if not self.is_trained:
            raise ValueError("Model is not trained yet.")

        input_df = pd.DataFrame([input_data])
        prediction = self.model.predict(input_df)
        risk_level = "High" if prediction[0] == 1 else "Low"
        print(f"Risk assessment result: {risk_level}")
        return risk_level

    def save_model(self, filename: str):
        """Save the trained model to a file."""
        import joblib
        joblib.dump(self.model, filename)
        print(f"Model saved to {filename}")

    def load_model(self, filename: str):
        """Load a trained model from a file."""
        import joblib
        self.model = joblib.load(filename)
        self.is_trained = True
        print(f"Model loaded from {filename}")
