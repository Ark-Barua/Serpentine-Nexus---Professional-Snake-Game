import { useSnakeGame } from './hooks/useSnakeGame';
import { useMobileDetection } from './hooks/useMobileDetection';
import GameCanvas from './components/GameCanvas';
import GameHUD from './components/GameHUD';
import MainMenu from './components/MainMenu';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import SettingsScreen from './components/SettingsScreen';
import PauseScreen from './components/PauseScreen';
import MobileControls from './components/MobileControls';

function App() {
  const { isMobile } = useMobileDetection();
  
  const {
    canvasRef,
    gameState,
    score,
    highScore,
    currentSpeed,
    selectedSkin,
    setSelectedSkin,
    gameEffects,
    snake,
    food,
    powerUps,
    activePowerUps,
    skins,
    powerUpTypes,
    GRID_SIZE,
    CANVAS_SIZE,
    TILE_COUNT,
    difficulty,
    setDifficulty,
    gameStats,
    settings,
    startGame,
    pauseGame,
    exitGame,
    goToMainMenu,
    goToStartScreen,
    goToSettings,
    updateSettings,
    handleMobileDirectionChange
  } = useSnakeGame();

  const handleExitGame = () => {
    if (window.confirm('Are you sure you want to exit to main menu?')) {
      goToMainMenu();
    }
  };

  const handleResetStats = () => {
    localStorage.removeItem('snakeHighScore');
    localStorage.removeItem('snakeGamesPlayed');
    localStorage.removeItem('snakeTotalScore');
    localStorage.removeItem('snakeBestTime');
    window.location.reload();
  };

  // Main Menu Screen
  if (gameState === 'mainMenu') {
    return (
      <MainMenu
        onStartGame={goToStartScreen}
        onSettings={goToSettings}
        onExit={() => window.close()}
        highScore={highScore}
        gameStats={gameStats}
      />
    );
  }

  // Start Screen
  if (gameState === 'startScreen') {
    return (
      <StartScreen
        onStartGame={startGame}
        onBack={goToMainMenu}
        selectedSkin={selectedSkin}
        setSelectedSkin={setSelectedSkin}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        skins={skins}
      />
    );
  }

  // Settings Screen
  if (gameState === 'settings') {
    return (
      <SettingsScreen
        settings={settings}
        onUpdateSettings={updateSettings}
        onBack={goToMainMenu}
        onResetStats={handleResetStats}
        gameStats={gameStats}
      />
    );
  }

  // Game Over Screen
  if (gameState === 'gameOver') {
    return (
      <GameOverScreen
        score={score}
        highScore={highScore}
        gameStats={gameStats}
        onPlayAgain={goToStartScreen}
        onMainMenu={goToMainMenu}
        difficulty={difficulty}
        isNewHighScore={score === highScore && score > 0}
      />
    );
  }

  // Game Playing Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Game Canvas */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative">
          <GameCanvas
            canvasRef={canvasRef}
            snake={snake}
            food={food}
            powerUps={powerUps}
            skins={skins}
            selectedSkin={selectedSkin}
            powerUpTypes={powerUpTypes}
            GRID_SIZE={GRID_SIZE}
            CANVAS_SIZE={CANVAS_SIZE}
            TILE_COUNT={TILE_COUNT}
            gameEffects={gameEffects}
          />
          
          {/* Pause Screen Overlay */}
          {gameState === 'paused' && (
            <PauseScreen
              onResume={pauseGame}
              onMainMenu={handleExitGame}
              onSettings={goToSettings}
            />
          )}
        </div>
      </div>

      {/* Game HUD */}
      <GameHUD
        score={score}
        highScore={highScore}
        currentSpeed={currentSpeed}
        difficulty={difficulty}
        gameTime={gameStats.currentTime ? Date.now() - gameStats.currentTime : 0}
        onPause={pauseGame}
        onExit={handleExitGame}
        activePowerUps={activePowerUps}
        powerUpTypes={powerUpTypes}
      />

      {/* Mobile Controls */}
      {isMobile && (
        <MobileControls
          onDirectionChange={handleMobileDirectionChange}
          gameState={gameState}
          onPause={pauseGame}
        />
      )}
    </div>
  );
}

export default App;
