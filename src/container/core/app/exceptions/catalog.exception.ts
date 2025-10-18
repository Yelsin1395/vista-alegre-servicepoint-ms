export enum CatalogCode {
  ERROR_SERVICE_POINT_ALREADY_EXIST_400 = 'ERROR_SERVICE_POINT_ALREADY_EXIST_400',
  ERROR_SERVICE_POINT_REMOVE_404 = 'ERROR_SERVICE_POINT_REMOVE_404',
  ERROR_SERVICE_POINT_DISABLED_400 = 'ERROR_SERVICE_POINT_DISABLED_400',

  // Service Point Payment
  ERROR_SERVICE_POINT_PAYMENT_ALREADY_EXIST_400 = 'ERROR_SERVICE_POINT_PAYMENT_ALREADY_EXIST_400'
}

type CatalogStrings = keyof typeof CatalogCode;

export function getCatalogDescription(key: CatalogStrings) {
  if (key === CatalogCode.ERROR_SERVICE_POINT_ALREADY_EXIST_400) {
    return 'The service point already exist in the service.';
  }

  if (key === CatalogCode.ERROR_SERVICE_POINT_REMOVE_404) {
    return 'The service point was not found in our catalog.';
  }

  if (key === CatalogCode.ERROR_SERVICE_POINT_DISABLED_400) {
    return 'The service point is currently disabled';
  }

  if (key === CatalogCode.ERROR_SERVICE_POINT_PAYMENT_ALREADY_EXIST_400) {
    return 'The payment service point is already associated with an owner.'
  }

  return 'Internal exception';
}
