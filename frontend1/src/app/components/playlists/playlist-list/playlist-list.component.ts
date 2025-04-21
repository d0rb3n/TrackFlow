import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistService } from '../../../services/playlist.service';
import { TrackService } from '../../../services/track.service';
import { Playlist } from '../../../models/playlist.model';
import { Track } from '../../../models/track.model';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  playlists: Playlist[] = [];
  tracks: Track[] = [];
  playlistForm!: FormGroup;
  loading = false;
  submitting = false;
  error = '';
  success = '';
  selectedTracks: number[] = [];

  constructor(
    private playlistService: PlaylistService,
    private trackService: TrackService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.playlistForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      is_public: [true]
    });
    
    this.loadPlaylists();
    this.loadTracks();
  }

  // convenience getter for easy access to form fields
  get f() { return this.playlistForm.controls; }

  loadPlaylists(): void {
    this.loading = true;
    this.playlistService.getPlaylists().subscribe({
      next: (playlists) => {
        this.playlists = playlists;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load playlists. Please try again later.';
        this.loading = false;
        console.error('Error loading playlists', error);
      }
    });
  }

  loadTracks(): void {
    this.trackService.getTracks().subscribe({
      next: (tracks) => {
        this.tracks = tracks;
      },
      error: (error) => {
        console.error('Error loading tracks', error);
      }
    });
  }

  toggleTrackSelection(trackId: number): void {
    const index = this.selectedTracks.indexOf(trackId);
    if (index !== -1) {
      this.selectedTracks.splice(index, 1);
    } else {
      this.selectedTracks.push(trackId);
    }
  }

  isTrackSelected(trackId: number): boolean {
    return this.selectedTracks.includes(trackId);
  }

  onSubmit(): void {
    this.success = '';
    this.error = '';
    
    if (this.playlistForm.invalid) {
      return;
    }

    if (this.selectedTracks.length === 0) {
      this.error = 'Please select at least one track for your playlist';
      return;
    }

    this.submitting = true;
    
    const playlist: Playlist = {
      ...this.playlistForm.value,
      tracks: this.selectedTracks
    };
    
    this.playlistService.createPlaylist(playlist).subscribe({
      next: () => {
        this.success = 'Playlist created successfully!';
        this.loadPlaylists();
        this.resetForm();
        this.submitting = false;
      },
      error: (error) => {
        this.error = error.error?.detail || 'Failed to create playlist. Please try again.';
        this.submitting = false;
      }
    });
  }

  resetForm(): void {
    this.playlistForm.reset({
      is_public: true
    });
    this.selectedTracks = [];
  }
} 