<template>
  <BasePage title="Edit" default-back-href="/">
    <div class="p-4">
      <TextInput name="name" label="Name" />

      <!-- TODO: tags will go here -->
      <!-- TODO: ingredients will go here -->

      <TextareaArrayInput class="mt-8" name="steps" label="Steps" />

      <KeyboardSafeFooter>
        <IonButton class="px-4" expand="block" @click="onUpdate()">Update</IonButton>
      </KeyboardSafeFooter>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import TextInput from '@/components/inputs/TextInput.vue';
import BasePage from '@/views/BasePage.vue';
import { IonButton } from '@ionic/vue';

import KeyboardSafeFooter from '@/components/KeyboardSafeFooter.vue';
import TextareaArrayInput from '@/components/inputs/TextareaArrayInput.vue';
import { useEditRecipeForm } from './editRecipeForm';

const { update, form } = useEditRecipeForm();

const onUpdate = form.handleSubmit(async values => {
  await update(values);
  // no nav here? Or should we still do that?
});

const onDelete = async () => {
  // remove and nav
};
</script>
