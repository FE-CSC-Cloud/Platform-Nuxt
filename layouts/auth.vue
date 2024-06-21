<template>
    <div class="grid lg:grid-cols-2 gap-5 items-center min-h-screen">
        <div class="w-full max-w-sm mx-auto">
            <div class="flex items-center gap-x-1 text-xl font-medium text-secondary-50">
                <img src="/OICT.svg" width="25px" height="25px" alt="Logo" />
                {{ useRuntimeConfig().public.appName }}
            </div>
            <slot />
            <Copyright />
        </div>
        <div class="w-full h-full p-5 md:block hidden">
            <div class="bg-[url(/LoginBanner.png)] bg-center bg-cover w-full h-full rounded-xl" />
        </div>
    </div>
</template>