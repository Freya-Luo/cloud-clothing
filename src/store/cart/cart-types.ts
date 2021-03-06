import { CategoryItem } from "../categories/categories-types";

export enum CART_ACTION_TYPES {
  SET_CART_HAS_ITEMS = "SET_CART_HAS_ITEMS",
  SET_CART_ITEMS = "SET_CART_ITEMS",
}

export type CartItem = {
  quantity: number;
  subPrice: number;
} & CategoryItem;
