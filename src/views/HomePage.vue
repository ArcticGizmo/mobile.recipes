<template>
  <BasePage title="Home" max-width="500px">
    <template #header>
      <IonSearchbar class="px-2 -mr-2 my-0.5" v-model="search" />
    </template>
    <div class="content p-8">this is the home page</div>

    <IonFab slot="fixed" vertical="bottom" horizontal="center">
      <IonFabButton size="small" @click="onCreateNew()">
        <IonIcon :icon="add"></IonIcon>
      </IonFabButton>
    </IonFab>
  </BasePage>
</template>

<script setup lang="ts">
import { IonFab, IonFabButton, IonIcon, IonSearchbar } from '@ionic/vue';
import BasePage from './BasePage.vue';
import { ref } from 'vue';
import { add } from '@/icons';
import { createFullscreenModal } from '@/composables/modal';
import CreateRecipeModal from '@/features/create/CreateRecipeModal.vue';

const search = ref('');

const onCreateNew = async () => {
  const modal = await createFullscreenModal({
    component: CreateRecipeModal
  });
  modal.present();
  await modal.onWillDismiss();
};
</script>
