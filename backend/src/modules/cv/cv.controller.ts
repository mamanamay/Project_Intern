import { Controller, Get, Body, Patch, Sse, MessageEvent } from '@nestjs/common';
import { CvService } from './cv.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  async getCv() {
    return this.cvService.getCv();
  }

  @Patch()
  async updateCv(@Body() updateData: any) {
    return this.cvService.updateCv(updateData);
  }

  @Sse('stream')
  streamEvents(): Observable<MessageEvent> {
    return this.cvService.updates$.asObservable().pipe(
      map((payload) => ({ data: payload } as MessageEvent)),
    );
  }
}
