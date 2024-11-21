import pytest
from market.automated_market_maker import AutomatedMarketMaker

def test_provide_liquidity(mocker):
    market_maker = AutomatedMarketMaker()
    mocker.patch.object(market_maker, 'provide_liquidity')
    market_maker.provide_liquidity("ETH", 1000.0)
    market_maker.provide_liquidity.assert_called_once_with("ETH", 1000.0)

def test_trade(mocker):
    market_maker = AutomatedMarketMaker()
    mocker.patch.object(market_maker, 'trade')
    market_maker.trade("ETH", 10.0)
    market_maker.trade.assert_called_once_with("ETH", 10.0)
