<template>
 <div>

   <router-view/>
 </div>
</template>
<script>
export default {
  beforeCreate() {
    document.title = "Anasayfa"
  }
}
</script>