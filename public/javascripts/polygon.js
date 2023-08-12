// testing code 


/*const connectContract = async () => {
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
  const networkId = await window.web3.eth.net.getId();
  if (networkId !== 80001) {  //80001 for Mumbai testnet
    alert("Please connect to the Polygon network on your wallet!");
    return;
  }
  window.contract = await new window.web3.eth.Contract(ABI, Address);
  document.getElementById("contract").innerHTML =  `${Address}`// calling the elementID above""
  console.log(Address); 
}
// option 2 not bloody working 
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
/*const depositContract = async () => {
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
}*/ 


// NEW DEPOSIT FUNCTION
/* const approveMATIC = async (amount) => {
  const ADDRESS = "0xd5df569E63fAb3F0E32d9209Fe71e71b870a58Ea";
  const MUMBAI_MATIC = "0xF805AB418257291580898b00D4F9Ae4F94489ddc"; 
  const maticTokenContract = new window.web3.eth.Contract(IERC20_ABI, MUMBAI_MATIC);
  await maticTokenContract.methods.approve(ADDRESS, amount).send({from: account});
}

const depositContractNEW = async () => {
  const amount = document.getElementById("deposit").value;

  // First, approve the contract
  await approveMATIC(amount);

  // Then, deposit the approved tokens
  await window.contract.methods.depositToken(amount).send({from: account});
  console.log("Deposited:  " + amount); 
}*/ 