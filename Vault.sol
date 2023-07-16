//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.7;

contract Transactions {

    //Address --> Contract -- deposit
    function depositToken() external payable {
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