from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib


app = Flask(__name__)

# Load the trained model and scaler
model = joblib.load('trained_model.joblib')
scaler = joblib.load('scaler.joblib')

# Define the categorical columns for label encoding
categorical_columns = [
    "Education Level", "Gender", "Current City", "Province", "District",
    "Polling Division", "Polling Station", "Current Position of the Job",
    "Name of the Institute"
]


# Custom CORS middleware
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'  # Adjust this to your React app's URL
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/predict', methods=['POST'])
def predict():
    # Load and preprocess new data
    new_data = pd.read_csv(request.files['file'])
    names = new_data['Full Name']
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
    for name, prediction in zip(names, new_predictions):
        position_name = position_names[prediction]
        if position_name == 'Clerk':
            best_predictions[position_name].append(name)
        elif not best_predictions[position_name]:
            best_predictions[position_name].append(name)

    return jsonify(best_predictions)

if __name__ == '__main__':
    app.run(debug=True)
