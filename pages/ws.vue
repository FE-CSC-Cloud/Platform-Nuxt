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
                // SSHUser: "jens",
                // SSHPassword: "jens",
                // SSHHost: "145.89.192.64",
                // pathCall: false,
                // command: "uptime"
            };
        },
        mounted() {
            this.ws = new WebSocket('ws://localhost:3300');
        
            this.ws.onopen = () => {
                this.connected = true;
            };
        
            this.ws.onmessage = (event) => {
                this.messages.push(event.data);
            };
        
            this.ws.onclose = () => {
                this.connected = false;
            };
        },
        beforeDestroy() {
            if (this.ws) {
                this.ws.close();
            }
        },
    };

  </script>

  <style scoped>
  /* Add your styles here */
  </style>
