document.getElementById("resultDiv").style.display = "none";

var chart = null;
let ctx = document.getElementById("chartCanvas").getContext("2d");

function mychart(x, y) {
  if (chart) {
    chart.destroy();
  }

  let chartBorderColor, chartColor, borderColor = "#FF5733";

  if (document.body.classList.contains("light-theme")) {
    chartBorderColor = "rgba(0, 0, 0, 0.15)";
    chartColor = "rgba(0, 0, 0, 0.65)";

  } else {
    chartBorderColor = "rgba(255, 255, 255, 0.1)";
    chartColor = "rgba(255, 255, 255, 0.8)";
  }

  chart = new Chart(ctx, {
    type: "scatter",
    data: {
      labels: x,
      datasets: [
        {
          data: y,
          borderColor: borderColor,
          fill: false,
          tension: 0.4,
          showLine: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Temperature (°C)",
            color: chartColor,
          },
          ticks: {
            color: chartColor,
          },
          grid: {
            color: chartBorderColor,
          },
        },
        y: {
          reverse: true,
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Depth (m)",
            color: chartColor,
          },
          ticks: {
            color: chartColor,
          },
          grid: {
            color: chartBorderColor,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Coboiling Point vs. Depth",
          padding: {
            bottom: 10,
          },
          color: chartColor,
        },
        legend: {
          display: false,
        },
      },
    },
  });
}

function getTemp(n, pw, sg, sm, pc, tm, low, high, A, B) {
  let temp = (low + high) / 2;
  const r = 8.314472;
  const h = Math.exp(A - B / (temp + 273)) * 101325;
  const k = h / r / (temp + 273);
  const pvw = Math.pow(10, 8.07131 - 1730.63 / (233.426 + temp)) * 133.322;
  const mass = (k * sg * n * (pw + pc - pvw)) / h + ((1 - sg) * n * (pw + pc - pvw)) / h;

  if (mass > tm + 0.001) {
    return getTemp(n, pw, sg, sm, pc, tm, temp, high, A, B);
  } else if (mass < tm - 0.001) {
    return getTemp(n, pw, sg, sm, pc, tm, low, temp, A, B);
  } else {
    return temp;
  }
}

const btn = document.getElementById("calculate");

btn.addEventListener("click", getResult);

function getResult() {
  let MW = document.getElementById("mw").value;
  let A = parseFloat(document.getElementById("a").value);
  let B = parseFloat(document.getElementById("b").value);
  let L = parseFloat(document.getElementById("l").value);
  let N = parseFloat(document.getElementById("n").value);
  let SWR = parseFloat(document.getElementById("swr").value);
  let DP = parseFloat(document.getElementById("dp").value);
  let SL = parseFloat(document.getElementById("sl").value);

  if (MW === null || A === null || B === null || SL === null || SWR === null || DP === null || N === null || L === null) {
    return "Please fill out all parameters.";
  }

  if (MW === "" || isNaN(A) || isNaN(B) || isNaN(SL) || isNaN(SWR) || isNaN(DP) || isNaN(N) || isNaN(L)) {
    return "Please fill out all parameters.";
  }

  const gamma = -1 / L;
  const n = N;
  const sg = 0.01;
  let sm, pc, tm;

  try {
    sm = 1;
    pc = Math.pow((1 - 0.01 - SWR) / (1 - SWR), gamma) * DP;
    tm = (SL / MW) * N;
  } catch (error) {
    return "Failed to find a result.";
  }

  let y = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  let x = new Array(19).fill(null);
  let low = 0;
  let high = 300;
  let currentDepth = 10;

  for (let i = 0; i < 21; i++) {
    let pw = currentDepth * 9810;
    x[i] = Math.round(getTemp(n, pw, sg, sm, pc, tm, low, high, A, B));
    currentDepth += 5;
  }

  mychart(x, y);

  const depth = 10;
  const pw = depth * 9810;
  let temp;

  try {
    temp = Math.round(getTemp(n, pw, sg, sm, pc, tm, low, high, A, B));
    document.getElementById("resultText").innerText = `${temp}°C`;
  } catch (error) {
    return "Failed to find a result.";
  }

  document.getElementById("resultDiv").style.display = "block";
}

let themeSwitcher = document.querySelector("#darkmode-toggle");

let savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.className = savedTheme;
  themeSwitcher.checked = savedTheme === "dark-theme";
} else {
  themeSwitcher.checked = false;
}

function updateTheme() {
  if (themeSwitcher.checked) {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light-theme");
  }
  if (chart) {
    mychart(chart.data.labels, chart.data.datasets[0].data);
  }
}

themeSwitcher.addEventListener("change", updateTheme);

const resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", reset);

function reset() {
  if (chart) {
    chart.destroy();
    chart = null;
  }

  document.getElementById("resultText").innerText = "";

  const inputs = ["mw", "a", "b", "l", "n", "swr", "dp", "sl"];
  inputs.forEach((id) => (document.getElementById(id).value = ""));

  const selects = ["contaminant_choice", "soil_choice"];
  selects.forEach((id) => (document.getElementById(id).selectedIndex = 0));

  document.getElementById("resultDiv").style.display = "none";
}
