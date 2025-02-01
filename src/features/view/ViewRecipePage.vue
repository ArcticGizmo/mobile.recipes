<template>
  <BasePage :loading title="View" default-back-href="/">
    <div v-if="doesNotExist" class="p-4 pt-16 text-center">
      <div>Could not find that recipe</div>

      <IonButton href="/">Back</IonButton>
    </div>
    <div v-else-if="recipe" class="p-4">
      <IonLabel>{{ recipe.name }}</IonLabel>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { useRecipe } from '@/composables/recipes';
import BasePage from '@/views/BasePage.vue';
import { IonButton, IonLabel } from '@ionic/vue';

const props = defineProps<{ id: string }>();

const { recipe, loading, doesNotExist } = useRecipe(props.id);
</script>
