from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import datetime



class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Artist(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='artists')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Track(models.Model):
    title = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='tracks')
    genre = models.ForeignKey(Genre, on_delete=models.SET_NULL, null=True, blank=True, related_name='tracks')
    duration = models.DurationField(default=datetime.timedelta(minutes=3))
    release_date = models.DateField(default=datetime.date(2024, 1, 1))
    audio_file = models.FileField(upload_to='tracks/')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tracks')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.artist.name}"


class Playlist(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    tracks = models.ManyToManyField(Track, related_name='playlists', blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists')
    created_at = models.DateTimeField(default=timezone.now)
    is_public = models.BooleanField(default=True)

    def __str__(self):
        return self.name
