"use client"
import Image from "next/image";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


export default function Home() {
  let [prompt, setPrompt] = useState(' ');

  async function createApp(e: any) {
    e.preventDefault()

    //1. Generate the code
    await fetch("/api/generateCode/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      })
    })
    //2. render the app
  }

  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#050505] font-sans text-white">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[700px] w-[700px] rounded-full bg-pink-600/30 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] h-[600px] w-[600px] rounded-full bg-orange-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-8 px-4">
        {/* Pill */}
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur-md">
          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
            New
          </span>
          Real LLama apps now work in ChatGPT and Claude
        </div>

        {/* Headers */}
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            Build something amazing
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Create apps and websites by chatting with AI
          </p>
        </div>

        {/* Form Box */}
        <form
          onSubmit={createApp}
          className="mt-6 flex w-full flex-col gap-2 rounded-3xl border border-white/10 bg-[#1a1a1a]/80 p-4 shadow-2xl backdrop-blur-xl transition-all focus-within:border-white/20 focus-within:bg-[#1a1a1a]"
        >
          <textarea
            className="min-h-[80px] w-full resize-none bg-transparent px-2 py-2 text-lg text-white placeholder:text-white/40 focus:outline-none"
            placeholder="Ask Lovable to create a landing page for my..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            rows={2}
          />
          <div className="flex justify-end px-2 pb-1">
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              disabled={!prompt.trim()}
            >
              <ArrowLongRightIcon className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
