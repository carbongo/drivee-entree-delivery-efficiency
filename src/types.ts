// Types.
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
