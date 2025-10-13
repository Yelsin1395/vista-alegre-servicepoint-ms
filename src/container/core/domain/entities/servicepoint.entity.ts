import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServicePointType } from '@domain/enums/servicePointType.enum';
import { CurrencyType } from '@domain/enums/currencyType.enum';
// import { ServicePointPayment } from './servicePointPayment.entity';

@Entity({ name: 'servicePoints' })
export class ServicePoint {
  @PrimaryGeneratedColumn('uuid')
  _id?: string;

  @Column({
    type: 'enum',
    enum: ServicePointType,
    comment: 'Type of service',
    nullable: false,
    default: ServicePointType.GENERAL,
  })
  type: ServicePointType;

  @Column({
    type: 'enum',
    enum: CurrencyType,
    comment: 'Type of service',
    nullable: false,
    default: CurrencyType.PEN,
  })
  currency: CurrencyType;

  @Column({
    comment: 'Service point price',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: false,
    default: 0,
  })
  price: number;

  @Column({ comment: 'Service point description', type: 'varchar', nullable: false })
  description: string;

  @Column({ comment: 'Service point enabled', type: 'boolean', nullable: false, default: true })
  isEnabled: boolean;

  @Column({ comment: 'Service point owner', type: 'boolean', nullable: false, default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  // @OneToMany(() => ServicePointPayment, (servicePointPayment) => servicePointPayment.servicePoint)
  // ServicePointPayments: ServicePointPayment[]
}
