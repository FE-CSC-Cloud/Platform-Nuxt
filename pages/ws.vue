<template>
    <div>
        <h1>WebSocket Client</h1>
        <div v-if="connected">Connected to WebSocket server</div>
        <div v-else>Connecting...</div>
        <ul>
            <li v-for="(message, index) in messages" :key="index">
                {{ message }}
            </li>
        </ul>
    </div>
</template>

<style>
  .red {  /* TODO shouldnt be global */
    color: red;
  }
</style>

<script>
    export default {
        data() {
            return {
                ws: null,
                connected: false,
                messages: [],
            };
        },
        mounted() {
            this.ws = new WebSocket('ws://localhost:3300');

            this.ws.onopen = () => {
                this.connected = true;
                this.sendMessage({
                    reqType: "login",  /* [default, login, logout] */
                    SSHUser: "jens",
                    SSHPassword: "jens",
                    SSHHost: "145.89.192.64",  /* Server IP */
                    command: "nano filename.txt"
            });  // Send message upon connection
            };

            this.ws.onmessage = (event) => {
                console.log(JSON.parse(event.data))
                this.messages.push(event.data);
            };

            this.ws.onclose = () => {
                // this.sendMessage({
                //     reqType: "logout"
                // });  // Send message upon connection
                this.connected = false;
            };
        },
        beforeDestroy() {
            if (this.ws) {
                this.ws.close();
            }
        },
        methods: {
            sendMessage(message) {
                if (this.ws && this.connected) {
                    console.log(message)  /* Show the API call its making */
                    this.ws.send(JSON.stringify(message));
                }
            }
        }
    };

  </script>

  <style scoped>
  /* Add your styles here */
  </style>
