import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Inject,
} from '@nestjs/common';

@Injectable()
export class FileRequestFilter implements PipeTransform {
  constructor(@Inject('FILE_REQUEST') private readonly fileRequest: string) {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && metadata.data === this.fileRequest) {
      const file = value[this.fileRequest];
      if (file) {
        value[this.fileRequest] = file[0];
      }
    }
    return value;
  }
}
