export class Module {
  constructor(options) {
    this.symbol = options.symbol;
    this.moduleName = options.moduleName;
    this.powerRequired = options.powerRequired;
    this.crewRequired = options.crewRequired || 0;
    this.slotsRequired = options.slotsRequired || 1;
    this.jumpRange = options.jumpRange || 0;
    this.warpRange = options.warpRange || 0;
    this.cargoCapacity = options.cargoCapacity || 0;
    this.crewCapacity = options.crewCapacity || 0;
    this.passengerCapacity = options.passengerCapacity || 0;
    this.description = options.description || "";
    this.refiningTargets = options.refiningTargets || [];
  }
}

export const MODULE_MINERAL_PROCESSOR_I = new Module({
    symbol: "MODULE_MINERAL_PROCESSOR_I",
    moduleName: "Mineral Processor",
    powerRequired: 1,
    slotsRequired: 2,
    description:
      "Crushes and processes extracted minerals and ores into their component parts, filters out impurities, and containerizes them into raw storage units.",
  })

  export const MODULE_CARGO_HOLD_I = new Module({
    symbol: "MODULE_CARGO_HOLD_I",
    moduleName: "Cargo Hold",
    powerRequired: 1,
    cargoCapacity: 30,
    description: "A module that increases a ship's cargo capacity.",
  });

  export const MODULE_CREW_QUARTERS_I = new Module({
    symbol: "MODULE_CREW_QUARTERS_I",
    moduleName: "Crew Quarters",
    powerRequired: 1,
    crewRequired: 2,
    crewCapacity: 40,
    description:
      "A module that provides living space and amenities for the crew.",
  });

  export const MODULE_JUMP_DRIVE_I = new Module({
    symbol: "MODULE_JUMP_DRIVE_I",
    moduleName: "Jump Drive I",
    powerRequired: 4,
    crewRequired: 10,
    jumpRange: 500,
    description:
      "A basic antimatter jump drive that allows for instantaneous short-range interdimensional travel.",
  });

  export const MODULE_WARP_DRIVE_I = new Module({
    symbol: "MODULE_WARP_DRIVE_I",
    moduleName: "Warp Drive I",
    powerRequired: 3,
    crewRequired: 2,
    warpRange: 2000,
    description:
      "A basic warp drive that allows for short-range interstellar travel.",
  });
  export const MODULE_WARP_DRIVE_II = new Module({
    symbol: "MODULE_WARP_DRIVE_II",
    moduleName: "Warp Drive II",
    powerRequired: 5,
    crewRequired: 8,
    slotsRequired: 2,
    description:
      "An advanced warp drive that allows for longer-range interstellar travel with improved reliability.",
  });
  export const MODULE_PASSENGER_CABIN_I = new Module({
    symbol: "MODULE_PASSENGER_CABIN_I",
    moduleName: "Passenger Cabin ",
    powerRequired: 2,
    crewRequired: 2,
    passengerCapacity: 30,
    description:
      "A module that provides living space and amenities for passengers.",
  });
  export const MODULE_ENVOY_QUARTERS_I = new Module({
    symbol: "MODULE_ENVOY_QUARTERS_I",
    moduleName: "Envoy Quarters",
    powerRequired: 2,
    crewRequired: 5,
    envoyCapacity: 1,
    description:
      "A module that provides living space and amenities for VIP passengers or diplomatic envoys.",
  });
  export const MODULE_SCIENCE_LAB_I = new Module({
    symbol: "MODULE_SCIENCE_LAB_I",
    moduleName: "Science Lab",
    slotsRequired: 2,
    powerRequired: 2,
    crewRequired: 6,
    description:
      "A specialized module equipped with advanced instruments and equipment for scientific research and analysis.",
  });
  export const MODULE_SHIELD_GENERATOR_I = new Module({
    symbol: "MODULE_SHIELD_GENERATOR_I",
    moduleName: "Shield Generator",
    powerRequired: 3,
    crewRequired: 2,
    description:
      "A basic shield generator that provides protection against incoming weapons fire and other hazards.",
  });

  export const MODULE_ORE_REFINERY_I = new Module({
    symbol: "MODULE_ORE_REFINERY_I",
    moduleName: "Ore Refinery",
    powerRequired: 12,
    crewRequired: 20,
    slotsRequired: 4,
    refiningTargets: [
      "IRON",
      "COPPER",
      "SILVER",
      "GOLD",
      "ALUMINUM",
      "PLATINUM",
      "URANITE",
      "MERITIUM",
    ],
    description:
      "A specialized module that can refine raw ores into usable metals and other materials.",
  });

  export const modules = [MODULE_MINERAL_PROCESSOR_I, MODULE_CARGO_HOLD_I, MODULE_CREW_QUARTERS_I, MODULE_JUMP_DRIVE_I, MODULE_WARP_DRIVE_I, MODULE_WARP_DRIVE_II, MODULE_PASSENGER_CABIN_I, MODULE_ENVOY_QUARTERS_I, MODULE_SCIENCE_LAB_I, MODULE_SHIELD_GENERATOR_I];

    // let MODULE_MICRO_REFINERY_I;
    // let MODULE_FUEL_REFINERY_I;
    // let MODULE_JUMP_DRIVE_II;
    // let MODULE_JUMP_DRIVE_III;
    // let MODULE_WARP_DRIVE_III;
    // let MODULE_SHIELD_GENERATOR_II;