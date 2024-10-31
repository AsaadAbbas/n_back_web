# N-Back Training

A modern, feature-rich implementation of the N-Back cognitive training task, built with Next.js and TypeScript.

![N-Back Training](https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=2070&auto=format&fit=crop)

## Overview

N-Back is a scientifically-proven cognitive training exercise that helps improve working memory, attention, and fluid intelligence. This implementation offers:

- 🎯 Dual N-Back training (position and sound)
- 🎨 Beautiful, responsive UI with dark/light modes
- 📊 Real-time performance tracking
- ⚙️ Customizable game settings
- 📱 Cross-platform compatibility

## Features

### Game Mechanics
- Adjustable N-Back levels (1-5)
- Position and sound matching
- Customizable round duration
- Configurable number of rounds
- Real-time accuracy tracking
- Streak counter with achievements

### User Experience
- Clean, intuitive interface
- Responsive design for all devices
- Dark/light theme support
- Performance statistics
- Progress tracking

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/n-back-training.git

# Navigate to project directory
cd n-back-training

# Install dependencies
npm install

# Start development server
npm run dev
```

### Playing the Game

1. Click "Start Training" on the home page
2. Choose your preferred settings:
   - N-Back level (1-5)
   - Enable/disable position matching
   - Enable/disable sound matching
   - Adjust round duration
   - Set total rounds
3. Start the game and watch for matches
4. Click the corresponding button when you spot a match:
   - Position match: When the current position matches the position N steps back
   - Sound match: When the current sound matches the sound N steps back

## Technology Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Icons**: Lucide React
- **Theme**: next-themes

## Project Structure

```
n-back-training/
├── app/                    # Next.js app directory
│   ├── game/              # Game page
│   ├── settings/          # Settings page
│   ├── stats/             # Statistics page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── game/             # Game-specific components
│   ├── ui/               # UI components
│   └── navbar.tsx        # Navigation component
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and types
└── public/              # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- N-Back task research by Susanne M. Jaeggi
- UI components by shadcn/ui
- Icons by Lucide React
