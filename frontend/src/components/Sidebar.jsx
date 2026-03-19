import { PlusCircle, MessageSquare, Settings, User, Radio } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-secondary border-r border-white/5 flex flex-col hidden md:flex">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center">
          <span className="text-accent mr-2">🤖</span> TalkTutor
        </h1>
      </div>

      <div className="px-4">
        <button className="w-full bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 rounded-xl py-3 px-4 flex items-center justify-center transition-all duration-300 font-medium">
          <PlusCircle size={18} className="mr-2" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mt-6 px-3">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Sections</h3>
          <div className="space-y-1">
            <button className="w-full flex items-center px-3 py-2.5 rounded-lg bg-white/5 text-white">
              <MessageSquare size={16} className="mr-3 text-gray-400" />
              <span className="text-sm font-medium">Personal Chat</span>
            </button>
            <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <Radio size={16} className="mr-3 text-gray-400" />
              <span className="text-sm font-medium">Voice Conversations</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/5 space-y-2">
        <button className="w-full flex items-center px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <User size={18} className="mr-3" />
          <span className="text-sm font-medium">Profile</span>
        </button>
        <button className="w-full flex items-center px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <Settings size={18} className="mr-3" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
