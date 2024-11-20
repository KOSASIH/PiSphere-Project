// nft/marketplace-nft.js

class MarketplaceNFT {
    constructor(nftLibrary) {
        this.nftLibrary = nftLibrary;
        this.listings = new Map(); // Map to hold NFT listings
    }

    // List an NFT for sale
    listNFT(nftId, price) {
        const nft = this.nftLibrary.getNFT(nftId);
        if (!nft) {
            throw new Error('NFT does not exist');
        }

        if (this.listings.has(nftId)) {
            throw new Error('NFT is already listed');
        }

        this.listings.set(nftId, { price, seller: nft.owner });
    }

    // Buy an NFT
    buyNFT(nftId, buyer) {
        const listing = this.listings.get(nftId);
        if (!listing) {
            throw new Error('NFT is not listed for sale');
        }

        const nft = this.nftLibrary.getNFT(nftId);
        if (nft.owner === buyer) {
            throw new Error('You cannot buy your own NFT');
        }

        // Transfer the NFT to the buyer
        this.nftLibrary.transfer(nftId, buyer);

        // Remove the listing
        this.listings.delete(nftId);

        return {
            nft,
            price: listing.price,
            seller: listing.seller,
        };
    }

    // Get all listings
    getListings() {
        return Array.from(this.listings.entries()).map(([nftId, listing]) => ({
            nft: this.nftLibrary.getNFT(nftId),
            ...listing,
        }));
    }

    // Remove a listing
    removeListing(nftId) {
        if (!this.listings.has(nftId)) {
            throw new Error('NFT is not listed for sale');
        }

        const nft = this.nftLibrary.getNFT(nftId);
        if (nft.owner !== this.listings.get(nftId).seller) {
            throw new Error('Only the seller can remove the listing');
        }

        this.listings.delete(nftId);
    }
}

module.exports = Marketplace NFT; ```javascript
// nft/marketplace-nft.js

class MarketplaceNFT {
    constructor(nftLibrary) {
        this.nftLibrary = nftLibrary;
        this.listings = new Map(); // Map to hold NFT listings
    }

    // List an NFT for sale
    listNFT(nftId, price) {
        const nft = this.nftLibrary.getNFT(nftId);
        if (!nft) {
            throw new Error('NFT does not exist');
        }

        if (this.listings.has(nftId)) {
            throw new Error('NFT is already listed');
        }

        this.listings.set(nftId, { price, seller: nft.owner });
    }

    // Buy an NFT
    buyNFT(nftId, buyer) {
        const listing = this.listings.get(nftId);
        if (!listing) {
            throw new Error('NFT is not listed for sale');
        }

        const nft = this.nftLibrary.getNFT(nftId);
        if (nft.owner === buyer) {
            throw new Error('You cannot buy your own NFT');
        }

        // Transfer the NFT to the buyer
        this.nftLibrary.transfer(nftId, buyer);

        // Remove the listing
        this.listings.delete(nftId);

        return {
            nft,
            price: listing.price,
            seller: listing.seller,
        };
    }

    // Get all listings
    getListings() {
        return Array.from(this.listings.entries()).map(([nftId, listing]) => ({
            nft: this.nftLibrary.getNFT(nftId),
            ...listing,
        }));
    }

    // Remove a listing
    removeListing(nftId) {
        if (!this.listings.has(nftId)) {
            throw new Error('NFT is not listed for sale');
        }

        const nft = this.nftLibrary.getNFT(nftId);
        if (nft.owner !== this.listings.get(nftId).seller) {
            throw new Error('Only the seller can remove the listing');
        }

        this.listings.delete(nftId);
    }
}

module.exports = MarketplaceNFT;
