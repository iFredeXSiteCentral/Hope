
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import type { Recipe, RecipeInput } from '@/types/recipe';
import type { Article, ArticleInput } from '@/types/article';
import type { Comment, CommentInput } from '@/types/comment';


const RECIPES_COLLECTION = 'recipes';
const ARTICLES_COLLECTION = 'articles';
const COMMENTS_COLLECTION = 'comments';

// A guard function to check if Firestore is available.
function checkDb() {
  if (!db) {
    // This will now only happen if the config is invalid.
    // Instead of throwing, we return null to allow graceful failure.
    return null;
  }
  return db;
}


// ====== Recipe Functions ======

export async function addRecipe(recipeData: RecipeInput): Promise<string> {
  const firestore = checkDb();
  if (!firestore) throw new Error('Firestore is not initialized.');
  try {
    const docRef = await addDoc(collection(firestore, RECIPES_COLLECTION), {
      ...recipeData,
      createdAt: serverTimestamp(), // Use serverTimestamp for consistency
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding recipe: ', error);
    throw new Error('Failed to add recipe.');
  }
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const firestore = checkDb();
  if (!firestore) return null;
  try {
    const docRef = doc(firestore, RECIPES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Recipe;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting recipe by ID: ', error);
    throw new Error('Failed to fetch recipe.');
  }
}

export async function getFeaturedRecipes(count: number = 6): Promise<Recipe[]> {
  const firestore = checkDb();
  if (!firestore) return [];
  try {
    const recipesCol = collection(firestore, RECIPES_COLLECTION);
    const q = query(recipesCol, orderBy('createdAt', 'desc'), limit(count));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
  } catch (error) {
    console.error('Error fetching featured recipes: ', error);
     if ((error as any).code === 'failed-precondition') {
      console.warn("Firestore indexes are likely being built. Please wait and refresh.");
      return [];
    }
    throw new Error('Failed to fetch featured recipes.');
  }
}

export async function getUserRecipes(userId: string): Promise<Recipe[]> {
   const firestore = checkDb();
   if (!firestore) return [];
   try {
    const recipesCol = collection(firestore, RECIPES_COLLECTION);
    const q = query(recipesCol, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
  } catch (error) {
    console.error('Error fetching user recipes: ', error);
    throw new Error('Failed to fetch user recipes.');
  }
}


// ====== Article Functions ======

export async function addArticle(articleData: ArticleInput): Promise<string> {
  const firestore = checkDb();
  if (!firestore) throw new Error('Firestore is not initialized.');
  try {
    const docRef = await addDoc(collection(firestore, ARTICLES_COLLECTION), {
      ...articleData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding article: ', error);
    throw new Error('Failed to add article.');
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  const firestore = checkDb();
  if (!firestore) return null;
  try {
    const docRef = doc(firestore, ARTICLES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Article;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting article by ID: ', error);
    throw new Error('Failed to fetch article.');
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const firestore = checkDb();
  if (!firestore) return [];
  try {
    const articlesCol = collection(firestore, ARTICLES_COLLECTION);
    const q = query(articlesCol, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
  } catch (error) {
    console.error('Error fetching all articles: ', error);
     if ((error as any).code === 'failed-precondition') {
      console.warn("Firestore indexes are likely being built. Please wait and refresh.");
      return [];
    }
    throw new Error('Failed to fetch articles.');
  }
}

// ====== Comment Functions ======

export async function addComment(commentData: CommentInput): Promise<string> {
  const firestore = checkDb();
  if (!firestore) throw new Error('Firestore is not initialized.');
  try {
    const docRef = await addDoc(collection(firestore, COMMENTS_COLLECTION), {
      ...commentData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding comment: ', error);
    throw new Error('Failed to add comment.');
  }
}

export async function getCommentsForArticle(articleId: string): Promise<Comment[]> {
  const firestore = checkDb();
  if (!firestore) return [];
  try {
    const commentsCol = collection(firestore, COMMENTS_COLLECTION);
    const q = query(
      commentsCol,
      where('articleId', '==', articleId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
  } catch (error) {
    console.error('Error fetching comments for article: ', error);
     if ((error as any).code === 'failed-precondition') {
      console.warn("Firestore indexes are likely being built. Please wait and refresh.");
      return [];
    }
    throw new Error('Failed to fetch comments.');
  }
}
