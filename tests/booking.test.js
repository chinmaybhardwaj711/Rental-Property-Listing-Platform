const { hasOverlap } = require("../utils/bookingUtils");

describe("hasOverlap", () => {
    const existing = [
        {
            checkIn: new Date("2026-08-10"),
            checkOut: new Date("2026-08-15"),
        },
    ];

    test("detects a booking fully inside an existing one", () => {
        expect(
            hasOverlap(
                existing,
                new Date("2026-08-11"),
                new Date("2026-08-13")
            )
        ).toBe(true);
    });

    test("detects a new booking that starts inside an existing one", () => {
        expect(
            hasOverlap(
                existing,
                new Date("2026-08-14"),
                new Date("2026-08-20")
            )
        ).toBe(true);
    });

    test("detects a new booking that ends inside an existing one", () => {
        expect(
            hasOverlap(
                existing,
                new Date("2026-08-05"),
                new Date("2026-08-11")
            )
        ).toBe(true);
    });

    test("allows back-to-back booking", () => {
        expect(
            hasOverlap(
                existing,
                new Date("2026-08-15"),
                new Date("2026-08-20")
            )
        ).toBe(false);
    });

    test("allows a completely separate booking", () => {
        expect(
            hasOverlap(
                existing,
                new Date("2026-08-20"),
                new Date("2026-08-25")
            )
        ).toBe(false);
    });

    test("detects a booking that completely surrounds an existing booking", () => {
        expect(
            hasOverlap(
                existing,
                new Date("2026-08-05"),
                new Date("2026-08-20")
            )
        ).toBe(true);
    });
});