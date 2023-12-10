import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
} from 'libphonenumber-js';
import { Transform } from 'class-transformer';

const validCountries = ['RW'];

export const parsePhoneRw = (value: any) => {
  return parsePhoneNumberFromString(value, 'RW');
};

export const parseToRwandanNumber = Transform(
  (value: any) => {
    if (typeof value.value !== 'string') return undefined;
    const phone = value.value;
    const parsed = parsePhoneRw(phone.replace(/^0/, ''));
    if (!parsed) return undefined;
    if (!validCountries.includes(parsed.country)) return undefined;

    return parsed.number;
  },
  { toClassOnly: true },
);

export function IsRwandanPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isRwandanPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isValidPhoneNumber(value, { defaultCountry: 'RW' });
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Rwandan phone number`;
        },
      },
    });
  };
}
