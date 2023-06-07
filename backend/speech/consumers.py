# consumers.py
import base64
import json

import speech_recognition as sr
from channels.generic.websocket import WebsocketConsumer


class AudioAnalysisConsumer(WebsocketConsumer):
    def connect(self):
        # Połączenie WebSocket zostało ustanowione
        self.accept()
        self.data = []

    def receive(self, text_data):

        self.data.append(text_data)

        if len(self.data) > 100:
            self.transcribe_audio(text_data)
            self.data = []

    def transcribe_audio(self, audio_data):
        a = base64.b64decode(audio_data)
        wav_file = open("temp.wav", "wb")
        decode_string = base64.b64decode(a)
        wav_file.write(decode_string)