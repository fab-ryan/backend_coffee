import {
  I18nModule,
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
} from 'nestjs-i18n';
import * as path from 'path';

import { ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        console.log('Factory function executed');
        return {
          global: true,
          fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
          loaderOptions: {
            path: path.join(__dirname, '../i18n/'),
            watch: true,
          },
          logging: false,
          typesOutputPath: path.join(
            __dirname,
            '../../src/generated/i18n.generated.ts',
          ),
        };
      },
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang'],
        },
        new HeaderResolver(['x-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
      inject: [ConfigService],
    }),
  ],
})
export class I18Module {}
