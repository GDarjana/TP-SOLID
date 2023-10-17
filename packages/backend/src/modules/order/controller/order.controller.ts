import { Controller, Post } from '@nestjs/common';
import { Exception } from '../../shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '../../shared/domain/const/exception-type.enum';
import emailSenderService from '../utils/emailSender.service';
import { addProductToCartService } from '../use-case/addProductToCart.service';

@Controller('/order')
export default class ProductToCartAdder {
  constructor(private readonly productRepository: ProductRepository, private readonly emailSender: emailSenderService) {}

  @Post()
  async addProductToCart(Request: Request): Promise<Order> {
    const productId = Request.body.productId;
    const productQuantity = Request.body.productQuantity;
    const orderId = Request.body.orderId;

    addProductToCartService.addProductToCart(productId, productQuantity, orderId);
    emailSenderService.sendEmail('admin@admin.com', 'Order created ! ', 'Your order is good :)');
  }
}
