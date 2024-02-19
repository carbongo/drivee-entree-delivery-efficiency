// Import JSON data with require (node doesn't work with JSON imports in ESM mode, lmao what? idk requires are way reliable. and they work at least)
const couriersData = require("../data/couriers.json");
const ordersData = require("../data/orders.json");

// Import types
import { Courier, Order } from "./types";

// Main logic file
import { assignOrdersToCouriers } from "./logic";

// Insert data into constants which are in their respective type
const couriers: Courier[] = couriersData;
const orders: Order[] = ordersData;

// Call main logic
const assignments = assignOrdersToCouriers(orders, couriers);

// Output
console.log(JSON.stringify(assignments, null, 2));
