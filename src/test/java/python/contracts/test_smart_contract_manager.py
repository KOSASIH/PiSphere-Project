import pytest
from contracts.smart_contract_manager import SmartContractManager

def test_deploy_contract(mocker):
    contract_manager = SmartContractManager()
    mocker.patch.object(contract_manager, 'deploy_contract')
    contract_manager.deploy_contract("SampleContract")
    contract_manager.deploy_contract.assert_called_once_with("SampleContract")

def test_execute_contract(mocker):
    contract_manager = SmartContractManager()
    mocker.patch.object(contract_manager, 'execute_contract')
    contract_manager.execute_contract("contractId123")
    contract_manager.execute_contract.assert_called_once_with("contractId123")
