// did/verifiable-credentials.js

const crypto = require('crypto');
const DID = require('./did');

class VerifiableCredential {
    constructor(issuerDID) {
        this.issuerDID = issuerDID;
        this.did = new DID();
    }

    // Create a verifiable credential
    async createCredential(subject, claims) {
        const credential = {
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            id: `urn:uuid:${this.did.generateUniqueId()}`,
            type: ["VerifiableCredential"],
            issuer: this.issuerDID,
            issuanceDate: new Date().toISOString(),
            credentialSubject: {
                id: subject,
                ...claims,
            },
        };

        // Sign the credential
        const privateKey = this.did.generateUniqueId(); // Mock private key
        credential.proof = await this.signCredential(credential, privateKey);

        return credential;
    }

    // Sign a credential
    async signCredential(credential, privateKey) {
        const message = JSON.stringify(credential);
        const signature = this.did.signMessage(message, privateKey);
        return {
            type: "Ed25519Signature2018",
            created: new Date().toISOString(),
            proofPurpose: "assertionMethod",
            verificationMethod: `${this.issuerDID}#keys-1`,
            jws: signature,
        };
    }

    // Verify a verifiable credential
    async verifyCredential(credential) {
        const { proof, ...credWithoutProof } = credential;
        const message = JSON.stringify(credWithoutProof);
        const publicKey = this.did.generateUniqueId(); // Mock public key

        return this.did.verifyMessage(message, proof.jws, publicKey);
    }
}

module.exports = VerifiableCredential;
