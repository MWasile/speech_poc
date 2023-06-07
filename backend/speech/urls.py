from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/audio-analysis/', consumers.AudioAnalysisConsumer.as_asgi()),
]