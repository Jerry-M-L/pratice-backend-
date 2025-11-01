import express from "express";
import { UserController } from "./src/features/users/inbound/controller.user.js";
import { UserService } from "./src/features/users/domain/service.user.js";
import { InMemoryUserRepository } from "./src/features/users/outbound/adapter.js";
import { RealEstateController } from "./src/features/realEstates/inbound/controller.realEstate.js";
import { RealEstateService } from "./src/features/realEstates/domain/service.realEstate.js";
import { InMemoryRealEstateRepository } from "./src/features/realEstates/outbound/adapter.realEstate.js";

const app = express();
app.use(express.json());

// Users wiring (example)
const userRepo = new InMemoryUserRepository();
const userService = new UserService(userRepo);
app.use("/api", UserController(userService));

// RealEstates wiring
const reRepo = new InMemoryRealEstateRepository();
const reService = new RealEstateService(reRepo);
app.use("/api", RealEstateController(reService));

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
	console.log(`Serveur à l'écoute sur le port ${port}`);
});