import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(albumName: string) {
    return this.http.get(`${environment.api_endpoint}?album=${albumName}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      if (error.status ===   0) { errorMessage = 'Server offline'; }
      if (error.status === 400) { errorMessage = 'Bad user input'; }
      if (error.status === 401) { errorMessage = 'User unauthorized'; }
      if (error.status === 404) { errorMessage = 'Resource not found'; }
      if (error.status === 500) { errorMessage = 'Internal server error'; }
    }

    return throwError(errorMessage);
  }
}
