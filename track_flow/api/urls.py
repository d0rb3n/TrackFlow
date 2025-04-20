# urls.py
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('genres/', views.genre_list),
    path('genres/<int:pk>/', views.genre_detail),
    path('artists/', views.ArtistAPIView.as_view()),
    path('tracks/', views.TrackAPIView.as_view()),
    path('playlists/', views.PlaylistAPIView.as_view()),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.custom_logout, name='api_logout'),
]