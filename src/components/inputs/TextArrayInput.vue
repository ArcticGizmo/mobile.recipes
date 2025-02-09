<template>
  <div class="textarea-array-input">
    <div class="mb-2">
      <IonLabel>{{ label }}</IonLabel>
    </div>
    <IonList>
      <IonReorderGroup :disabled="!swappable" @ion-item-reorder="onReorder">
        <IonItem v-for="(field, index) of fields" :key="index" lines="none">
          <IonReorder class="-ml-4 mr-2" slot="start" />
          <TextInput class="my-2" :name="`${name}[${index}]`">
            <template v-if="$slots['label']" #label>
              <slot name="label" v-bind="{ index }"></slot>
            </template>
          </TextInput>
          <IonButton slot="end" fill="clear" @click="onRemove(index, !!field.value)">
            <IonIcon slot="icon-only" :icon="close" color="danger" />
          </IonButton>
        </IonItem>
        <IonItem lines="none">
          <IonReorder class="-ml-4 mr-2 invisible" style="pointer-events: none" slot="start" />
          <IonInput
            ref="newInput"
            v-model="newItem"
            class="my-2"
            :class="{ 'ion-invalid ion-touched': !!errorMessage }"
            :placeholder="placeholder"
            autocorrect="on"
            autocapitalize="sentences"
            mode="md"
            fill="outline"
            @ion-change="onAddNewItem()"
          />
          <IonInput style="width: 0" :disabled="!newItem" @ion-focus="onFocus" />
        </IonItem>
      </IonReorderGroup>
    </IonList>
  </div>
</template>

<script setup lang="ts">
import { alertController, IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup } from '@ionic/vue';
import { IonReorderGroupCustomEvent, ItemReorderEventDetail } from '@ionic/core';
import { useField, useFieldArray } from 'vee-validate';
import { close } from '@/icons';
import TextInput from './TextInput.vue';
import { ref, useTemplateRef } from 'vue';

const props = defineProps<{
  name: string;
  label: string;
  swappable?: boolean;
  placeholder?: string;
  removeText?: string;
}>();

const newItem = ref('');
const newInput = useTemplateRef('newInput');

const { remove, push, fields, swap } = useFieldArray(() => props.name);
const { errorMessage } = useField(() => props.name);

const onAddNewItem = () => {
  const value = newItem.value;
  if (!value) {
    return;
  }

  push(value);
  newItem.value = '';
};

const onFocus = () => {
  newInput.value?.$el.nativeInput.focus();
};

const onRemove = async (index: number, hasData: boolean) => {
  if (!hasData) {
    remove(index);
    return;
  }

  const alert = await alertController.create({
    subHeader: props.removeText || 'Remove Item?',
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

const onReorder = (e: IonReorderGroupCustomEvent<ItemReorderEventDetail>) => {
  swap(e.detail.from, e.detail.to);
  e.detail.complete(fields.value);
};
</script>

<style>
.textarea-wrapper::after {
  word-break: break-word;
}
</style>
