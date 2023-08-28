//preloader
var loader = setInterval(function () {
  if(document.readyState !== "complete") return;
  clearInterval(loader);
  document.querySelector('.spinner-wrapper').style.display = "none";
}, 250);

//helper functions
function ERFC(value1){
  return 1-math.erf(value1);
}

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

var myZoom1 = false;
var myZoom2 = false;

function toggleZoom1(){
  if(myZoom1==true){
    myZoom1 = false;
  }else{
  myZoom1 = true;
  }
  mychart();
}

function toggleZoom2(){
  if(myZoom2==true){
    myZoom2 = false;
  }else{
  myZoom2 = true;
  }
}

document.getElementById("downloadButton").addEventListener("click", downloadExcel);

// Initial Concentration vs Time graph on page load

var Q = 3.66; 
var b = 1.75; 
var c = 133; 
var Area = 20;
var n = 0.35;
var q = Q/Area; 
var v = 0.187;
var Dstar = Math.pow(10, -16) * 86400; 
var alphaX = 4.919;
var alphaY = 0.4919;
var DL = (alphaX*v) + Dstar;
var DT = (alphaY*v) + Dstar
var R = 1; 
var DLR = DL/R;
var DTR = DT/R;
var vR = v/R;

var lambda = 10000; 
var y = 16; 
var x = 123;
var time = 10; 

var ctx1 = document.getElementById("canvas1").getContext("2d");

  const xValues = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];

  var xyValues = [];

  for(let i =0; i<xValues.length; i++){

    var obj = {};
    obj.x = xValues[i];
    var a1 = Q*c/b/(2*Math.PI*(DTR*DLR)**0.5)*Math.exp(vR*xValues[i]/(2*DLR));
    var a2 = ((vR**2)/(4*DLR)*(((xValues[i]**2)/DLR)+(y**2)/DTR))**0.5;
    var C = a1*BESSEL.besselk(a2,0)*Math.exp((-Math.log(2)/lambda)*time);
    obj.y = C.toFixed(2);
    xyValues.push(obj);
  }

  Chart.defaults.color = 'rgba(0, 0, 0, 0.65)';
  Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.15)';
  if (document.body.classList.contains('dark-theme')) {
    Chart.defaults.color = 'rgba(255, 255, 255, 0.8)';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
  }

var chart1 = new Chart(ctx1,{
  type: 'scatter',
  data: {
    datasets: [{
      backgroundColor: 'rgb(153, 102, 255)',
      borderColor: 'rgb(153, 102, 255)',
      borderWidth:1.2,
      pointRadius:2.5,
      pointBackgroundColor: 'rgb(153, 102, 255)',
      data: xyValues,
      fill: false,
      showLine: true,
      tension:0.4
    }]
  },
  options: {
    animation: false,
    scales: {
      x: {
        position: 'bottom',
        min: 0, max:600,
        title: {
          display: true,
          text: 'Distance (m)',
          font: {
            size: 15
        }
      }
      },
      y:{
        min: 0,
        max: 35,
        position: 'left',
        title: {
          display: true,
          text: 'Concentration (mg/L)',
          font: {
            size: 15
        }
      }
    }
  },
  responsive: true,
    plugins: {
      title: {
          display: true,
          text: 'Concentration with Distance',
          font: {
            size: 17
        }
      },
      legend: {
        display: false
    },
    zoom: {
      limits: {
        x: {min: 0, max: 600},
        y: {min: 0}
      },
      pan: {
        enabled: true,
        mode: 'y',
      },
      zoom: {
        wheel: {
          enabled: myZoom1,
          speed:0.05
        },
        pinch: {
          enabled: false
        },
        mode: 'y',
      }
    }
  }
}});

themeSwitcher = document.querySelector('#darkmode-toggle');
themeSwitcher.addEventListener('click', function () {
  if(document.body.classList.contains('light-theme')){
    Chart.defaults.color = 'rgba(255, 255, 255, 0.8)';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    mychart()
    mychart2()
  }else{
    Chart.defaults.color = 'rgba(0, 0, 0, 0.65)';
    Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.15)';
    mychart()
    mychart2()
  }
})

var str; 

var slider = document.querySelectorAll(".slider"); // all the sliders from HTML
var output = document.querySelectorAll(".demo");  // all the output fields from HTML
var flow = document.querySelector(".flow");

output[0].innerHTML = slider[0].value;
output[1].innerHTML = slider[1].value;
flow.innerHTML = "Darcy velocity (q): " + q.toFixed(2) + " m/day";
output[2].innerHTML = slider[2].value;
output[3].innerHTML = slider[3].value;
output[4].innerHTML = slider[4].value;
output[5].innerHTML = slider[5].value;
output[6].innerHTML = slider[6].value;
output[7].innerHTML = slider[7].value;
output[8].innerHTML = (Math.pow(10, -(25 - parseFloat(slider[8].value)))).toPrecision(4);

  // Updating Concentration vs Distance graph

  function mychart(){
    let pos = $(document).scrollTop();
    chart1.destroy();
    
    //initial conditions (without sorption)
    var Area = 20; // area constant cause area not in equation
    var n = 0.35;

    var alphaX = parseFloat(slider[7].value);
    var alphaY = parseFloat(slider[6].value);

    var c = parseFloat(slider[0].value);
    var Q = parseFloat(slider[1].value);
    var R = parseFloat(slider[2].value);  
    var b = parseFloat(slider[3].value); 
    var y = parseFloat(slider[4].value); 
    var lambda = parseFloat(slider[5].value); 
    var Dstar = Math.pow(10, -(25 - parseFloat(slider[8].value)));
    console.log( Dstar);
  

    q = Q/Area; 
    v = 0.187;
    var DL = (alphaX*v) + (Dstar * 86400);
    console.log("DL", DL);
    var DT = (alphaY*v) + (Dstar * 86400);
    var DLR = DL/R;
    var DTR = DT/R;
    var vR = v/R;
    

    
    const xValues = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];

    var xyValues = [];
  
    for(let i = 0; i<xValues.length; i++){
  
      var obj = {};
      obj.x = xValues[i];
      var a1 = Q*c/b/(2*Math.PI*(DTR*DLR)**0.5)*Math.exp(vR*xValues[i]/(2*DLR));
      var a2 = ((vR**2)/(4*DLR)*(((xValues[i]**2)/DLR)+(y**2)/DTR))**0.5;
      var C = a1*BESSEL.besselk(a2,0)*Math.exp((-Math.log(2)/lambda)*time);
      obj.y = C.toFixed(2);
      xyValues.push(obj);
    }

    let yValues = xyValues.map(obj => parseFloat(obj.y));
    let minY = 0;
    let maxY = Math.floor((Math.max(...yValues) + 5));
    
    if (maxY <= 35) {
      maxY = 35;
    }else if (maxY > 1000) {
      maxY = 1000;
    }
  
  chart1 = new Chart(ctx1,{
    type: 'scatter',
    data: {
      datasets: [{
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth:1.2,
        pointRadius:2.5,
        pointBackgroundColor: 'rgb(153, 102, 255)',
        data: xyValues,
        fill: false,
        showLine: true,
        tension:0.4
      }]
    },
    options: {
      animation: false,
      scales: {
        x: {
          position: 'bottom',
          min: 0, max:600,
          title: {
            display: true,
            text: 'Distance (m)',
            font: {
              size: 15
          }
        }
        },
        y:{
          min: minY,
          max: maxY,
          position: 'left',
          title: {
            display: true,
            text: 'Concentration (mg/L)',
            font: {
              size: 15
          }
        }
      }
    },
    responsive: true,
      plugins: {
        title: {
            display: true,
            text: 'Concentration with Distance',
            font: {
              size: 17
          }
        },
        legend: {
          display: false
      },
      zoom: {
        limits: {
          x: {min: 0, max: 35},
          y: {min: 0}
        },
        pan: {
          enabled: true,
          mode: 'y',
        },
        zoom: {
          wheel: {
            enabled: myZoom1,
            speed:0.05
          },
          pinch: {
            enabled: false
          },
          mode: 'y',
        }
      }
    }
  }});
  // downloadExcel();
  $(document).scrollTop(pos);
  }

//sliders
slider[0].oninput = function() {
 mychart();
output[0].innerHTML = slider[0].value;
  }

slider[1].oninput = function() {
 mychart();
output[1].innerHTML = slider[1].value;
flow.innerHTML = "Darcy velocity (q): " + q.toFixed(2) + " m/day";
  }

slider[2].oninput = function() {
 mychart();
output[2].innerHTML = slider[2].value;
  }

slider[3].oninput = function() {
 mychart();
 output[3].innerHTML = slider[3].value;
 myTime.innerHTML = slider[3].value;
  }

slider[4].oninput = function() {
 mychart();
output[4].innerHTML = slider[4].value;
  }

slider[5].oninput = function() {
 mychart();
output[5].innerHTML = slider[5].value;
  }

slider[6].oninput = function() {
  mychart();

  output[6].innerHTML = slider[6].value;
    }

    slider[7].oninput = function() {
      mychart();
    
      output[7].innerHTML = slider[7].value;
        }

        slider[8].oninput = function() {
          mychart();
        
          output[8].innerHTML = (Math.pow(10, -(25 - parseFloat(slider[8].value)))).toPrecision(4);
            }

  //button
  $(".btn").mousedown(function(){
    $(this).addClass("pressed");
});

$(".btn").mouseup(function(){
    $(this).removeClass("pressed");
});



$(".btn").on("tap",function(){
    $(this).removeClass("pressed");
});

$(".btn").mouseout(function(){
    $(this).removeClass("pressed");
});

function downloadExcel() {
  // Fetch updated slider values
  var Area = 20; // area constant cause area not in equation
  var n = 0.35;

  var alphaX = parseFloat(slider[7].value);
  var alphaY = parseFloat(slider[6].value);

  var c = parseFloat(slider[0].value);
  var Q = parseFloat(slider[1].value);
  var R = parseFloat(slider[2].value);  
  var b = parseFloat(slider[3].value); 
  var y = parseFloat(slider[4].value); 
  var lambda = parseFloat(slider[5].value); 
  var Dstar = Math.pow(10, -(25 - parseFloat(slider[8].value)));
  console.log( Dstar);


  q = Q/Area; 
  v = 0.187;
  var DL = (alphaX*v) + (Dstar * 86400);
  console.log("DL", DL);
  var DT = (alphaY*v) + (Dstar * 86400);
  var DLR = DL/R;
  var DTR = DT/R;
  var vR = v/R;
  

  
  const xValues = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];

  var xyValues = [];

  for(let i =0; i<xValues.length; i++){

    var obj = {};
    obj.x = xValues[i];
    var a1 = Q*c/b/(2*Math.PI*(DTR*DLR)**0.5)*Math.exp(vR*xValues[i]/(2*DLR));
    var a2 = ((vR**2)/(4*DLR)*(((xValues[i]**2)/DLR)+(y**2)/DTR))**0.5;
    var C = a1*BESSEL.besselk(a2,0)*Math.exp((-Math.log(2)/lambda)*time);
    obj.y = C.toFixed(2);
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

