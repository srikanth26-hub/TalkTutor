import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages, isGenerating, onPlayAudio }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-primary overflow-hidden relative">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-primary/80 backdrop-blur-md z-10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-accent to-yellow-600 flex items-center justify-center shadow-lg shadow-accent/20 border border-accent/40 mr-3">
            <span className="text-primary font-bold text-lg leading-none mt-1">AI</span>
          </div>
          <div>
            <h2 className="text-white font-semibold flex items-center">
              TalkToAI
              <span className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </h2>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <div className="w-20 h-20 rounded-full bg-white/5 mb-4 flex items-center justify-center">
              <span className="text-4xl">👋</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Welcome to TalkToAI</h3>
            <p className="text-gray-400 max-w-sm">Type a message or use the microphone to start a conversation with your AI friend.</p>
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                text={msg.text}
                sender={msg.sender}
                timestamp={msg.timestamp}
                audioUrl={msg.audioUrl}
              />
            ))}

            {isGenerating && (
              <div className="flex w-full mb-6 text-left">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-accent to-yellow-600 flex items-center justify-center mr-3 mt-1 shrink-0 shadow-lg shadow-accent/20 border border-accent/40">
                  <span className="text-primary font-bold text-sm leading-none mt-1">AI</span>
                </div>
                <div className="bg-white/5 border border-white/10 text-gray-300 rounded-2xl rounded-tl-sm px-6 py-4 flex items-center shadow-md">
                  <div className="flex space-x-2 mr-3">
                    <div className="w-2 h-2 rounded-full bg-red-500  animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                  <span className="text-sm font-medium">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
