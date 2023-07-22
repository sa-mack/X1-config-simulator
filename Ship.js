export class Ship {
  constructor(frame) {
    this.name = frame.symbol + " SHIP"; // You can customize ship names as needed
    this.frame = frame;
    this.reactor = null;
    this.engine = null;
    this.modules = new Array(frame.moduleSlots).fill(null);
    this.mounts = new Array(frame.mountingPoints).fill(null);
  }

  calculateTotalPower() {
    const reactorPower = this.reactor ? this.reactor.powerOutput : 0;
    const enginePower = this.engine ? this.engine.powerRequired : 0;
    const modulesPower = this.modules.reduce(
      (totalPower, module) => totalPower + (module ? module.powerRequired : 0),
      0
    );
    const mountsPower = this.mounts.reduce(
      (totalPower, mount) => totalPower + (mount ? mount.powerRequired : 0),
      0
    );

    return reactorPower - enginePower - modulesPower - mountsPower;
  }

  calculateTotalCrewRequired() {
    const reactorCrew = this.reactor ? this.reactor.crewRequired : 0;
    const engineCrew = this.engine ? this.engine.crewRequired : 0;
    const modulesCrew = this.modules.reduce(
      (totalCrew, module) => totalCrew + module.crewRequired,
      0
    );
    const mountsCrew = this.mounts.reduce(
      (totalCrew, mount) => totalCrew + mount.crewRequired,
      0
    );

    return reactorCrew + engineCrew + modulesCrew + mountsCrew;
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
          const potentialPower =
            this.calculateTotalPower() + module.powerRequired;
          if (potentialPower <= this.reactor.powerOutput) {
            for (let i = 0; i < slotsNeeded; i++) {
              this.modules[slot + i] = module;
            }
            console.log("Module attached.");
            return true;
          } else {
            console.log("Adding this module will exceed the power limits.");
          }
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

  attachMount(mount) {
    if (this.mounts.length < this.frame.mountingPoints) {
      const potentialPower = this.calculateTotalPower() + mount.powerRequired;
      if (potentialPower <= this.reactor.powerOutput) {
        this.mounts.push(mount);
      } else {
        console.log("Adding this mount will exceed the power limits.");
      }
    } else {
      console.log("No more mounting points available.");
    }
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
