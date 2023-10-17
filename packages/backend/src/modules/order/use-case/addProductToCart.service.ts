import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';

export class addProductToCartService {
  private maxProductsInOrder = 10;

  constructor(private readonly productRepository: ProductRepository, private readonly orderRepository: OrderRepository) {}

  async getOrderFromDb(orderId: number) {
    return await this.orderRepository.find({ id: orderId });
  }

  async getProductFromDb(productId: number) {
    return await this.productRepository.find({ id: productId });
  }

  async saveproductInOrder(productQuantity: number, productFromDb: Product, orderFromDb: Order): Promise<Order> {
    productFromDb.quantity -= productQuantity;
    orderFromDb.products.push(productFromDb);
    return await this.orderRepository.save(orderFromDb);
  }

  async checkProductAvailability(productId: number, productQuantity: number, orderId: number) {
    const orderFromDb = await this.getOrderFromDb(orderId);
    const productFromDb = await this.getProductFromDb(productId);

    if (!orderFromDb) {
      throw new Exception(ExceptionTypeEnum.NotFound, 'Order not found');
    }

    if (!productFromDb) {
      throw new Exception(ExceptionTypeEnum.NotFound, 'Product not found');
    }

    if (productQuantity > this.maxProductsInOrder) {
      throw new Exception(ExceptionTypeEnum.BadRequest, `Cannot order more than ${this.maxProductsInOrder}`);
    }

    if (productFromDb.quantity < productQuantity) {
      throw new Exception(ExceptionTypeEnum.BadRequest, 'Not enough products in stock');
    }
  }

  async addProductToCart(productId: number, productQuantity: number, orderId: number) {
    this.checkProductAvailability(productId, productQuantity, orderId);
    this.saveproductInOrder(productId, productQuantity, orderId);
  }
}
