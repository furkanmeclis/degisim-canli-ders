<template>
 <div>

   <transition name="page" mode="out-in">
     <router-view/>
   </transition>
 </div>
</template>
<script>
export default {
  beforeCreate() {
    document.title = "Anasayfa"
  }
}
</script>
<style>

.page-enter, .page-leave-active {
  opacity: 0;

  transform: scale(0);
}
.page-enter-active, .page-leave-active {
  transition: all 375ms;
}

</style>
