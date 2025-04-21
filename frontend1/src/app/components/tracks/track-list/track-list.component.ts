import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackService } from '../../../services/track.service';
import { GenreService } from '../../../services/genre.service';
import { ArtistService } from '../../../services/artist.service';
import { Track } from '../../../models/track.model';
import { Genre } from '../../../models/genre.model';
import { Artist } from '../../../models/artist.model';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {
  tracks: Track[] = [];
  genres: Genre[] = [];
  artists: Artist[] = [];
  trackForm!: FormGroup;
  loading = false;
  submitting = false;
  error = '';
  success = '';
  selectedFile: File | null = null;

  constructor(
    private trackService: TrackService,
    private genreService: GenreService,
    private artistService: ArtistService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.trackForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      genre: [''],
      duration: ['00:03:00'],
      release_date: [new Date().toISOString().split('T')[0]]
    });
    
    this.loadTracks();
    this.loadGenres();
    this.loadArtists();
  }

  // convenience getter for easy access to form fields
  get f() { return this.trackForm.controls; }

  loadTracks(): void {
    this.loading = true;
    this.trackService.getTracks().subscribe({
      next: (tracks) => {
        this.tracks = tracks;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load tracks. Please try again later.';
        this.loading = false;
        console.error('Error loading tracks', error);
      }
    });
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      },
      error: (error) => {
        console.error('Error loading genres', error);
      }
    });
  }

  loadArtists(): void {
    this.artistService.getArtists().subscribe({
      next: (artists) => {
        this.artists = artists;
      },
      error: (error) => {
        console.error('Error loading artists', error);
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    this.success = '';
    this.error = '';
    
    if (this.trackForm.invalid) {
      return;
    }

    if (!this.selectedFile) {
      this.error = 'Please select an audio file';
      return;
    }

    this.submitting = true;
    
    const track: Track = {
      ...this.trackForm.value,
      audio_file: this.selectedFile
    };
    
    this.trackService.createTrack(track).subscribe({
      next: () => {
        this.success = 'Track created successfully!';
        this.loadTracks();
        this.resetForm();
        this.submitting = false;
      },
      error: (error) => {
        this.error = error.error?.detail || 'Failed to create track. Please try again.';
        this.submitting = false;
        console.error('Track creation error:', error);
      }
    });
  }

  resetForm(): void {
    this.trackForm.reset({
      duration: '00:03:00',
      release_date: new Date().toISOString().split('T')[0]
    });
    this.selectedFile = null;
  }
} 