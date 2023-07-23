export class Mount {
  constructor(options) {
    this.symbol = options.symbol;
    this.mountName = options.mountName;
    this.powerRequired = options.powerRequired;
    this.crewRequired = options.crewRequired || 0;
    this.deposits = options.deposits || [];
    this.sensorStrength = options.sensorStrength || 0;
    this.miningStrengthOre = options.miningStrengthOre || 0;
    this.miningStrengthGas = options.miningStrengthGas || 0;
    this.surveysProduced = options.surveysProduced || 0;
    this.description = options.description || "";
  }
}
export const MOUNT_SENSOR_ARRAY_I = new Mount({
  symbol: "MOUNT_SENSOR_ARRAY_I",
  mountName: "Sensor Array I",
  powerRequired: 1,
  sensorStrength: 1,
  description: "A basic sensor array that improves a ship's ability to detect and track other objects in space."
});

export const MOUNT_SENSOR_ARRAY_II = new Mount({
  symbol: "MOUNT_SENSOR_ARRAY_II",
  mountName: "Sensor Array II",
  powerRequired: 2,
  crewRequired: 2,
  sensorStrength: 4,
  description:
    "An advanced sensor array that improves a ship's ability to detect and track other objects in space with greater accuracy and range.",
});

export const MOUNT_LASER_CANNON_I = new Mount({
  symbol: "MOUNT_LASER_CANNON_I",
  mountName: "Laser Cannon",
  powerRequired: 2,
  crewRequired: 1,
  description:
    "A basic laser weapon that fires concentrated beams of energy at high speed and accuracy.",
});

export const MOUNT_MINING_LASER_I = new Mount({
  symbol: "MOUNT_MINING_LASER_I",
  mountName: "Mining Laser I",
  powerRequired: 1,
  miningStrengthOre: 10,
  description:
    "A basic mining laser that can be used to extract valuable minerals from asteroids and other space objects.",
});

export const MOUNT_MINING_LASER_II = new Mount({
  symbol: "MOUNT_MINING_LASER_II",
  mountName: "Mining Laser II",
  powerRequired: 2,
  crewRequired: 2,
  miningStrengthOre: 25,
  description:
    "An advanced mining laser that is more efficient and effective at extracting valuable minerals from asteroids and other space objects.",
});

export const MOUNT_MINING_LASER_III = new Mount({
  symbol: "MOUNT_MINING_LASER_III",
  mountName: "Mining Laser III",
  powerRequired: 3,
  crewRequired: 5,
  miningStrengthOre: 60,
  description:
    "An advanced mining laser that is even more efficient and effective at extracting valuable minerals from asteroids and other space objects.",
});

export const MOUNT_SURVEYOR_I = new Mount({
  symbol: "MOUNT_SURVEYOR_I",
  mountName: "Surveyor I",
  powerRequired: 1,
  crewRequired: 2,
  surveysProduced: 1,
  deposits: [
    "QUARTZ_SAND",
    "SILICON_CRYSTALS",
    "PRECIOUS_STONES",
    "ICE_WATER",
    "AMMONIA_ICE",
    "IRON_ORE",
    "COPPER_ORE",
    "SILVER_ORE",
    "ALUMINUM_ORE",
    "GOLD_ORE",
    "PLATINUM_ORE",
  ],
  description:
    "A basic survey probe that can be used to gather information about a mineral deposit.",
});

export const MOUNT_SURVEYOR_II = new Mount({
  symbol: "MOUNT_SURVEYOR_II",
  mountName: "Surveyor II",
  powerRequired: 3,
  crewRequired: 4,
  surveysProduced: 2,
  deposits: [
    "QUARTZ_SAND",
    "SILICON_CRYSTALS",
    "PRECIOUS_STONES",
    "ICE_WATER",
    "AMMONIA_ICE",
    "IRON_ORE",
    "COPPER_ORE",
    "SILVER_ORE",
    "ALUMINUM_ORE",
    "GOLD_ORE",
    "PLATINUM_ORE",
    "DIAMONDS",
    "URANITE_ORE",
  ],
  description:
    "An advanced survey probe that can be used to gather information about a mineral deposit with greater accuracy.",
});

export const MOUNT_SURVEYOR_III = new Mount({
  symbol: "MOUNT_SURVEYOR_III",
  mountName: "Surveyor III",
  powerRequired: 5,
  crewRequired: 7,
  surveysProduced: 3,
  deposits: [
    "QUARTZ_SAND",
    "SILICON_CRYSTALS",
    "PRECIOUS_STONES",
    "ICE_WATER",
    "AMMONIA_ICE",
    "IRON_ORE",
    "COPPER_ORE",
    "SILVER_ORE",
    "ALUMINUM_ORE",
    "GOLD_ORE",
    "PLATINUM_ORE",
    "DIAMONDS",
    "MERITIUM_ORE",
  ],
  description:
    "An advanced survey probe that can be used to gather information about a mineral deposit with even greater accuracy.",
});

export const MOUNT_GAS_SIPHON_III = new Mount({
  symbol: "MOUNT_GAS_SIPHON_III",
  mountName: "Gas Siphon III",
  powerRequired: 3,
  crewRequired: 5,
  miningStrengthGas: 60,
  description:
    "An advanced gas siphon that can extract gas from gas giants and other gas-rich bodies with even greater efficiency and at a higher rate.",
});

export const MOUNT_TURRET_I = new Mount({
  symbol: "MOUNT_TURRET_I",
  mountName: "Turret I",
  powerRequired: 2,
  crewRequired: 2,
});

export const mounts = [
  MOUNT_SENSOR_ARRAY_I,
  MOUNT_SENSOR_ARRAY_II,
  MOUNT_LASER_CANNON_I,
  MOUNT_MINING_LASER_I,
  MOUNT_MINING_LASER_II,
  MOUNT_MINING_LASER_III,
  MOUNT_SURVEYOR_I,
  MOUNT_SURVEYOR_II,
  MOUNT_SURVEYOR_III,
  MOUNT_GAS_SIPHON_III,
  MOUNT_TURRET_I,
];
// let MOUNT_GAS_SIPHON_I;
// let MOUNT_GAS_SIPHON_II;
// let MOUNT_SENSOR_ARRAY_III;
// let MOUNT_MISSILE_LAUNCHER_I;
