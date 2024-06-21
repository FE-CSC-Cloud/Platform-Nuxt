import { useToastStore } from '~/store/toasts';

export const useToast = () => {
    const toastStore = useToastStore();

    const addToast = (toast) => {
        toastStore.addToast(toast);
    };

    return addToast;
};