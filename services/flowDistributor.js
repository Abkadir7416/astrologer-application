const User = require("../models/Users");

class FlowDistributor {
  constructor(astrologers) {
    this.astrologers = astrologers;
  }

  async distributeUsers(users) {
    if (!this.astrologers.length) {
      throw new Error("No astrologers available for allocation.");
    }

    // Step 1: Calculate total priority weight
    const totalWeight = this.astrologers.reduce((sum, a) => sum + a.priorityFactor, 0);

    // Step 2: Sort astrologers by priorityFactor (descending order)
    this.astrologers.sort((a, b) => b.priorityFactor - a.priorityFactor);

    // Step 3: Compute how many users each astrologer should receive
    let allocationMap = new Map();
    let totalAssigned = 0;

    this.astrologers.forEach(astrologer => {
      let share = Math.floor((astrologer.priorityFactor / totalWeight) * users.length);

      // Ensure each astrologer gets at least 1 user if possible
      if (share === 0 && totalAssigned < users.length) {
        share = 1;
      }

      allocationMap.set(astrologer, share);
      totalAssigned += share;
    });

    // Step 4: Adjust unallocated users due to rounding
    let remainingUsers = users.length - totalAssigned;
    let i = 0;

    while (remainingUsers > 0) {
      let astrologer = this.astrologers[i % this.astrologers.length];
      allocationMap.set(astrologer, allocationMap.get(astrologer) + 1);
      remainingUsers--;
      i++;
    }

    // Step 5: Assign users while checking existence in DB
    let userIndex = 0;
    for (const astrologer of this.astrologers) {
      let assignedUsers = users.slice(userIndex, userIndex + allocationMap.get(astrologer));
      userIndex += assignedUsers.length;

      for (const user of assignedUsers) {
        const userExists = await User.findOne({ email: user.email });
        console.log('user exit: ', userExists);
        if (userExists) {
          astrologer.allocatedUsers.push({ name: user.name, email: user.email });
        }

      }

      await astrologer.save();
    }

    return this.astrologers;
  }
}

module.exports = FlowDistributor;
