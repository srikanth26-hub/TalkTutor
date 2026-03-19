import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import VoicePanel from './components/VoicePanel';
import { getVoices, chatWithAI } from './api';

function App() {
  const [voices, setVoices] = useState({});
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [pitch, setPitch] = useState(0);

  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch voices on mount
  useEffect(() => {
    async function loadVoices() {
      const data = await getVoices();
      if (data) {
        setVoices(data);
        const firstVoice = Object.keys(data)[0];
        if (firstVoice) {
          setSelectedVoice(firstVoice);
          if (data[firstVoice].moods && data[firstVoice].moods.length > 0) {
            setSelectedMood(data[firstVoice].moods[0]);
          }
        }
      }
    }
    loadVoices();
  }, []);

  // Update mood when voice changes
  useEffect(() => {
    if (selectedVoice && voices[selectedVoice]) {
      const moods = voices[selectedVoice].moods || [];
      setSelectedMood(moods.length > 0 ? moods[0] : "");
    }
  }, [selectedVoice, voices]);

  const handleSendMessage = async (text) => {
    // Add user message
    const newMessages = [...messages, { 
      text, 
      sender: 'user', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }];
    setMessages(newMessages);
    setIsGenerating(true);

    try {
      const result = await chatWithAI(text, selectedVoice, selectedMood, pitch);
      
      if (result && result.audio_url && result.text) {
        setMessages([...newMessages, {
          text: result.text,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          audioUrl: result.audio_url
        }]);
      } else {
        setMessages([...newMessages, {
          text: result?.error || "Sorry, I couldn't generate the response.",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-primary text-white overflow-hidden font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col relative">
        <ChatWindow messages={messages} isGenerating={isGenerating} />
        <InputBar onSendMessage={handleSendMessage} isGenerating={isGenerating} />
      </div>

      <VoicePanel 
        voices={voices}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        pitch={pitch}
        setPitch={setPitch}
      />
    </div>
  );
}

export default App;
