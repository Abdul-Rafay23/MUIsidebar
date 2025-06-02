// table-visibility.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableVisibilityService {
  private showTableSubject = new BehaviorSubject<boolean>(false);
  showTable$ = this.showTableSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  showTableWithDelay() {
    this.loadingSubject.next(true);
    setTimeout(() => {
      this.loadingSubject.next(false);
      this.showTableSubject.next(true);
    }, 1000); 
  }

  hideTable() {
    this.showTableSubject.next(false);
    this.loadingSubject.next(false);
  }
}
