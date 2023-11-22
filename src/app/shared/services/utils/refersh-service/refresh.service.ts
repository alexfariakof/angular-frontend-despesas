import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class RefreshService {
  private refreshSubject = new Subject<void>();

  refresh(): void {
    this.refreshSubject.next();
  }

  onRefresh(): Observable<void> {
    return this.refreshSubject.asObservable();
  }
}
