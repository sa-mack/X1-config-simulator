export class Ship {
  constructor(frame) {
    this.name = frame.symbol + " BASE";
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
    const moduleSlots = this.frame.moduleSlots;
    const mountingPoints = this.frame.mountingPoints;
    let modulesPower = 0;
    let mountsPower = 0;


    for (let i = 0; i < moduleSlots; i++) {
      if (this.modules[i] !== null) {
        const slotsReq = this.modules[i].slotsRequired || 1;
        modulesPower += this.modules[i].powerRequired;
        if (slotsReq > 1) {
          i = i + (slotsReq - 1);
        }
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
        const slotsReq = this.modules[i].slotsRequired || 1;
        modulesCrew += this.modules[i].crewRequired;
        if (slotsReq > 1) {
          i = i + (slotsReq - 1);
        }
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
      if (module && module.crewCapacity > 0) {
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




  attachModule (module) {
    let numOccupied = 0;
    for (let module of this.modules) {
      
      if (module !== null) {
        numOccupied += module.slotsRequired;
      }
    }
    console.log("occupied slots", numOccupied)
    if (numOccupied + module.slotsRequired <= this.frame.moduleSlots) {
      this.modules.push(module);
      console.log("SUCCESS");
      console.log(this.modules);
      return true;
    }
    console.log("NO ROOM");
    console.log("slots remaining:", this.frame.moduleSlots - numOccupied);
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
      return true;
    } else {
      console.log("Module not found on the ship.");
      return false;
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

  // outputJSON () {
  //   const mods = this.modules;
  //   let modsArr = [];
  //   for (let i = 0; i < mods.length; i++) {
  //     if (this.modules[i] !== null) {
  //       modsArr.push(this.modules[i]);
        
  //       const slotsReq = this.modules[i].slotsRequired || 1;
  //       if (slotsReq > 1) {
  //         i = i + (slotsReq - 1);

  //       }
  //     }
  //   }
  //   console.log("MODSSSSS", modsArr);

  //   for (let m of mods) {
  //     if (m.range > 0) {
  //       const newRange = m.range;
  //     }
  //   }
  //   const newmodsArr = modsArr.map((mod) => {
  //     return {
  //       condition: 100,

  //     }
  //   });



  //   return JSON.stringify({
  //       engine: {
  //         condition: 100,
  //         description: this.engine.description,
  //         name: this.engine.name,
  //         requirements: {
  //           crew: this.engine.crewRequired,
  //           power: this.engine.powerRequired
  //         },
  //         speed: this.engine.speed,
  //         symbol: this.engine.symbol
  //       },
  //       frame: {
  //         condition: 100,
  //         description: this.frame.description,
  //         fuelCapacity: this.frame.fuelCapacity,
  //         moduleSlots: this.frame.moduleSlots,
  //         mountingPoints: this.frame.mountingPoints,
  //         name: this.frame.frameName,
  //         requirements: {
  //           crew: this.frame.crewRequired,
  //           power: this.frame.powerRequired
  //         },
  //         symbol: this.frame.symbol
  //       },
  //       // modules: this.modules.map((module) => {
  //       //   if (module !== null) {
  //       //     return {

  //       //     }
  //       //   }
  //       // }),

  //     });
    
  // }
}


