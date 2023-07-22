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
  }
};

function populateModules(moduleSlot) {
  const modulesList = document.createElement("select");
  modulesList.classList.add(`moduleSelect-${moduleSlot}`);
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "[NO MODULE]";
  modulesList.appendChild(empty);
  for (const module of modules) {
    const option = document.createElement("option");
    option.value = module.symbol;
    option.text = module.symbol;
    modulesList.appendChild(option);
  }

  return modulesList;
}
function populateMounts(mountingPoint) {
  const mountsList = document.createElement("select");
  mountsList.classList.add(`mountSelect-${mountingPoint}`);
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "[NO MOUNT]";
  mountsList.appendChild(empty);
  for (const mount of mounts) {
    const option = document.createElement("option");
    option.value = mount.symbol;
    option.text = mount.symbol;
    mountsList.appendChild(option);
  }

  return mountsList;
}
function populateFrames() {
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "[NO FRAME]";
  frameList.appendChild(empty);
  for (const frame of frames) {
    const option = document.createElement("option");
    option.value = frame.symbol; 
    option.text = frame.symbol;
    frameList.appendChild(option);
  }
}
function populateReactors() {
  const reactorList = document.createElement("select");
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "[NO REACTOR]";
  reactorList.appendChild(empty);
  for (const reactor of reactors) {
    const option = document.createElement("option");
    option.value = reactor.symbol;
    option.text = reactor.symbol;
    reactorList.appendChild(option);
  }
  return reactorList;
}
function populateEngines() {
  const engineList = document.createElement("select");
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "[NO ENGINE]";
  engineList.appendChild(empty);
  for (const engine of engines) {
    const option = document.createElement("option");
    option.value = engine.symbol;
    option.text = engine.symbol;
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
    "POWER REQ: " +
    ship.frame.powerRequired +
    "<br>" +
    "CREW REQ: " +
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
  const frameLabel = document.getElementById("frame-label");
  frameLabel.textContent = "";
  frameEl.innerHTML = "";
  const selection = frameList.value;
  const selectedFrame = frames.find((frame) => frame.symbol === selection);

  const ship = new Ship(selectedFrame);

  hangar.setShip(ship);

  const frameDetails = getFrameDetails();
  frameEl.appendChild(frameDetails);
  updateCrewCapacity(ship.calculateTotalCrewCapacity());
  updateTotalPower(ship.calculateTotalPower());
  updateCrewRequired(ship.calculateTotalCrewRequired());
  if (ship.reactor == null) {
    updateReactorOutput(0);
  }
  else {
  updateReactorOutput(ship.reactor.powerOutput);
  }

  //   const REACTOR_FISSION = reactors.find(
  //     (reactor) => reactor.symbol === "REACTOR_FISSION_I"
  //   );
  //   const ENGINE_ION_DRIVE_I = engines.find(
  //     (engine) => engine.symbol === "ENGINE_ION_DRIVE_I"
  //   );
  //   ship.attachReactor(REACTOR_FISSION);
  //   ship.attachEngine(ENGINE_ION_DRIVE_I);

  // populate reactor list
  const reactorOptions = populateReactors();
  reactorEl.innerHTML = "";
  reactorEl.appendChild(reactorOptions);
  if (ship.reactor) {
    const reactorDetails = getReactorDetails();
    reactorEl.appendChild(reactorDetails);
  }
  attachReactorListener(reactorOptions);

  // populate engine list
  const engineOptions = populateEngines();
  engineEl.innerHTML = "";
  engineEl.appendChild(engineOptions);
  if (ship.engine) {
    const engineDetails = getEngineDetails();
    engineEl.appendChild(engineDetails);
  }
  attachEngineListener(engineOptions);

  // populate module lists []
  moduleEl.innerHTML = "";
  const slots = selectedFrame.moduleSlots;
  for (let i = 0; i < slots; i++) {
    const moduleOptions = populateModules(i);
    moduleEl.appendChild(moduleOptions);
    // removed cause no module to pass .
    // const moduleDetails = getModuleDetails([SELECTED MOD]i);
    // moduleEl.appendChild(moduleDetails);
    attachModulesListener(moduleOptions, i);
  }

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
    "CREW REQ: " +
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
    "POWER REQ: " +
    ship.engine.powerRequired +
    "<br>" +
    "CREW REQ: " +
    ship.engine.crewRequired +
    "<br>";
  engineDetails.appendChild(engineSpecs);
  const engineDesc = document.createElement("p");
  engineDesc.classList.add("engine-details");
  engineDesc.textContent = ship.engine.description;
  engineDetails.appendChild(engineDesc);
  return engineDetails;
}

function getModuleDetails(selectedMod, slot) {
  // const ship = hangar.getShip();
  // const selectedMod = ship.modules[slot];

  const moduleDetails = document.createElement("div");
  moduleDetails.classList.add(`module-details`);
  moduleDetails.classList.add(`slot-${slot}`);

  moduleDetails.innerHTML =
    `PWR[${selectedMod.powerRequired}]` +
    `CREW[${selectedMod.crewRequired}]` +
    `SLOTS[${selectedMod.slotsRequired}]`;

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

function resetShipAndFrame() {
  frameEl.innerHTML = "";
  reactorEl.innerHTML = "";
  engineEl.innerHTML = "";
  moduleEl.innerHTML = "";
  mountEl.innerHTML = "";
  hangar.resetShip();
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
    console.log(selectedReactor);

    if (!ship.reactor) {
      ship.attachReactor(selectedReactor);
      console.log("attached!");
    } else {
      ship.swapReactor(selectedReactor);
      console.log("swapped!");
    }
    const reactorDetails = getReactorDetails();
    reactorEl.appendChild(reactorDetails);
    updateReactorOutput(selectedReactor.powerOutput);
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
    console.log(selectedEngine);

    if (!ship.engine) {
      ship.attachEngine(selectedEngine);
      console.log("attached!");
    } else {
      ship.swapEngine(selectedEngine);
      console.log("swapped!");
    }
    const engineDetails = getEngineDetails();
    engineEl.appendChild(engineDetails);

    updateTotalPower(ship.calculateTotalPower());
    updateCrewRequired(ship.calculateTotalCrewRequired());


  });
}

function attachMountsListener(mountsList, point) {
  console.log("point in list", point);
  mountsList.addEventListener("change", function () {

    // const existingElements = document.querySelectorAll(`.point-${point}`);
    // existingElements.forEach((element) => element.remove());

    const ship = hangar.getShip();
    console.log("the ship", ship);
    const selection = mountsList.value;
    const selectedMount = mounts.find((mount) => mount.symbol === selection);

    const attached = ship.attachMount(selectedMount, point);
    if (attached) {
    console.log("attached!");
    const mountDetails = getMountDetails(selectedMount, point);
    mountsList.parentNode.insertBefore(mountDetails, mountsList.nextSibling);
    updateTotalPower(ship.calculateTotalPower());
    updateCrewRequired(ship.calculateTotalCrewRequired());
    }
  });
}

function attachModulesListener(modulesList, slot) {
  modulesList.addEventListener("change", function () {
    const existingElements = document.querySelectorAll(`.slot-${slot}`);
    existingElements.forEach((element) => element.remove());

    const ship = hangar.getShip();

    const selection = modulesList.value;
    if (selection === "") {
      // need to remove module from ship when empty option is selected
      const currentModule = ship.modules[slot];
      console.log("cur", currentModule);
      const currentModuleSlots = currentModule.slotsRequired;
      for (let i = 0; i < currentModuleSlots; i++) {
        ship.modules[slot + i] = null;
      }
      // ship.removeModule(slot);

    }
    else {
    const selectedModule = modules.find(
      (module) => module.symbol === selection
    );
    
    const attached = ship.attachModule(selectedModule, slot);
    
    if (attached) {
      const moduleDetails = getModuleDetails(selectedModule, slot);

      modulesList.parentNode.insertBefore(
        moduleDetails,
        modulesList.nextSibling
      );
      updateTotalPower(ship.calculateTotalPower());
      updateCrewRequired(ship.calculateTotalCrewRequired());
      updateCrewCapacity(ship.calculateTotalCrewCapacity());
    }
    else {
      // select element return to empty option
      modulesList.value = "";
    }
  }
  });
}

function updateTotalPower (power){
  const totalPower = document.getElementById("total-power");
  totalPower.textContent = `TOTAL POWER CONSUMPTION: ${power}`;
}

function updateReactorOutput (output){
  const reactorOutput = document.getElementById("reactor-output");
  if (output > 0) {
    reactorOutput.textContent = `POWER OUTPUT: ${output}`;
    reactorOutput.style.color = "white";
  }
  else {
    reactorOutput.textContent = "[NO REACTOR]";
    reactorOutput.style.color = "red";
  }
}
function updateCrewRequired (crew){
  const crewRequired = document.getElementById("total-crew-required");
  crewRequired.textContent = `CREW REQUIRED: ${crew}`;
}

function updateCrewCapacity (capacity) {
const crewCapacity = document.getElementById("total-crew-capacity");
crewCapacity.textContent = `CREW CAPACITY: ${capacity}`;

}

// const miner = frames.find((frame) => frame.symbol === "FRAME_MINER");
// const drone = frames.find((frame) => frame.symbol === "FRAME_DRONE");
// const heavyFreight = frames.find((frame) => frame.symbol === "FRAME_HEAVY_FREIGHTER");
// const lightFreight = frames.find((frame) => frame.symbol === "FRAME_LIGHT_FREIGHTER");
// const frigate = frames.find((frame) => frame.symbol === "FRAME_FRIGATE");
// const interceptor = frames.find((frame) => frame.symbol === "FRAME_INTERCEPTOR");
// const explorer = frames.find((frame) => frame.symbol === "FRAME_EXPLORER");
// const shuttle = frames.find((frame) => frame.symbol === "FRAME_SHUTTLE");
// const probe = frames.find((frame) => frame.symbol === "FRAME_PROBE");

// const fission = reactors.find((reactor) => reactor.symbol === "REACTOR_FISSION_I");
// const fusion = reactors.find((reactor) => reactor.symbol === "REACTOR_FUSION_I");
// const solar = reactors.find((reactor) => reactor.symbol === "REACTOR_SOLAR_I");
// const chemical = reactors.find((reactor) => reactor.symbol === "REACTOR_CHEMICAL_I");

// const ion1 = engines.find((engine) => engine.symbol === "ENGINE_ION_DRIVE_I");
// const ion2 = engines.find((engine) => engine.symbol === "ENGINE_ION_DRIVE_II");
// const impulse = engines.find((engine) => engine.symbol === "ENGINE_IMPULSE_DRIVE_I");

// const laser1 = mounts.find((mount) => mount.symbol === "MOUNT_MINING_LASER_I");
// const laser2 = mounts.find((mount) => mount.symbol === "MOUNT_MINING_LASER_II");
// const laser3 = mounts.find((mount) => mount.symbol === "MOUNT_MINING_LASER_III");
// const surveyor1 = mounts.find((mount) => mount.symbol === "MOUNT_SURVEYOR_I");
// const surveyor2 = mounts.find((mount) => mount.symbol === "MOUNT_SURVEYOR_II");
// const surveyor3 = mounts.find((mount) => mount.symbol === "MOUNT_SURVEYOR_II");
// const sensor1 = mounts.find((mount) => mount.symbol === "MOUNT_SENSOR_ARRAY_I");
// const sensor2 = mounts.find((mount) => mount.symbol === "MOUNT_SENSOR_ARRAY_II");
// const cannon = mounts.find((mount) => mount.symbol === "MOUNT_LASER_CANNON_I");

// const cargoHold = modules.find((module) => module.symbol === "MODULE_CARGO_HOLD_I");
// const crewQuarters = modules.find((module) => module.symbol === "MODULE_CREW_QUARTERS_I");
// const passengerCabin = modules.find((module) => module.symbol === "MODULE_PASSENGER_CABIN_I");
// const envoyQuarters = modules.find((module) => module.symbol === "MODULE_ENVOY_QUARTERS_I");
// const scienceLab = modules.find((module) => module.symbol === "MODULE_SCIENCE_LAB_I");
// const shieldGenerator = modules.find((module) => module.symbol === "MODULE_SHIELD_GENERATOR_I");
// const oreRefinery = modules.find((module) => module.symbol === "MODULE_ORE_REFINERY_I");
// const mineralProcessor = modules.find((module) => module.symbol === "MODULE_MINERAL_PROCESSOR_I");
// const jump1 = modules.find((module) => module.symbol === "MODULE_JUMP_DRIVE_I");
// const warp1 = modules.find((module) => module.symbol === "MODULE_WARP_DRIVE_I");
// const warp2 = modules.find((module) => module.symbol === "MODULE_WARP_DRIVE_II");

// const defaultOreHound = new Ship(miner);
// defaultOreHound.attachReactor(fission);
// defaultOreHound.attachEngine(ion1);
// defaultOreHound.attachModule(mineralProcessor, 0);
// defaultOreHound.attachModule(cargoHold, 2);
// defaultOreHound.attachModule(cargoHold, 3);
// defaultOreHound.attachModule(crewQuarters, 4);
// defaultOreHound.attachMount(laser2, 0);
// defaultOreHound.attachMount(surveyor1, 1);
// defaultOreHound.setName("Ore Hound");
// console.log("HALLLLLLLP", defaultOreHound);

// const miningDrone = new Ship(drone);
// miningDrone.attachReactor(chemical);
// miningDrone.attachEngine(impulse);
// miningDrone.attachModule(mineralProcessor, 0);
// miningDrone.attachModule(cargoHold, 2);
// miningDrone.attachMount(laser1, 0);

// const heavyFreighter = new Ship(heavyFreight);
// heavyFreighter.attachReactor(fusion);
// heavyFreighter.attachEngine(ion2);
// heavyFreighter.attachModule(cargoHold, 0);
// heavyFreighter.attachModule(cargoHold, 1);
// heavyFreighter.attachModule(cargoHold, 2);
// heavyFreighter.attachModule(cargoHold, 3);
// heavyFreighter.attachModule(cargoHold, 4);
// heavyFreighter.attachModule(cargoHold, 5);
// heavyFreighter.attachModule(crewQuarters, 6);
// heavyFreighter.attachModule(crewQuarters, 7);
// heavyFreighter.attachModule(crewQuarters, 8);
// heavyFreighter.attachModule(crewQuarters, 9);
// heavyFreighter.attachModule(warp2, 10);

// const lightFreighter = new Ship(lightFreight);
// lightFreighter.attachReactor(chemical);
// lightFreighter.attachEngine(ion1);
// lightFreighter.attachModule(cargoHold, 0);
// lightFreighter.attachModule(cargoHold, 1);
// lightFreighter.attachModule(cargoHold, 2);
// lightFreighter.attachModule(cargoHold, 3);
// lightFreighter.attachModule(crewQuarters, 4);
// lightFreighter.attachModule(crewQuarters, 5);
// lightFreighter.attachMount(surveyor1, 0);

// const defaultExplorer = new Ship(explorer);
// defaultExplorer.attachReactor(fusion);
// defaultExplorer.attachEngine(ion2);
// defaultExplorer.attachModule(cargoHold, 0);
// defaultExplorer.attachModule(crewQuarters, 1);
// defaultExplorer.attachModule(crewQuarters, 2);
// defaultExplorer.attachModule(scienceLab, 3);
// defaultExplorer.attachModule(warp1, 5);
// defaultExplorer.attachModule(shieldGenerator, 6);
// defaultExplorer.attachMount(sensor2, 7);
// defaultExplorer.attachMount(cannon, 8);

// const defaultCommand = new Ship(frigate);
// defaultCommand.attachReactor(fission);
// defaultCommand.attachEngine(ion2);
// defaultCommand.attachModule(cargoHold, 0);
// defaultCommand.attachModule(cargoHold, 1);
// defaultCommand.attachModule(crewQuarters, 2);
// defaultCommand.attachModule(crewQuarters, 3);
// defaultCommand.attachModule(jump1, 4);
// defaultCommand.attachModule(warp1, 5);
// defaultCommand.attachModule(mineralProcessor, 6);
// defaultCommand.attachMount(surveyor1, 0);
// defaultCommand.attachMount(laser1, 1);
// defaultCommand.attachMount(sensor1, 2);


