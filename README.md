<p align="center">
  <img src="public/media/logo.svg" alt="OnceUpon" height="72" />
</p>

<h1 align="center">OnceUpon</h1>

<p align="center"><strong>A brand-new fairy tale, written just for your child.</strong></p>

---

It's bedtime, and your child wants a story. The books on the shelf have been read a hundred times. Making one up on the spot after a long day is hard, and the stories online are rarely in your language, rarely the right age, and never about _your_ child.

**OnceUpon writes a new one in seconds.** Pick a few wishes (your child's age, a hero, a theme, a language) and the old book dreams up an original, gentle fairy tale. No sign-up, no ads, and a different story every time.

## What you can do in OnceUpon

- **🧒 Choose the age:** 2–3, 4–5, 6–8 or 9–12. Words and sentence length match the reader.
- **🦸 Pick the hero:** a girl, a boy or any child, and give them a name if you like.
- **🌍 Choose the language:** 17 languages.
- **💛 Pick a theme:** friendship, courage, kindness, bedtime, magic and more.
- **📏 Set the length:** short, medium or long.
- **✨ Read it beautifully:** the story unfolds line by line with a short summary and a gentle moral at the end.
- **📜 Save it as a PDF:** parchment pages, ready to print or keep, in any language and script.
- **🔄 Make another:** a fresh story with the same wishes, in one click.

## Why OnceUpon

- **Always new.** Every story is original, so there's always one your child hasn't heard and you can save it for free.

## Run it locally

You need [Node.js](https://nodejs.org/) 18 or newer, plus a free API key from [Google AI Studio](https://aistudio.google.com/) and/or [OpenRouter](https://openrouter.ai/).

```bash
npm install
npm run dev
```

Put your keys in a `.env` file in the project folder. They stay on the server and are never sent to the browser.


## Built with

React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, TanStack Query, React Router and jsPDF. Stories are written by Google Gemini, with free OpenRouter models as backup. Tested with Vitest and React Testing Library.
