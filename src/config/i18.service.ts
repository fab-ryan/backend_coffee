import { Injectable } from '@nestjs/common';
import { I18nService as I18nServiceProvider } from 'nestjs-i18n';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';
@Injectable()
export class I18nService {
  constructor(private readonly i18n: I18nServiceProvider) {}
}
