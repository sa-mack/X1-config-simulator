export class Ship {
  constructor(frame) {
    this.name = frame.symbol + " SHIP"; // You can customize ship names as needed
    this.frame = frame;
    this.reactor = null;
    this.engine = null;
    this.modules = new Array(frame.moduleSlots).fill(null);
    this.mounts = new Array(frame.mountingPoints).fill(null);
  }

  setName(name){
    this.name = name;
  }

  calculateTotalPower() {
    const enginePower = this.engine ? this.engine.powerRequired : 0;
    const framePower = this.frame ? this.frame.powerRequired : 0;
    console.log("genny", enginePower);

    const moduleSlots = this.frame.moduleSlots;
    const mountingPoints = this.frame.mountingPoints;
    let modulesPower = 0;
    let mountsPower = 0;
    for (let i = 0; i < moduleSlots; i++) {
      if (this.modules[i] !== null) {
        modulesPower += this.modules[i].powerRequired;
      }
    }
      for (let j = 0; j < mountingPoints; j++) {
        if (this.mounts[j] !== null) {
          mountsPower += this.mounts[j].powerRequired;
        }
      }

    const total =  enginePower + framePower + modulesPower + mountsPower;
    return total;
  }

  calculateTotalCrewRequired() {
    const reactorCrew = this.reactor ? this.reactor.crewRequired : 0;
    const engineCrew = this.engine ? this.engine.crewRequired : 0;
    const frameCrew = this.frame ? this.frame.crewRequired : 0;
    const moduleSlots = this.frame.moduleSlots;
    const mountingPoints = this.frame.mountingPoints;
    let modulesCrew = 0;
    let mountsCrew = 0;
    for (let i = 0; i < moduleSlots; i++) {
      if (this.modules[i] !== null) {
        modulesCrew += this.modules[i].crewRequired;
      }
    }
    for (let j = 0; j < mountingPoints; j++) {
      if (this.mounts[j] !== null) {
        mountsCrew += this.mounts[j].crewRequired;
      }
    }

    return reactorCrew + engineCrew + frameCrew + modulesCrew + mountsCrew;
  }

  calculateTotalCrewCapacity() {
    let totalCrewCapacity = 0;
  
    for (const module of this.modules) {
      if (module && module.symbol === "MODULE_CREW_QUARTERS_I") {
        totalCrewCapacity += module.crewCapacity;
      }
    }
  
    return totalCrewCapacity;
  }

  attachReactor(reactor) {
    this.reactor = reactor;
  }

  attachEngine(engine) {
    this.engine = engine;
  }

  swapReactor(newReactor) {
    if (this.reactor) {
      this.reactor = newReactor;
    } else {
      console.log("No reactor attached to the ship.");
    }
  }

  swapEngine(newEngine) {
    if (this.engine) {
      this.engine = newEngine;
    } else {
      console.log("No engine attached to the ship.");
    }
  }

  // attachModule(module) {
  //   if (this.modules.length < this.frame.moduleSlots) {
  //     const potentialPower = this.calculateTotalPower() + module.powerRequired;
  //     if (potentialPower <= this.reactor.powerOutput) {
  //       this.modules.push(module);
  //     } else {
  //       console.log("Adding this module will exceed the power limits.");
  //     }
  //   } else {
  //     console.log("No more module slots available.");
  //   }
  // }

  attachModule(module, slot) {
    if (slot >= 0 && slot < this.frame.moduleSlots) {
      if (this.modules[slot] === null) {
        const slotsNeeded = module.slotsRequired;
        if (this.checkSlotsAvailable(slot, slotsNeeded)) {
          // const potentialPower =
          //   this.calculateTotalPower() + module.powerRequired;
          // if (potentialPower <= this.reactor.powerOutput) {
          //   console.log("good attach", potentialPower);
          // } else {
          //   console.log("Adding this module will exceed the power limits. ATTACHED ANYWAY");
          // }
          for (let i = 0; i < slotsNeeded; i++) {
            this.modules[slot + i] = module;
          }
          const newPower = this.calculateTotalPower();
          console.log("Module attached.", newPower);
          return true;
        } else {
          console.log("Not enough contiguous slots available.");
        }
      } else {
        console.log("Slot is already occupied.");

      }

    } else {
      console.log("Invalid slot number.");
    }
    return false;
  }

  checkSlotsAvailable(startSlot, slotsNeeded) {
    for (let i = 0; i < slotsNeeded; i++) {
      if (this.modules[startSlot + i] !== null) {
        return false;
      }
    }
    return true;
  }

  attachMount(mount, point) {
    if (point >= 0 && point < this.frame.mountingPoints) {
      // const potentialPower = this.calculateTotalPower() + mount.powerRequired;
      // if (potentialPower <= this.reactor.powerOutput) {
      //   console.log("good attach");
      // } else {
      //   console.log("OVER POWER LIMIT BUT WE DO IT ANYWAY");
      // }
      this.mounts[point] = mount;
      const newPower = this.calculateTotalPower();
      console.log("Mount attached.", newPower);
      return true;
    } else {
      console.log("Invalid mounting point index.");
    }
    return false;
  }

  removeModule(module) {
    const index = this.modules.indexOf(module);
    if (index !== -1) {
      this.modules.splice(index, 1);
    } else {
      console.log("Module not found on the ship.");
    }
  }

  removeMount(mount) {
    const index = this.mounts.indexOf(mount);
    if (index !== -1) {
      this.mounts.splice(index, 1);
    } else {
      console.log("Mount not found on the ship.");
    }
  }
}

