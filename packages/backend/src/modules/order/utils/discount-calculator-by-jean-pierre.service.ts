import { BaseCalculatorServiceInterface } from './base-calculator.interface';
import { DiscountDeleterServiceInterface } from './discount-deleter.interface';

export class DiscountCalculatorByJeanPierreService implements BaseCalculatorServiceInterface, DiscountDeleterServiceInterface {
  calculate(order: Order, total: number): number {
    if (order.user.name === 'Jean Pierre') {
      total = total * 0.5;
    }
    return total;
  }

  deleteDiscount(order: Order): void {
    if (order.user.name === 'Jean Pierre') {
      order.discount = 0;
    }
  }
}
