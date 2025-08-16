import { useEffect } from 'react';

const GameCanvas = ({ 
  canvasRef, 
  snake, 
  food, 
  powerUps, 
  skins, 
  selectedSkin, 
  powerUpTypes,
  GRID_SIZE,
  CANVAS_SIZE,
  TILE_COUNT,
  gameEffects 
}) => {
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Pre-calculate grid lines for better performance
    const gridPath = new Path2D();
    for (let i = 0; i <= TILE_COUNT; i++) {
      gridPath.moveTo(i * GRID_SIZE, 0);
      gridPath.lineTo(i * GRID_SIZE, CANVAS_SIZE);
      gridPath.moveTo(0, i * GRID_SIZE);
      gridPath.lineTo(CANVAS_SIZE, i * GRID_SIZE);
    }
    
    const draw = () => {
      // Clear canvas efficiently
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      
      // Fill background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      
      // Draw grid efficiently
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.stroke(gridPath);
      
      // Draw snake efficiently
      const skin = skins[selectedSkin];
      for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;
        
        if (i === 0) {
          // Snake head - simplified for performance
          ctx.fillStyle = skin.head;
          ctx.fillRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4);
          
          // Simple eyes
          ctx.fillStyle = '#fff';
          ctx.fillRect(x + 5, y + 5, 3, 3);
          ctx.fillRect(x + 12, y + 5, 3, 3);
          ctx.fillStyle = '#000';
          ctx.fillRect(x + 6, y + 6, 1, 1);
          ctx.fillRect(x + 13, y + 6, 1, 1);
        } else {
          // Snake body - simplified
          ctx.fillStyle = skin.body;
          ctx.fillRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2);
        }
      }
      
      // Draw food - simplified for performance
      const foodX = food.x * GRID_SIZE;
      const foodY = food.y * GRID_SIZE;
      
      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.arc(
        foodX + GRID_SIZE/2, 
        foodY + GRID_SIZE/2, 
        GRID_SIZE/2 - 2, 
        0, 
        2 * Math.PI
      );
      ctx.fill();
      
      // Draw power-ups - optimized
      for (let i = 0; i < powerUps.length; i++) {
        const powerUp = powerUps[i];
        const x = powerUp.x * GRID_SIZE;
        const y = powerUp.y * GRID_SIZE;
        const powerUpData = powerUpTypes[powerUp.type];
        
        // Simple power-up rendering
        ctx.fillStyle = powerUpData.color;
        ctx.fillRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4);
        
        // Emoji
        ctx.font = `${GRID_SIZE * 0.6}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText(
          powerUpData.emoji,
          x + GRID_SIZE/2,
          y + GRID_SIZE * 0.7
        );
      }
    };
    
    // Single draw call - no continuous animation for better performance
    draw();
  }, [snake, food, powerUps, skins, selectedSkin, powerUpTypes, GRID_SIZE, CANVAS_SIZE, TILE_COUNT]);
  
  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      className={`
        bg-black/30 rounded-xl border-2 border-white/20 shadow-2xl
        ${gameEffects.pulse ? 'animate-pulse' : ''}
        ${gameEffects.shake ? 'animate-shake' : ''}
        transition-all duration-300 w-full max-w-[600px] h-auto
        sm:w-[600px] sm:h-[600px]
      `}
      style={{
        filter: gameEffects.pulse ? 'brightness(1.2)' : 'brightness(1)',
        aspectRatio: '1/1',
      }}
    />
  );
};

export default GameCanvas;
