export class Reactor {
    constructor(symbol, reactorName, powerOutput, crewRequired, description) {
      this.symbol = symbol;
      this.reactorName = reactorName;
      this.powerOutput = powerOutput;
      this.crewRequired = crewRequired;
      this.description = description;
    }
    setDescription(description) {
      this.description = description;
    }
  }

export const REACTOR_FISSION_I = new Reactor("REACTOR_FISSION_I", "Fission Reactor I", 31, 8, "A basic fission power reactor, used to generate electricity from nuclear fission reactions.");
export const REACTOR_FUSION_I = new Reactor("REACTOR_FUSION_I","Fusion Reactor I", 40, 12, "A basic fusion power reactor, used to generate electricity from nuclear fusion reactions.");
export const REACTOR_SOLAR_I = new Reactor("REACTOR_SOLAR_I", "Solar Reactor I", 3, 0, "A basic solar power reactor, used to generate electricity from solar energy.");
export const REACTOR_CHEMICAL_I = new Reactor("REACTOR_CHEMICAL_I", "Chemical Reactor I", 15, 3, "A basic chemical power reactor, used to generate electricity from chemical reactions.");

export const reactors = [REACTOR_FISSION_I, REACTOR_FUSION_I, REACTOR_CHEMICAL_I, REACTOR_SOLAR_I];

//let REACTOR_ANTIMATTER;