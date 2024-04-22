<template>
    <div>
        <h1>SSH portal</h1>
        <form class="flex gap-1 flex-col max-w-[200px]" @submit.prevent="login()">
            <input type="text" placeholder="Username" v-model="username" class="border">
            <input type="password" placeholder="Password" v-model="password" class="border">
            <input type="text" placeholder="Command" v-model="command" class="border">
            <button class="bg-sky-300">Run command</button>
            <!-- <div v-if="responseStdout !== null">
                Output: {{ responseStdout }}
            </div> -->
            <!-- <div v-if="responseStderr !== null" class="text-red-500">
                Output: {{ responseStderr }}
            </div> -->
        </form>
    </div>
    <div class="bg-black max-w-5xl mx-auto text-white/80 py-4 px-5 rounded-lg overflow-y-auto">
        <div ref="output" class="h-[400px]" id="myoutput">
        </div>
    </div>
</template>

<style>
  .red {  /* TODO shouldnt be global */
    color: red;
  }
</style>

<script setup>
    const output = ref(null)
    const username = ref('jens')
    const password = ref('jens')
    const command = ref('')
    let SSHRet = []
    let outputError = []
    var hist_len = 0
    let path = false

    onMounted(()=>{
        output.value.scrollTo(0, output.value.scrollHeight);
    })

    async function login() {
        const response = await $fetch('/SSH', {
            method: 'POST',
            baseURL: 'http://localhost:3300',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                SSHUser: this.username,
                SSHPassword: this.password,
                SSHHost: "145.89.192.64",
                pathCall: !path,
                command: this.command
            })
        })

        if (response.code !== undefined) {
            console.log(response)
            path = true
        }

        if (response.stdout !== undefined) {
            SSHRet[hist_len] = response.stdout
            outputError[hist_len] = false
        }

        if (response.stderr !== undefined) {
            SSHRet[hist_len] = response.stderr
            outputError[hist_len] = true
        }

        var outputDiv = document.getElementById("myoutput");  // Get the div where we want to display the array

        var ul = document.createElement("ul");  // Create a new unordered list element

        // Loop through the array and create list items for each element
        SSHRet.forEach(function(item, index) {
            var li = document.createElement("li");
            li.textContent = item;
            if (outputError[hist_len])  // Return has an error, display in red
                li.classList.add("red");

            ul.appendChild(li);
        });

        outputDiv.appendChild(ul);  // Append the unordered list to the output div
        // outputDiv.scrollTo(0, outputDiv.scrollHeight);
    }
</script>