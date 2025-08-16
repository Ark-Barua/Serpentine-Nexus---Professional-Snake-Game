const PauseScreen = ({ onResume, onMainMenu, onSettings }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl z-30">
      <div className="glass-strong rounded-2xl p-6 sm:p-8 text-center min-w-[300px] sm:min-w-[400px] animate-float mx-2">
        <h2 className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-6 animate-pulse">
          ⏸️ PAUSED
        </h2>
        
        <p className="text-lg text-white/80 mb-8">
          Game is paused. Take a break!
        </p>

        <div className="space-y-4">
          <button
            onClick={onResume}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ▶️ RESUME GAME
          </button>
          
          <button
            onClick={onSettings}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
          >
            ⚙️ SETTINGS
          </button>
          
          <button
            onClick={onMainMenu}
            className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
          >
            🏠 MAIN MENU
          </button>
        </div>

        <div className="mt-6 text-white/60 text-sm">
          Press <kbd className="px-2 py-1 bg-white/20 rounded">Space</kbd> to resume
        </div>
      </div>
    </div>
  );
};

export default PauseScreen;
