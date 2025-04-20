from django.contrib import admin
from .models import Genre, Artist, Track, Playlist

admin.site.register(Genre)
admin.site.register(Artist)
admin.site.register(Track)
admin.site.register(Playlist)
