import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CartValidatorPipe implements PipeTransform<number> {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.size === '')
      throw new BadRequestException(`${value.size} is an invalid size`);
    return value;
  }
}
