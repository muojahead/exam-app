<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap");
* {
  font-family: "Nunito", sans-serif;
}

/* #region of Vue Transition Component Part */
.slide-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.slide-enter-active {
  transition: all 0.8s ease-out;
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.slide-leave-active {
  transition: all 0.2s ease-out;
}
/* Fade Effect */
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.8s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all 0.2s ease-out;
}
/* #endregion of Vue Transition Component Part */
</style>
