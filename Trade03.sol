// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;
import "https://github.com/Uniswap/v3-periphery/blob/main/contracts/interfaces/ISwapRouter.sol";
interface IERC20{ 
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);      
}
contract Trade01 
    event ReceivedMATIC(address indexed sender, uint256 amount);
    address public constant routerAddress= 0xE592427A0AEce92De3Edee1F18E0157C05861564; 
    ISwapRouter public immutable swapRouter = ISwapRouter(routerAddress);
    address public constant MATIC = 0xF805AB418257291580898b00D4F9Ae4F94489ddc;
    address public constant WETH = 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa;
    IERC20 public wrapMatic = IERC20(MATIC); 
    //IERC20 public wrapWETH = IERC20(WETH);
    // we will set the pool fee to 0.3%.
    uint24 public constant poolFee = 3000;
    receive() external payable {
        emit ReceivedMATIC(msg.sender, msg.value);
    } 
    function getContractMATICBalance() external view returns (uint256) {
        //return wrapMatic.balanceOf(address(this));
        return address(this).balance;
    }
    function swapExactInputSingle(uint256 amountIn) external returns (uint256 amountOut) { 
        uint256 maticBalance = wrapMatic.balanceOf(address(this));
        require(maticBalance >= amountIn, "Insufficient MATIC balance in the contract");
        wrapMatic.approve(address(swapRouter), amountIn);
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: MATIC,
                tokenOut: WETH,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        amountOut = swapRouter.exactInputSingle(params);
    }  
    function swapExactOutputSingle(uint256 amountOut, uint256 amountInMaximum) external returns (uint256 amountIn) {
        wrapMatic.approve( address(swapRouter), amountInMaximum);
        ISwapRouter.ExactOutputSingleParams memory params =
            ISwapRouter.ExactOutputSingleParams({
                tokenIn: MATIC,
                tokenOut: WETH,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });
        amountIn = swapRouter.exactOutputSingle(params);
        if (amountIn < amountInMaximum) {
            wrapMatic.approve(address(swapRouter), 0);
            wrapMatic.transfer(address(this), amountInMaximum - amountIn);
        }
    }
}