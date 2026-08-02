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

describe("Authentication", () => {

    test("Signup redirects to listings", async () => {

        const res = await request(app)
            .post("/signup")
            .type("form")
            .send({
                username: "chinmay",
                email: "chinmay@test.com",
                password: "password123",
            });

        expect(res.status).toBe(302);
        expect(res.headers.location).toBe("/listings");

    });

    test("Login redirects to listings", async () => {

        const agent = request.agent(app);

        await agent
            .post("/signup")
            .type("form")
            .send({
                username: "john",
                email: "john@test.com",
                password: "password123",
            });

        const res = await agent
            .post("/login")
            .type("form")
            .send({
                username: "john",
                password: "password123",
            });

        expect(res.status).toBe(302);
        expect(res.headers.location).toBe("/listings");

    });

    test("Unauthenticated user cannot create listing", async () => {

        const res = await request(app)
            .post("/listings")
            .type("form")
            .send({
                listing: {
                    title: "Beach Villa",
                    description: "Test",
                    price: 2000,
                    location: "Goa",
                    country: "India",
                    category: "Trending",
                },
            });

        expect(res.status).toBe(302);
        expect(res.headers.location).toBe("/login");

    });

});