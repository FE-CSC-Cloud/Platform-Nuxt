<template>
    <!-- INLOGGEN -->
    <div class="bg-secondary-700 h-screen flex flex-col" v-if="!loggedIn">
        <div class="flex items-center justify-between text-sm text-secondary-300 px-4 pt-3">
            <span class="font-medium">{{ server.name }}</span>
            <button class="underline cursor-pointer" @click="logout">End session</button>
        </div>
        <form class="px-4 py-3 m-auto max-w-[350px] w-full" @submit.prevent="connectWebSocket">
            <h2 class="text-lg font-medium text-secondary-100 mb-2">
                Login on the server
            </h2>
            <div class="alert alert-danger mb-4" v-if="isError">
                <div class="alert-body">
                    <Icon name="tabler:alert-triangle-filled" />
                    <b>Warning</b>
                    {{ isError }}
                </div>
            </div>
            <InputWrapper
                id="username"
                label="Username"
            >
                <input
                    v-model="username"
                    required
                    type="text"
                    :placeholder="$t(('login.username'))"
                    id="username"
                />
            </InputWrapper>
            <InputWrapper
                id="password"
                label="Password"
                class="mt-3"
            >
                <input
                    v-model="password"
                    required
                    type="password"
                    :placeholder="$t(('login.password'))"
                    id="password"
                />
            </InputWrapper>
            <div @click="() => advancedOpen = !advancedOpen" class="cursor-pointer flex items-center gap-x-1 font-medium text-primary-300 mt-4">
                Advanced
                <Icon name="tabler:chevron-down" :class="advancedOpen && 'rotate-180'" class="duration-300" /> 
            </div>
            <div class="duration-300 overflow-hidden" :class="advancedOpen ? 'max-h-[200px] py-2' : 'max-h-0'">
                <InputWrapper
                    id="port"
                    label="Poort"
                >
                    <input
                        v-model="port"
                        required
                        type="text"
                        placeholder="Poort"
                        id="port"
                    />
                </InputWrapper>
            </div>
            <button class="button button-primary w-full mt-4">
                <div class="absolute" v-if="isLoading">
                    <Icon name="svg-spinners:180-ring-with-bg" />
                </div>
                Login
            </button>
        </form>
    </div>

    <!-- TERMINAL -->
    <div v-if="loggedIn" class="bg-secondary-700 h-screen">
        <div v-if="path" class="relative fadeIn h-full flex flex-col overflow-hidden">

            <!-- HEADER -->
            <div class="flex items-center justify-between text-sm text-secondary-300 px-4 pt-3">
                <span class="font-medium">{{ server.name }}</span>
                <button class="underline cursor-pointer" @click="logout">End session</button>
            </div>
            <div class="flex items-center justify-between px-4 py-3 border-b border-secondary-500">
                <div class="flex items-center gap-x-1">
                    <Icon name="tabler:folder-filled" />
                    <div>
                        {{ path }}
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
                    <div class="px-4 py-3 min-h-[calc(100%-65px)]">
                        <p v-for="(lines, index) in formattedOutput" :key="index" v-html="lines"></p>
                    </div>
                    <div class="sticky bottom-0 px-4 pb-3 bg-secondary-700">
                        <form @submit.prevent="submitCommand">
                            <InputWrapper>
                                <input
                                    v-model="command"
                                    required
                                    type="text"
                                    autofocus
                                    placeholder="Command line"
                                />
                            </InputWrapper>
                        </form>
                    </div>
                </div>
                
                <div 
                    class="max-w-[0px] py-3 overflow-auto duration-300 w-full border-l-0 border-secondary-500" 
                    :class="showFiles && 'max-w-[270px] !border-l px-4'"
                >
                    <button 
                        v-if="path !== '/\n'"
                        @click="sendMessage({ command: `cd ..` })"
                        class="block mb-2" 
                    >
                        <Icon name="tabler:folder-filled" class="text-primary-200" />
                        ../
                    </button>
                    <button 
                        v-for="directory in directories"
                        class="flex justify-start items-center text-left gap-x-1 mb-2" 
                        @click="sendMessage({ command: `cd ${directory}` })"
                    >
                        <Icon name="tabler:folder-filled" class="text-primary-200 shrink-0" />
                        {{ directory }}
                    </button>
                    <button 
                        v-for="file in files"
                        class="flex justify-start items-center text-left gap-x-1 mb-2" 
                        @click="sendMessage({ command: `nano ${file}` })"
                    >
                        <Icon name="tabler:file-filled" />
                        {{ file }}
                    </button>
                </div>
            </div>
            <div v-if="curFile" class="pt-3 w-full bg-secondary-700 border-t border-secondary-500">
                <div class="px-4 flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-secondary-300">{{ curFile }}</span>
                    <div class="flex items-center gap-x-2">
                        <button @click="closeFile" class="button button-secondary outlined">
                            Cancel
                        </button>
                        <button @click="saveFile" class="button button-secondary">
                            Save
                        </button>
                    </div>
                </div>
                <textarea
                    v-model="textField"
                    class="outline-none w-full bg-transparent px-4 pb-3"
                    rows="5" 
                />
            </div>
        </div>
        <div v-if="!path" class="flex items-center h-full justify-center">
            <Icon name="svg-spinners:180-ring" class="text-3xl" />
        </div>
    </div>
</template>

<script setup>
    import { useServerStore } from '~/store/server';

    const addToast = useToast();

    const loggedIn = ref(false);
    const isLoading = ref(false);
    const advancedOpen = ref(false);
    const isError = ref('');
    const username = ref('');
    const password = ref('');
    const port = ref('22');

    const server = useServerStore();
    const showFiles = ref(true);
    const path = ref(null);
    const command = ref('');
    const output = ref([]);
    const directories = ref([]);
    const currentDir = ref();
    const files = ref([]);
    const terminalElement = ref(null);
    const textField = ref(null);
    const curFile = ref(null);
    const ws = ref(null);

    const formattedOutput = computed(() => {
        return output.value.map(lines => {
            if (lines === null || typeof lines === 'undefined') {
                return '';
            }

            return lines.replace(/\n/g, '<br>');
        });
    });

    const toggleShowFiles = () => {
        showFiles.value = !showFiles.value;
    };

    const scrollToBottom = () => {
        if (terminalElement.value) {
            terminalElement.value.scrollTop = terminalElement.value.scrollHeight;
        }
    };

    const sendMessage = (message) => {
        if (ws.value && ws.value.readyState === WebSocket.OPEN) {
            ws.value.send(JSON.stringify(message));
        } else {
            console.error('WebSocket not open to send message');
        }
    };

    const submitCommand = () => {
        if(command.value === "clear"){
            output.value = [];
        }

        output.value.push(`[.../${currentDir.value}] $ ${command.value}`);

        sendMessage({
            command: command.value
        });

        command.value = '';
    };

    const logout = () => {
        sendMessage({
            reqType: 'logout'
        });
        window.close();
    };

    const closeFile = () => {
        textField.value = null;
        curFile.value = null;
    }

    const saveFile = () => {
        const escapedTextField = textField.value.replace(/"/g, '\\"');
        sendMessage({ command: `echo "${escapedTextField}" > ${curFile.value}` });
        addToast({ title: `${curFile.value} saved` });
        closeFile();
    }

    const connectWebSocket = () => {
        isLoading.value = true;
        
        ws.value = new WebSocket(useRuntimeConfig().public.terminalApi);
        
        ws.value.onopen = () => {
            console.log('WebSocket connected');
            sendMessage({
                reqType: 'login',
                SSHUser: username.value,
                SSHPassword: password.value,
                SSHHost: server.IP,
                SSHPort: port.value
            });
        };

        ws.value.onmessage = (event) => {
        const data = JSON.parse(event.data);

        const updateFilePath = () => {
            if (data.filePath && data.filePath !== path.value) {
                closeFile();
            }
            if (data.filePath) {
                path.value = data.filePath;
                const pathSegments = data.filePath.split('/');
                currentDir.value = pathSegments[pathSegments.length - 1].replace(/\n/g, '');
            }
        };

        const updateStatus = () => {
            if (data.status === 200) {
                loggedIn.value = true;
                isLoading.value = false;
            } else if (data.status === 498) {
                isError.value = 'Server login failed.';
                isLoading.value = false;
            }
        };

        const updateOutput = () => {
            if (data.type === 'text') {
                textField.value = data.stdout;
                curFile.value = data.textFile;
            } else {
                if (data.stderr) {
                    output.value.push(data.stderr);
                }
                if (data.stdout) {
                    output.value.push(data.stdout);
                }
            }
        };

        const updateDirectoriesAndFiles = () => {
            if (data.directories !== undefined) {
                directories.value = data.directories.replace(/\//g, '').split("\n").filter(item => item !== '');
            }
            if (data.files !== undefined) {
                files.value = data.files.split("\n").filter(item => item !== '');
            }
        };

        if (data.type === 'exit') {
            window.close();
        }

        updateFilePath();
        updateStatus();
        updateOutput();
        updateDirectoriesAndFiles();

        console.log(data);

        setTimeout(() => {
            scrollToBottom();
        }, 10);
    };

    ws.value.onclose = () => {
        console.log('WebSocket closed');
    };

    ws.value.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
};
</script>