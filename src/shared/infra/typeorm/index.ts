import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

import { CreateProducts1607437608841 } from './migrations/1634680581404-CreateProducts';
import { CreateUsers1635272308978 } from './migrations/1635272308978-CreateUsers';
import { CreateUserTokens1635813879933 } from './migrations/1635813879933-CreateUserTokens';
import { CreateCustomers1636203422913 } from './migrations/1636203422913-CreateCustomers';
import { CreateOrdes1636242606915 } from './migrations/1636242606915-CreateOrdes';
import { addCustomerIdOrders1636244422216 } from './migrations/1636244422216-addCustomerIdOrders';
import { CreateOrdersProducts1636330060997 } from './migrations/1636330060997-CreateOrdersProducts';
import { addOrderIdToOrdersProducts1636330831712 } from './migrations/1636330831712-addOrderIdToOrdersProducts';
import { addProductIdToOrdesProducts1636332695996 } from './migrations/1636332695996-addProductIdToOrdesProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1607437608841,
    CreateUsers1635272308978,
    CreateUserTokens1635813879933,
    CreateCustomers1636203422913,
    CreateOrdes1636242606915,
    addCustomerIdOrders1636244422216,
    CreateOrdersProducts1636330060997,
    addOrderIdToOrdersProducts1636330831712,
    addProductIdToOrdesProducts1636332695996,
  ],
});
