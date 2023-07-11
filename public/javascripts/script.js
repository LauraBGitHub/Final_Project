const slider = document.getElementById("Slider01");
const textInput = document.getElementById("txtInput01");

Slider01.addEventListener("input", function() {
    txtInput01.value = this.value;
});
