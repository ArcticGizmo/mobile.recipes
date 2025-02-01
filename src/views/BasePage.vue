<template>
  <IonPage :class="{ 'has-toolbar': hasToolbar }">
    <IonHeader v-if="title || $slots['header'] || $slots['header-start'] || $slots['header-end']">
      <IonToolbar v-if="$slots['header']">
        <slot name="header">
          <IonButtons v-if="defaultBackHref" slot="start">
            <IonBackButton :defaultHref="defaultBackHref" />
          </IonButtons>
          <IonTitle>{{ title }}</IonTitle>
        </slot>
      </IonToolbar>
      <IonToolbar v-else>
        <IonButtons slot="start">
          <slot name="header-start">
            <IonBackButton v-if="defaultBackHref" color="dark" :defaultHref="defaultBackHref" />
          </slot>
        </IonButtons>
        <IonButtons slot="end">
          <slot name="header-end">
            <IonButton v-if="closable" @click="onClose()">
              <IonIcon slot="icon-only" color="dark" :icon="closeOutline" size="large" />
            </IonButton>
          </slot>
        </IonButtons>
        <IonTitle color="dark">{{ title }}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonLoading v-if="loading" :is-open="loading" class="transparent-loading" />
    <IonContent>
      <div class="content" :class="{ 'h-full': fixedContentHeight }" :style="{ maxWidth }">
        <slot></slot>
      </div>
    </IonContent>
    <IonFooter :style="{ maxWidth, margin: 'auto' }">
      <div class="teleporting-footer"></div>
      <slot name="footer"></slot>
    </IonFooter>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonFooter,
  IonLoading,
  IonButton,
  IonIcon
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import { computed } from 'vue';

const props = defineProps<{
  title?: string;
  defaultBackHref?: string;
  loading?: boolean;
  maxWidth?: string;
  fixedContentHeight?: boolean;
  closable?: boolean;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const hasToolbar = computed(() => !!props.title);

const onClose = () => {
  emits('close');
};
</script>

<style scoped>
.ion-page {
  justify-content: unset;
}

.content {
  margin: 0 auto;
}

.ion-page.fill-height.has-toolbar {
  grid-template-rows: auto 1fr;
}

.ion-page-hidden .teleporting-footer {
  display: none;
}
</style>
