import { Column, PrimaryKey, Table, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';

import OrderItemModel from './order-item.model';
import CustomerModel from '../../../customer/repoository/sequelize/customer.model';

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}