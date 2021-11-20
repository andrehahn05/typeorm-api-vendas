import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.repository.findOne(id);

    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = this.repository.find();

    return products;
  }

  public async findAllPaginate(): Promise<IProductPaginate> {
    const products = await this.repository.createQueryBuilder().paginate();

    return products as IProductPaginate;
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.repository.create({ name, price, quantity });

    await this.repository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.repository.save(product);

    return product;
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.repository.save(products);
  }

  public async remove(product: Product): Promise<void> {
    await this.repository.remove(product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.repository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.repository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }
}

export default ProductsRepository;
