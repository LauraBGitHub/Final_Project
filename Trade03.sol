pragma solidity ^0.8.17;

interface IERC20{ 
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    
    
}
contract Trade02 {
    address private constant UNISWAP_V2_ROUTER = 
    address public constant routerAddress= 0xE592427A0AEce92De3Edee1F18E0157C05861564; 
    ISwapRouter public immutable swapRouter = ISwapRouter(routerAddress);


    address public constant WMATIC = 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889;
    address public constant WETH = 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa;

    IERC20 public wrapMatic = IERC20(WMATIC); 

    // we will set the pool fee to 0.3%.
    uint24 public constant poolFee = 3000;

    constructor() { }

    function swapExactInputSingle(uint256 amountIn) external returns (uint256 amountOut) {
       
        //wrapMatic.safeTransferFrom(WMATIC, msg.sender, address(this), amountIn);

        // Approve the router to spend WMATIC.
        wrapMatic.approve(address(swapRouter), amountIn);

        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: WMATIC,
                tokenOut: WETH,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle(params);
    }

    
    function swapExactOutputSingle(uint256 amountOut, uint256 amountInMaximum) external returns (uint256 amountIn) {
        // Approve the router to spend the specifed `amountInMaximum` of WMATIC.
        
        wrapMatic.approve( address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params =
            ISwapRouter.ExactOutputSingleParams({
                tokenIn: WMATIC,
                tokenOut: WETH,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });

        // Executes the swap returning the amountIn needed to spend to receive the desired amountOut.
        amountIn = swapRouter.exactOutputSingle(params);

        // For exact output swaps, the amountInMaximum may not have all been spent.
        // If the actual amount spent (amountIn) is less than the specified maximum amount, we must refund the msg.sender and approve the swapRouter to spend 0.
        if (amountIn < amountInMaximum) {
            wrapMatic.approve(address(swapRouter), 0);
            wrapMatic.Transfer(address(this), amountInMaximum - amountIn);
        }
    }
}