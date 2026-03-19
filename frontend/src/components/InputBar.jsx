import { Mic, Paperclip, SendHorizontal, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const InputBar = ({ onSendMessage, isGenerating }) => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsRecording(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        onSendMessage(transcript); // Send immediately when speech processing finishes
        setText("");
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, [onSendMessage]);

  const handleSend = () => {
    if (text.trim() && !isGenerating && !isRecording) {
      onSendMessage(text);
      setText("");
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setText("");
      recognitionRef.current.start();
    }
  };

  return (
    <>
    <style>{`
      @keyframes wave {
        0%, 100% { height: 20%; }
        50% { height: 100%; }
      }
      .animate-wave {
        animation: wave 1s ease-in-out infinite;
      }
    `}</style>
    <div className="w-full p-4 border-t border-white/5 bg-primary relative z-10">
      <div className="max-w-4xl mx-auto flex items-center bg-secondary rounded-full p-2 border border-white/10 shadow-lg">
        <button className="p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Paperclip size={20} />
        </button>
        
        <div className="flex-1 flex items-center h-10 px-4">
          {isRecording ? (
            <div className="flex items-center space-x-3 w-full h-full">
              <span className="text-red-400 text-sm font-medium leading-none">Listening...</span>
              <div className="flex space-x-1 items-end h-5 mt-1">
                <div className="w-1 bg-red-400 rounded-full animate-wave" style={{ animationDelay: '0s' }}></div>
                <div className="w-1 bg-red-400 rounded-full animate-wave" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 bg-red-400 rounded-full animate-wave" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 bg-red-400 rounded-full animate-wave" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1 bg-red-400 rounded-full animate-wave" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          ) : (
            <input 
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type or speak..."
              className="w-full h-full bg-transparent border-none outline-none text-white placeholder-gray-500"
              disabled={isGenerating}
            />
          )}
        </div>
        
        <button 
          onClick={toggleRecording}
          disabled={isGenerating}
          className={`p-3 transition-colors rounded-full relative group flex items-center justify-center ${
            isRecording ? 'text-white bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {isRecording && <span className="absolute inset-0 rounded-full animate-ping bg-red-400/60"></span>}
          <Mic size={20} className={isRecording ? "" : "group-hover:text-accent disabled:opacity-50"} />
        </button>
        
        <button 
          onClick={handleSend}
          disabled={(!text.trim() && !isRecording) || isGenerating}
          className="p-3 bg-accent text-primary rounded-full ml-2 hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <SendHorizontal size={20} />}
        </button>
      </div>
    </div>
    </>
  );
};

export default InputBar;
