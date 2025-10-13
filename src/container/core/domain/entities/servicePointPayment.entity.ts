import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusServicePointPayment } from '@domain/enums/statusServicePointPaymentType.enum';
// import { ServicePoint } from './servicePoint.entity';
// import { Owner } from "./owner.entity";
// import { Payment } from "./payment.entity";

@Entity({ name: 'servicePointPayments' })
export class ServicePointPayment {
  @PrimaryGeneratedColumn('uuid')
  _id?: string;

  // @ManyToOne(() => ServicePoint, (servicePoint) => servicePoint.ServicePointPayments)
  // servicePoint: ServicePoint;

  // @ManyToOne(() => Owner, (owner) => owner.ServicePointPayments)
  // owner: Owner;

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

  // @OneToMany(() => Payment, (payment) => payment.servicePointPayment)
  // payments: Payment[];
}
