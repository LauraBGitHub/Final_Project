//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.7;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract Transactions {
    address public MATIC= 0xF805AB418257291580898b00D4F9Ae4F94489ddc; 
    address public owner;
    // Events
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(address _MATIC) {

        owner = msg.sender;
    }
    //Address --> Contract -- deposit
    function depositToken(uint256 amount) external payable {
        require(msg.sender != address(0), "Invalid sender address");
        require(IERC20(MATIC).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit Deposited(msg.sender, amount);
    }

    //Contract --> Address  -- withdrawal
    function withdraw(address payable _to, uint _amount) external {
        _to.transfer(_amount);
    }

    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

    function getWalletAddress() external view returns(address) {
        return address(this);
    }

}