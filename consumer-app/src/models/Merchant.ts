import { MenuItem } from "./MenuItem";

// export type Merchant = {
//   id: number;
//   name: string;
//   description: string;
//   address: string;
//   coordinate: {
//     lat: number;
//     lng: number;
//   };
//   imageURL: string;
//   rating: number;
//   totalReviews: number;
//   delivaryFee: number;
//   estimatedDeliveryTime: number;
//   distanceInKm: number;
//   displayTag: string | null;
//   cuisine_categories: string[];
//   promo: {
//     hasPromo: boolean;
//     description: string;
//   };
//   menu_items?: MenuItem[];
// };

// Temporarily mimic data schema in db.json
export type Merchant = {
  id: number | string;
  address: {
    name: string;
  };
  latlng: {
    latitude: number;
    longitude: number;
  };
  merchantBrief: {
    cuisine: string[];
    smallPhotoHref: string;
    distanceInKm: number;
    displayInfo: {
      primaryText: string;
    };
    rating: number;
    vote_count: number;
    promo?: {
      hasPromo: boolean;
    };
  };
  estimatedDeliveryFee: {
    price: number;
    priceDisplay: string;
  };
  menu_items?: MenuItem[];
};

export class MerchantModel {
  constructor(
    public id: number | string,
    public address: { name: string },
    public merchantBrief: {
      cuisine: string[];
      smallPhotoHref: string;
      distanceInKm: number;
      displayInfo: {
        primaryText: string;
      };
      rating: number;
      vote_count: number;
      promo?: {
        hasPromo: boolean;
      };
    },
    public estimatedDeliveryFee: {
      price: number;
      priceDisplay: string;
    },
    public menuItems: MenuItem[]
  ) {}
}
