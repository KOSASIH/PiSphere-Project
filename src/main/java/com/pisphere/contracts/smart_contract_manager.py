import json
from web3 import Web3
from eth_account import Account
from typing import List, Dict

class SmartContractManager:
    def __init__(self, web3_provider: str, private_key: str):
        self.web3 = Web3(Web3.HTTPProvider(web3_provider))
        self.account = Account.from_key(private_key)
        self.contracts = {}

    def deploy_contract(self, contract_abi: str, contract_bytecode: str, *args) -> str:
        contract = self.web3.eth.contract(abi=json.loads(contract_abi), bytecode=contract_bytecode)
        transaction = contract.constructor(*args).buildTransaction({
            'from': self.account.address,
            'nonce': self.web3.eth.getTransactionCount(self.account.address),
            'gas': 2000000,
            'gasPrice': self.web3.toWei('50', 'gwei')
        })
        signed_txn = self.web3.eth.account.signTransaction(transaction, self.account.privateKey)
        txn_hash = self.web3.eth.sendRawTransaction(signed_txn.rawTransaction)
        txn_receipt = self.web3.eth.waitForTransactionReceipt(txn_hash)
        contract_address = txn_receipt.contractAddress
        self.contracts[contract_address] = contract
        return contract_address

    def upgrade_contract(self, contract_address: str, new_contract_abi: str, new_contract_bytecode: str) -> str:
        if contract_address not in self.contracts:
            raise ValueError("Contract not found.")
        
        # Logic for upgrading the contract (e.g., using a proxy pattern)
        # This is a simplified example; actual implementation may vary.
        proxy_contract = self.contracts[contract_address]
        upgrade_txn = proxy_contract.functions.upgradeTo(new_contract_bytecode).buildTransaction({
            'from': self.account.address,
            'nonce': self.web3.eth.getTransactionCount(self.account.address),
            'gas': 2000000,
            'gasPrice': self.web3.toWei('50', 'gwei')
        })
        signed_txn = self.web3.eth.account.signTransaction(upgrade_txn, self.account.privateKey)
        txn_hash = self.web3.eth.sendRawTransaction(signed_txn.rawTransaction)
        txn_receipt = self.web3.eth.waitForTransactionReceipt(txn_hash)
        return txn_receipt.transactionHash.hex()

    def call_contract_function(self, contract_address: str, function_name: str, *args) -> any:
        if contract_address not in self.contracts:
            raise ValueError("Contract not found.")
        
        contract = self.contracts[contract_address]
        function = contract.functions[function_name](*args)
        return function.call()

    def send_transaction(self, contract_address: str, function_name: str, *args) -> str:
        if contract_address not in self.contracts:
            raise ValueError("Contract not found.")
        
        contract = self.contracts[contract_address]
        function = contract.functions[function_name](*args)
        transaction = function.buildTransaction({
            'from': self.account.address,
            'nonce': self.web3.eth.getTransactionCount(self.account.address),
            'gas': 2000000,
            'gasPrice': self.web3.toWei('50', 'gwei')
        })
        signed_txn = self.web3.eth.account.signTransaction(transaction, self.account.privateKey)
        txn_hash = self.web3.eth.sendRawTransaction(signed_txn.rawTransaction)
        return txn_hash.hex()
