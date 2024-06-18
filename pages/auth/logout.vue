<script setup>
    const session = useCookie("session");
    session.value = null;
    navigateTo('/auth/login');
</script>