package com.pisphere.contracts;

public class ContractExecutor {
    private SmartContractManager contractManager;

    public ContractExecutor(SmartContractManager contractManager) {
        this.contractManager = contractManager;
    }

    public void execute(String contractId) {
        contractManager.executeContract(contractId);
    }
}
