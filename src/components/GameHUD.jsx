const GameHUD = ({ 
  score, 
  highScore, 
  currentSpeed, 
  difficulty, 
  gameTime, 
  onPause, 
  onExit, 
  activePowerUps, 
  powerUpTypes 
}) => {
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side - Score Info */}
        <div className="flex items-center gap-4">
          <div className="glass rounded-lg px-4 py-2">
            <div className="text-yellow-400 font-bold text-lg">{score}</div>
            <div className="text-white/70 text-xs">Score</div>
          </div>
          <div className="glass rounded-lg px-4 py-2">
            <div className="text-green-400 font-bold text-lg">{highScore}</div>
            <div className="text-white/70 text-xs">Best</div>
          </div>
          <div className="glass rounded-lg px-4 py-2">
            <div className="text-blue-400 font-bold text-lg">{currentSpeed}</div>
            <div className="text-white/70 text-xs">Speed</div>
          </div>
        </div>

        {/* Center - Active Power-ups */}
        {activePowerUps.length > 0 && (
          <div className="flex items-center gap-2">
            {activePowerUps.map((powerUp, index) => (
              <div 
                key={index}
                className="glass rounded-full px-3 py-1 flex items-center gap-1 animate-pulse"
              >
                <span className="text-lg">{powerUpTypes[powerUp.type].emoji}</span>
                <span className="text-xs text-white/90">
                  {Math.ceil((powerUp.duration - (Date.now() - powerUp.startTime)) / 1000)}s
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Right Side - Game Info & Controls */}
        <div className="flex items-center gap-2">
          <div className="glass rounded-lg px-3 py-2">
            <div className="text-purple-400 font-bold text-sm">{difficulty.toUpperCase()}</div>
          </div>
          <div className="glass rounded-lg px-3 py-2">
            <div className="text-cyan-400 font-bold text-sm">{formatTime(gameTime)}</div>
          </div>
          <button
            onClick={onPause}
            className="glass hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 hover:scale-105"
          >
            <span className="text-white text-lg">⏸️</span>
          </button>
          <button
            onClick={onExit}
            className="glass hover:bg-red-500/20 rounded-lg px-3 py-2 transition-all duration-200 hover:scale-105"
          >
            <span className="text-red-400 text-lg">🚪</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
