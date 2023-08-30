from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  

# Load the trained model and scaler
model = joblib.load('trained_model.joblib')
scaler = joblib.load('scaler.joblib')

cors = CORS(app, resources={r"/predict": {"origins": "http://localhost:3000", "supports_credentials": True}})

# Define the categorical columns for label encoding
categorical_columns = [
    "Education Level", "Gender", "Current City", "Province", "District",
    "Polling Division", "Polling Station", "Current Position of the Job",
    "Name of the Institute","FamName","FamPollingStation"
]

# Custom CORS middleware
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    return response

@app.route('/predict', methods=['POST'])
def predict():
    # Load and preprocess new data
    new_data = pd.read_csv(request.files['file'])
    names = new_data['Full Name']
    polling_stations = new_data['Polling Station']
    new_data = new_data.drop(["Full Name", "Email", "DOB", "Position Type"], axis=1)
    new_data['Experience'] = new_data['Experience'].str.replace(' years', '').astype(int)
    new_data['Current Salary'] = new_data['Current Salary'].str.replace('[$,]', '', regex=True).astype(float)

    label_encoder = LabelEncoder()

    for column in categorical_columns:
        new_data[column] = label_encoder.fit_transform(new_data[column])

    # Scale new data
    new_data_scaled = scaler.transform(new_data)

    # Make predictions
    new_predictions = model.predict(new_data_scaled)

    # Define a dictionary to map position codes to position names
    position_names = {
        0: 'Clerk',
        1: 'Junior Polling Officer',
        2: 'Senior Polling Officer'
    }

    # Keep track of the best predictions
    best_predictions = {position: [] for position in position_names.values()}

    # Determine the best predictions for each position
    for name, prediction, gender, polling_station in zip(names, new_predictions, new_data['Gender'], polling_stations):
        position_name = position_names[prediction]

        # Exclude females from being predicted as Senior Polling Officers
        if position_name == 'Senior Polling Officer' and gender == 'Female':
            position_name = 'Junior Polling Officer'

        if position_name == 'Clerk':
            best_predictions[position_name].append((name, polling_station))
        elif not best_predictions[position_name]:
            best_predictions[position_name].append((name, polling_station))

    # Convert names and polling stations to strings with more space
    formatted_predictions = {
        position: [{'name': name, 'polling_station': polling_station} for name, polling_station in predictions]
        for position, predictions in best_predictions.items()
    }

    return jsonify(formatted_predictions)

if __name__ == '__main__':
    app.run(debug=True)
