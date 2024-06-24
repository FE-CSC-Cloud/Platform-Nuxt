<template>
    <div class="relative flex flex-col bg-secondary-700 h-screen overflow-hidden">
        <div class="flex items-center justify-between text-sm text-secondary-300 px-4 pt-3">
            <span class="font-medium">{{ server.name}}</span>
            <button class="underline cursor-pointer">End session</button>
        </div>
        <div class="flex items-center justify-between px-4 py-3 border-b border-secondary-500">
            <div class="flex items-center gap-x-1">
                <Icon name="tabler:folder-filled" />
                <div>
                    <button 
                        v-for="(dir, index) in pathDirectories"
                        :key="index"
                    >
                        {{ dir }}<span v-if="index < pathDirectories.length - 1">/</span>
                    </button>
                </div>
            </div>
            <button class="flex items-center gap-x-1" @click="toggleShowFiles">
                <Icon
                    name="tabler:chevron-right"
                    class="duration-300" 
                    :class="showFiles && 'rotate-180'" 
                />
                Bestanden
            </button>
        </div>
        <div class="relative flex flex-1 overflow-hidden">
            <div class="relative h-full w-full overflow-auto" ref="terminalElement">
                <div class="px-4 py-3">
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                    <p>Terminal komt hier!</p>
                </div>
                <div class="sticky bottom-0 px-4 pb-3 bg-secondary-700">
                    <InputWrapper>
                        <input
                            v-model="command"
                            required
                            type="text"
                            placeholder="Command line"
                        />
                    </InputWrapper>
                </div>
            </div>
            <div 
                class="max-w-[0px] py-3 overflow-hidden duration-300 w-full border-l-0 border-secondary-500" 
                :class="showFiles && 'max-w-[250px] !border-l px-4'"
            >
                Hello
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useServerStore } from '~/store/server';
    import WebSocket from 'ws';
    
    const server = useServerStore();

    const path = ref('C/src');
    const terminalElement = ref(null);
    const showFiles = ref(false);
    const command = ref('')


    const pathDirectories = computed(() => {
        return path.value.split('/');
    });
    
    const toggleShowFiles = () => {
      showFiles.value = !showFiles.value
    }

    const scrollToBottom = () => {
        if (terminalElement.value) {
            terminalElement.value.scrollTop = terminalElement.value.scrollHeight;
        }
    };

    let ws;

    const connectWebSocket = () => {
        ws = new WebSocket('ws://145.89.192.64:3300');
        
        ws.onopen = () => {
            console.log('WebSocket connected');
        };
    };

    connectWebSocket();
</script>