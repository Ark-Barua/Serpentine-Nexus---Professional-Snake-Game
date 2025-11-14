const GameStats = ({ score, highScore, currentSpeed }) => {
  return (
    <div className="glass rounded-xl p-4 mb-6">
      <div className="flex justify-around items-center text-white font-bold">
        <div className="text-center">
          <div className="text-sm text-white/70 mb-1">Score</div>
          <div className="text-2xl text-yellow-400 animate-pulse-slow">{score}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-white/70 mb-1">High Score</div>
          <div className="text-2xl text-green-400">{highScore}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-white/70 mb-1">Speed</div>
          <div className="text-2xl text-blue-400">{currentSpeed}</div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
