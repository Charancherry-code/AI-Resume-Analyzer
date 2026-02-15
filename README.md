# AI Resume Analyzer

Analyze resumes using AI (Gemini API) and extract text from PDFs.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file and add your Gemini API key:

```
GEMINI_API_KEY=your_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Features

- 📤 Upload PDF resumes
- 🤖 AI-powered analysis using Gemini 2.5 Flash
- 🎨 Professional dark mode UI with gradient effects
- ⏳ Animated 6-step loading progress
- ✨ Glass morphism design with smooth animations
- 📊 Comprehensive resume analysis with ratings

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Gemini API
- pdf-parse
