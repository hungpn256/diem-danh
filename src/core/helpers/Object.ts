import { TypeCommon } from 'types/Common';

const getValue = (
  data: object,
  defaultValue: TypeCommon,
  paths: (string | number)[],
): TypeCommon => {
  try {
    if (data === undefined || data === null) {
      return defaultValue;
    }

    let value = data as TypeCommon;

    paths.map((p: string | number) => {
      value = value[p];
      return p;
    });
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }
    return value;
  } catch (e) {
    return defaultValue;
  }
};

export { getValue };
