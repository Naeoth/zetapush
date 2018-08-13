import { EmailTemplateConfigurer, Configurer } from '../grammar';
import { AbstractParent } from '../AbstractParent';
import { Location, Variables, TemplateManager } from '../../api';
import { FuncCallTemplateParser } from '../../core';
import { DelegateTemplateManager } from '../../core/template/DelegateTemplateManager';
import { NoOpResourceResolver } from '../../core/resource/NoOpResourceResolver';
import { MissingMandatoryConfigurationError } from '../ConfigurerError';
import { TemplateConfigurerImpl } from './TemplateConfigurer';

export class EmailTemplateConfigurerImpl<P> extends TemplateConfigurerImpl<P, EmailTemplateConfigurer<P>>
  implements EmailTemplateConfigurer<P>, Configurer<{ manager: TemplateManager; location?: Location }> {
  constructor(parent: P) {
    super(parent);
    this.self = this;
  }

  inlineCss(): EmailTemplateConfigurer<P> {
    throw new Error('Method not implemented.');
  }
  inlineImages(): EmailTemplateConfigurer<P> {
    throw new Error('Method not implemented.');
  }

  async build() {
    return super.build();
  }
}
