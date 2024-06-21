<template>
    <h1 class="text-xl font-medium text-secondary-50 mt-8 mb-5">
        {{ $t(('login.title')) }}
    </h1>

    <div class="alert alert-danger alert-type-secondary mb-2" v-if="isError">
        <div class="alert-body">
            <Icon name="heroicons:exclamation-circle-16-solid" />
            {{ isError }}
        </div>
    </div>

    <form @submit.prevent="login()" class="flex flex-col gap-4">
        <InputWrapper
            :label="$t(('login.username'))"
            id="username"
        >
            <input
                v-model="username"
                autofocus
                required
                type="text"
                :placeholder="$t(('login.username'))"
                id="username"
            />
        </InputWrapper>
        <div>
            <div class="flex items-center justify-between">
                <label class="label" for="password">
                    {{ $t(('login.password')) }}
                </label>
                <NuxtLink href="/auth/forgot-password" class="label underline">
                    {{ $t(('login.forgot-password')) }}
                </NuxtLink>
            </div>
            <InputWrapper>
                <input
                    v-model="password"
                    required
                    type="password"
                    :placeholder="$t(('login.password'))"
                    id="password"
                />
            </InputWrapper>
        </div>
        <button class="button button-primary mt-4" :disabled="(!username || !password)">
            <div class="absolute" v-if="isLoading">
                <Icon name="svg-spinners:180-ring-with-bg" />
            </div>
            {{ $t(('login.login')) }}
        </button>
    </form>
</template>

<script setup>
    definePageMeta({
        middleware: ["auth-redirect"],
        layout: 'auth'
    })

    const isLoading = ref(false);
    const isError = ref(undefined);
    const username = ref('');
    const password = ref('');

    async function login() {
        const formData = new FormData();

        isLoading.value = true;
        formData.append('username', username.value);
        formData.append('password', password.value);
    
        try {
            const loginRes = await $fetch('/auth/login', {
                method: 'POST',
                baseURL: useRuntimeConfig().public.baseUrlApi,
                body: formData
            });
            
            const session = useCookie("session");
            session.value = loginRes.token;
            navigateTo('/');

        } catch (error) {
            if (error.response && error.response._data) {
                isError.value = error.response._data;
            } else {
                isError.value = 'Something went wrong, please try again'.
                console.error('Error during login:', error.message || 'Unknown error occurred');
            }
        } finally {
            isLoading.value = false;
        }
    }
</script>