from smart_contract_manager import SmartContractManager

class ContractExecutor:
    def __init__(self, contract_manager):
        self.contract_manager = contract_manager

    def execute(self, contract_id):
        self.contract_manager.execute_contract(contract_id)
