export interface DiscountDeleterServiceInterface {
  deleteDiscount(order: Order, total: number): void;
}
