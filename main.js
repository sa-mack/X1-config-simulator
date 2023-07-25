import { Reactor, reactors } from "./Reactor.js";
import { Engine, engines } from "./Engine.js";
import { Module, modules } from "./Module.js";
import { Mount, mounts } from "./Mount.js";
import { Frame, frames } from "./Frame.js";
import { Ship } from "./Ship.js";

const frameEl = document.getElementById("frame");
const reactorEl = document.getElementById("reactor");
const engineEl = document.getElementById("engine");
const moduleEl = document.getElementById("modules");
const mountEl = document.getElementById("mounts");
const frameList = document.getElementById("frame-select");
const frameImg = document.getElementById("frame-image");

const jumpRange = document.getElementById("jump-range");
const warpRange = document.getElementById("warp-range");
const cargoCapacity = document.getElementById("cargo-capacity");
const passengerCapacity = document.getElementById("passenger-capacity");
const envoyCapacity = document.getElementById("envoy-capacity");
const refiningTargets = document.getElementById("refining-targets");

const oreStrength = document.getElementById("ore-mining");
const gasStrength = document.getElementById("gas-mining");
const surveysProduced = document.getElementById("survey-number");
const surveyDeposits = document.getElementById("survey-deposits");
const sensorStrength = document.getElementById("sensor-strength");

const hangar = {
  ship: null,
  setShip(ship) {
    this.ship = ship;
  },
  resetShip() {
    this.ship = null;
  },
  getShip() {
    return this.ship;
  },
};

function populateModules() {
  const modulesList = document.createElement("select");
  modulesList.classList.add("module-select");
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "SELECT MODULE";
  modulesList.appendChild(empty);

  for (const module of modules) {
    const option = document.createElement("option");
    option.value = module.symbol;
    option.text = `${module.moduleName} [ ${module.slotsRequired} ]`;
    modulesList.appendChild(option);
  }
  return modulesList;
}

function populateMounts(mountingPoint) {
  const mountsList = document.createElement("select");
  mountsList.classList.add(`mountSelect-${mountingPoint}`);
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "SELECT MOUNT";
  mountsList.appendChild(empty);
  for (const mount of mounts) {
    const option = document.createElement("option");
    option.value = mount.symbol;
    option.text = mount.mountName;
    mountsList.appendChild(option);
  }

  return mountsList;
}
function populateFrames() {
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "[ SELECT FRAME TO BEGIN ]";
  frameList.appendChild(empty);
  for (const frame of frames) {
    const option = document.createElement("option");
    option.value = frame.symbol;
    option.text = frame.frameName;
    frameList.appendChild(option);
  }
}
function populateReactors() {
  const reactorList = document.createElement("select");
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "SELECT REACTOR";
  reactorList.appendChild(empty);
  for (const reactor of reactors) {
    const option = document.createElement("option");
    option.value = reactor.symbol;
    option.text = reactor.reactorName;
    reactorList.appendChild(option);
  }
  return reactorList;
}
function populateEngines() {
  const engineList = document.createElement("select");
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "SELECT ENGINE";
  engineList.appendChild(empty);
  for (const engine of engines) {
    const option = document.createElement("option");
    option.value = engine.symbol;
    option.text = engine.engineName;
    engineList.appendChild(option);
  }

  return engineList;
}
function getFrameDetails() {
  const ship = hangar.getShip();

  const frameDetails = document.createElement("div");
  frameDetails.classList.add("frame-details");
  const frameSpecs = document.createElement("p");
  frameSpecs.innerHTML =
    "POWER REQUIRED: " +
    ship.frame.powerRequired +
    "<br>" +
    "CREW REQUIRED: " +
    ship.frame.crewRequired +
    "<br>" +
    "FUEL CAPACITY: " +
    ship.frame.fuelCapacity +
    "<br>" +
    "MODULE SLOTS: " +
    ship.frame.moduleSlots +
    "<br>" +
    "MOUNTING POINTS: " +
    ship.frame.mountingPoints +
    "<br>";

  frameDetails.appendChild(frameSpecs);

  const frameDesc = document.createElement("p");
  frameDesc.textContent = ship.frame.description;
  frameDetails.appendChild(frameDesc);
  return frameDetails;
}
function handleFrameSelection() {
  frameEl.innerHTML = "";
  const selection = frameList.value;
  const selectedFrame = frames.find((frame) => frame.symbol === selection);

  const ship = new Ship(selectedFrame);

  hangar.setShip(ship);

  const frameDetails = getFrameDetails();
  frameEl.appendChild(frameDetails);

  if (ship.reactor == null) {
    updateReactorOutput(0);
  } else {
    updateReactorOutput(ship.reactor.powerOutput);
  }
  updateCrewCapacity(ship.calculateTotalCrewCapacity());
  updateTotalPower(ship.calculateTotalPower());
  updateCrewRequired(ship.calculateTotalCrewRequired());
  setFrameImgSrc();

  const reactorOptions = populateReactors();
  reactorEl.innerHTML = "";
  reactorEl.appendChild(reactorOptions);
  if (ship.reactor) {
    const reactorDetails = getReactorDetails();
    reactorEl.appendChild(reactorDetails);
  }
  attachReactorListener(reactorOptions);

  const engineOptions = populateEngines();
  engineEl.innerHTML = "";
  engineEl.appendChild(engineOptions);
  if (ship.engine) {
    const engineDetails = getEngineDetails();
    engineEl.appendChild(engineDetails);
  }
  attachEngineListener(engineOptions);


  moduleEl.innerHTML = "";
  const slots = selectedFrame.moduleSlots;
  const slotCount = document.createElement("p");
  slotCount.classList.add("slot-count");
  slotCount.innerHTML = `SLOTS REMAINING: ${slots}` + "<br>";
  moduleEl.appendChild(slotCount);

    const moduleOptions = populateModules();
    moduleEl.appendChild(moduleOptions);
    attachModulesListener(moduleOptions);
  






  //populate mount lists []
  mountEl.innerHTML = "";
  const points = selectedFrame.mountingPoints;

  for (let i = 0; i < points; i++) {
    const mountOptions = populateMounts(i);
    mountEl.appendChild(mountOptions);
    attachMountsListener(mountOptions, i);
  }
}
function getReactorDetails() {
  const ship = hangar.getShip();

  const existingElements = document.querySelectorAll(".reactor-details");
  existingElements.forEach((element) => element.remove());

  const reactorDetails = document.createElement("div");
  reactorDetails.classList.add("reactor-details");

  const reactorSpecs = document.createElement("p");
  reactorSpecs.innerHTML =
    "POWER OUTPUT: " +
    ship.reactor.powerOutput +
    "<br>" +
    "CREW REQUIRED: " +
    ship.reactor.crewRequired +
    "<br>";
  reactorDetails.appendChild(reactorSpecs);
  const reactorDesc = document.createElement("p");
  reactorDesc.textContent = ship.reactor.description;

  reactorDetails.appendChild(reactorDesc);
  return reactorDetails;
}
function getEngineDetails() {
  const ship = hangar.getShip();

  const engineDetails = document.createElement("div");
  engineDetails.classList.add("engine-details");

  const engineSpecs = document.createElement("p");
  engineSpecs.innerHTML =
    "POWER REQUIRED: " +
    ship.engine.powerRequired +
    "<br>" +
    "CREW REQUIRED: " +
    ship.engine.crewRequired +
    "<br>" +
    "SPEED: " + ship.engine.speed;
  engineDetails.appendChild(engineSpecs);
  const engineDesc = document.createElement("p");
  // engineDesc.classList.add("engine-details");
  engineDesc.textContent = ship.engine.description;
  engineDetails.appendChild(engineDesc);
  return engineDetails;
}


function getModuleDetails(selectedMod) {

  const moduleDetails = document.createElement("div");
  moduleDetails.classList.add(`module-details`);

  moduleDetails.innerHTML =
  `MODULE: ${selectedMod.moduleName}` + "<br>" +
  `SLOTS [${selectedMod.slotsRequired}] ` +
    `PWR [${selectedMod.powerRequired}] ` +
    `CREW [${selectedMod.crewRequired}] ` + "<br> <br>" +
    `${selectedMod.description}` + "<br>";

  const addBtn = document.createElement("button");

  addBtn.classList.add("add-module-btn");
  addBtn.textContent = "[ ATTACH ]";

  addBtn.addEventListener("click", function () {

    const ship = hangar.getShip();


      const attached = ship.attachModule(selectedMod);

      if (attached) {
        const modulesList = document.querySelector(".module-select");
        modulesList.value = "";

        moduleDetails.remove();


        
        const slottedEl = document.createElement("div");
        slottedEl.classList.add("slotted-module");
        slottedEl.classList.add(`${selectedMod.symbol}`);
        slottedEl.innerHTML = `${selectedMod.moduleName} `;

        const rmBtn = document.createElement("button");
        rmBtn.classList.add("remove-module-btn");
        rmBtn.textContent = "[ DETACH ]";
        rmBtn.addEventListener("click", function () {
          const removed = ship.removeModule(selectedMod);
          if (removed) {

          slottedEl.remove();
          updateSlotsRemaining();
          updateTotalPower(ship.calculateTotalPower());
          updateCrewRequired(ship.calculateTotalCrewRequired());
          updateCrewCapacity(ship.calculateTotalCrewCapacity());
          updateModuleEffects();
          updateMountEffects();
          }
          else {
            console.log(removed);
          }
        });
        slottedEl.appendChild(rmBtn);
        

        moduleEl.insertBefore(slottedEl, modulesList);





        // moduleEl.appendChild(slottedEl);

        //update slots remaining
        updateSlotsRemaining();

        updateTotalPower(ship.calculateTotalPower());
        updateCrewRequired(ship.calculateTotalCrewRequired());
        updateCrewCapacity(ship.calculateTotalCrewCapacity());
        updateModuleEffects();
        updateMountEffects();
      }
      else {
        alert("NOT ENOUGH SLOTS!");

      }
    
  });

  moduleDetails.appendChild(addBtn);

  return moduleDetails;
}

function getMountDetails(selectedMount, point) {
  const mountDetails = document.createElement("div");
  mountDetails.classList.add(`mount-details`);
  mountDetails.classList.add(`point-${point}`);
  mountDetails.innerHTML =
    `PWR[${selectedMount.powerRequired}]` +
    `CREW[${selectedMount.crewRequired}]`;
  return mountDetails;
}
function resetSimulation() {
  frameEl.innerHTML = "";
  reactorEl.innerHTML = "";
  engineEl.innerHTML = "";
  moduleEl.innerHTML = "";
  mountEl.innerHTML = "";
  hangar.resetShip();
}

function updateSlotsRemaining () {
  const ship = hangar.getShip();
  const modules = ship.modules;
  const slots = ship.frame.moduleSlots;
  let slotsOccupied = 0;
  for (let mod of modules) {
    if (mod !== null) {
      slotsOccupied += mod.slotsRequired;
    }
  }
  const modulesList = document.querySelector(".module-select");
  if (slots - slotsOccupied === 0){
    modulesList.style.display = "none";
  }
  else {
    modulesList.style.display = "block";
  }
  const slotCount = document.querySelector(".slot-count");
  slotCount.textContent = `SLOTS REMAINING: ${slots - slotsOccupied}`;

}

frameList.addEventListener("change", handleFrameSelection);

window.onload = () => {
  populateFrames();
};

function attachReactorListener(reactorList) {
  reactorList.addEventListener("change", function () {
    const existingElements = document.querySelectorAll(".reactor-details");
    existingElements.forEach((element) => element.remove());

    const ship = hangar.getShip();
    const selection = reactorList.value;
    const selectedReactor = reactors.find(
      (reactor) => reactor.symbol === selection
    );

    if (!ship.reactor) {
      ship.attachReactor(selectedReactor);
    } else {
      ship.swapReactor(selectedReactor);
    }
    const reactorDetails = getReactorDetails();
    reactorEl.appendChild(reactorDetails);
    updateReactorOutput(selectedReactor.powerOutput);
    updateTotalPower(ship.calculateTotalPower());
    updateCrewRequired(ship.calculateTotalCrewRequired());
  });
}
function attachEngineListener(engineList) {
  engineList.addEventListener("change", function () {
    const existingElements = document.querySelectorAll(".engine-details");
    existingElements.forEach((element) => element.remove());
    const ship = hangar.getShip();
    const selection = engineList.value;
    const selectedEngine = engines.find(
      (engine) => engine.symbol === selection
    );

    if (!ship.engine) {
      ship.attachEngine(selectedEngine);
    } else {
      ship.swapEngine(selectedEngine);
    }
    const engineDetails = getEngineDetails();
    engineEl.appendChild(engineDetails);

    updateTotalPower(ship.calculateTotalPower());
    updateCrewRequired(ship.calculateTotalCrewRequired());
  });
}
function updateMountEffects() {
  const effectsContainer = document.getElementById("mount-effects");
  effectsContainer.style.display = "block";
  const existing = document.querySelectorAll(".deposit-targets");
  existing.forEach((element) => element.remove());
  const ship = hangar.getShip();
  const mounts = ship.mounts;
  let sensor = 0;
  let miningOre = 0;
  let miningGas = 0;
  let surveys = 0;
  let depositsLength = 0;
  let deposits = [];
  sensorStrength.innerHTML = "";
  oreStrength.innerHTML = "";
  gasStrength.innerHTML = "";
  surveysProduced.innerHTML = "";
  surveyDeposits.innerHTML = "";
  for (const mount of mounts) {
    if (mount !== null) {
      miningOre += parseInt(mount.miningStrengthOre) || 0;
      miningGas += parseInt(mount.miningStrengthGas) || 0;
      surveys += parseInt(mount.surveysProduced) || 0;
      sensor += parseInt(mount.sensorStrength) || 0;
      if (mount.deposits.length > 0) {
        if (mount.deposits.length > depositsLength) {
          depositsLength = mount.deposits.length;
        }
        for (const deposit of mount.deposits) {
          const noUnderscore = deposit.replace(/_/g, " ");
          if (!deposits.includes(noUnderscore)) {
            deposits.push(noUnderscore);
          }
        }
      }
    }
  }
  sensorStrength.textContent = parseInt(sensor);

  const modules = ship.modules;
  const filteredModules = modules.filter((module) => module !== null);
  const mineralProcessor = filteredModules.find(
    (module) => module.symbol === "MODULE_MINERAL_PROCESSOR_I"
  );
  if (mineralProcessor || miningOre == 0) {
    oreStrength.textContent = parseInt(miningOre);
    oreStrength.style.color = "#f4eee3";
  } else {
    oreStrength.textContent = "[NO MINERAL PROCESSOR]";
    oreStrength.style.color = "#df5337";
  }

  gasStrength.textContent = parseInt(miningGas);
  surveysProduced.textContent = parseInt(surveys);
  surveyDeposits.textContent = `${deposits.length} / 14`;

  const depositTargets = document.createElement("div");
  depositTargets.classList.add("deposit-targets");
  for (const deposit of deposits) {
    depositTargets.innerHTML += `░ ${deposit}<br>`;
  }
  effectsContainer.appendChild(depositTargets);
}
function attachMountsListener(mountsList, point) {
  mountsList.addEventListener("change", function () {
    const existingElements = document.querySelectorAll(`.point-${point}`);
    existingElements.forEach((element) => element.remove());

    const ship = hangar.getShip();
    const selection = mountsList.value;

    if (selection === "") {
      ship.mounts[point] = null;

      updateTotalPower(ship.calculateTotalPower());
      updateCrewRequired(ship.calculateTotalCrewRequired());
      updateCrewCapacity(ship.calculateTotalCrewCapacity());
      updateMountEffects();
      updateModuleEffects();
    } else {
      const selectedMount = mounts.find((mount) => mount.symbol === selection);

      const attached = ship.attachMount(selectedMount, point);
      if (attached) {
        const mountDetails = getMountDetails(selectedMount, point);
        mountsList.parentNode.insertBefore(
          mountDetails,
          mountsList.nextSibling
        );
        updateTotalPower(ship.calculateTotalPower());
        updateCrewRequired(ship.calculateTotalCrewRequired());
        updateMountEffects();
        updateModuleEffects();
      }
    }
  });
}

function updateModuleEffects() {
  const existing = document.querySelectorAll(".refining-targets");
  existing.forEach((element) => element.remove());
  const effectsContainer = document.getElementById("module-effects");
  const ship = hangar.getShip();

  const modules = ship.modules;
  let cargo = 0;
  let passengers = 0;
  let envoys = 0;
  let warp = 0;
  let jump = 0;
  let refinings = [];
  cargoCapacity.innerHTML = "";
  passengerCapacity.innerHTML = "";
  envoyCapacity.innerHTML = "";
  warpRange.innerHTML = "";
  jumpRange.innerHTML = "";
  refiningTargets.innerHTML = "";

  for (let i = 0; i < modules.length; i++) {
    if (modules[i] == null) {
      continue;
    }

    cargo += parseInt(modules[i].cargoCapacity) || 0;
    passengers += parseInt(modules[i].passengerCapacity) || 0;
    envoys += parseInt(modules[i].envoyCapacity) || 0;
    warp += parseInt(modules[i].warpRange) || 0;
    jump += parseInt(modules[i].jumpRange) || 0;

    if (modules[i].refiningTargets.length > 0) {
      for (const target of modules[i].refiningTargets) {
        const formatted = target.replace(/_/g, " ");
        if (!refinings.includes(formatted)) {
          refinings.push(formatted);
        }
      }
    }

  }

  const refiningsContainer = document.createElement("div");
  refiningsContainer.classList.add("refining-targets");
  for (const refine of refinings) {
    refiningsContainer.innerHTML += `░ ${refine} <br>`;
  }
  effectsContainer.appendChild(refiningsContainer);

  cargoCapacity.textContent = parseInt(cargo);
  passengerCapacity.textContent = parseInt(passengers);
  envoyCapacity.textContent = parseInt(envoys);
  warpRange.textContent = parseInt(warp);
  jumpRange.textContent = parseInt(jump);
}



function attachModulesListener(modulesList) {
  modulesList.addEventListener("change", function () {

    const existing = document.querySelectorAll(".module-details");
    existing.forEach((element) => element.remove());

    const selection = modulesList.value;
      const selectedModule = modules.find(
        (module) => module.symbol === selection
      );
      const moduleDetails = getModuleDetails(selectedModule);
      moduleEl.appendChild(moduleDetails);
    
  });
}

const reactorOutput = document.getElementById("reactor-output");
const totalPower = document.getElementById("total-power");
const crewRequired = document.getElementById("total-crew-required");
const crewCapacity = document.getElementById("total-crew-capacity");

function updateTotalPower(power) {
  totalPower.textContent = `${power}`;
  const powerOut = reactorOutput.textContent;
  if (powerOut < power || powerOut === "[NO REACTOR]") {
    totalPower.style.color = "#df5337";
  } else {
    totalPower.style.color = "white";
  }
}

function updateReactorOutput(output) {
  if (output > 0) {
    reactorOutput.textContent = `${output}`;
    reactorOutput.style.color = "white";
  } else {
    reactorOutput.textContent = "[NO REACTOR]";
    reactorOutput.style.color = "#df5337";
  }
}
function updateCrewRequired(crew) {
  const ship = hangar.getShip();
  const crewCapacity = ship.calculateTotalCrewCapacity();
  crewRequired.textContent = `${crew}`;
  if (crew > crewCapacity) {
    crewRequired.style.color = "#df5337";
  } else {
    crewRequired.style.color = "white";
  }
}
function updateCrewCapacity(capacity) {
  const ship = hangar.getShip();
  const crewRequired = ship.calculateTotalCrewRequired();

  crewCapacity.textContent = `${capacity}`;
  if (capacity < crewRequired) {
    crewCapacity.style.color = "#df5337";
  } else {
    crewCapacity.style.color = "white";
  }
}
function setFrameImgSrc() {
  const ship = hangar.getShip();
  const frame = ship.frame;
  frameImg.src = `img/${frame.symbol}.png`;
}
