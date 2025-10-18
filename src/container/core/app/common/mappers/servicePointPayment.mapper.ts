import { GetAllServicePointPaymentByOwmerResponse } from '@domain/interfaces/getAllServicePointPaymentByOwnerResponse.interface';

export class ServicePointPaymentMapper {
  static toServicePointPaymentByOwmerResponse(
    rawData: any,
  ): GetAllServicePointPaymentByOwmerResponse {
    return {
      _id: rawData._id,
      servicePoints_id: rawData.servicepoints_id,
      owners_id: rawData.owners_id,
      lastPayment: rawData.lastpayment,
      nextPayment: rawData.nextpayment,
      subscriptionType: rawData.subscriptiontype,
      billingPeriodInMonths: rawData.billingperiodinmonths,
      totalPaymentBySubscription: rawData.totalpaymentbysubscription,
      serviceStatus: rawData.servicestatus,
      isEnabled: rawData.isenabled,
      createdAt: rawData.createdat,
      updatedAt: rawData.updatedat,

      // service point data
      servicePointType: rawData.servicepointtype,
      servicePointPrice: rawData.servicepointprice,
      servicePointDescription: rawData.servicepointdescription,
      servicePointcreatedAt: rawData.servicepointcreatedat,
      servicePointupdatedAt: rawData.servicepointupdatedat,
    };
  }
}
