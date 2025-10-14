export enum catalogCode {
  ERROR_SERVICE_POINT_REMOVE_404 = 'ERROR_SERVICE_POINT_REMOVE_404',
  ERROR_SERVICE_POINT_DISABLED_400 = 'ERROR_SERVICE_POINT_DISABLED_400',
}

type catalogStrings = keyof typeof catalogCode;

export function getCatalogDescription(key: catalogStrings) {
  if (key === catalogCode.ERROR_SERVICE_POINT_REMOVE_404) {
    return 'The service point was not found in our catalog.'
  }

  if (key === catalogCode.ERROR_SERVICE_POINT_DISABLED_400) {
    return 'The service point is currently disabled'
  }

  return 'Internal exception';
}
