// const request = require("supertest");
// const app = require("../server");
// const Astrologer = require("../models/Astrologers");
// const User = require("../models/Users");

// describe("Flow Distribution Algorithm", () => {
//   beforeAll(async () => {
//     await Astrologer.deleteMany();
//     await User.deleteMany();

//     await Astrologer.insertMany([
//       { name: "Astrologer 1", priorityFactor: 1 },
//       { name: "Astrologer 2", priorityFactor: 2 },
//     ]);
//   });

//   test("should allocate users fairly among astrologers", async () => {
//     const response = await request(app)
//       .post("/api/allocate")
//       .send({ users: [{ name: "User1" }, { name: "User2" }] });

//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("Users allocated successfully");
//     expect(response.body.astrologers.length).toBeGreaterThan(0);
//   });

//   afterAll(async () => {
//     await Astrologer.deleteMany();
//     await User.deleteMany();
//   });
// });
