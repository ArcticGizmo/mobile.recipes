import { ModalOptions, modalController } from '@ionic/vue';

export const createFullscreenModal = async (opts: ModalOptions) => {
  return await modalController.create({
    ...opts,
    cssClass: 'modal-fullscreen ' + opts.cssClass || '',
    backdropDismiss: false
  });
};
