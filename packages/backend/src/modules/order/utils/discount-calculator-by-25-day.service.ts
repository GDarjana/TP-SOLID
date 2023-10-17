import { BaseCalculatorServiceInterface } from './base-calculator.interface';
import { DiscountDeleterServiceInterface } from './discount-deleter.interface';

export class DiscountCalculatorBy25DayService implements BaseCalculatorServiceInterface, DiscountDeleterServiceInterface {
  calculate(order: Order, total: number): number {
    return total - 25;
  }
  deleteDiscount(order: Order, total: number): void {}
}
