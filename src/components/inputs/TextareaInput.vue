<template>
  <IonTextarea
    class="textarea-input base-input"
    :class="{ 'ion-invalid ion-touched': meta.touched && errorMessage }"
    v-model="value"
    mode="md"
    fill="outline"
    label-placement="stacked"
    :label
    :name
    :type
    :rows
    :errorText
    autocapitalize="sentences"
    auto-grow
    aria-multiline="true"
    @input="handleChange"
    @ion-blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { IonTextarea } from '@ionic/vue';
import { TextFieldTypes } from '@ionic/core';
import { computed } from 'vue';
import { useField } from 'vee-validate';

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    type?: TextFieldTypes;
    rows?: number;
  }>(),
  {
    rows: 4
  }
);

const { errorMessage, value, meta, handleChange, handleBlur } = useField<string>(() => props.name, undefined, {
  syncVModel: true,
  validateOnValueUpdate: false
});

const errorText = computed(() => (meta.touched ? errorMessage.value : undefined));
</script>

<style lang="scss" scoped>
ion-textarea {
  --color: var(--text--primary);
  --padding-bottom: 0 !important;
}
</style>
