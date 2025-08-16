const GameControls = ({ powerUpTypes }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 glass rounded-xl p-6">
      {/* Controls Section */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          🎮 Controls
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <kbd className="px-2 py-1 bg-white/20 rounded text-sm border border-white/30">↑</kbd>
              <kbd className="px-2 py-1 bg-white/20 rounded text-sm border border-white/30">↓</kbd>
              <kbd className="px-2 py-1 bg-white/20 rounded text-sm border border-white/30">←</kbd>
              <kbd className="px-2 py-1 bg-white/20 rounded text-sm border border-white/30">→</kbd>
            </div>
            <span className="text-white/90">Move Snake</span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-3 py-1 bg-white/20 rounded text-sm border border-white/30">Space</kbd>
            <span className="text-white/90">Pause/Resume</span>
          </div>
        </div>
      </div>

      {/* Power-ups Section */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          ⚡ Power-ups
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-lg">🍎</span>
            <span className="text-white/90">Normal Food (+10 points)</span>
          </div>
          {Object.entries(powerUpTypes).map(([key, powerUp]) => (
            <div key={key} className="flex items-center gap-3 text-sm animate-float">
              <span className="text-lg">{powerUp.emoji}</span>
              <span className="text-white/90">
                {key === 'speed' && 'Speed Boost (+20 points, temporary speed up)'}
                {key === 'slow' && 'Slow Motion (+15 points, temporary slow down)'}
                {key === 'bonus' && 'Bonus Points (+50 points)'}
                {key === 'shrink' && 'Shrink (-1 segment, +30 points)'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameControls;
