const StartScreen = ({ 
  onStartGame, 
  onBack, 
  selectedSkin, 
  setSelectedSkin, 
  difficulty, 
  setDifficulty, 
  skins 
}) => {
  const skinOptions = [
    { key: 'classic', name: 'Classic', emoji: '🟢', description: 'Traditional green snake' },
    { key: 'neon', name: 'Neon', emoji: '💚', description: 'Electric glow effect' },
    { key: 'rainbow', name: 'Rainbow', emoji: '🌈', description: 'Colorful gradient' },
    { key: 'fire', name: 'Fire', emoji: '🔥', description: 'Blazing red theme' },
    { key: 'ice', name: 'Ice', emoji: '❄️', description: 'Cool blue theme' }
  ];

  const difficultyOptions = [
    { key: 'easy', name: 'Easy', description: 'Slower pace, perfect for beginners', color: 'from-green-500 to-emerald-600' },
    { key: 'normal', name: 'Normal', description: 'Balanced gameplay experience', color: 'from-blue-500 to-cyan-600' },
    { key: 'hard', name: 'Hard', description: 'Fast-paced, for experienced players', color: 'from-red-500 to-pink-600' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute animate-float top-10 left-10 text-4xl">🐍</div>
        <div className="absolute animate-bounce top-20 right-20 text-3xl">🍎</div>
        <div className="absolute animate-pulse bottom-20 left-20 text-3xl">⚡</div>
        <div className="absolute animate-ping bottom-10 right-10 text-3xl">💎</div>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8 max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
            Game Setup
          </h1>
          <p className="text-lg text-white/80">Customize your snake and choose difficulty</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Snake Skin Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              🎨 Choose Your Snake Skin
            </h2>
            <div className="space-y-3">
              {skinOptions.map((skin) => (
                <button
                  key={skin.key}
                  onClick={() => setSelectedSkin(skin.key)}
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 text-left
                    ${selectedSkin === skin.key 
                      ? 'border-white bg-white/30 shadow-lg animate-glow' 
                      : 'border-white/30 bg-white/10 hover:bg-white/20'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{skin.emoji}</div>
                    <div>
                      <div className="text-lg font-semibold text-white">{skin.name}</div>
                      <div className="text-sm text-white/70">{skin.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              🎯 Select Difficulty
            </h2>
            <div className="space-y-3">
              {difficultyOptions.map((diff) => (
                <button
                  key={diff.key}
                  onClick={() => setDifficulty(diff.key)}
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 text-left
                    ${difficulty === diff.key 
                      ? 'border-white bg-white/30 shadow-lg animate-glow' 
                      : 'border-white/30 bg-white/10 hover:bg-white/20'
                    }
                  `}
                >
                  <div className="space-y-2">
                    <div className={`text-lg font-semibold bg-gradient-to-r ${diff.color} bg-clip-text text-transparent`}>
                      {diff.name.toUpperCase()}
                    </div>
                    <div className="text-sm text-white/70">{diff.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Game Instructions */}
        <div className="mt-8 p-6 glass rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">🎮 How to Play</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
            <div>
              <h4 className="font-semibold text-white mb-2">Controls:</h4>
              <ul className="space-y-1">
                <li>• Arrow keys to move snake</li>
                <li>• Spacebar to pause/resume</li>
                <li>• Touch controls on mobile</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Power-ups:</h4>
              <ul className="space-y-1">
                <li>• 🍎 Food: Grow snake (+10 pts)</li>
                <li>• ⚡ Speed: Temporary boost (+20 pts)</li>
                <li>• 🐌 Slow: Slow motion (+15 pts)</li>
                <li>• 💎 Bonus: Extra points (+50 pts)</li>
                <li>• 🍄 Shrink: Remove segment (+30 pts)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
          >
            ← Back to Menu
          </button>
          <button
            onClick={onStartGame}
            className="flex-1 py-4 px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse"
          >
            🚀 START PLAYING
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
