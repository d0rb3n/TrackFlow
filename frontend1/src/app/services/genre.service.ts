import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Genre } from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = `${environment.apiUrl}genres/`;

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }

  getGenre(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiUrl}${id}/`);
  }

  createGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiUrl, genre);
  }

  updateGenre(id: number, genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${this.apiUrl}${id}/`, genre);
  }

  deleteGenre(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
} 