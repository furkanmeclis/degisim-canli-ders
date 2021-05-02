<template>
  <div class="container">

      <div v-show="loaded">

        <h2 class="mt-2">Dersler <router-link to="/dersler" class="float-right rounded button yellow"><i class="mif-news"></i>&nbsp;Ders Listesi</router-link>
        </h2>
        <HelloWorld v-for="ver in veri" :id="ver._id" :color="getColor()"  :key="ver.link"  :baslik="ver.title"  :link="ver.link" :hoca="ver.teacher" />

      </div>
    <div  v-show="!loaded" style="padding-top: 30vh">

        <div class=" text-center" style="margin:auto;"> <span class="mif-spinner4 mif-10x ani-pulse"></span>
          <p >Yükleniyor...</p></div>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/LessonCard.vue'
import axios from 'axios'
export default {
  name: 'Home',
created(){
  this.getLesson()
},
  components: {
    HelloWorld
  },
  data(){
    return{
      veri:null,
      loaded:false,
      colors:["green","red","cyan","darkCyan","darkTeal"],

    }
  },
  methods:{
    getLesson(){
      axios.get('https://restdbio-6b52.restdb.io/rest/database',{
        headers:{ 'cache-control': 'no-cache',
          'x-apikey':'608d105ef2fc22523a42c707' }
      }).then(res => {
        this.veri = res.data
        let v = this
        setTimeout(function (){
          v.loaded = true
        },200)
      })

    },
    getColor(){

      return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
  }

}
</script>
