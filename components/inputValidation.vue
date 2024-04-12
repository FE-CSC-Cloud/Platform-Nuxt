<template>
    <div class="relative mb-3" :class="!checkValid() && 'error-input'">
        <slot />
        <div class="text-sm text-red-300 font-medium" v-if="!checkValid()">
            {{ message }}
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['format', 'message', 'value']);

    const { format } = toRefs(props);

    function checkValid(){
        if (!props.format || !props.value || (props.value.length < 4)) {
            return true;
        }

        const regex = new RegExp('^(?=.*\\d).{8,}$');
        console.log(regex.test(props.value))
        
        return regex.test(props.value);
    }
</script>
