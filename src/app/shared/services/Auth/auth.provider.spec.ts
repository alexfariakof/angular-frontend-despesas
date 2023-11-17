import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthProvider } from './auth.provider';


describe('Unit Test Auth Provider', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[AuthProvider ]
    });
  });

  it('should be created', inject([AuthProvider], (provider: AuthProvider) => {
    expect(provider).toBeTruthy();
  }));


});
