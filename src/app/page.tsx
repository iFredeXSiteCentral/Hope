
import { getFeaturedRecipes } from '@/lib/firebase/firestore';
import RecipeList from '@/components/recipes/RecipeList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, UploadCloud, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';
import { isFirebaseConfigValid, firebaseConfig } from '@/lib/firebase/config';

export const metadata: Metadata = {
  title: "Homepage | Hope's RecipeShare",
  description: "Welcome to Hope's RecipeShare! Discover delicious recipes and share your own culinary creations.",
};

export const revalidate = 3600; 

export default async function HomePage() {
  let featuredRecipes: Awaited<ReturnType<typeof getFeaturedRecipes>> = [];
  let configError = false;
  let fetchError = false;
  
  if (!isFirebaseConfigValid(firebaseConfig)) {
    configError = true;
  } else {
    try {
      featuredRecipes = await getFeaturedRecipes(6);
    } catch (error) {
      console.error("Failed to fetch recipes, this might be due to Firestore rules or the database not being created yet.", error);
      fetchError = true;
    }
  }


  return (
    <div className="space-y-12">
      <section className="text-center py-20 rounded-lg shadow-2xl relative overflow-hidden bg-gradient-to-br from-background to-card border border-border/20">
         <div className="absolute inset-0 bg-grid-cyan-500/10 bg-[length:50px_50px] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-4">
            Welcome to Hope's RecipeShare!
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            Discover mouth-watering recipes, share your culinary masterpieces, and get inspired by our AI-powered recipe suggestions.
            </p>
            <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                <Link href="/upload">
                <UploadCloud className="mr-2 h-5 w-5" />
                Upload Your Recipe
                </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
                <Link href="/ai-suggestions">
                <Sparkles className="mr-2 h-5 w-5" />
                Get AI Suggestions
                </Link>
            </Button>
            </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-primary mb-6 text-center md:text-left">Featured Recipes</h2>
        
        {configError ? (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-destructive/50 bg-destructive/10 rounded-lg">
            <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
            <h3 className="text-xl font-bold text-destructive">Firebase Configuration Error</h3>
            <p className="text-destructive/80 mt-2 max-w-lg">
              Your application is missing one or more Firebase credentials. Please ensure your <code className="bg-destructive/20 p-1 rounded font-mono text-xs">.env</code> file is correctly set up with all the necessary values (like API Key, Auth Domain, Project ID, etc.) and restart the server.
            </p>
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-amber-500/50 bg-amber-500/10 rounded-lg">
            <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold text-amber-500">Could Not Fetch Recipes</h3>
            <p className="text-amber-500/80 mt-2 max-w-md">
              The application connected to Firebase, but could not retrieve recipes. This is often due to Firestore Security Rules blocking access or the database not being created yet.
            </p>
          </div>
        ) : (
          <>
            <RecipeList recipes={featuredRecipes} />
            {featuredRecipes.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No featured recipes yet. Check back soon!</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
