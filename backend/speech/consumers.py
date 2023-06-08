import base64
import wave
import io
import speech_recognition as sr
from channels.generic.websocket import AsyncWebsocketConsumer


class AudioAnalysisConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.data = []
        self.finall_text = ''

    async def connect(self):
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        self.data.append(text_data)

        if len(self.data) > 40:
            await self.transcribe_audio()
            self.data.clear()

    async def transcribe_audio(self):
        r = sr.Recognizer()

        input_strings_bytes = [input_string.encode('ascii') for input_string in self.data]
        input_strings_bytes_decoded = [base64.decodebytes(input_string_bytes) for input_string_bytes in
                                       input_strings_bytes]
        combined_bytes = bytes()
        for decoded in input_strings_bytes_decoded:
            combined_bytes += decoded

        wav_file = self.pcm_to_wav(combined_bytes)

        try:
            with sr.AudioFile(wav_file) as source:
                audio = r.record(source)
            text = r.recognize_google(audio, language="pl-PL")
            # self.finall_text += ' ' + text
            await self.send(text)

        except sr.UnknownValueError:
            print('nie rozpoznano')

    def pcm_to_wav(self, pcm_data, channels=1, bits_per_sample=16, sample_rate=32000):
        wav_file = io.BytesIO()

        with wave.open(wav_file, 'wb') as wf:
            wf.setnchannels(channels)
            wf.setsampwidth(bits_per_sample // 8)
            wf.setframerate(sample_rate)
            wf.writeframes(pcm_data)

        wav_file.seek(0)

        return wav_file
