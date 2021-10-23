<template>
  <div class="container text-center">
    <img class="img" src="../assets/404.svg" alt="Error 404" />
    <p class="lead text-center">
      Sorry, the page you are trying to reach does not exist
    </p>
    <router-link to="/" class="btn btn-secondary">Go To Home?</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.img {
  max-width: 450px;
  width: 100%;
}
</style>