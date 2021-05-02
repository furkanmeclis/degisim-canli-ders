<template>
  <div>
  <div v-show="loaded">
  <p class="text-center my-2">
    <router-link to="/"  class="rounded button">
      <i class="mif-home"></i>&nbsp; Anasayfa
    </router-link>
  </p>
    <div class="container">
      <h1 class="text-bold">{{veri.title}}</h1>
      <h4 class="text-normal">{{veri.teacher}}</h4>
      <p>
        Meeting ID : {{veri.meetingID}}<br>
        Meeting Password : {{veri.pass}}
      </p>
      <a class="rounded button success mb-2" :href="'https://wa.me/'+veri.phone"><i class="mif-whatsapp"></i>&nbsp; WhatsApp</a>
      <br>
      <a :href="veri.link" :class="'rounded button mt-2 '+getColor()">Derse Katıl &nbsp;<span class="mif-arrow-right"></span></a>
    </div>

  </div>
  <div  v-show="!loaded" style="padding-top: 30vh">

    <div class=" text-center" style="margin:auto;"> <span class="mif-spinner4 mif-10x ani-pulse"></span>
      <p >Yükleniyor...</p></div>

  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Ders",

  created(){
    this.getLesson()
  },

  data(){
    return{
      veri:null,
      buttonColors:["alert","yellow","success","primary","secondary","warning","info","dark"],
      loaded:false,
    }
  },
  methods:{
    getLesson(){
      axios.get('https://restdbio-6b52.restdb.io/rest/database/'+this.$route.params.id,{
        headers:{ 'cache-control': 'no-cache',
          'x-apikey': '608d105ef2fc22523a42c707' }
      }).then(res => {this.veri = res.data
      this.title()
        let v = this
        setTimeout(() => {
          v.loaded = true
        },300)
      })

    },
    title(){
      document.title = this.veri.title
    },
    getColor(){

      return this.buttonColors[Math.floor(Math.random() * this.buttonColors.length)]
    }
  }

}

</script>

