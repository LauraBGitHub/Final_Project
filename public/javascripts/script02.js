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
}

const connectContract = async () => {
  console.log("Connecting Contract"); 
  const ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdrawn",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
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
      "stateMutability": "nonpayable",
      "type": "constructor"
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
    },
    {
      "inputs": [],
      "name": "MATIC",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
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
                         
  const Address = "0xd5df569E63fAb3F0E32d9209Fe71e71b870a58Ea"; 
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