import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../../services/artist.service';
import { Artist } from '../../../models/artist.model';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];
  artistForm!: FormGroup;
  loading = false;
  submitting = false;
  error = '';
  success = '';

  constructor(
    private artistService: ArtistService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.artistForm = this.formBuilder.group({
      name: ['', Validators.required],
      bio: ['']
    });
    
    this.loadArtists();
  }

  // convenience getter for easy access to form fields
  get f() { return this.artistForm.controls; }

  loadArtists(): void {
    this.loading = true;
    this.artistService.getArtists().subscribe({
      next: (artists) => {
        this.artists = artists;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load artists. Please try again later.';
        this.loading = false;
        console.error('Error loading artists', error);
      }
    });
  }

  onSubmit(): void {
    this.success = '';
    this.error = '';
    
    if (this.artistForm.invalid) {
      return;
    }

    this.submitting = true;
    
    this.artistService.createArtist(this.artistForm.value).subscribe({
      next: () => {
        this.success = 'Artist created successfully!';
        this.loadArtists();
        this.resetForm();
        this.submitting = false;
      },
      error: (error) => {
        this.error = error.error?.detail || 'Failed to create artist. Please try again.';
        this.submitting = false;
      }
    });
  }

  resetForm(): void {
    this.artistForm.reset();
  }
} 