const request = require("supertest");
const app = require("../server");
const Astrologer = require("../models/Astrologers");
const User = require("../models/Users");

describe("Flow Distribution Algorithm", () => {
  beforeAll(async () => {
    await Astrologer.deleteMany();
    await User.deleteMany();

    await Astrologer.insertMany([
        { name: "Astro1", email: "astro1@example.com", password: "password123" },
        { name: "Astro2", email: "astro2@example.com", password: "password123" },
      ]);
  });

  test("should allocate users fairly among astrologers", async () => {
    const response = await request(app)
      .post("/api/allocate")
      .send({ users: [
        { name: "Astro1", email: "astro1@example.com", password: "password123" },
        { name: "Astro2", email: "astro2@example.com", password: "password123" },
      ] });


    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Users allocated successfully");
    expect(response.body.astrologers.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await Astrologer.deleteMany();
    await User.deleteMany();
  });
});
// ===================================


// const request = require("supertest");
// const app = require("../server"); // Adjust path as needed
// const Astrologer = require("../models/Astrologers");
// const mongoose = require("mongoose");

// beforeAll(async () => {
//   await Astrologer.deleteMany(); // Clear existing astrologers before testing
// });

// test("should allocate users fairly among astrologers", async () => {
//   // Create astrologers for testing
//   await Astrologer.insertMany([
//     { name: "Astro1", email: "astro1@example.com", password: "password123" },
//     { name: "Astro2", email: "astro2@example.com", password: "password123" },
//   ]);

//   // Sample users for allocation
//   const users = [
//     { name: "User1", email: "user1@example.com" },
//     { name: "User2", email: "user2@example.com" },
//   ];

//   const response = await request(app).post("/api/allocate").send({ users });

//   expect(response.status).toBe(200);
//   expect(response.body.message).toBe("Users allocated successfully");
//   expect(response.body.astrologers.length).toBeGreaterThan(0);

//   // Fetch updated astrologers from DB
//   const updatedAstrologers = await Astrologer.find();

//   // Check if allocatedUsers array contains user objects (name & email)
//   updatedAstrologers.forEach((astro) => {
//     expect(astro.allocatedUsers).toBeInstanceOf(Array);
//     astro.allocatedUsers.forEach((user) => {
//       expect(user).toHaveProperty("name");
//       expect(user).toHaveProperty("email");
//     });
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close(); // Close DB connection after tests
// });

