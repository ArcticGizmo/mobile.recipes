import { Preferences } from '@capacitor/preferences';

export const useKvStore = () => {
  const save = async (key: string, value: string) => {
    await Preferences.set({
      key,
      value
    });
  };

  const load = async (key: string) => {
    const resp = await Preferences.get({ key });
    return resp.value ?? undefined;
  };

  const saveJson = async <T = object>(key: string, data: T) => {
    return await save(key, JSON.stringify(data));
  };

  const loadJson = async <T>(key: string) => {
    const resp = await load(key);
    if (resp == null) {
      return undefined;
    }

    return JSON.parse(resp) as T;
  };

  return { save, load, saveJson, loadJson };
};
