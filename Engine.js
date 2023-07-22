export class Engine {
    constructor(symbol, engineName, powerRequired, crewRequired, speed, description) {
      this.symbol = symbol;
      this.engineName = engineName;
      this.powerRequired = powerRequired;
      this.crewRequired = crewRequired;
      this.speed = speed;
      this.description = description || "";
    }
    setDescription(description) {
      this.description = description;
    }
  }

export const ENGINE_ION_DRIVE_I = new Engine("ENGINE_ION_DRIVE_I", "Ion Engine I", 3, 3, 10, "An advanced propulsion system that uses ionized particles to generate high-speed, low-thrust acceleration.");
export const ENGINE_ION_DRIVE_II = new Engine("ENGINE_ION_DRIVE_II", "Ion Engine II", 6, 8, 30, "An advanced propulsion system that uses ionized particles to generate high-speed, low-thrust acceleration, with improved efficiency and performance.");
export const ENGINE_IMPULSE_DRIVE_I = new Engine("ENGINE_IMPULSE_DRIVE_I", "Impulse Engine I", 1, 0, 2, "A basic low-energy propulsion system that generates thrust for interplanetary travel.");
//let ENGINE_HYPER_DRIVE_1;

export const engines = [ENGINE_ION_DRIVE_I, ENGINE_ION_DRIVE_II, ENGINE_IMPULSE_DRIVE_I];
