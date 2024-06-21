<template>
    <div ref="tooltipTarget" class="max-w-max" @mouseenter="handleMouse(true)" @mouseleave="handleMouse(false)">
        <slot />
    </div>

    <Teleport to="body">
        <div 
            :style="tooltipStyle"
            :class="tooltipClass"
            class="tooltip"
        >
            {{ tooltip }}
        </div>
    </Teleport>
</template>

<script setup>
    const props = defineProps({
        position: String,
        tooltip: String
    });
    const isOpen = ref(false);
    const tooltipTarget = ref(null);

    const tooltipStyle = reactive({
        top: '0px',
        left: '0px',
    });

    const updateTooltipPosition = () => {
        if (tooltipTarget.value) {
            const rect = tooltipTarget.value.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            tooltipStyle.top = `${props.position.includes('bottom') ? rect.bottom + 15 + scrollTop : rect.top - 45 + scrollTop}px`;
            tooltipStyle.left = `${props.position.includes('right') ? rect.right - 20 + scrollLeft : rect.left + scrollLeft}px`;
        }
    };

    const handleMouse = (status) => {
        isOpen.value = status;
        if (status) {
            updateTooltipPosition();
        }
    };

    const tooltipClass = computed(() => ({
        'opacity-100': isOpen.value,
        'opacity-0': !isOpen.value,
        'tooltip-bottom': props.position.includes('bottom')
    }));

    onMounted(() => {
        window.addEventListener('resize', updateTooltipPosition);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateTooltipPosition);
    });
</script>