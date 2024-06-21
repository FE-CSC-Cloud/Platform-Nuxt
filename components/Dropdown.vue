<template>
    <div ref="dropdownTarget" class="max-w-max cursor-pointer" @click="handleMouse(!isOpen)">
        <slot name="button"></slot>
    </div>

    <Teleport to="body">
        <div
            :style="dropdownStyle"
            :class="dropdownClass"
            class="dropdown"
        >
            <slot name="dropdown"></slot>
        </div>
    </Teleport>
</template>

<script setup>
    const isOpen = ref(false);
    const dropdownTarget = ref(null);

    const dropdownStyle = reactive({
        top: '0px',
        left: '0px',
    });

    const updateDropdownPosition = () => {
        if (dropdownTarget.value) {
            const rect = dropdownTarget.value.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            dropdownStyle.top = `${rect.bottom + 5 + scrollTop}px`;
            dropdownStyle.left = `${rect.left + scrollLeft - 7}px`;
        }
    };

    const handleMouse = (status) => {
        isOpen.value = status;
        if (status) {
            updateDropdownPosition();
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownTarget.value && !dropdownTarget.value.contains(event.target)) {
            isOpen.value = false;
        }
    };

    const dropdownClass = computed(() => ({
        'opacity-100': isOpen.value,
        'opacity-0': !isOpen.value
    }));

    onMounted(() => {
        window.addEventListener('resize', updateDropdownPosition);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateDropdownPosition);
        document.removeEventListener('click', handleClickOutside); 
    });
</script>