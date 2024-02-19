const couriersData = require("../data/couriers.json");
const ordersData = require("../data/orders.json");

export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

export type Order = {
  id: string;
  pointA: GeoCoordinates;
  pointB: GeoCoordinates;
  cost: number;
};

export type Courier = {
  id: string;
  location: GeoCoordinates;
};

export function assignOrdersToCouriers(
  orders: Order[],
  couriers: Courier[]
): { [courierId: string]: Order[] } {
  let assignments: { [courierId: string]: Order[] } = {};
  couriers.forEach((courier) => (assignments[courier.id] = []));

  orders.forEach((order) => {
    let closestCourier: Courier | null = null;
    let shortestDistance = Number.MAX_VALUE;

    couriers.forEach((courier) => {
      const distance = Math.sqrt(
        Math.pow(order.pointA.latitude - courier.location.latitude, 2) +
          Math.pow(order.pointA.longitude - courier.location.longitude, 2)
      );
      if (distance < shortestDistance) {
        closestCourier = courier;
        shortestDistance = distance;
      }
    });

    if (closestCourier) {
      assignments[closestCourier["id"]].push(order);
    }
  });

  return assignments;
}

const couriers: Courier[] = couriersData;
const orders: Order[] = ordersData;

const assignments = assignOrdersToCouriers(orders, couriers);
console.log(JSON.stringify(assignments, null, 2));
