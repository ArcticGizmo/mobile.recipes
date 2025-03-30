import { KeepAwake } from '@capacitor-community/keep-awake';
import { computed, readonly, ref } from 'vue';

const isEnabled = ref(false);
const isSupported = ref(false);

KeepAwake.isKeptAwake().then(r => (isEnabled.value = r.isKeptAwake));
KeepAwake.isSupported().then(r => (isSupported.value = r.isSupported));

export const useKeepAwake = () => {
  const enable = async () => {
    await KeepAwake.keepAwake();
    isEnabled.value = true;
  };

  const disable = async () => {
    await KeepAwake.allowSleep();
    isEnabled.value = false;
  };

  const toggle = async () => {
    if (isEnabled.value) {
      return await disable();
    }
    return await enable();
  };

  return { isSupported: readonly(isSupported), isEnabled: computed(() => isEnabled.value && isSupported.value), enable, disable, toggle };
};
