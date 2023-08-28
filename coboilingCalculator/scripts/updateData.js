const database = {
  soils: [
    {
      id: 1,
      name: "Ottawa Sand(#25)",
      type: "sand",
      residual: 0.069,
      displacement: 434,
      porosity: 0.35,
      lambda: 3.51,
      reference:
        "https://www.sciencedirect.com/science/article/abs/pii/S0309170811000248?via%3Dihub",
    },
    {
      id: 2,
      name: "Borden Sand",
      type: "sand",
      residual: 0.045,
      displacement: 2268,
      porosity: 0.42,
      lambda: 1.6,
      reference:
        "Effect of Interfacial Forces on Two-Phase Capillary Pressure-Saturation Relationships",
    },
    {
      id: 3,
      name: "Vinton Soil",
      type: "sand",
      residual: 0.155,
      displacement: 3401,
      porosity: 0.39,
      lambda: 2.27,
      reference:
        "Relationships among air-water interfacial area, capillary pressure, and water saturation for a sandy porous medium",
    },
    {
      id: 4,
      name: "F75 Silica",
      type: "silica",
      residual: 0.08,
      displacement: 4430,
      porosity: 0.367,
      lambda: 4.17,
      reference:
        "The effect of temperature on capillary pressure-saturation relationships for air-water and perchloroethylene-water systems",
    },
    {
      id: 5,
      name: "SU4",
      type: "silty sand",
      residual: 0.129,
      displacement: 12748,
      porosity: 0.43,
      lambda: 0.334,
      reference:
        "Linear Elastic Wave Propagation in Unsaturated Sands, Silts, Loams and Clays",
    },
  ],
  contaminants: [
    { id: 1, name: "111-TCA", mw: 133.405, a: 9.777, b: 4133, sl: 1330 },
    { id: 2, name: "PCE", mw: 165.834, a: 12.5, b: 4918, sl: 206 },
    { id: 3, name: "TCE", mw: 131.4, a: 11.37, b: 4780, sl: 1236 },
    { id: 4, name: "Chloroform", mw: 119.37, a: 9.843, b: 4612, sl: 8000 },
    { id: 5, name: "Benzene", mw: 78.11, a: 5.5379, b: 3216.8, sl: 1800 },
    { id: 6, name: "Toluene", mw: 92.14, a: 7.3502, b: 3729.7, sl: 526 },
    {
      id: 7,
      name: "1,2-Dichloropropane",
      mw: 112.98,
      a: 6.8561,
      b: 3813.7,
      sl: 2600,
    },
    { id: 8, name: "Napthylene", mw: 128.17, a: 14.993, b: 6741.1, sl: 31 },
    { id: 9, name: "Fluorene", mw: 166.22, a: 18.771, b: 8475, sl: 1.69 },
    { id: 10, name: "Pyrene", mw: 202.25, a: 23.797, b: 10497, sl: 0.135 },
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  populateContaminants();
  populateSoilDataList();
});

function populateContaminants() {
  const contaminantList = document.getElementById("contaminant_choice");
  
  // Add default empty option
  const defaultOption = document.createElement("option");
  defaultOption.text = "Select a contaminant";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  contaminantList.appendChild(defaultOption);

  // Add other options
  for (let i = 0; i < database.contaminants.length; i++) {
    const option = document.createElement("option");
    option.value = `${database.contaminants[i].id}. ${database.contaminants[i].name}`;
    option.text = `${database.contaminants[i].id}. ${database.contaminants[i].name}`;
    contaminantList.appendChild(option);
  }
}

function populateSoilDataList() {
  const soilsList = document.getElementById("soil_choice");
  
  // Add default empty option
  const defaultOption = document.createElement("option");
  defaultOption.text = "Select a soil type";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  soilsList.appendChild(defaultOption);

  // Add other options
  for (let i = 0; i < database.soils.length; i++) {
    const option = document.createElement("option");
    option.value = `${database.soils[i].id}. ${database.soils[i].name}`;
    option.text = `${database.soils[i].id}. ${database.soils[i].name}`;
    soilsList.appendChild(option);
  }
}


function update(value, type) {
  if (type === "contaminant") {
    let id = parseInt(value.split(".")[0]) - 1;
    const selectedContaminant = database.contaminants[id];
    document.getElementById("mw").value = selectedContaminant.mw || "";
    document.getElementById("sl").value = selectedContaminant.sl || "";
    document.getElementById("a").value = selectedContaminant.a || "";
    document.getElementById("b").value = selectedContaminant.b || "";
    document.getElementById("depth").value = 10;
  } else if (type === "soil") {
    let id = parseInt(value.split(".")[0]) - 1;
    let selectedSoil = database.soils[id];
    if (selectedSoil) {
      document.getElementById("dp").value = selectedSoil.displacement || "";
      document.getElementById("swr").value = selectedSoil.residual || "";
      document.getElementById("n").value = selectedSoil.porosity || "";
      document.getElementById("l").value = selectedSoil.lambda || "";
    }
  }
}
