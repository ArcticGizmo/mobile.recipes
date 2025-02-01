<template>
  <BasePage :loading max-width="500px">
    <template #header>
      <IonSearchbar class="px-2 -mr-2 my-0.5" v-model="search" />
    </template>
    <RecipeCard v-for="item of filteredRecipes" :key="item.id" :id="item.id" :name="item.name" @click="onSelect(item.id)" />

    <IonFab slot="fixed" vertical="bottom" horizontal="center">
      <IonFabButton size="small" @click="onCreateNew()">
        <IonIcon :icon="add"></IonIcon>
      </IonFabButton>
    </IonFab>
  </BasePage>
</template>

<script setup lang="ts">
import { IonFab, IonFabButton, IonIcon, IonSearchbar, useIonRouter } from '@ionic/vue';
import BasePage from './BasePage.vue';
import { computed, ref } from 'vue';
import { add } from '@/icons';
import { createFullscreenModal } from '@/composables/modal';
import CreateRecipeModal from '@/features/create/CreateRecipeModal.vue';
import { useRecipes } from '@/composables/recipes';
import RecipeCard from '@/components/RecipeCard.vue';

const search = ref('');

const { recipes, loading } = useRecipes();
const router = useIonRouter();

const filteredRecipes = computed(() => {
  // TODO: add search text on this one
  const items = [...recipes.value];
  items.sort((a, b) => a.name.localeCompare(b.name));
  return recipes.value;
});

const onSelect = (id: string) => {
  router.push({ name: 'View Recipe', params: { id } });
};

const onCreateNew = async () => {
  const modal = await createFullscreenModal({
    component: CreateRecipeModal
  });
  modal.present();
  await modal.onWillDismiss();
};
</script>
