//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.7;

contract Trades {

    struct Bot {
        uint baseOrder;
        uint safetyOrder;
        uint safetyCount;
        uint safetyVolume;
        uint priceDeviation;
        uint stepScale;
        uint profitPrice;
    }

    // Mapping 
    mapping (uint => Bot) public bots;

    // Current bot ID
    uint public currentBotId = 0;

    function createBot(
        uint _baseOrder,
        uint _safetyOrder,
        uint _safetyCount,
        uint _safetyVolume,
        uint _priceDeviation,
        uint _stepScale,
        uint _profitPrice
    ) public returns (uint) {
        // Increment the current bot ID
        currentBotId++;

        
        bots[currentBotId] = Bot(
            _baseOrder,
            _safetyOrder,
            _safetyCount,
            _safetyVolume,
            _priceDeviation,
            _stepScale,
            _profitPrice
        );

        // Return the new bot's ID
        return currentBotId;
    }
}
