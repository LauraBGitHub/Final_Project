

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
