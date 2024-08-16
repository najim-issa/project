import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Employee {
  name: string;
  email: string;
  phone_number: string;
  EmployeeId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollectorService {
  getCollectorsFromLocalStorage() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://192.168.64.91:8000/api/collectors';

  constructor(private http: HttpClient) {}

  getCollectors(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap(data => {
        // Store the fetched data in local storage
        localStorage.setItem('collectors', JSON.stringify(data));
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        // Remove the deleted collector from local storage
        const collectors = this.getLocalCollectors();
        const updatedCollectors = collectors.filter((collector: any) => collector.collectorId !== id);
        this.updateLocalStorage(updatedCollectors);
      })
    );
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData).pipe(
      tap(() => {
        // Update the local storage with the updated collector
        const collectors = this.getLocalCollectors();
        const index = collectors.findIndex((collector: any) => collector.collectorId === id);
        if (index !== -1) {
          collectors[index] = { ...collectors[index], ...userData };
          this.updateLocalStorage(collectors);
        }
      })
    );
  }

  private getLocalCollectors(): any[] {
    const localCollectors = localStorage.getItem('collectors');
    return localCollectors ? JSON.parse(localCollectors).data : [];
  }

  private updateLocalStorage(collectors: any[]): void {
    localStorage.setItem('collectors', JSON.stringify({ data: collectors }));
  }
}
