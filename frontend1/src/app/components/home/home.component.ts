import { Component, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/genre.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  genres: Genre[] = [];
  loading = false;
  error = '';

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.loading = true;
    this.genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres.slice(0, 5); // Get only first 5 genres
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load genres. Please try again later.';
        this.loading = false;
        console.error('Error loading genres', error);
      }
    });
  }
} 