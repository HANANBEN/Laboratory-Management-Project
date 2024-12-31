import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TestAnalysis } from '../../models/TestAnalysis.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestAnalysisService {
  private readonly BASE_URL = 'http://localhost:5678';

  constructor(private http: HttpClient) {}

  listTestAnalysisByAnalysisId(analysisId: number): Observable<TestAnalysis[]> {
    const url = `${this.BASE_URL}/testAnalyses/search/byAnalysisId`;
    const params = new HttpParams().set('analysisId', analysisId.toString());

    return this.http.get<any>(url, { params }).pipe(
      map((response) => response._embedded.testAnalyses || []),
      catchError((error) => {
        console.error('Error fetching test analyses:', error);
        return throwError(() => new Error('Failed to fetch test analyses'));
      })
    );
  }

  getTestAnalysisById(id: number): Observable<TestAnalysis> {
    const url = `${this.BASE_URL}/testAnalyses/${id}`;
    return this.http.get<TestAnalysis>(url).pipe(
      catchError((error) => {
        console.error('Error fetching test analysis by ID:', error);
        return throwError(() => new Error('Failed to fetch test analysis by ID'));
      })
    );
  }

  createTestAnalysis(testAnalysis: TestAnalysis): Observable<TestAnalysis> {
    const url = `${this.BASE_URL}/testAnalyses`;
    return this.http.post<TestAnalysis>(url, testAnalysis).pipe(
      catchError((error) => {
        console.error('Error creating test analysis:', error);
        return throwError(() => new Error('Failed to create test analysis'));
      })
    );
  }

  deleteTestAnalysis(id: number): Observable<void> {
    const url = `${this.BASE_URL}/testAnalyses/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        console.error('Error deleting test analysis:', error);
        return throwError(() => new Error('Failed to delete test analysis'));
      })
    );
  }
}
