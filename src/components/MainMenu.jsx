const MainMenu = ({ onStartGame, onSettings, onExit, highScore, gameStats }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-500/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-purple-500/10 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-500/10 rounded-full animate-pulse"></div>
      </div>

      <div className="glass-strong rounded-3xl p-8 sm:p-12 max-w-2xl w-full mx-4 text-center relative z-10">
        {/* Game Logo */}
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse mb-4">
            🐍 SERPENTINE NEXUS
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 font-light">
            Professional Snake Gaming
          </p>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-2 gap-4 mb-8 p-4 glass rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{highScore}</div>
            <div className="text-sm text-white/70">High Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{gameStats.gamesPlayed}</div>
            <div className="text-sm text-white/70">Games Played</div>
          </div>
        </div>

        {/* Menu Buttons */}
        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="w-full py-4 px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-glow"
          >
            🎮 START GAME
          </button>
          
          <button
            onClick={onSettings}
            className="w-full py-3 px-8 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold text-lg rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ⚙️ SETTINGS
          </button>
          
          <button
            onClick={onExit}
            className="w-full py-3 px-8 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold text-lg rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🚪 EXIT GAME
          </button>
        </div>

        {/* Version Info */}
        <div className="mt-8 text-white/50 text-sm">
          Version 2.0 | React Professional Edition
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
