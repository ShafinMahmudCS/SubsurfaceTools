//preloader
var loader = setInterval(function () {
  if (document.readyState !== "complete") return;
  clearInterval(loader);
  document.querySelector(".spinner-wrapper").style.display = "none";
}, 250);

//helper functions
function ERFC(value1) {
  return 1 - math.erf(value1);
}

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

function toggleZoom1() {
  if (myZoom == true) {
    myZoom = false;
  } else {
    myZoom = true;
  }
  mychart();
}

function toggleZoom2() {
  if (myZoom == true) {
    myZoom = false;
  } else {
    myZoom = true;
  }
  mychart2();
}

function getResponsiveFontSize() {
  const width = window.innerWidth;
  if (width <= 480) {
    // For mobile devices
    return 12;
  } else if (width <= 1000) {
    // For tablets
    return 12;
  } else if (width <= 1550) {
    // For small laptops
    return 15;
  } else {
    // For large screens
    return 17;
  }
}

var myZoom = false;

document
  .getElementById("downloadButton1")
  .addEventListener("click", downloadExcel1);
document
  .getElementById("downloadButton2")
  .addEventListener("click", downloadExcel2);

// Initial Concentration vs Time graph on page load

var m = 900;
var Area = 1;
var n = 0.35;
var q = 0.08;
var Dstar = Math.pow(10, -16) * 86400;
var alphaX = 5;
var R = 1;
var v = q / n;
var DL = Dstar + alphaX * v;
var vR = v / R;
var DR = DL / R;
var time = 100;
var distance = 50;

var lambda = 1000;

var ctx2 = document.getElementById("canvas2");

var tValues = [
  1, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100,
  120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420,
  460, 500,
];

var tyValues = [];

for (let i = 0; i < tValues.length; i++) {
  var obj = {};
  obj.x = tValues[i];
  var a1 = m / Area / n / Math.sqrt(4 * Math.PI * DR * tValues[i]);
  var a2 = 0 - (distance - vR * tValues[i]) ** 2 / (4 * DR * tValues[i]);
  var C = a1 * Math.exp(a2) * Math.exp((-Math.log(2) / lambda) * tValues[i]);
  obj.y = C;
  tyValues.push(obj);
}

Chart.defaults.color = "rgba(0, 0, 0, 0.65)";
Chart.defaults.borderColor = "rgba(0, 0, 0, 0.15)";
if (document.body.classList.contains("dark-theme")) {
  Chart.defaults.color = "rgba(255, 255, 255, 0.8)";
  Chart.defaults.borderColor = "rgba(255, 255, 255, 0.1)";
}

var chart2 = new Chart(ctx2, {
  type: "scatter",
  data: {
    datasets: [
      {
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1.2,
        pointRadius: 2.5,
        pointBackgroundColor: "rgb(255, 99, 132)",
        data: tyValues,
        fill: false,
        showLine: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    animation: false,
    scales: {
      x: {
        position: "bottom",
        min: 0,
        max: 600,
        title: {
          display: true,
          text: "Time (days)",
          font: {
            size: 15,
          },
        },
      },
      y: {
        min: 0,
        max: 60.0,
        position: "left",
        title: {
          display: true,
          text: "Concentration (mg/L)",
          font: {
            size: 15,
          },
        },
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0Concentration with Time",
        font: {
          size: getResponsiveFontSize(),
        },
        align: "start",
        padding: {
          bottom: 10,
        },
      },
      legend: {
        display: false,
      },
      zoom: {
        limits: {
          x: { min: 0, max: 35 },
          y: { min: 0 },
        },
        pan: {
          enabled: true,
          mode: "y",
        },
        zoom: {
          wheel: {
            enabled: myZoom,
            speed: 0.05,
          },
          pinch: {
            enabled: false,
          },
          mode: "y",
        },
      },
    },
  },
});

// Initial Concentration vs Distance graph on page load

var m = 900;
var Area = 1;
var n = 0.35;
var q = 0.08;
var Dstar = Math.pow(10, -16) * 86400;
var alphaX = 5;
var R = 1;
var v = q / n;
var DL = Dstar + alphaX * v;
var vR = v / R;
var DR = DL / R;
var time = 50;
var distance = 50;

var lambda = 1000;

var a1 = m / Area / n / Math.sqrt(4 * Math.PI * DR * time);

var ctx1 = document.getElementById("canvas1").getContext("2d");

const xValues = [
  0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100,
  120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420,
  460, 500,
];

var xyValues = [];

for (let i = 0; i < xValues.length; i++) {
  var obj = {};
  obj.x = xValues[i];
  var a2 = 0 - (xValues[i] - vR * time) ** 2 / (4 * DR * time);
  var C = a1 * Math.exp(a2) * Math.exp((-Math.log(2) / lambda) * time);
  obj.y = expo(C, 7);
  xyValues.push(obj);
}

Chart.defaults.color = "rgba(0, 0, 0, 0.65)";
Chart.defaults.borderColor = "rgba(0, 0, 0, 0.15)";
if (document.body.classList.contains("dark-theme")) {
  Chart.defaults.color = "rgba(255, 255, 255, 0.8)";
  Chart.defaults.borderColor = "rgba(255, 255, 255, 0.1)";
}

var chart1 = new Chart(ctx1, {
  type: "scatter",
  data: {
    datasets: [
      {
        backgroundColor: "rgb(153, 102, 255)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 1.2,
        pointRadius: 2.5,
        pointBackgroundColor: "rgb(153, 102, 255)",
        data: xyValues,
        fill: false,
        showLine: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    animation: false,
    scales: {
      x: {
        position: "bottom",
        min: 0,
        max: 600,
        title: {
          display: true,
          text: "Distance (m)",
          font: {
            size: 15,
          },
        },
      },
      y: {
        min: 0,
        max: 100.0,
        position: "left",
        title: {
          display: true,
          text: "Concentration (mg/L)",
          font: {
            size: 15,
          },
        },
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0Concentration with Distance",
        font: {
          size: getResponsiveFontSize(),
        },
        align: "start",
        padding: {
          bottom: 10,
        },
      },
      legend: {
        display: false,
      },
      zoom: {
        limits: {
          x: { min: 0, max: 600 },
          y: { min: 0 },
        },
        pan: {
          enabled: true,
          mode: "y",
        },
        zoom: {
          wheel: {
            enabled: myZoom,
            speed: 0.05,
          },
          pinch: {
            enabled: false,
          },
          mode: "y",
        },
      },
    },
  },
});

themeSwitcher = document.querySelector("#darkmode-toggle");
themeSwitcher.addEventListener("click", function () {
  if (document.body.classList.contains("light-theme")) {
    Chart.defaults.color = "rgba(255, 255, 255, 0.8)";
    Chart.defaults.borderColor = "rgba(255, 255, 255, 0.1)";
    mychart();
    mychart2();
  } else {
    Chart.defaults.color = "rgba(0, 0, 0, 0.65)";
    Chart.defaults.borderColor = "rgba(0, 0, 0, 0.15)";
    mychart();
    mychart2();
  }
});

var str;

var slider = document.querySelectorAll(".slider"); // all the sliders from HTML
var output = document.querySelectorAll(".demo"); // all the output fields from HTML
var myTime = document.querySelector(".myTime");

output[0].innerHTML = slider[0].value;
output[1].innerHTML =
  slider[1].value +
  " m/day, Pore water velocity (v) : " +
  v.toFixed(2) +
  " m/day";
output[2].innerHTML = slider[2].value;
output[3].innerHTML = slider[3].value;
output[4].innerHTML = slider[4].value;
output[5].innerHTML = slider[5].value;
output[6].innerHTML = Math.pow(
  10,
  -(25 - parseFloat(slider[6].value))
).toPrecision(4);
output[7].innerHTML = slider[7].value;
output[8].innerHTML = slider[8].value;

console.log("my", slider[2].value);

// Updating Concentration vs Distance graph

function mychart() {
  let pos = $(document).scrollTop();
  chart1.destroy();

  //initial conditions (without sorption)
  var m = slider[0].value;
  var Area = slider[2].value;
  var n = 0.35;
  var q = slider[1].value;
  var Dstar = Math.pow(10, -(25 - parseFloat(slider[6].value))) * 86400;
  var alphaX = slider[5].value;
  var R = slider[3].value;
  var v = q / n;
  var DL = Dstar + alphaX * v;
  var vR = v / R;
  var DR = DL / R;
  var time = slider[7].value;
  var lambda = slider[4].value;

  var a1 = m / Area / n / Math.sqrt(4 * Math.PI * DR * time);

  const xValues = [
    0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100,
    120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420,
    460, 500,
  ];

  var xyValues = [];

  for (let i = 0; i < xValues.length; i++) {
    var obj = {};
    obj.x = xValues[i];
    var a2 = 0 - (xValues[i] - vR * time) ** 2 / (4 * DR * time);
    var C = a1 * Math.exp(a2) * Math.exp((-Math.log(2) / lambda) * time);
    obj.y = expo(C, 7);
    xyValues.push(obj);
  }

  let yValues = xyValues.map((obj) => parseFloat(obj.y));
  let minY = 0;
  let maxY = Math.floor(Math.max(...yValues) + 5);

  if (maxY <= 100) {
    maxY = 100;
  } else if (maxY > 1000) {
    maxY = 1000;
  }

  chart1 = new Chart(ctx1, {
    type: "scatter",
    data: {
      datasets: [
        {
          backgroundColor: "rgb(153, 102, 255)",
          borderColor: "rgb(153, 102, 255)",
          borderWidth: 1.2,
          pointRadius: 2.5,
          pointBackgroundColor: "rgb(153, 102, 255)",
          data: xyValues,
          fill: false,
          showLine: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      animation: false,
      scales: {
        x: {
          position: "bottom",
          min: 0,
          max: 600,
          title: {
            display: true,
            text: "Distance (m)",
            font: {
              size: 15,
            },
          },
        },
        y: {
          min: minY,
          max: maxY,
          position: "left",
          title: {
            display: true,
            text: "Concentration (mg/L)",
            font: {
              size: 15,
            },
          },
        },
      },
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0Concentration with Distance",
          font: {
            size: getResponsiveFontSize(),
          },
          align: "start",
          padding: {
            bottom: 10,
          },
        },
        legend: {
          display: false,
        },
        zoom: {
          limits: {
            x: { min: 0, max: 35 },
            y: { min: 0, max: 200 },
          },
          pan: {
            enabled: true,
            mode: "y",
          },
          zoom: {
            wheel: {
              enabled: myZoom,
              speed: 0.05,
            },
            pinch: {
              enabled: false,
            },
            mode: "y",
          },
        },
      },
    },
  });
  $(document).scrollTop(pos);
}

// Updating Concentration vs Time graph

function mychart2() {
  let pos = $(document).scrollTop();
  chart2.destroy();

  //initial conditions (without sorption)
  var m = slider[0].value;
  var q = slider[1].value;
  var distance = slider[8].value;
  var n = 0.35;
  v = q / n;
  var Area = slider[2].value;
  var R = slider[3].value;
  var lambda = slider[4].value;
  var vR = v / R;

  var Dstar = Math.pow(10, -(25 - parseFloat(slider[6].value))) * 86400;

  var alphaX = slider[5].value;
  var DL = Dstar + alphaX * v;
  var DR = DL / R;

  var tValues = [
    1, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100,
    120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420,
    460, 500,
  ];

  var tyValues = [];

  for (let i = 0; i < tValues.length; i++) {
    var obj = {};
    obj.x = tValues[i];
    var a1 = m / Area / n / Math.sqrt(4 * Math.PI * DR * tValues[i]);
    var a2 = 0 - (distance - vR * tValues[i]) ** 2 / (4 * DR * tValues[i]);
    var C = a1 * Math.exp(a2) * Math.exp((-Math.log(2) / lambda) * tValues[i]);
    obj.y = C;
    tyValues.push(obj);
  }

  let yValues = tyValues.map((obj) => parseFloat(obj.y));
  let minY = 0;
  let maxY = Math.floor(Math.max(...yValues) + 5);

  if (maxY <= 60) {
    maxY = 60;
  } else if (maxY > 1000) {
    maxY = 1000;
  }

  chart2 = new Chart(ctx2, {
    type: "scatter",
    data: {
      datasets: [
        {
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1.2,
          pointRadius: 2.5,
          pointBackgroundColor: "rgb(255, 99, 132)",
          data: tyValues,
          fill: false,
          showLine: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      animation: false,
      scales: {
        x: {
          position: "bottom",
          min: 0,
          max: 600,
          title: {
            display: true,
            text: "Time (days)",
            font: {
              size: 15,
            },
          },
        },
        y: {
          min: minY,
          max: maxY,
          position: "left",
          title: {
            display: true,
            text: "Concentration (mg/L)",
            font: {
              size: 15,
            },
          },
        },
      },
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0Concentration with Time",
          font: {
            size: getResponsiveFontSize(),
          },
          align: "start",
          padding: {
            bottom: 10,
          },
        },
        legend: {
          display: false,
        },
        zoom: {
          limits: {
            x: { min: 0, max: 35 },
            y: { min: 0 },
          },
          pan: {
            enabled: true,
            mode: "y",
          },
          zoom: {
            wheel: {
              enabled: myZoom,
              speed: 0.05,
            },
            pinch: {
              enabled: false,
            },
            mode: "y",
          },
        },
      },
    },
  });
  $(document).scrollTop(pos);
}

//sliders

slider[0].oninput = function () {
  mychart();
  mychart2();
  output[0].innerHTML = slider[0].value;
};

slider[1].oninput = function () {
  mychart();
  mychart2();
  output[1].innerHTML =
    slider[1].value +
    " m/day, Pore water velocity (v) : " +
    v.toFixed(2) +
    " m/day";
};

slider[2].oninput = function () {
  mychart();
  mychart2();
  output[2].innerHTML = slider[2].value;
  myTime.innerHTML = slider[2].value;
  output[8].innerHTML = slider[2].value;
  output[9].innerHTML = slider[2].value;
};

slider[3].oninput = function () {
  mychart();
  mychart2();
  output[3].innerHTML = slider[3].value;
};

slider[4].oninput = function () {
  mychart();
  mychart2();
  output[4].innerHTML = slider[4].value;
};

slider[5].oninput = function () {
  mychart();
  mychart2();
  output[5].innerHTML = slider[5].value;
};

slider[6].oninput = function () {
  mychart();
  mychart2();
  output[6].innerHTML = Math.pow(
    10,
    -(25 - parseFloat(slider[6].value))
  ).toPrecision(4);
};

slider[7].oninput = function () {
  mychart();
  mychart2();
  output[7].innerHTML = slider[7].value;
};

slider[8].oninput = function () {
  mychart();
  mychart2();
  output[8].innerHTML = slider[8].value;
};

//button
$(".btn").mousedown(function () {
  $(this).addClass("pressed");
});

$(".btn").mouseup(function () {
  $(this).removeClass("pressed");
});

$(".btn").on("tap", function () {
  $(this).removeClass("pressed");
});

$(".btn").mouseout(function () {
  $(this).removeClass("pressed");
});

function downloadExcel1() {
  // Fetch updated slider values
  var m = slider[0].value;
  var Area = slider[2].value;
  var n = 0.35;
  var q = slider[1].value;
  var Dstar = Math.pow(10, -(25 - parseFloat(slider[6].value))) * 86400;
  var alphaX = slider[5].value;
  var R = slider[3].value;
  var v = q / n;
  var DL = Dstar + alphaX * v;
  var vR = v / R;
  var DR = DL / R;
  var time = slider[7].value;
  var lambda = slider[4].value;

  var a1 = m / Area / n / Math.sqrt(4 * Math.PI * DR * time);

  const xValues = [
    0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100,
    120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420,
    460, 500,
  ];


  var xyValues = [];

  for (let i = 0; i < xValues.length; i++) {
    var obj = {};
    obj.x = xValues[i];
    var a2 = 0 - (xValues[i] - vR * time) ** 2 / (4 * DR * time);
    var C = a1 * Math.exp(a2) * Math.exp((-Math.log(2) / lambda) * time);
    obj.y = expo(C, 7);
    xyValues.push(obj);
  }

  // Convert data to CSV format
  var csvContent = "data:text/csv;charset=utf-8,";
  var headers = ["Distance (m)", "Concentration (mg/L)"];
  var rows = [headers];

  for (var i = 0; i < xyValues.length; i++) {
    var row = [xyValues[i].x, xyValues[i].y];
    rows.push(row);
  }

  rows.forEach(function (rowArray) {
    var row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  // Create a link and trigger the download
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "chart_data.csv");
  document.body.appendChild(link);
  link.click();
}

function downloadExcel2() {
  // Fetch updated slider values
  var m = slider[0].value;
  var q = slider[1].value;
  var distance = slider[8].value;
  var n = 0.35;
  v = q / n;
  var Area = slider[2].value;
  var R = slider[3].value;
  var lambda = slider[4].value;
  var vR = v / R;

  var Dstar = Math.pow(10, -(25 - parseFloat(slider[6].value))) * 86400;

  var alphaX = slider[5].value;
  var DL = Dstar + alphaX * v;
  var DR = DL / R;

  var tValues = [
    1, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100,
    120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420,
    460, 500,
  ];
  var tyValues = [];

  for (let i = 0; i < tValues.length; i++) {
    var obj = {};
    obj.x = tValues[i];
    var a1 = m / Area / n / Math.sqrt(4 * Math.PI * DR * tValues[i]);
    var a2 = 0 - (distance - vR * tValues[i]) ** 2 / (4 * DR * tValues[i]);
    var C = a1 * Math.exp(a2) * Math.exp((-Math.log(2) / lambda) * tValues[i]);
    obj.y = C;
    tyValues.push(obj);
  }

  // Convert data to CSV format
  var csvContent = "data:text/csv;charset=utf-8,";
  var headers = ["Distance (m)", "Concentration (mg/L)"];
  var rows = [headers];

  for (var i = 0; i < tyValues.length; i++) {
    var row = [tyValues[i].x, tyValues[i].y];
    rows.push(row);
  }

  rows.forEach(function (rowArray) {
    var row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  // Create a link and trigger the download
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "chart_data.csv");
  document.body.appendChild(link);
  link.click();
}
