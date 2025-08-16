const GameOverScreen = ({ 
  score, 
  highScore, 
  gameStats, 
  onPlayAgain, 
  onMainMenu, 
  difficulty,
  isNewHighScore 
}) => {
  const getScoreRating = (score) => {
    if (score >= 500) return { text: "LEGENDARY!", color: "text-purple-400", emoji: "👑" };
    if (score >= 300) return { text: "AMAZING!", color: "text-yellow-400", emoji: "🏆" };
    if (score >= 200) return { text: "GREAT!", color: "text-green-400", emoji: "🎉" };
    if (score >= 100) return { text: "GOOD!", color: "text-blue-400", emoji: "👏" };
    return { text: "NICE TRY!", color: "text-gray-400", emoji: "💪" };
  };

  const rating = getScoreRating(score);
  const playTime = gameStats.currentTime ? Math.floor((Date.now() - gameStats.currentTime) / 1000) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900 relative overflow-hidden p-4">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-pink-500/10 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-500/10 rounded-full animate-pulse"></div>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative z-10 text-center">
        {/* Game Over Header */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-4 animate-pulse">
            GAME OVER
          </h1>
          <div className={`text-2xl sm:text-3xl font-bold ${rating.color} mb-2`}>
            {rating.emoji} {rating.text}
          </div>
        </div>

        {/* Score Display */}
        <div className="mb-8 space-y-4">
          <div className="glass rounded-xl p-6">
            <div className="text-6xl font-bold text-yellow-400 mb-2">{score}</div>
            <div className="text-lg text-white/80">Final Score</div>
          </div>

          {isNewHighScore && (
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 animate-bounce">
              <div className="text-2xl font-bold text-white">🎉 NEW HIGH SCORE! 🎉</div>
              <div className="text-white/90">You beat your previous record!</div>
            </div>
          )}
        </div>

        {/* Game Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{highScore}</div>
            <div className="text-xs text-white/70">High Score</div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{playTime}s</div>
            <div className="text-xs text-white/70">Play Time</div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">{difficulty.toUpperCase()}</div>
            <div className="text-xs text-white/70">Difficulty</div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-400">{gameStats.gamesPlayed + 1}</div>
            <div className="text-xs text-white/70">Games Played</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8 p-4 glass rounded-xl">
          <h3 className="text-lg font-bold text-white mb-3">🏅 Session Achievements</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {score >= 100 && (
              <div className="flex items-center text-green-400">
                <span className="mr-2">✅</span> Century Club
              </div>
            )}
            {score >= 200 && (
              <div className="flex items-center text-blue-400">
                <span className="mr-2">✅</span> Double Century
              </div>
            )}
            {playTime >= 60 && (
              <div className="flex items-center text-purple-400">
                <span className="mr-2">✅</span> Endurance Player
              </div>
            )}
            {difficulty === 'hard' && (
              <div className="flex items-center text-red-400">
                <span className="mr-2">✅</span> Hard Mode Warrior
              </div>
            )}
            {isNewHighScore && (
              <div className="flex items-center text-yellow-400">
                <span className="mr-2">✅</span> Record Breaker
              </div>
            )}
            {score < 50 && (
              <div className="flex items-center text-gray-400">
                <span className="mr-2">💪</span> Keep Practicing
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="w-full py-4 px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse"
          >
            🔄 PLAY AGAIN
          </button>
          
          <button
            onClick={onMainMenu}
            className="w-full py-3 px-8 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold text-lg rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🏠 MAIN MENU
          </button>
        </div>

        {/* Motivational Quote */}
        <div className="mt-8 text-white/60 text-sm italic">
          "Every expert was once a beginner. Keep playing!"
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
