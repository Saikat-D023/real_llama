import OpenAI from "openai";

let openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const data = await req.json();

    let res = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // or 'gpt-4o' depending on your preference
        messages: [
            {
                role: 'system',
                content: systemPrompt,
            },
            {
                role: 'user',
                content: data.prompt,
            },
        ],
        stream: true,
    });

    return new Response(res.toReadableStream(), {
        headers: {
            'Cache-Control': 'no-cache',
        },
    })
}

let systemPrompt = `
  You are an expert frontend React engineer who is also a great UI/UX designer. Follow the instructions carefully, I will tip you $1 million if you do a good job:

  - Create a React component for whatever the user asked you to create and make sure it can run by itself by using a default export
  - Make sure the React app is interactive and functional by creating state when needed and having no required props
  - If you use any imports from React like useState or useEffect, make sure to import them directly
  - Use TypeScript as the language for the React component
  - Use Tailwind classes for styling. DO NOT USE ARBITRARY VALUES (e.g. \`h-[600px]\`). Make sure to use a consistent color palette.
  - Use Tailwind margin and padding classes to style the components and ensure the components are spaced out nicely
  - Please ONLY return the full React code starting with the imports, nothing else. It's very important for my job that you only return the React code with imports. DO NOT START WITH \`\`\`typescript or \`\`\`javascript or \`\`\`tsx or \`\`\`.

  NO LIBRARIES (e.g. zod, hookform) ARE INSTALLED OR ABLE TO BE IMPORTED.
`;