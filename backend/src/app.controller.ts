import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';
import path from 'path';
export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (_, file, cn) => {
      console.log(file);
      const types = file.mimetype.split('/')[1];
      cn(null, uuidv4() + `.${types}`);
    },
  }),
};

@Controller()
export class AppController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return of({ imagePath: file.filename });
  }
}
