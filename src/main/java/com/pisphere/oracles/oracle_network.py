import json
import requests
from typing import List, Dict, Any
from time import time

class OracleNetwork:
    def __init__(self):
        self.data_providers = {}
        self.price_data = {}

    def register_data_provider(self, provider_id: str, provider_url: str):
        """Register a new data provider."""
        self.data_providers[provider_id] = provider_url
        print(f"Data provider {provider_id} registered.")

    def fetch_price(self, asset: str) -> Dict[str, Any]:
        """Fetch price data from all registered providers."""
        responses = []
        for provider_id, provider_url in self.data_providers.items():
            try:
                response = requests.get(f"{provider_url}/price/{asset}")
                if response.status_code == 200:
                    data = response.json()
                    responses.append(data)
                else:
                    print(f"Provider {provider_id} returned an error: {response.status_code}")
            except Exception as e:
                print(f"Error fetching data from {provider_id}: {e}")

        # Validate and aggregate the responses
        if responses:
            return self.validate_and_aggregate(responses)
        else:
            raise ValueError("No valid responses from data providers.")

    def validate_and_aggregate(self, responses: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Validate and aggregate price data from multiple providers."""
        valid_prices = [resp['price'] for resp in responses if 'price' in resp]
        if not valid_prices:
            raise ValueError("No valid price data available.")

        # Simple average for aggregation; can be replaced with more complex logic
        average_price = sum(valid_prices) / len(valid_prices)
        timestamp = time()
        self.price_data = {
            'asset': responses[0]['asset'],
            'price': average_price,
            'timestamp': timestamp
        }
        return self.price_data

    def get_latest_price(self) -> Dict[str, Any]:
        """Get the latest aggregated price data."""
        return self.price_data
