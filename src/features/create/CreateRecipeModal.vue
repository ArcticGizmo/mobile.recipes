<template>
  <BasePage title="Create Recipe" closable @close="onClose()">
    <div class="p-4">
      <RecipeForm />

      <KeyboardSafeFooter>
        <IonButton class="px-4" expand="block" @click="onCreate()">Create</IonButton>
      </KeyboardSafeFooter>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/views/BasePage.vue';
import { IonButton, modalController } from '@ionic/vue';
import { useCreateRecipe } from './createRecipeForm';
import KeyboardSafeFooter from '@/components/KeyboardSafeFooter.vue';
import RecipeForm from '../RecipeForm.vue';

const { create, form } = useCreateRecipe();

const onClose = () => modalController.dismiss();

const onCreate = form.handleSubmit(async values => {
  await create(values);
  modalController.dismiss();
});
</script>
