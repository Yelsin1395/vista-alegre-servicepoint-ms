import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusServicePointPayment } from '@domain/enums/statusServicePointPaymentType.enum';
import { SubscriptionType } from '@domain/enums/subscriptionType.enum';

@Entity({ name: 'servicePointPayments' })
export class ServicePointPayment {
  @PrimaryGeneratedColumn('uuid')
  _id?: string;

  @Column({ type: 'uuid', nullable: false })
  servicePoints_id: string;

  @Column({ type: 'uuid', nullable: false })
  owners_id: string;

  @Column({
    comment: 'Last date and time of payment',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  lastPayment: Date;

  @Column({
    comment: 'Next date and time of payment',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  nextPayment: Date;

  @Column({
    type: 'enum',
    enum: SubscriptionType,
    comment: 'Service status',
    nullable: false,
    default: SubscriptionType.MONTHLY,
  })
  subscriptionType: SubscriptionType;

  @Column({
    comment: 'Billing period in months with respect to the subscription type',
    type: 'integer',
    nullable: true,
    default: null
  })
  billingPeriodInMonths: number;

  @Column({
    type: 'enum',
    enum: StatusServicePointPayment,
    comment: 'Service status',
    nullable: true,
    default: null,
  })
  serviceStatus: StatusServicePointPayment;

  @Column({
    comment: 'Service point payment enabled',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isEnabled: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
