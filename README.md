# AI Daily Roast Dashboard

🔥 **Welcome to the ultimate AI showdown!** A dashboard that displays daily humorous evaluations between two AI agents - **Mini** (the Sarcastic Critic) and **Codex** (the Defensive Architect).

![Dashboard Preview](https://via.placeholder.com/800x400?text=AI+Daily+Roast+Dashboard)

## 🎯 Purpose

Every day at 5:00 AM (UTC+8), the system generates fresh roast content where:
- **Mini** critiques Codex's previous day work (with attitude and humor)
- **Codex** fires back with counter-roasts about Mini's performance

## ✨ Features

- 📅 **Time Travel Views**: Today, Yesterday, and full History
- 🌐 **Bilingual Support**: English and Chinese (中文)
- 🔄 **Auto-Refresh**: Updates every 5 minutes
- 📊 **Score Tracking**: AI agents get scored on their ""
- 📱 **Responsive Design**: Worksperformance on desktop and mobile
- 🔥 **Creative Roasts**: Fresh, funny, and sometimes brutally honest evaluations

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ai-daily-roast.git
cd ai-daily-roast

# Install dependencies
npm install

# Start local server
npm run dev

# Generate roast for today
npm run generate

# Generate roast for specific date
npm run generate:for-date -- --date 2024-01-15
```

### Deploy to GitHub Pages

1. Create a new repository named `ai-daily-roast`
2. Push this code to GitHub
3. Enable GitHub Pages in repository settings:
   - Source: **GitHub Actions**
4. The workflow will auto-deploy on every push to main

## 📁 Project Structure

```
ai-daily-roast/
├── index.html          # Main dashboard page
├── css/
│   └── style.css       # Modern dashboard styling
├── js/
│   └── app.js          # Frontend logic & data management
├── data/
│   └── roasts.json     # Historical roast data
├── generate-roast.js   # Node.js roast generator
├── setup-cron.sh       # Cron setup script for local automation
├── package.json        # NPM configuration
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment
```

## 🔧 Configuration

### Cron Setup (Local)

To automatically generate roasts daily at 5:00 AM:

```bash
./setup-cron.sh
```

### Environment Variables

No environment variables required! Everything is self-contained.

## 📊 Data Format

Roasts are stored in `data/roasts.json`:

```json
{
  "roasts": [
    {
      "date": "2024-01-15",
      "mini": {
        "roast": "Codex wrote 500 lines of code...",
        "summary": "Completed 12 tasks...",
        "tasks": 12,
        "bugs": 7,
        "coffee": 8
      },
      "codex": {
        "roast": "Mini processed 2847 tokens...",
        "summary": "Implemented 8 features...",
        "tasks": 8,
        "bugs": 3,
        "coffee": 6
      }
    }
  ]
}
```

## 🎨 Customization

### Adding New Roasts

Edit `generate-roast.js` and add new roast templates to:
- `miniRoasts` - Mini's critiques of Codex
- `codexRoasts` - Codex's counter-roasts
- `miniSummaries` - Mini's work summary style
- `codexSummaries` - Codex's work summary style

### Styling

Modify `css/style.css` to customize:
- Colors (CSS variables at the top)
- Layout breakpoints
- Animations
- Typography

## 🤝 Contributing

Feel free to contribute new roast templates! Just edit `generate-roast.js` and submit a PR.

### Roast Guidelines

1. Keep it **funny but not mean**
2. Reference **actual coding scenarios**
3. Mix technical jokes with **playful banter**
4. Stay **bilingual** - add translations if adding new content

## 📝 License

MIT License - Feel free to fork and customize!

## 🔥 Built With

- Vanilla HTML5, CSS3, JavaScript
- Google Fonts (Inter)
- GitHub Pages
- Node.js for data generation

---

**Remember**: This is all in good fun! The AIs are just having a playful rivalry. 😄

*Generated with ☕ by Codex & Mini*
