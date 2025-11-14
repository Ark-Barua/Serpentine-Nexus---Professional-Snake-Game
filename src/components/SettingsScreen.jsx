const SettingsScreen = ({ 
  settings, 
  onUpdateSettings, 
  onBack, 
  onResetStats, 
  gameStats 
}) => {
  const handleToggle = (setting) => {
    onUpdateSettings({ [setting]: !settings[setting] });
  };

  const handleResetConfirm = () => {
    if (window.confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
      onResetStats();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute animate-spin top-20 left-20 text-4xl">⚙️</div>
        <div className="absolute animate-bounce top-40 right-32 text-3xl">🔧</div>
        <div className="absolute animate-pulse bottom-32 left-40 text-3xl">🎛️</div>
        <div className="absolute animate-ping bottom-20 right-20 text-3xl">⚡</div>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8 max-w-3xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Settings
          </h1>
          <p className="text-lg text-white/80">Customize your game experience</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Game Settings */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              🎮 Game Settings
            </h2>
            
            <div className="space-y-4">
              {/* Sound Toggle */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">🔊 Sound Effects</h3>
                    <p className="text-sm text-white/70">Enable game sound effects</p>
                  </div>
                  <button
                    onClick={() => handleToggle('soundEnabled')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.soundEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Particles Toggle */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">✨ Visual Effects</h3>
                    <p className="text-sm text-white/70">Enable particle effects and animations</p>
                  </div>
                  <button
                    onClick={() => handleToggle('particlesEnabled')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.particlesEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.particlesEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Grid Toggle */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">📐 Show Grid</h3>
                    <p className="text-sm text-white/70">Display grid lines on game board</p>
                  </div>
                  <button
                    onClick={() => handleToggle('showGrid')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.showGrid ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showGrid ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              📊 Statistics
            </h2>
            
            <div className="space-y-4">
              <div className="glass rounded-xl p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{gameStats.totalScore}</div>
                  <div className="text-sm text-white/70">Total Score</div>
                </div>
              </div>
              
              <div className="glass rounded-xl p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{gameStats.gamesPlayed}</div>
                  <div className="text-sm text-white/70">Games Played</div>
                </div>
              </div>
              
              <div className="glass rounded-xl p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {gameStats.gamesPlayed > 0 ? Math.round(gameStats.totalScore / gameStats.gamesPlayed) : 0}
                  </div>
                  <div className="text-sm text-white/70">Average Score</div>
                </div>
              </div>
              
              <div className="glass rounded-xl p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    {gameStats.bestTime > 0 ? Math.floor(gameStats.bestTime / 1000) : 0}s
                  </div>
                  <div className="text-sm text-white/70">Best Time</div>
                </div>
              </div>
            </div>

            {/* Reset Statistics */}
            <button
              onClick={handleResetConfirm}
              className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
            >
              🗑️ Reset Statistics
            </button>
          </div>
        </div>

        {/* Controls Info */}
        <div className="mt-8 p-6 glass rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">🎮 Controls Reference</h3>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-white/80">
            <div>
              <h4 className="font-semibold text-white mb-2">Desktop:</h4>
              <ul className="space-y-1">
                <li>• <kbd className="px-2 py-1 bg-white/20 rounded text-xs">↑↓←→</kbd> Move snake</li>
                <li>• <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Space</kbd> Pause/Resume</li>
                <li>• <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Esc</kbd> Exit to menu</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Mobile:</h4>
              <ul className="space-y-1">
                <li>• Touch directional pad to move</li>
                <li>• Tap center button to pause</li>
                <li>• Swipe gestures supported</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={onBack}
            className="w-full py-4 px-8 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold text-xl rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ← Back to Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
