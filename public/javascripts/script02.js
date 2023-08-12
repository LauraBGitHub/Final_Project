let account;
const connectMetamask = async () => {
  if (window.ethereum !== undefined) {
    try {
      // CHANGE 01 - Changing chain from Sepolia to Polygon 
      const chainId = "0x13881";
      
      const chainData = await ethereum.request({ method: "eth_chainId" });
      if (chainData === chainId) {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];
        document.getElementById("userArea").innerHTML = `Connected`;
        document.getElementById("address").innerHTML = account;
      } else {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });

      } 
    } catch (error) {
      console.log(error);
    }
  }
};

connectMetamask().then(() => {
  console.log("Connected to Metamask");
}).catch((error) => {
  console.log(error);
})

async function loadFunctions() {
  await connectContract();
  getBalance(); 
  getMaticBalance(); 
}
async function deposit() {
  await depositContract();
  getBalance();
}

const connectContract = async () => {
  console.log("Connecting Contract"); 
  const ABI = [
    {
      "inputs": [],
      "name": "depositToken",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWalletAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]; 
                         
  const Address = "0x6b2d04Df0a7F490d412aeFDa0f57fC44Fc6699f7"; 
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(ABI, Address);
  document.getElementById("contract").innerHTML =  `${Address}`// calling the elementID above""
}
const getBalance = async () => { 
  console.log("Getting Balance:  "); 
  const data = await window.contract.methods.getBalance().call();
  document.getElementById("balance").innerHTML = `${data}`;
}
/* from acount to contract here */
const depositContract = async () => {
  const amount = document.getElementById("deposit").value;
  await window.contract.methods.depositToken().send({from: account, value: amount});
  console.log("Deposited:  " +amount); 
}
const withdraw = async () => {
  const withdrawAmount = document.getElementById("amount").value;
  console.log("Amount " + withdrawAmount ); 
  const address = document.getElementById("addressInput").value;
  console.log("Address " + address ); 
  await window.contract.methods.withdraw(address, withdrawAmount).send({from: account});
}

const maticAddress = "0xF805AB418257291580898b00D4F9Ae4F94489ddc"; 

async function getMaticBalance() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const userAddress = accounts[0]; 
  console.log("Account :  "+ userAddress); 
  try {
    const data = web3.eth.abi.encodeFunctionCall(
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [{ type: 'address', name: 'account' }],
      },
      [userAddress]
    );

    const result = await web3.eth.call({
      to: maticAddress,
      data: data,
    });

    const tokenBalance = web3.utils.hexToNumberString(result);
    console.log(`Token Balance: ${tokenBalance}`);
    document.getElementById('matic').innerHTML = tokenBalance;
  } catch (error) {
    console.error('Error fetching token balance:', error);
  }

 } 