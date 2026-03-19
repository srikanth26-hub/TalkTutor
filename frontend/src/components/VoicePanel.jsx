import { Settings2 } from 'lucide-react';

const VoicePanel = ({ voices, selectedVoice, setSelectedVoice, selectedMood, setSelectedMood, pitch, setPitch }) => {
  const currentVoiceData = voices[selectedVoice] || {};
  const moods = currentVoiceData.moods || [];

  return (
    <div className="w-50 h-full bg-secondary border-l border-white/5 hidden lg:flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center text-white mb-8">
        <Settings2 size={20} className="text-accent mr-3" />
        <h2 className="text-lg font-semibold">Voice Controls</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Selected Voice</label>
          <div className="relative">
            <select
              className="w-full bg-primary border border-white/10 rounded-xl px-4 py-3 text-white appearance-none outline-none focus:border-accent transition-colors"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
            >
              <option value="" disabled>Select a voice</option>
              {Object.keys(voices).map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Mood Selector</label>
          <div className="relative">
            <select
              className="w-full bg-primary border border-white/10 rounded-xl px-4 py-3 text-white appearance-none outline-none focus:border-accent transition-colors"
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              disabled={moods.length === 0}
            >
              {moods.length > 0 ? (
                moods.map(m => <option key={m} value={m}>{m}</option>)
              ) : (
                <option value="">No moods available</option>
              )}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-medium text-gray-400">Pitch / Speed</label>
            <span className="text-xs text-accent">{pitch}%</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            value={pitch}
            onChange={(e) => setPitch(parseInt(e.target.value))}
            className="w-full accent-accent h-2 bg-primary rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-auto mb-4 border border-white/10 bg-primary rounded-xl p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-secondary border-2 border-accent mb-3 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/20 animate-pulse rounded-full"></div>
          <span className="text-2xl z-10 block">🎤</span>
        </div>
        <p className="text-sm font-medium text-white">Voice active</p>
        <p className="text-xs text-gray-500 mt-1">Ready to chat</p>
      </div>
    </div>
  );
};

export default VoicePanel;
