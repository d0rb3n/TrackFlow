import { Component, OnInit } from '@angular/core';
import { GenreService } from '../../../services/genre.service';
import { Genre } from '../../../models/genre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {
  genres: Genre[] = [];
  genreForm!: FormGroup;
  loading = false;
  submitting = false;
  error = '';
  success = '';
  editMode = false;
  currentGenreId: number | null = null;

  constructor(
    private genreService: GenreService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.genreForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
    
    this.loadGenres();
  }

  // convenience getter for easy access to form fields
  get f() { return this.genreForm.controls; }

  loadGenres(): void {
    this.loading = true;
    this.genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load genres. Please try again later.';
        this.loading = false;
        console.error('Error loading genres', error);
      }
    });
  }

  onSubmit(): void {
    this.success = '';
    this.error = '';
    
    if (this.genreForm.invalid) {
      return;
    }

    this.submitting = true;
    
    if (this.editMode && this.currentGenreId) {
      this.genreService.updateGenre(this.currentGenreId, this.genreForm.value).subscribe({
        next: () => {
          this.success = 'Genre updated successfully!';
          this.loadGenres();
          this.resetForm();
          this.submitting = false;
        },
        error: (error) => {
          this.error = error.error?.detail || 'Failed to update genre. Please try again.';
          this.submitting = false;
        }
      });
    } else {
      this.genreService.createGenre(this.genreForm.value).subscribe({
        next: () => {
          this.success = 'Genre created successfully!';
          this.loadGenres();
          this.resetForm();
          this.submitting = false;
        },
        error: (error) => {
          this.error = error.error?.detail || 'Failed to create genre. Please try again.';
          this.submitting = false;
        }
      });
    }
  }

  editGenre(genre: Genre): void {
    this.editMode = true;
    this.currentGenreId = genre.id!;
    this.genreForm.patchValue({
      name: genre.name,
      description: genre.description
    });
  }

  deleteGenre(id: number): void {
    if (confirm('Are you sure you want to delete this genre?')) {
      this.genreService.deleteGenre(id).subscribe({
        next: () => {
          this.success = 'Genre deleted successfully!';
          this.loadGenres();
        },
        error: (error) => {
          this.error = error.error?.detail || 'Failed to delete genre. Please try again.';
        }
      });
    }
  }

  resetForm(): void {
    this.genreForm.reset();
    this.editMode = false;
    this.currentGenreId = null;
  }
} 