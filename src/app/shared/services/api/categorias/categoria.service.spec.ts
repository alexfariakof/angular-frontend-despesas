import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriaService } from './categoria.service';
import { environment } from '../../../environments/environment';

describe('Unit Test CategoriaService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[CategoriaService ]
    });
  });

  it('should be created', inject([CategoriaService], (service: CategoriaService) => {
    expect(service).toBeTruthy();
  }));


});
