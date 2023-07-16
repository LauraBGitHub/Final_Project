  
  function table(){ 
    var rows = parseInt(document.getElementById('Slider01').value); 
    var table = document.getElementById("Table");
    for (var i = 1; i < rows; i++) {
      var row = table.insertRow(i);
      var orderCell = row.insertCell(0);
      var amountCell = row.insertCell(1);
      var totalCell = row.insertCell(2);

      orderCell.innerHTML = "Order " + i;
      amountCell.innerHTML = "<input type='number' id='amount_" + i + "' onchange='calculateTotal(" + i + ")'>";
      totalCell.innerHTML = "<span id='total_" + i + "'></span>";
    }
  }
  let baseOrder, safetyOrder, safetyCount, safetyVolume, minBalance; 
  function balance() {
    baseOrder = parseFloat(document.getElementById('baseOrder').value);
    safetyOrder = parseFloat(document.getElementById('safetyOrder').value);
    safetyCount = parseFloat(document.getElementById('Slider01').value);
    safetyVolume = parseFloat(document.getElementById('Slider03').value);
    
     minBalance = baseOrder + safetyOrder;
    
    
    for (let i = 2; i <= safetyCount; i++) {
      let temp = safetyOrder * safetyVolume;
      minBalance += temp;
          }
    
    document.getElementById('minBalance').textContent = minBalance.toFixed(2);
  }

  function updateSliderValue() {
    var sliderValue = document.getElementById('Slider01').value;
    document.getElementById('txtInput01').value = sliderValue;
    var sliderValue = document.getElementById('Slider02').value;
    document.getElementById('txtInput02').value = sliderValue;
    var sliderValue = document.getElementById('Slider03').value;
    document.getElementById('txtInput03').value = sliderValue;
    var sliderValue = document.getElementById('Slider04').value;
    document.getElementById('txtInput04').value = sliderValue;
    var sliderValue = document.getElementById('Slider05').value;
    document.getElementById('txtInput05').value = sliderValue;
  }
  function updateTextInput() {
    var textInputValue = document.getElementById('txtInput01').value;
    document.getElementById('Slider01').value = textInputValue;
    var textInputValue = document.getElementById('txtInput02').value;
    document.getElementById('Slider02').value = textInputValue;
    var textInputValue = document.getElementById('txtInput03').value;
    document.getElementById('Slider03').value = textInputValue;
    var textInputValue = document.getElementById('txtInput04').value;
    document.getElementById('Slider04').value = textInputValue;
    var textInputValue = document.getElementById('txtInput05').value;
    document.getElementById('Slider05').value = textInputValue;
  }
  async function loadDeployment() {
    await connectTradingContract();
    createBot();
  }
  
  const connectTradingContract = async () => {
    console.log("Connecting Trading Contract"); 
    const ABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_baseOrder",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_safetyOrder",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_safetyCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_safetyVolume",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_priceDeviation",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_stepScale",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_profitPrice",
            "type": "uint256"
          }
        ],
        "name": "createBot",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "bots",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "baseOrder",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "safetyOrder",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "safetyCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "safetyVolume",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "priceDeviation",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "stepScale",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "profitPrice",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentBotId",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]; 
  
    const Address = "0x74c6ee7F28E94d37CD607a9f158CF6D9F4190714"; 
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    
  }
  async function createBot() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0]; // The user's Ethereum account
    console.log('Account:  ', account);
    var priceDeviation = document.getElementById('txtInput02').value;
    console.log('PD:  ', priceDeviation);
    var stepScale = document.getElementById('txtInput04').value;
    console.log('SS:  ', stepScale);
    var profitPrice = document.getElementById('txtInput05').value;
    console.log('PP:  ', profitPrice);
    // Call the createBot function
    const botId = await contract.methods.createBot(
      baseOrder, 
      safetyOrder, 
      safetyCount, 
      safetyVolume, 
      priceDeviation, 
      stepScale, 
      profitPrice
      ).send({ from: account });

    console.log('New bot created with ID:', botId);
}
