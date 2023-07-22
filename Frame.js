export class Frame {
  constructor(
    symbol,
    frameName,
    powerRequired,
    crewRequired,
    fuelCapacity,
    moduleSlots,
    mountingPoints,
    description
  ) {
    this.symbol = symbol;
    this.frameName = frameName;
    this.powerRequired = powerRequired;
    this.crewRequired = crewRequired;
    this.fuelCapacity = fuelCapacity;
    this.moduleSlots = moduleSlots;
    this.mountingPoints = mountingPoints;
    this.description = description || "";
  }
  setDescription(description) {
    this.description = description;
  }
}

export const FRAME_MINER = new Frame("FRAME_MINER", "Frame Miner", 5, 15, 900, 5, 3, "A medium-sized spacecraft designed for mining operations and resource extraction.");
export const FRAME_LIGHT_FREIGHTER = new Frame("FRAME_LIGHT_FREIGHTER", "Frame Light Freighter", 5, 40, 1700, 6, 1, "A small, versatile spacecraft used for cargo transport and other commercial operations.");
export const FRAME_HEAVY_FREIGHTER = new Frame("FRAME_HEAVY_FREIGHTER", "Frame Heavy Freighter", 10, 100, 2300, 12, 3, "A large, heavily-armed spacecraft used for cargo transport and other commercial operations in hostile environments.");
export const FRAME_FRIGATE = new Frame("FRAME_FRIGATE", "Frame Frigate", 8, 25, 1200, 8, 5, "A medium-sized, multi-purpose spacecraft, often used for combat, transport, or support operations.");
export const FRAME_PROBE = new Frame("FRAME_PROBE", "Frame Probe", 1, 0, 0, 0, 0, "A small, unmanned spacecraft used for various tasks, such as surveillance, transportation, or combat.");
export const FRAME_INTERCEPTOR = new Frame("FRAME_INTERCEPTOR", "Frame Interceptor", 1, 5, 500, 2, 2, "A small, agile spacecraft designed for high-speed, short-range combat missions.");
export const FRAME_EXPLORER = new Frame("FRAME_EXPLORER", "Frame Explorer", 5, 30, 1500, 8, 2, "A large, long-range spacecraft designed for deep space exploration and scientific research.");
export const FRAME_SHUTTLE = new Frame("FRAME_SHUTTLE", "Frame Shuttle", 1, 10, 900, 4, 1, "A small, reusable spacecraft designed for short-range, low-speed travel between spacecraft or planetary surfaces.");
export const FRAME_DRONE = new Frame("FRAME_DRONE", "Frame Drone", 1, 0, 100, 3, 2, "A small, unmanned spacecraft used for various tasks, such as surveillance, transportation, or combat.");

export const frames = [FRAME_MINER, FRAME_LIGHT_FREIGHTER, FRAME_HEAVY_FREIGHTER, FRAME_FRIGATE, FRAME_PROBE, FRAME_INTERCEPTOR, FRAME_EXPLORER, FRAME_SHUTTLE, FRAME_DRONE];