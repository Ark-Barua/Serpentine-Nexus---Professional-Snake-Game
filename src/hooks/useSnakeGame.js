import { useState, useEffect, useRef, useCallback } from 'react';

export const useSnakeGame = () => {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const lastUpdateRef = useRef(0);
  
  // Game constants
  const GRID_SIZE = 20;
  const CANVAS_SIZE = 600;
  const TILE_COUNT = CANVAS_SIZE / GRID_SIZE;
  const BASE_SPEED = 150;
  
  // Game state - expanded for professional UI
  const [gameState, setGameState] = useState('mainMenu'); // 'mainMenu', 'startScreen', 'playing', 'paused', 'gameOver', 'settings'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => 
    parseInt(localStorage.getItem('snakeHighScore')) || 0
  );
  const [currentSpeed, setCurrentSpeed] = useState(BASE_SPEED);
  const [selectedSkin, setSelectedSkin] = useState('classic');
  const [difficulty, setDifficulty] = useState('normal'); // 'easy', 'normal', 'hard'
  const [gameStats, setGameStats] = useState({
    gamesPlayed: parseInt(localStorage.getItem('snakeGamesPlayed')) || 0,
    totalScore: parseInt(localStorage.getItem('snakeTotalScore')) || 0,
    bestTime: parseInt(localStorage.getItem('snakeBestTime')) || 0,
    currentTime: 0
  });
  const [settings, setSettings] = useState({
    soundEnabled: JSON.parse(localStorage.getItem('snakeSoundEnabled') ?? 'true'),
    particlesEnabled: JSON.parse(localStorage.getItem('snakeParticlesEnabled') ?? 'true'),
    showGrid: JSON.parse(localStorage.getItem('snakeShowGrid') ?? 'true')
  });
  
  // Snake and game objects
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 0, y: 0 });
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [powerUps, setPowerUps] = useState([]);
  const [activePowerUps, setActivePowerUps] = useState([]);
  const [gameEffects, setGameEffects] = useState({ shake: false, pulse: false });
  
  // Power-up types
  const powerUpTypes = {
    speed: { emoji: '⚡', color: '#ffeb3b', points: 20, duration: 5000 },
    slow: { emoji: '🐌', color: '#8bc34a', points: 15, duration: 5000 },
    bonus: { emoji: '💎', color: '#e91e63', points: 50, duration: 0 },
    shrink: { emoji: '🍄', color: '#9c27b0', points: 30, duration: 0 }
  };
  
  // Snake skins
  const skins = {
    classic: { head: '#4caf50', body: '#66bb6a', accent: '#388e3c' },
    neon: { head: '#00ff41', body: '#39ff14', accent: '#00cc33' },
    rainbow: { head: '#ff0080', body: '#8000ff', accent: '#0080ff' },
    fire: { head: '#ff4444', body: '#ff6666', accent: '#cc0000' },
    ice: { head: '#44ddff', body: '#66aaff', accent: '#0088cc' }
  };
  
  // Generate food position
  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);
  
  // Optimized power-up generation
  const generatePowerUp = useCallback(() => {
    if (powerUps.length >= 2 || Math.random() > 0.3) return null;
    
    const types = Object.keys(powerUpTypes);
    const type = types[Math.floor(Math.random() * types.length)];
    
    // More efficient collision checking
    let attempts = 0;
    let position;
    do {
      position = {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT)
      };
      attempts++;
    } while (attempts < 50 && (
      snake.some(segment => segment.x === position.x && segment.y === position.y) ||
      (food.x === position.x && food.y === position.y) ||
      powerUps.some(p => p.x === position.x && p.y === position.y)
    ));
    
    if (attempts >= 50) return null; // Prevent infinite loops
    
    return {
      ...position,
      type: type,
      spawnTime: Date.now()
    };
  }, [snake, food, powerUps]);
  
  // Optimized speed calculation
  const updateSpeed = useCallback(() => {
    const speedIncrease = Math.floor(snake.length / 5) * 10;
    let newSpeed = Math.max(BASE_SPEED - speedIncrease, 50);
    
    // Apply power-up speed modifications efficiently
    for (let i = 0; i < activePowerUps.length; i++) {
      const powerUp = activePowerUps[i];
      if (powerUp.type === 'speed') newSpeed *= 0.5;
      else if (powerUp.type === 'slow') newSpeed *= 1.5;
    }
    
    setCurrentSpeed(newSpeed);
  }, [snake.length, activePowerUps]);
  
  // Activate power-up
  const activatePowerUp = useCallback((powerUp) => {
    const powerUpData = powerUpTypes[powerUp.type];
    setScore(prev => prev + powerUpData.points);
    
    switch(powerUp.type) {
      case 'speed':
      case 'slow':
        setActivePowerUps(prev => [...prev, {
          type: powerUp.type,
          startTime: Date.now(),
          duration: powerUpData.duration
        }]);
        break;
      case 'shrink':
        setSnake(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
        break;
      case 'bonus':
        break;
    }
    
    // Visual feedback
    setGameEffects(prev => ({ ...prev, pulse: true }));
    setTimeout(() => setGameEffects(prev => ({ ...prev, pulse: false })), 300);
  }, []);
  
  // Optimized game update logic
  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;
    
    setDirection(nextDirection);
    
    setSnake(prevSnake => {
      const newSnake = prevSnake.slice(); // Faster than spread operator
      const head = { x: newSnake[0].x + nextDirection.x, y: newSnake[0].y + nextDirection.y };
      
      // Check wall collision
      if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        setGameState('gameOver');
        setGameEffects(prev => ({ ...prev, shake: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, shake: false })), 500);
        
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('snakeHighScore', score.toString());
        }
        
        // Update game statistics
        const newGamesPlayed = gameStats.gamesPlayed + 1;
        const newTotalScore = gameStats.totalScore + score;
        const playTime = Date.now() - gameStats.currentTime;
        const newBestTime = gameStats.bestTime === 0 ? playTime : Math.max(gameStats.bestTime, playTime);
        
        setGameStats(prev => ({
          ...prev,
          gamesPlayed: newGamesPlayed,
          totalScore: newTotalScore,
          bestTime: newBestTime
        }));
        
        localStorage.setItem('snakeGamesPlayed', newGamesPlayed.toString());
        localStorage.setItem('snakeTotalScore', newTotalScore.toString());
        localStorage.setItem('snakeBestTime', newBestTime.toString());
        
        return prevSnake;
      }
      
      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('gameOver');
        setGameEffects(prev => ({ ...prev, shake: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, shake: false })), 500);
        
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('snakeHighScore', score.toString());
        }
        
        // Update game statistics
        const newGamesPlayed = gameStats.gamesPlayed + 1;
        const newTotalScore = gameStats.totalScore + score;
        const playTime = Date.now() - gameStats.currentTime;
        const newBestTime = gameStats.bestTime === 0 ? playTime : Math.max(gameStats.bestTime, playTime);
        
        setGameStats(prev => ({
          ...prev,
          gamesPlayed: newGamesPlayed,
          totalScore: newTotalScore,
          bestTime: newBestTime
        }));
        
        localStorage.setItem('snakeGamesPlayed', newGamesPlayed.toString());
        localStorage.setItem('snakeTotalScore', newTotalScore.toString());
        localStorage.setItem('snakeBestTime', newBestTime.toString());
        
        return prevSnake;
      }
      
      newSnake.unshift(head);
      
      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
        
        // Generate power-up
        const newPowerUp = generatePowerUp();
        if (newPowerUp) {
          setPowerUps(prev => [...prev, newPowerUp]);
        }
      } else {
        newSnake.pop();
      }
      
      // Optimized power-up collision detection
      const currentTime = Date.now();
      setPowerUps(prev => {
        const newPowerUps = [];
        for (let i = 0; i < prev.length; i++) {
          const powerUp = prev[i];
          if (head.x === powerUp.x && head.y === powerUp.y) {
            activatePowerUp(powerUp);
          } else if (currentTime - powerUp.spawnTime < 10000) {
            newPowerUps.push(powerUp);
          }
        }
        return newPowerUps;
      });
      
      return newSnake;
    });
    
    // Optimized active power-ups update
    const currentTime = Date.now();
    setActivePowerUps(prev => {
      const activePowerUps = [];
      for (let i = 0; i < prev.length; i++) {
        if (currentTime - prev[i].startTime < prev[i].duration) {
          activePowerUps.push(prev[i]);
        }
      }
      return activePowerUps;
    });
  }, [gameState, nextDirection, food, generateFood, generatePowerUp, activatePowerUp, score, highScore]);
  
  // Optimized game loop with fixed timestep
  useEffect(() => {
    let accumulator = 0;
    const fixedTimeStep = currentSpeed;
    let lastTime = performance.now();
    
    const gameLoop = (currentTime) => {
      if (gameState !== 'playing') return;
      
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      accumulator += deltaTime;
      
      // Fixed timestep updates
      while (accumulator >= fixedTimeStep) {
        updateGame();
        accumulator -= fixedTimeStep;
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    if (gameState === 'playing') {
      lastTime = performance.now();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, currentSpeed, updateGame]);
  
  // Update speed when snake length or power-ups change
  useEffect(() => {
    updateSpeed();
  }, [updateSpeed]);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === 'playing') {
        switch(e.code) {
          case 'ArrowUp':
            if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
            break;
          case 'ArrowDown':
            if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
            break;
          case 'ArrowLeft':
            if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
            break;
          case 'ArrowRight':
            if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
            break;
          case 'Space':
            e.preventDefault();
            setGameState('paused');
            break;
        }
      } else if (gameState === 'paused' && e.code === 'Space') {
        e.preventDefault();
        setGameState('playing');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, direction]);
  
  // Mobile direction change handler
  const handleMobileDirectionChange = useCallback((newDirection) => {
    if (gameState === 'playing') {
      // Check if the new direction is valid (not opposite to current direction)
      if (direction.x === 0 || newDirection.x === 0) {
        if (direction.y === 0 || newDirection.y === 0) {
          setNextDirection(newDirection);
        }
      }
    }
  }, [gameState, direction]);

  // Screen navigation functions
  const goToMainMenu = useCallback(() => {
    setGameState('mainMenu');
    setScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: 0 });
    setNextDirection({ x: 0, y: 0 });
    setCurrentSpeed(BASE_SPEED);
    setFood({ x: 15, y: 15 });
    setPowerUps([]);
    setActivePowerUps([]);
    setGameEffects({ shake: false, pulse: false });
  }, []);

  const goToStartScreen = useCallback(() => {
    setGameState('startScreen');
  }, []);

  const goToSettings = useCallback(() => {
    setGameState('settings');
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    Object.entries(newSettings).forEach(([key, value]) => {
      localStorage.setItem(`snake${key.charAt(0).toUpperCase() + key.slice(1)}`, JSON.stringify(value));
    });
  }, []);

  // Game actions
  const startGame = useCallback(() => {
    const startTime = Date.now();
    setGameStats(prev => ({ ...prev, currentTime: startTime }));
    setGameState('playing');
    setScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    
    // Adjust speed based on difficulty
    const difficultyMultiplier = difficulty === 'easy' ? 1.5 : difficulty === 'hard' ? 0.7 : 1;
    setCurrentSpeed(BASE_SPEED * difficultyMultiplier);
    
    setFood(generateFood());
    setPowerUps([]);
    setActivePowerUps([]);
    setGameEffects({ shake: false, pulse: false });
  }, [generateFood, difficulty]);
  
  const pauseGame = useCallback(() => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused');
  }, [gameState]);
  
  const exitGame = useCallback(() => {
    if (window.confirm('Are you sure you want to exit the game?')) {
      goToMainMenu();
    }
  }, [goToMainMenu]);
  
  return {
    // Canvas ref
    canvasRef,
    
    // Game state
    gameState,
    score,
    highScore,
    currentSpeed: Math.ceil((BASE_SPEED - currentSpeed + 50) / 10),
    selectedSkin,
    setSelectedSkin,
    gameEffects,
    
    // Game objects
    snake,
    food,
    powerUps,
    activePowerUps,
    
    // Game data
    skins,
    powerUpTypes,
    GRID_SIZE,
    CANVAS_SIZE,
    TILE_COUNT,
    
    // Game data
    difficulty,
    setDifficulty,
    gameStats,
    settings,
    
    // Actions
    startGame,
    pauseGame,
    exitGame,
    goToMainMenu,
    goToStartScreen,
    goToSettings,
    updateSettings,
    handleMobileDirectionChange
  };
};
