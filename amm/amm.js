// amm/amm.js

class AMM {
    constructor() {
        this.pools = new Map(); // Map to hold liquidity pools
    }

    // Add a liquidity pool
    addPool(tokenA, tokenB, reserveA, reserveB) {
        const poolKey = this.getPoolKey(tokenA, tokenB);
        this.pools.set(poolKey, { reserveA, reserveB });
    }

    // Get the pool key for a pair of tokens
    getPoolKey(tokenA, tokenB) {
        return tokenA < tokenB ? `${tokenA}-${tokenB}` : `${tokenB}-${tokenA}`;
    }

    // Swap tokens in the AMM
    swap(tokenIn, tokenOut, amountIn) {
        const poolKey = this.getPoolKey(tokenIn, tokenOut);
        const pool = this.pools.get(poolKey);

        if (!pool) {
            throw new Error('Liquidity pool does not exist');
        }

        const { reserveA, reserveB } = pool;
        const amountOut = this.calculateAmountOut(amountIn, reserveA, reserveB);
        
        // Update reserves
        if (tokenIn < tokenOut) {
            pool.reserveA += amountIn;
            pool.reserveB -= amountOut;
        } else {
            pool.reserveB += amountIn;
            pool.reserveA -= amountOut;
        }

        return amountOut;
    }

    // Calculate the amount out based on the constant product formula
    calculateAmountOut(amountIn, reserveIn, reserveOut) {
        const amountInWithFee = amountIn * 0.997; // 0.3% fee
        const numerator = amountInWithFee * reserveOut;
        const denominator = reserveIn + amountInWithFee;
        return numerator / denominator;
    }

    // Get reserves for a pool
    getReserves(tokenA, tokenB) {
        const poolKey = this.getPoolKey(tokenA, tokenB);
        const pool = this.pools.get(poolKey);
        return pool ? { reserveA: pool.reserveA, reserveB: pool.reserveB } : null;
    }
}

module.exports = AMM;
