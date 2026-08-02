const request = require("supertest");

jest.mock("../utils/redisClient", () => ({
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue("OK"),
    clearListingsCache: jest.fn().mockResolvedValue(undefined),
}));

let app;

beforeAll(() => {
    app = require("../app");
});

describe("Listing Routes", () => {

    test("GET /listings returns 200", async () => {
        const res = await request(app).get("/listings");

        expect(res.status).toBe(200);
    });

    test("GET /listings/:id with invalid id should not crash", async () => {

        const res = await request(app)
            .get("/listings/000000000000000000000000");

        expect([302, 404, 500]).toContain(res.status);
    });

});