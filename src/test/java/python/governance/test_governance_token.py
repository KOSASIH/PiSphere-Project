import pytest
from governance.governance_token import GovernanceToken

def test_mint_tokens():
    governance_token = GovernanceToken("PiGovernanceToken", 1000000.0)
    governance_token.mint_tokens(500.0)
    assert governance_token.get_total_supply() == 1000500.0
