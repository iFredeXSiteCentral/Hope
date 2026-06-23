'use client';

import RecipeSuggestionForm from '@/components/ai/RecipeSuggestionForm';
import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'AI Recipe Suggestions',
//   description: 'Get personalized recipe recommendations based on your preferences and ingredients.',
// };

export default function AiSuggestionsPage() {
  return (
    <div className="py-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">AI Recipe Wizard</h1>
        <p className="text-lg text-foreground/80 max-w-xl mx-auto mt-2">
          Tell us what you like and what you have, and we'll suggest a recipe for you!
        </p>
      </header>
      <RecipeSuggestionForm />
    </div>
  );
}
