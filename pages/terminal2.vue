<template>
  <div class="container">
    <div class="square">
      <!-- You can adjust the size of the square using the width and height properties -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'CenteredBlackSquare',
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.square {
  width: 200px;  /* Adjust width as needed */
  height: 200px;  /* Adjust height as needed */
  background-color: black;
  border-radius: 10px;  /* Adjust the border-radius to round all edges */
}
</style>

