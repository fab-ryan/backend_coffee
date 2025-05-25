import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';
import { ApiProperty } from '@nestjs/swagger';
import { uuid } from '@utils';

export class CreateCartDto {
    @ApiProperty({
        description: 'The quantity of the product',
        example: '1',
    })
    @IsNotEmpty({
        message: i18nValidationMessage<I18nTranslations>(
            'validation.CART.CART_QUANTITY_NOT_VALID',
        ),
    })
    @IsNumber()
    @IsPositive()
    quantity: number;

    @ApiProperty({
        description: 'The id of the product',
        example: uuid(),
    })
    @IsNotEmpty({
        message: i18nValidationMessage<I18nTranslations>(
            'validation.CART.CART_PRODUCT_ID_NOT_VALID',
        ),
    })
    @IsString()
    product_id: string;
}
