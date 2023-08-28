document
  .getElementById("contaminantTab")
  .addEventListener("click", function () {
    document.getElementById("contaminantForm").classList.add("active");
    document.getElementById("soilForm").classList.remove("active");
  });

document.getElementById("soilTab").addEventListener("click", function () {
  document.getElementById("soilForm").classList.add("active");
  document.getElementById("contaminantForm").classList.remove("active");
});
