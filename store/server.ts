export const useServerStore = defineStore('serverStore', {
    state: () => ({
        ID: '',
        UsersId: '',
        VcenterId: '',
        name: '',
        description: '',
        endDate: '',
        operatingSystem: '',
        storage: '',
        memory: '',
        IP: '',
        powerStatus: ''
    }),
    actions: {
        async fetchServer(id) {
            try {
                const session = useCookie("session");
                
                const serverRes = await $fetch('/servers/' + id, {
                    method: 'GET',
                    baseURL: useRuntimeConfig().public.baseUrlApi,
                    headers: {
                        'Authorization': `Bearer ${session.value}`
                    }
                });
                
                this.ID = serverRes.ID;
                this.usersId = serverRes.UsersId;
                this.VcenterId = serverRes.VcenterId;
                this.name = serverRes.Name;
                this.description = serverRes.Description;
                this.endDate = serverRes.EndDate;
                this.operatingSystem = serverRes.OperatingSystem;
                this.storage = serverRes.Storage;
                this.memory = serverRes.Memory;
                this.IP = serverRes.IP;
                this.powerStatus = serverRes.PowerStatus;
            } catch (error) {
                if(error.response.status === 404){
                    const router = useRouter();
                    router.push('/');
                } else {
                    handleError(error);
                    console.error(error);
                }
            }
        }
    }
});