<template>
    <div>
        <h1>SSH portal</h1>
        <form class="flex gap-1 flex-col max-w-[200px]" @submit.prevent="login()">
            <!-- <input type="text" placeholder="Username" v-model="username" class="border">
            <input type="password" placeholder="Password" v-model="password" class="border"> -->
            <input type="text" placeholder="Command" v-model="command" class="border">
            <button class="bg-sky-300">Login</button>
            <div v-if="responseStdout !== null">
                Output: {{ responseStdout }}
            </div>
            <!-- <div v-if="responseStderr !== null" class="text-red-500">
                Output: {{ responseStderr }}
            </div> -->
        </form>
    </div>
</template>

<script setup>
    const username = ref('jens')
    const password = ref('jens!2#')
    const command = ref('')
    let responseStdout = ref(null)
    let responseStderr = ref(null)

    async function login() {
        const response = await $fetch('/SSH', {
            method: 'POST',
            baseURL: 'http://localhost:3300',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                SSH_user: this.username,
                SSH_password: this.password,
                SSH_host: "172.30.10.51",
                command: this.command
            })
        })
        
        if (response.code !== undefined)
            console.log(response)

        responseStdout.value = response.stdout
        // responseStderr.value = response.stderr
    }
</script>