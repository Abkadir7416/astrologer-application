// const Astrologer = require("../models/Astrologers");

class FlowDistributor {
  constructor(astrologers) {
    this.astrologers = astrologers;
  }

  async distributeUsers(users) {
    const totalWeight = this.astrologers.reduce((sum, a) => sum + a.priorityFactor, 0);
    console.log('total weight: ', totalWeight);
    for (let user of users) {
      let astrologer = this._getNextAstrologer(totalWeight);
      astrologer.allocatedUsers++;
      await astrologer.save(); // Save the updated allocation
    }

    return this.astrologers;
  }

  _getNextAstrologer(totalWeight) {
    let random = Math.random() * totalWeight;
    for (let astrologer of this.astrologers) {
      if (random < astrologer.priorityFactor) {
        return astrologer;
      }
      random -= astrologer.priorityFactor;
    }
    return this.astrologers[0]; // Fallback
  }
}

module.exports = FlowDistributor;
