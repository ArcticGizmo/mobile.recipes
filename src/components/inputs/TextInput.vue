<template>
  <IonInput
    class="form-input text-input"
    :class="{ 'ion-invalid ion-touched': !!errorMessage }"
    v-model="value"
    label-placement="stacked"
    fill="outline"
    mode="md"
    :autocapitalize
    :name
    :type
    :placeholder
    :readonly
    :autocorrect="autocorrect ? 'on' : 'off'"
    :error-text="errorMessage"
    @change="handleChange"
  >
    <div v-if="label || $slots['label']" slot="label">
      <slot name="label">
        <IonText>{{ label }}</IonText>
        <IonText v-if="required" color="danger">*</IonText>
      </slot>
    </div>
  </IonInput>
</template>

<script setup lang="ts">
import { IonInput, IonText } from '@ionic/vue';
import { useField } from 'vee-validate';
import type { TextFieldTypes } from '@ionic/core';

const props = defineProps<{
  name: string;
  label?: string;
  labelPlacement?: 'start' | 'end' | 'floating' | 'stacked' | 'fixed';
  type?: TextFieldTypes;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  autocorrect?: boolean;
}>();

const { errorMessage, value, handleChange } = useField<string>(() => props.name, undefined, {
  syncVModel: true,
  validateOnValueUpdate: false
});
</script>

<style scoped lang="scss">
ion-input {
  --padding-bottom: 0 !important;
}
</style>
