// JavaScript
document
  .getElementById("contaminantTab")
  .addEventListener("click", function () {
    this.classList.remove("pure-button-primary");
    this.classList.add("pure-button-selected");
    document.getElementById("soilTab").classList.remove("pure-button-selected");
    document.getElementById("soilTab").classList.add("pure-button-primary");
    document.getElementById("contaminantForm").classList.add("active");
    document.getElementById("soilForm").classList.remove("active");
  });

document.getElementById("soilTab").addEventListener("click", function () {
  this.classList.remove("pure-button-primary");
  this.classList.add("pure-button-selected");
  document
    .getElementById("contaminantTab")
    .classList.remove("pure-button-selected");
  document
    .getElementById("contaminantTab")
    .classList.add("pure-button-primary");
  document.getElementById("contaminantForm").classList.remove("active");
  document.getElementById("soilForm").classList.add("active");
});
