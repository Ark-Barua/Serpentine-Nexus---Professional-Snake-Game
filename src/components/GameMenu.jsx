const GameMenu = ({ 
  gameState, 
  score, 
  highScore, 
  selectedSkin, 
  setSelectedSkin, 
  skins, 
  startGame, 
  pauseGame, 
  resetGame 
}) => {
  const skinOptions = [
    { key: 'classic', name: 'Classic', emoji: '🟢' },
    { key: 'neon', name: 'Neon', emoji: '💚' },
    { key: 'rainbow', name: 'Rainbow', emoji: '🌈' },
    { key: 'fire', name: 'Fire', emoji: '🔥' },
    { key: 'ice', name: 'Ice', emoji: '❄️' }
  ];

  if (gameState === 'playing') return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl">
      {/* Start Menu */}
      {gameState === 'menu' && (
        <div className="glass-strong rounded-2xl p-4 sm:p-8 text-center min-w-[300px] sm:min-w-[350px] animate-float mx-2">
          <h2 className="text-4xl font-bold mb-6 text-white animate-glow">
            Ready to Play? 🐍
          </h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white/90">
              Choose Your Snake Skin:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6">
              {skinOptions.map((skin) => (
                <button
                  key={skin.key}
                  onClick={() => setSelectedSkin(skin.key)}
                  className={`
                    p-2 sm:p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-105
                    ${selectedSkin === skin.key 
                      ? 'border-white bg-white/30 shadow-lg animate-glow' 
                      : 'border-white/30 bg-white/10 hover:bg-white/20'
                    }
                  `}
                >
                  <div className="text-base sm:text-lg">{skin.emoji}</div>
                  <div className="text-xs sm:text-sm text-white/90">{skin.name}</div>
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={startGame}
            className="
              px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 
              text-white font-bold rounded-full text-lg
              hover:from-pink-600 hover:to-violet-600 
              transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl animate-bounce-slow
            "
          >
            Start Game
          </button>
        </div>
      )}

      {/* Game Over Menu */}
      {gameState === 'gameOver' && (
        <div className="glass-strong rounded-2xl p-4 sm:p-8 text-center min-w-[300px] sm:min-w-[350px] animate-float mx-2">
          <h2 className="text-4xl font-bold mb-4 text-red-400">
            Game Over! 💀
          </h2>
          <p className="text-2xl mb-2 text-white">
            Final Score: <span className="text-yellow-400 font-bold">{score}</span>
          </p>
          {score === highScore && score > 0 && (
            <p className="text-lg mb-6 text-green-400 animate-pulse">
              🎉 New High Score! 🎉
            </p>
          )}
          <button
            onClick={startGame}
            className="
              px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 
              text-white font-bold rounded-full text-lg
              hover:from-green-600 hover:to-blue-600 
              transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl
            "
          >
            Play Again
          </button>
        </div>
      )}

      {/* Pause Menu */}
      {gameState === 'paused' && (
        <div className="glass-strong rounded-2xl p-4 sm:p-8 text-center min-w-[300px] sm:min-w-[350px] animate-float mx-2">
          <h2 className="text-4xl font-bold mb-6 text-yellow-400">
            Game Paused ⏸️
          </h2>
          <div className="space-y-4">
            <button
              onClick={pauseGame}
              className="
                block w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 
                text-white font-bold rounded-lg
                hover:from-green-600 hover:to-emerald-600 
                transform hover:scale-105 transition-all duration-300
              "
            >
              Resume
            </button>
            <button
              onClick={resetGame}
              className="
                block w-full px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 
                text-white font-bold rounded-lg
                hover:from-gray-600 hover:to-gray-700 
                transform hover:scale-105 transition-all duration-300
              "
            >
              Main Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameMenu;
