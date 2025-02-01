<template>
  <div class="textarea-array-input">
    <div class="mb-2">
      <IonLabel>{{ label }}</IonLabel>
    </div>
    <div class="flex items-start mb-4" v-for="(field, index) of fields" :key="index">
      <TextareaInput :name="`${name}[${index}]`" :label="`Step ${index + 1}`" />
      <IonButton fill="clear" @click="onRemove(index, !!field.value)">
        <IonIcon slot="icon-only" :icon="close" color="danger" />
      </IonButton>
    </div>

    <IonButton @click="push('')">Add Step</IonButton>
  </div>
</template>

<script setup lang="ts">
import { alertController, IonButton, IonIcon, IonLabel } from '@ionic/vue';
import { useFieldArray } from 'vee-validate';
import TextareaInput from './TextareaInput.vue';
import { close } from '@/icons';

const props = defineProps<{
  name: string;
  label: string;
}>();

const { remove, push, fields } = useFieldArray(() => props.name);

const onRemove = async (index: number, hasData: boolean) => {
  if (!hasData) {
    remove(index);
    return;
  }

  const alert = await alertController.create({
    subHeader: 'Remove Step?',
    buttons: [
      {
        text: 'Remove',
        role: 'destructive'
      },
      {
        id: 'cancel',
        text: 'Cancel'
      }
    ]
  });
  alert.present();

  const resp = await alert.onWillDismiss();

  if (resp.role === 'destructive') {
    remove(index);
  }
};
</script>

<style>
.textarea-wrapper::after {
  word-break: break-word;
}
</style>
