import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private apiUrl = `${environment.apiUrl}tracks/`;

  constructor(private http: HttpClient) { }

  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(this.apiUrl);
  }

  createTrack(track: Track): Observable<Track> {
    const formData = new FormData();
    
    // Log what we're sending
    console.log('Creating track with data:', track);
    
    // Map artist and genre to artist_id and genre_id
    const mappedData = { ...track };
    
    // Add each field with better logging - correcting the field names
    Object.keys(mappedData).forEach(key => {
      if (mappedData[key as keyof Track] !== undefined && key !== 'audio_file') {
        // Map the artist and genre fields to artist_id and genre_id
        if (key === 'artist') {
          console.log(`Adding field artist_id:`, mappedData[key as keyof Track]);
          formData.append('artist_id', String(mappedData[key as keyof Track]));
        } 
        else if (key === 'genre') {
          console.log(`Adding field genre_id:`, mappedData[key as keyof Track]);
          formData.append('genre_id', String(mappedData[key as keyof Track]));
        }
        else {
          console.log(`Adding field ${key}:`, mappedData[key as keyof Track]);
          formData.append(key, String(mappedData[key as keyof Track]));
        }
      }
    });
    
    // Handle file separately
    if (track.audio_file && typeof track.audio_file !== 'string') {
      const file = track.audio_file as unknown as File;
      console.log('Adding audio file:', file.name, file.type, file.size);
      formData.append('audio_file', file);
    }
    
    // Log the form data keys (can't iterate entries in all browsers)
    console.log('FormData contains these keys:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    
    return this.http.post<Track>(this.apiUrl, formData);
  }
} 