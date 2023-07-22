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
  },
};

function populateModules(i) {
  const modulesList = document.createElement("select");
  modulesList.classList.add(`moduleSelect-${i}`);
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "SELECT MODULE";
  modulesList.appendChild(empty);
  for (const module of modules) {
    const option = document.createElement("option");
    option.value = module.symbol;
    option.text = module.symbol;
    modulesList.appendChild(option);
  }

  return modulesList;
}
function populateMounts() {
  const mountsList = document.createElement("select");
  const empty = document.createElement("option");
  empty.value = "";
  empty.text = "SELECT MOUNT";
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
  // Loop through the 'frames' array and create an option element for each frame
  for (const frame of frames) {
    const option = document.createElement("option");
    option.value = frame.symbol; // Set the value to the frame's ID (you can change this to any unique identifier)
    option.text = frame.symbol; // Set the text to the frame's name
    frameList.appendChild(option); // Add the option element to the dropdown
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
    option.text = reactor.symbol;
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
  frameEl.innerHTML = "";
  const selection = frameList.value;
  const selectedFrame = frames.find((frame) => frame.symbol === selection);

  const ship = new Ship(selectedFrame);

  hangar.setShip(ship);

  const frameDetails = getFrameDetails();
  frameEl.appendChild(frameDetails);

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
    let moduleOptions = populateModules(i);
    moduleEl.appendChild(moduleOptions);
    // removed cause no module to pass .
    // const moduleDetails = getModuleDetails([SELECTED MOD]i);
    // moduleEl.appendChild(moduleDetails);
    attachModulesListener(moduleOptions, i);
  }

  //populate mount lists []
  mountEl.innerHTML = "";
  let points = selectedFrame.mountingPoints;
  for (let i = 0; i < points; i++) {
    let mountOptions = populateMounts(ship);
    mountEl.appendChild(mountOptions);
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
  console.log("oh please lord", selectedMod.powerRequired);

  const moduleDetails = document.createElement("div");
  moduleDetails.classList.add(`module-details`);
  moduleDetails.classList.add(`slot-${slot}`);

  moduleDetails.innerHTML =
    `PWR[${selectedMod.powerRequired}]` +
    `CREW[${selectedMod.crewRequired}]` +
    `SLOTS[${selectedMod.slotsRequired}]`;

  console.log("log pleaseeee", moduleDetails);
  return moduleDetails;
}

function populateMountDetails(ship) {
  //unfinished, but hasn't broken anything... yet
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
  });
}

function attachMountsListener(mountsList) {
  mountsList.addEventListener("change", function () {
    const ship = hangar.getShip();
    const selection = mountsList.value;
    const selectedMount = mounts.find((mount) => mount.symbol === selection);

    ship.attachMount(selectedMount);
    console.log("attached!");

    populateMountDetails(ship);
  });
}

function attachModulesListener(modulesList, slot) {
  modulesList.addEventListener("change", function () {
    const existingElements = document.querySelectorAll(`.slot-${slot}`);
    existingElements.forEach((element) => element.remove());

    const ship = hangar.getShip();

    const selection = modulesList.value;
    console.log("modulesList selection", selection);
    const selectedModule = modules.find(
      (module) => module.symbol === selection
    );
    const attached = ship.attachModule(selectedModule, slot);

    console.log("ship after", ship);
    if (attached) {
      const moduleDetails = getModuleDetails(selectedModule, slot);
      console.log(moduleDetails);

      modulesList.parentNode.insertBefore(
        moduleDetails,
        modulesList.nextSibling
      );
    }
  });
}
