from flask import Flask, request, jsonify, render_template
import joblib
from scipy.sparse import csr_matrix
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# or Enable CORS for specific route
# CORS(app, resources={r"/predict": {"origins": "http://127.0.0.1:5500"}})

# Load vectorizer and models
models = {
    "logistic_regression": joblib.load('saved_models/Logistic Regression.joblib'),
    "random_forest": joblib.load('saved_models/RandomForestClassifier.joblib'),
    "decision_tree": joblib.load('saved_models/DecisionTreeClassifier.joblib'),
    "naive_bayes": joblib.load('saved_models/MultinomialNB.joblib')
}

vectorizer = joblib.load('saved_models/tfidf_vectorizer.joblib')


# Home route to render HTML page
@app.route('/')
def home():
    return render_template('/index.html')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400

    # Transform input text
    text = [data['text']]
    text_vectorized = vectorizer.transform(text)

    # Get predictions
    predictions = {}
    for model_name, model in models.items():
        pred = model.predict(text_vectorized)
        predictions[model_name] = int(pred[0])

    return jsonify({"predictions": predictions})

if __name__ == '__main__':
    app.run(debug=True)
