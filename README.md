# Trading Intelligence Platform

A modern, real-time trading intelligence platform built with Next.js 14+ that aggregates market data, news, and provides AI-powered analysis for informed investment decisions.

## Features

### 🎯 Core Functionality

- **Real-Time Market Dashboard**: Live market indices (S&P 500, Nasdaq, Dow Jones), trending stocks, and quick stats
- **Sector Analysis**: Interactive sector distribution charts, performance tracking, and heatmaps
- **News Aggregation**: Multi-source news from CNBC, Bloomberg, Reuters, WSJ, and TradingView with AI-powered sentiment analysis
- **Fear & Greed Index**: Real-time market sentiment gauge with historical trends and component indicators
- **Stock Analysis**: Deep-dive analysis with technical indicators, fundamental metrics, and AI recommendations
- **Market Correlations**: Visual representation of asset correlations and market relationships

### 🎨 Design Features

- Modern, responsive UI with Tailwind CSS
- Dark mode support
- Interactive charts powered by Recharts
- Clean component architecture with shadcn/ui
- Mobile-first design

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: React Hooks + SWR (for data fetching)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- API keys for financial data providers (optional for demo)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd trading-intelligence-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
```env
# Financial Data API (e.g., Alpha Vantage, Finnhub, Polygon.io)
NEXT_PUBLIC_FINANCIAL_API_KEY=your_api_key_here
NEXT_PUBLIC_FINANCIAL_API_URL=https://api.example.com

# News API
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here

# OpenAI or similar for news analysis
OPENAI_API_KEY=your_openai_api_key_here

# Fear & Greed Index API
NEXT_PUBLIC_FEAR_GREED_API=https://api.alternative.me/fng/
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
trading-intelligence-platform/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── market-data/     # Market data endpoints
│   │   ├── news/            # News aggregation endpoints
│   │   ├── fear-greed/      # Fear & Greed Index endpoints
│   │   └── stock/           # Individual stock data endpoints
│   ├── analysis/            # Analysis page
│   ├── fear-greed/          # Fear & Greed Index page
│   ├── news/                # News page
│   ├── sectors/             # Sectors page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage (Market Overview)
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── navigation.tsx       # Main navigation
│   ├── market-*.tsx         # Market-related components
│   ├── sector-*.tsx         # Sector analysis components
│   ├── news-*.tsx           # News components
│   ├── fear-greed-*.tsx     # Fear & Greed components
│   └── stock-*.tsx          # Stock analysis components
├── lib/                     # Utility functions
│   └── utils.ts             # Helper utilities
├── .env.local              # Environment variables (create from .env.example)
└── README.md               # This file
```

## API Integration

### Recommended Data Providers

The platform is designed to work with these financial data APIs:

1. **Market Data**:
   - [Alpha Vantage](https://www.alphavantage.co/) - Free tier available
   - [Finnhub](https://finnhub.io/) - Real-time data
   - [Polygon.io](https://polygon.io/) - Comprehensive market data

2. **News**:
   - [NewsAPI](https://newsapi.org/) - Multi-source news aggregation
   - [Finnhub News API](https://finnhub.io/docs/api/company-news) - Stock-specific news

3. **Fear & Greed Index**:
   - [Alternative.me API](https://api.alternative.me/fng/) - Free, no auth required

4. **AI Analysis**:
   - [OpenAI API](https://openai.com/api/) - For news sentiment analysis
   - [Anthropic Claude API](https://www.anthropic.com/) - Alternative for AI analysis

### API Routes

The platform includes mock API routes in `/app/api/`. Replace the mock data with actual API calls:

- `GET /api/market-data` - Fetch market indices and trending stocks
- `GET /api/news` - Fetch aggregated news with filters
- `GET /api/fear-greed` - Fetch Fear & Greed Index data
- `GET /api/stock/[symbol]` - Fetch detailed stock data

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Visit [Vercel](https://vercel.com) and import your repository

3. Add environment variables in Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add all variables from `.env.example`

4. Deploy! Vercel will automatically build and deploy your app.

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `NEXT_PUBLIC_FINANCIAL_API_KEY`
- `NEXT_PUBLIC_NEWS_API_KEY`
- `OPENAI_API_KEY`
- And any other API keys you're using

## Customization

### Adding New Data Sources

1. Create a new API route in `/app/api/your-source/route.ts`
2. Add the data fetching logic
3. Create components to display the data
4. Update the relevant pages to use your new components

### Styling

The platform uses Tailwind CSS. Customize colors and theme in:
- `/app/globals.css` - For CSS variables and theme colors
- `tailwind.config.ts` - For Tailwind configuration

## Features in Development

- [ ] Real-time WebSocket connections for live data updates
- [ ] User authentication and portfolio tracking
- [ ] Watchlist functionality
- [ ] Price alerts and notifications
- [ ] Advanced charting with TradingView integration
- [ ] Social sentiment analysis from Twitter/Reddit
- [ ] Machine learning price predictions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js and Vercel
