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
  
  function balance() {
    var baseOrder = parseFloat(document.getElementById('baseOrder').value);
    var safetyOrder = parseFloat(document.getElementById('safetyOrder').value);
    var safetyCount = parseFloat(document.getElementById('Slider01').value);
    var safetyVolume = parseFloat(document.getElementById('Slider03').value);
    
    var minBalance = baseOrder + safetyOrder;
    
    
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
