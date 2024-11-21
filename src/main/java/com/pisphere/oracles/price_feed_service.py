from flask import Flask, jsonify, request
from oracle_network import OracleNetwork

app = Flask(__name__)
oracle_network = OracleNetwork()

@app.route('/register', methods=['POST'])
def register_provider():
    """Endpoint to register a new data provider."""
    data = request.json
    provider_id = data.get('provider_id')
    provider_url = data.get('provider_url')
    oracle_network.register_data_provider(provider_id, provider_url)
    return jsonify({"message": "Provider registered successfully."}), 201

@app.route('/price/<string:asset>', methods=['GET'])
def get_price(asset):
    """Endpoint to get the latest price for a specific asset."""
    try:
        price_data = oracle_network.fetch_price(asset)
        return jsonify(price_data), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@app.route('/latest', methods=['GET'])
def latest_price():
    """Endpoint to get the latest aggregated price data."""
    price_data = oracle_network.get_latest_price()
    return jsonify(price_data), 200

if __name__ == '__main__':
    app.run(debug=True)
