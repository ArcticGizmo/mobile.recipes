<template>
  <BasePage title="Create Recipe" closable @close="onClose()">
    <div class="p-4">
      <TextInput name="name" label="Name" />

      <!-- TODO: tags will go here -->
      <!-- TODO: ingredients will go here -->

      <TextareaArrayInput class="mt-8" name="steps" label="Steps" />

      <KeyboardSafeFooter>
        <IonButton class="px-4" expand="block" @click="onCreate()">Create</IonButton>
      </KeyboardSafeFooter>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import TextInput from '@/components/inputs/TextInput.vue';
import BasePage from '@/views/BasePage.vue';
import { IonButton, modalController } from '@ionic/vue';
import { useCreateRecipe } from './createRecipeForm';
import KeyboardSafeFooter from '@/components/KeyboardSafeFooter.vue';
import TextareaArrayInput from '@/components/inputs/TextareaArrayInput.vue';

const { create, form } = useCreateRecipe();

const onClose = () => modalController.dismiss();

const onCreate = form.handleSubmit(async values => {
  await create(values);
  modalController.dismiss();
});
</script>
