<template>

    <div class="more-info-box fg-white my-3 rounded" :class="'bg-'+color">
      <div class="content">
        <h2 class="text-bold mb-0">{{baslik}}</h2>
        <div><i class="mif-user"></i> {{hoca}}</div>
      </div>

      <router-link :to="'/ders/'+ id" class="more"> Derse Git <span class="mif-arrow-right"></span></router-link>
    </div>

</template>
<script>
export default {
props:["baslik","link","hoca","id","color","button"],

}
</script>