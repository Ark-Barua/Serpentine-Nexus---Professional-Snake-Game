# 🐍 Serpentine Nexus - Professional Snake Game

**Serpentine Nexus** is a modern, professional-grade Snake game built with React, featuring stunning visuals, multiple game modes, customizable skins, and smooth performance optimization.

![Game Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Live Demo

Play the game here:  
👉 https://serpentine-nexus-professional-snake-orpin.vercel.app/

## 🎮 Features

### 🎯 Core Gameplay
- **Smooth 60fps gameplay** with optimized rendering
- **Adaptive difficulty** - speed increases as snake grows
- **Multiple difficulty modes** (Easy, Normal, Hard)
- **Power-up system** with 5 unique power-ups
- **Real-time statistics** tracking

### 🎨 Visual Excellence
- **5 unique snake skins** (Classic, Neon, Rainbow, Fire, Ice)
- **Professional UI/UX** with glassmorphism design
- **Smooth animations** and particle effects
- **Responsive design** for all screen sizes
- **Mobile-optimized** touch controls

### 📊 Professional Features
- **Complete game state management** with multiple screens
- **Statistics tracking** (games played, total score, best time)
- **Settings persistence** across sessions
- **Achievement system** with unlockable badges
- **Professional HUD** with real-time game info

### 🎪 Game Screens
- **Main Menu** - Animated logo and navigation
- **Start Screen** - Skin selection and difficulty choice
- **Game Screen** - Professional HUD and smooth gameplay
- **Pause Screen** - In-game menu with options
- **Game Over Screen** - Detailed statistics and achievements
- **Settings Screen** - Customization and statistics management

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd serpentine-nexus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## 🎮 How to Play

### Controls
- **Desktop**: Arrow keys to move, Spacebar to pause
- **Mobile**: Touch controls with directional pad

### Power-ups
- 🍎 **Food** - Grow snake (+10 points)
- ⚡ **Speed Boost** - Temporary speed increase (+20 points)
- 🐌 **Slow Motion** - Temporary slowdown (+15 points)
- 💎 **Bonus Points** - Instant score boost (+50 points)
- 🍄 **Shrink** - Remove one segment (+30 points)

### Difficulty Modes
- **Easy** - 1.5x slower speed, perfect for beginners
- **Normal** - Balanced gameplay experience
- **Hard** - 0.7x speed, for experienced players

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.0
- **Build Tool**: Vite 4.4.5
- **Canvas Rendering**: HTML5 Canvas API
- **State Management**: React Hooks
- **Performance**: RequestAnimationFrame optimization

## 📁 Project Structure

```
serpentine-nexus/
├── src/
│   ├── components/          # React components
│   │   ├── GameCanvas.jsx   # Main game rendering
│   │   ├── MainMenu.jsx     # Main menu screen
│   │   ├── StartScreen.jsx  # Game setup screen
│   │   ├── GameOverScreen.jsx # End game screen
│   │   ├── SettingsScreen.jsx # Settings management
│   │   ├── GameHUD.jsx      # In-game interface
│   │   ├── PauseScreen.jsx  # Pause overlay
│   │   └── MobileControls.jsx # Touch controls
│   ├── hooks/               # Custom React hooks
│   │   ├── useSnakeGame.js  # Main game logic
│   │   └── useMobileDetection.js # Device detection
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
├── README.md              # This file
└── CHANGELOG.md           # Version history
```

## 🎯 Performance Optimizations

- **Fixed timestep game loop** for consistent gameplay
- **Efficient canvas rendering** with minimal redraws
- **Optimized collision detection** algorithms
- **Reduced React re-renders** with proper memoization
- **Mobile-optimized** touch handling

## 🏆 Achievements System

- **Century Club** - Score 100+ points
- **Double Century** - Score 200+ points
- **Endurance Player** - Play for 60+ seconds
- **Hard Mode Warrior** - Complete game on hard difficulty
- **Record Breaker** - Set a new high score

## 🎨 Customization

### Snake Skins
- **Classic** - Traditional green snake
- **Neon** - Electric glow effect
- **Rainbow** - Colorful gradient
- **Fire** - Blazing red theme
- **Ice** - Cool blue theme

### Settings
- Sound effects toggle
- Visual effects toggle
- Grid display toggle
- Statistics reset option

## 📱 Mobile Support

- **Touch controls** with directional pad
- **Responsive design** for all screen sizes
- **Optimized performance** for mobile devices
- **Gesture support** for smooth gameplay

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Inspired by classic Snake games with modern enhancements
- Optimized for performance and user experience

## 📞 Support

For support, feature requests, or bug reports, please open an issue on the repository.

---

**Serpentine Nexus** - Where classic meets modern gaming excellence! 🐍✨
