import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    findByName(name: string): Promise<Product> {
        const product = this.findOne({
            where: {
                name,
            },
        });
        return product;
    }
}
