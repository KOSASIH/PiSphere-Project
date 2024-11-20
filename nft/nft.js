// nft/nft.js

const { v4: uuidv4 } = require('uuid');

class NFT {
    constructor() {
        this.nfts = new Map(); // Map to hold NFTs
        this.owners = new Map(); // Map to track NFT owners
    }

    // Mint a new NFT
    mint(owner, metadata) {
        const id = uuidv4(); // Generate a unique ID for the NFT
        const nft = {
            id,
            owner,
            metadata,
            createdAt: new Date().toISOString(),
        };

        this.nfts.set(id, nft);
        this.owners.set(owner, [...(this.owners.get(owner) || []), id]);

        return nft;
    }

    // Transfer an NFT to a new owner
    transfer(nftId, newOwner) {
        const nft = this.nfts.get(nftId);
        if (!nft) {
            throw new Error('NFT does not exist');
        }

        const oldOwner = nft.owner;
        nft.owner = newOwner;

        // Update owners mapping
        this.owners.set(oldOwner, this.owners.get(oldOwner).filter(id => id !== nftId));
        this.owners.set(newOwner, [...(this.owners.get(newOwner) || []), nftId]);
    }

    // Get NFT details
    getNFT(nftId) {
        return this.nfts.get(nftId);
    }

    // Get all NFTs owned by a specific address
    getNFTsByOwner(owner) {
        const nftIds = this.owners.get(owner) || [];
        return nftIds.map(id => this.nfts.get(id));
    }

    // Update NFT metadata
    updateMetadata(nftId, newMetadata) {
        const nft = this.nfts.get(nftId);
        if (!nft) {
            throw new Error('NFT does not exist');
        }
        nft.metadata = { ...nft.metadata, ...newMetadata };
    }
}

module.exports = NFT;
