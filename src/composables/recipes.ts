import { computed, ComputedRef, readonly, ref, watch } from 'vue';
import { useKvStore } from './kvStore';

export interface Recipe {
  id: string;
  name: string;
  steps: string[];
}

const KEY = 'recipes';

const kvStore = useKvStore();

const recipes = ref<Recipe[]>([]);
const loading = ref(false);

watch(recipes, async r => {
  console.debug('[recipes] saving to disk');
  await kvStore.saveJson(KEY, r);
});

const initialLoad = async () => {
  loading.value = true;
  try {
    const data = await kvStore.loadJson<Recipe[]>(KEY);
    recipes.value = data || [];
  } catch (err) {
    console.error('unable to load recipes', err);
  } finally {
    loading.value = false;
  }
};

const add = async (recipe: Recipe) => {
  const updatedRecipes = recipes.value.filter(x => x.id !== recipe.id);
  updatedRecipes.push(recipe);
  recipes.value = updatedRecipes;
};

const remove = async (id: string) => {
  recipes.value = recipes.value.filter(x => x.id !== id);
};

const set = async (newRecipes: Recipe[]) => {
  recipes.value = [...newRecipes];
};

const replace = async (recipe: Recipe) => {
  const index = recipes.value.findIndex(x => x.id === recipe.id);

  if (index > -1) {
    recipes.value[index] = recipe;
  }
};

/* load on app start because this is all the app does */
initialLoad();

export const useRecipes = () => {
  const clear = () => set([]);

  return { recipes: readonly(recipes) as ComputedRef<Recipe[]>, add, remove, set, clear, replace, loading };
};

export const useRecipe = (id: string) => {
  const { recipes, loading: recipesLoading } = useRecipes();

  const recipe = computed(() => recipes.value.find(x => x.id === id));

  const doesNotExist = computed(() => !recipesLoading.value && !recipe.value);

  return { recipe, loading: recipesLoading, doesNotExist };
};
