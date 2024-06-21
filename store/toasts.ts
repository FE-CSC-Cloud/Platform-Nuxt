export const useToastStore = defineStore('toastStore', () => {
    const toasts = ref([]);

    const addToast = (toast) => {
        const id = Date.now();
        toasts.value.push({ id, ...toast });

        setTimeout(() => {
            removeToast(id);
        }, 3000);
    };

    const removeToast = (id) => {
        toasts.value = toasts.value.filter((toast) => toast.id !== id);
    };

    return { toasts, addToast, removeToast };
});