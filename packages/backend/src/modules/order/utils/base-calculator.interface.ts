export interface BaseCalculatorServiceInterface {
  calculate(order: Order, total: number): number;
}
