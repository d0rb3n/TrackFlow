import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GenreListComponent } from './components/genres/genre-list/genre-list.component';
import { ArtistListComponent } from './components/artists/artist-list/artist-list.component';
import { TrackListComponent } from './components/tracks/track-list/track-list.component';
import { PlaylistListComponent } from './components/playlists/playlist-list/playlist-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'genres', component: GenreListComponent },
  { path: 'artists', component: ArtistListComponent, canActivate: [AuthGuard] },
  { path: 'tracks', component: TrackListComponent, canActivate: [AuthGuard] },
  { path: 'playlists', component: PlaylistListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 