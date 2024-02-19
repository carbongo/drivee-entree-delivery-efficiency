// Importing types
import { GeoCoordinates, Order, Courier } from "./types";

// The distance between two coordinates (should consider roads, turns, and etc as well, if we want it to be better. but I'm not getting paid (yet) for this kind of megabrain stuff)
export function calculateDistance(
  point1: GeoCoordinates,
  point2: GeoCoordinates
): number {
  return Math.sqrt(
    Math.pow(point2.latitude - point1.latitude, 2) +
      Math.pow(point2.longitude - point1.longitude, 2)
  );
}

// Assigning orders to the nearest couriers (loop inside of a loop, haha classic)
export function assignOrdersToCouriers(
  orders: Order[],
  couriers: Courier[]
): { [courierId: string]: Order[] } {
  let assignments: { [courierId: string]: Order[] } = {};

  // Creating an empty list
  couriers.forEach((courier) => (assignments[courier.id] = []));

  // Finding the closest courier for each order
  orders.forEach((order) => {
    let closestCourier: Courier | null = null;
    let shortestDistance = Number.MAX_VALUE;

    // Calculating and comparing distances to find closest
    couriers.forEach((courier) => {
      const distance = calculateDistance(courier.location, order.pointA);
      if (distance < shortestDistance) {
        closestCourier = courier;
        shortestDistance = distance;
      }
    });

    // Assigning order to the closest courier
    if (closestCourier) {
      assignments[closestCourier["id"]].push(order);
    }
  });

  return assignments;
}
