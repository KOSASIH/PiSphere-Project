// amm/liquidity-pool.js

class LiquidityPool {
    constructor(amm, tokenA, tokenB) {
        this.amm = amm;
        this.tokenA = tokenA;
        this.tokenB = tokenB;
        this.reserveA = 0;
        this.reserveB = 0;
        this.liquidityProviders = new Map(); // Map to track liquidity providers
    }

    // Add liquidity to the pool
    addLiquidity(amountA, amountB, provider) {
        this.reserveA += amountA;
        this.reserveB += amountB;

        // Update AMM with new reserves
        this.amm.addPool(this.tokenA, this.tokenB, this.reserveA, this.reserveB);

        // Track liquidity provider
        if (!this.liquidityProviders.has(provider)) {
            this.liquidityProviders.set(provider, { amountA: 0, amountB: 0 });
        }
        const providerData = this.liquidityProviders.get(provider);
        providerData.amountA += amountA;
        providerData.amountB += amountB;
    }

    // Remove liquidity from the pool
    removeLiquidity(amountA, amountB, provider) {
        if (!this.liquidityProviders.has(provider)) {
            throw new Error('Provider does not exist');
        }

        const providerData = this.liquidityProviders.get(provider);
        if (providerData.amountA < amountA || providerData.amountB < amountB) {
            throw new Error('Insufficient liquidity');
        }

        this.reserveA -= amountA;
        this.reserveB -= amountB;

        // Update AMM with new reserves
        this.amm.addPool(this.tokenA, this.tokenB, this.reserveA, this.reserveB);

        // Update provider data
        providerData.amountA -= amountA;
        providerData.amountB -= amountB;
    }

    // Get the current reserves
    getReserves() {
       return { reserveA: this.reserveA, reserveB: this.reserveB };
    }

    // Get the liquidity provider's share
    getProviderShare(provider) {
        if (!this.liquidityProviders.has(provider)) {
            throw new Error('Provider does not exist');
        }
        return this.liquidityProviders.get(provider);
    }
}

module.exports = LiquidityPool;
