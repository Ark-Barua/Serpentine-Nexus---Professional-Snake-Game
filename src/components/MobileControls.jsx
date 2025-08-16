const MobileControls = ({ onDirectionChange, gameState, onPause }) => {
  const handleDirectionPress = (direction) => {
    if (gameState === 'playing') {
      onDirectionChange(direction);
    }
  };

  const handlePausePress = () => {
    if (gameState === 'playing' || gameState === 'paused') {
      onPause();
    }
  };

  if (gameState === 'menu' || gameState === 'gameOver') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
      <div className="glass-strong rounded-2xl p-4 shadow-2xl">
        {/* D-pad style controls */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Up button */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleDirectionPress({ x: 0, y: -1 });
            }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg flex items-center justify-center text-white text-xl font-bold transition-all duration-150 active:scale-95 border border-white/30"
          >
            ↑
          </button>
          
          {/* Left button */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleDirectionPress({ x: -1, y: 0 });
            }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg flex items-center justify-center text-white text-xl font-bold transition-all duration-150 active:scale-95 border border-white/30"
          >
            ←
          </button>
          
          {/* Right button */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleDirectionPress({ x: 1, y: 0 });
            }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg flex items-center justify-center text-white text-xl font-bold transition-all duration-150 active:scale-95 border border-white/30"
          >
            →
          </button>
          
          {/* Down button */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleDirectionPress({ x: 0, y: 1 });
            }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg flex items-center justify-center text-white text-xl font-bold transition-all duration-150 active:scale-95 border border-white/30"
          >
            ↓
          </button>
          
          {/* Center pause button */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handlePausePress();
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 active:from-yellow-700 active:to-orange-700 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-150 active:scale-95 shadow-lg"
          >
            {gameState === 'paused' ? '▶' : '⏸'}
          </button>
        </div>
        
        {/* Control labels */}
        <div className="text-center text-white/70 text-xs">
          <div>Tap arrows to move</div>
          <div>Center button to pause</div>
        </div>
      </div>
    </div>
  );
};

export default MobileControls;
