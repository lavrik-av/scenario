import { TestBed, inject } from '@angular/core/testing';

import { ImagesPreloaderService } from './images-preloader.service';

describe('ImagesPreloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImagesPreloaderService]
    });
  });

  it('should be created', inject([ImagesPreloaderService], (service: ImagesPreloaderService) => {
    expect(service).toBeTruthy();
  }));
});
