from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai
from murf import Murf

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Murf(api_key=os.getenv("MURF_API_KEY"))

VOICE_MOODS = {
    "Miles" :{
        "voice_id" : "en-US-miles",
        "moods" : ['Conversational', 'Promo', 'Sports Commentary', 'Narration', 'Newscast', 'Sad', 'Angry', 'Calm', 'Terrified', 'Inspirational', 'Pirate']
    },
    "Shane" : {
        "voice_id" : "en-AU-shane",
        "moods" : ['Conversational', 'Narration']
    },
    "Natalie" : {
        "voice_id" : "en-US-natalie",
        "moods" : ['Promo', 'Narration', 'Newscast Formal', 'Meditative', 'Sad', 'Angry', 'Conversational', 'Newscast Casual', 'Furious', 'Sorrowful', 'Terrified', 'Inspirational']
    }
}

class AudioRequest(BaseModel):
    text: str
    voice: str
    mood: str
    pitch: int = 0

class ChatRequest(BaseModel):
    text: str
    voice: str
    mood: str
    pitch: int = 0

@app.get("/api/voices")
def get_voices():
    return {"voices": VOICE_MOODS}

@app.post("/api/generate_audio")
def generate_audio(req: AudioRequest):
    voice_id = VOICE_MOODS.get(req.voice, {}).get("voice_id")
    if not voice_id:
        return {"error": "Invalid voice selection"}
    
    try:
        response = client.text_to_speech.generate(
            format="MP3",
            sample_rate=48000.0,
            channel_type="STEREO",
            text=req.text,
            voice_id=voice_id,
            style=req.mood,
            pitch=req.pitch
        )
        audio_url = response.audio_file if hasattr(response, "audio_file") else None
        if audio_url:
            return {"audio_url": audio_url}
        return {"error": "Failed to get audio_url from murf"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/chat")
def chat_with_ai(req: ChatRequest):
    voice_id = VOICE_MOODS.get(req.voice, {}).get("voice_id")
    if not voice_id:
        return {"error": "Invalid voice selection"}
    
    try:
        # 1. Ask Gemini for a response
        model = genai.GenerativeModel('gemini-2.5-flash')
        chat_prompt = f"You are a helpful conversational AI voice assistant. Keep your answer concise, natural to be spoken aloud, and ALWAYS end your response by asking the user a relevant follow-up question to keep the conversation going. The user says: {req.text}"
        ai_response = model.generate_content(chat_prompt)
        ai_text = ai_response.text

        # 2. Convert to Voice (Murf TTS)
        response = client.text_to_speech.generate(
            format="MP3",
            sample_rate=48000.0,
            channel_type="STEREO",
            text=ai_text, # Give Murf the Gemini text
            voice_id=voice_id,
            style=req.mood,
            pitch=req.pitch
        )
        audio_url = response.audio_file if hasattr(response, "audio_file") else None
        
        if audio_url:
            return {"text": ai_text, "audio_url": audio_url}
        return {"error": "Failed to get audio_url from murf", "text": ai_text}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
