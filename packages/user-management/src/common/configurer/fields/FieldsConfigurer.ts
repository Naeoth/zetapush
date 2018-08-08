import { AbstractParent } from '../AbstractParent';
import { Configurer, ScanConfigurer, AnnotationsConfigurer, FieldsConfigurer, FieldConfigurer } from '../grammar';
import { Type } from '@zetapush/platform-legacy';
import { ValidationManager } from '../../api';
import { DefaultScanConfigurer } from './ScanConfigurer';
import { NoOpValidationManager } from '../../core';

/**
 * Default fields configurer implémentation
 * The build return a ValidationManager (without any validation process)
 */
export class DefaultFieldsConfigurer<P> extends AbstractParent<P>
  implements Configurer<ValidationManager>, FieldsConfigurer<P> {
  private scanBuilder: any;

  constructor(private parent: P) {
    super(parent);
  }

  scan(model: Type<any>): ScanConfigurer<FieldsConfigurer<P>> {
    this.scanBuilder = new DefaultScanConfigurer(this, model);
    return this.scanBuilder();
  }

  field(name: string) /*: FieldConfigurer<FieldsConfigurer<P>>*/ {
    // TODO: To implements
  }

  async build(): Promise<ValidationManager> {
    if (!this.scanBuilder) {
      return new NoOpValidationManager();
    } else {
      return this.scanBuilder.build();
    }
  }
}
