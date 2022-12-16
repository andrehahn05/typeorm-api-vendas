import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProductPaginate } from '../domain/models/IProductPaginate';
import { IParams } from '@config/model_paginate/IParams';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ page, limit }: IParams): Promise<IProductPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const products = await this.productsRepository.findAll({
      page,
      skip,
      take,
    });

    return products;
  }
}

export default ListProductService;
