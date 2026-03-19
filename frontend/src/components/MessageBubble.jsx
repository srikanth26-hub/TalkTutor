import { useState, useRef } from 'react';
import { Bot, User, Play, Pause } from 'lucide-react';

const MessageBubble = ({ text, sender, timestamp, audioUrl }) => {
  const isAI = sender === "ai";
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    
    // Calculate click position relative to the progress bar container
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    audioRef.current.currentTime = percent * audioRef.current.duration;
    setProgress(percent * 100);
  };

  return (
    <div className={`flex w-full mt-4 space-x-3 max-w-2xl mx-auto animate-fade-in ${isAI ? "justify-start" : "justify-end"}`}>
      {isAI && (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <Bot size={18} className="text-white" />
        </div>
      )}
      
      <div className={`relative px-4 py-3 rounded-2xl whitespace-pre-wrap ${isAI ? "bg-secondary text-white rounded-tl-sm shadow-md" : "bg-accent text-primary font-medium rounded-tr-sm shadow-md"}`}>
        <span>{text}</span>
        
        {audioUrl && (
          <div className="mt-3 w-64 flex items-center bg-black/20 rounded-lg p-2">
            <audio 
              ref={audioRef} 
              src={audioUrl} 
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => { setIsPlaying(false); setProgress(0); }}
            />
            
            <button 
              onClick={togglePlay} 
              className={`p-2 rounded-full hover:bg-black/20 transition-colors mr-3 flex-shrink-0 ${isAI ? "text-accent" : "text-primary"}`}
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
            
            <div 
              className="flex-1 h-2 bg-black/30 rounded-full overflow-hidden cursor-pointer relative" 
              onClick={handleSeek}
            >
              <div 
                className={`absolute left-0 top-0 h-full transition-all duration-75 ${isAI ? "bg-accent" : "bg-primary"}`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className={`text-[10px] mt-1 text-right ${isAI ? "text-gray-400" : "text-primary/70"}`}>
          {timestamp}
        </div>
      </div>

      {!isAI && (
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 shadow-sm shadow-accent/50">
          <User size={18} className="text-primary" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
