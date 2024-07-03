import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymRepository);
  });
  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "my gym",
      description: "my beautiful gym",
      phone: "2121212121",
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
