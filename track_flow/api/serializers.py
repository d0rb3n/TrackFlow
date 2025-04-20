from rest_framework import serializers
from .models import Genre, Artist, Track, Playlist
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class GenreSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(allow_null=True, required=False)

    def create(self, validated_data):
        return Genre.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance

class ArtistSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Artist
        fields = ['id', 'name', 'bio', 'created_by']

class TrackSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)
    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(), source='artist', write_only=True
    )
    genre = GenreSerializer(read_only=True)
    genre_id = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(), source='genre', write_only=True, allow_null=True
    )
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Track
        fields = ['id', 'title', 'artist', 'artist_id', 'genre', 'genre_id', 
                 'duration', 'release_date', 'audio_file', 'created_by', 'created_at']

class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    track_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Track.objects.all(), source='tracks', write_only=True, required=False
    )
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'description', 'tracks', 'track_ids', 
                 'created_by', 'created_at', 'is_public']