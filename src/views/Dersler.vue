<template>
<div class="container" >
  <div v-show="loaded">
  <p class="text-center my-2">
    <router-link to="/"  class="rounded button">
      <i class="mif-home"></i>&nbsp; Anasayfa
    </router-link>&nbsp;<button @click="addDers" class="rounded button yellow"><i class="mif-add"></i>&nbsp; Ders EKle</button>
  </p>
<div style="overflow: auto">
  <table class="table cell-hover striped">
    <thead>
    <tr>

      <th>Ders Adı</th>
      <th>Öğretmen</th>

      <th>Telefon No</th>
      <th>İşlemler</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="ders in dersler" :key="ders.id">

      <td>{{ders.title}}</td>
      <td>{{ders.teacher}}</td>

      <td>{{ders.phone}}</td>
      <td>
          <a class="action-button second success" @click="updateDers(ders)"><i class="mif-pencil"></i></a>&nbsp;
          <a class="action-button second alert" @click="deleteDers(ders)"><i class="mif-cross"></i></a>
      </td>
    </tr>

    </tbody>
  </table> 

</div>
    <div class="dialog rounded" data-role="dialog" id="demoDialog1">
      <form @submit.prevent="updatedDers()">
    <div class="dialog-title">{{datas.title}} Dersini Düzenliyorsunuz</div>
    <div class="dialog-content">
       <label>Ders Adı</label>
        <input type="text" v-model="datas.title" data-role="input">
        <label>Öğretmen Adı</label>
        <input type="text" v-model="datas.teacher" data-role="input">
        <label>Canlı Ders Linki</label>
        <input type="text" v-model="datas.link" data-role="input">
        <label>Meeting ID</label>
        <input type="text" v-model="datas.meetingID" data-role="input">
        <label>Meeting Password</label>
        <input type="text" v-model="datas.pass" data-role="input">
        <label>Öğretmen Telefon No</label>
        <input type="text" v-model="datas.phone" data-role="input">

    </div>
    <div class="dialog-actions">
      <button type="button" class="button js-dialog-close">Vazgeç</button>
      <button type="submit" :disabled="loading == true" class="button success rounded"><span v-if="loading" class="mif-spinner5 ani-pulse"></span><span v-else>Düzenle</span> </button>

    </div></form>
  </div>

  <div class="dialog rounded" data-role="dialog" id="demoDialog2">
    <form @submit.prevent="ekleDers()">
      <div class="dialog-title">Yeni Bir Ders Ekleyin</div>
      <div class="dialog-content">
        <label>Ders Adı</label>
        <input type="text" v-model="datas.title" data-role="input">
        <label>Öğretmen Adı</label>
        <input type="text" v-model="datas.teacher" data-role="input">
        <label>Canlı Ders Linki</label>
        <input type="text" v-model="datas.link" data-role="input">
        <label>Meeting ID</label>
        <input type="text" v-model="datas.meetingID" data-role="input">
        <label>Meeting Password</label>
        <input type="text" v-model="datas.pass" data-role="input">
        <label>Öğretmen Telefon No</label>
        <input type="text" v-model="datas.phone" data-role="input">

      </div>
      <div class="dialog-actions">
        <button type="button" class="button js-dialog-close">Vazgeç</button>
        <button type="submit" :disabled="loading == true" class="button success rounded"><span v-if="loading" class="mif-spinner5 ani-pulse"></span><span v-else>Ekle</span> </button>

      </div></form>
  </div>
  <div class="dialog rounded" data-role="dialog" id="demoDialog3">
    <div class="dialog-title">{{deleted.name}} Adlı Dersi Silmek İstediğinize Eminmisiniz ?</div>
    <div class="dialog-content">
      İşlemi Onayladığınızda Kalıcı Olarak Silinecektir
    </div>
    <div class="dialog-actions">
      <button class="button js-dialog-close rounded">Vazgeç</button>
      <button class="button alert rounded" :disabled="loading == true" @click="silDers()"><span v-if="loading" class="mif-spinner5 ani-pulse"></span><span v-else>Sil</span></button>
    </div>
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
  name: "Dersler",
  created(){
    this.getDersler(true)
  },
  data(){
    return{
      dersler:null,
      deleted:{
        name:null,
        id:null
      },
      loading:false,
      datas:{
        _id:null,
        phone: null,
        meetingID: null,
        pass: null,
        name: null,
        teacher:null,
        link: null,
        title: null

      },
      error:null,
      loaded:false
    }
  },
  methods:{
    getDersler(e){
      axios.get('https://restdbio-6b52.restdb.io/rest/database',{
        headers:{ 'cache-control': 'no-cache',
          'x-apikey':'608d105ef2fc22523a42c707' }
      }).then(res => {this.dersler = res.data
       if (e){

         let v = this
         setTimeout(function (){
           v.loaded = true
         },200)
       }
      })
    },
    deleteDers(ders){
      Metro.dialog.open('#demoDialog3')

      this.deleted.name=ders.title
      this.deleted.id=ders._id

    },
    silDers(){
      this.loading = true
      axios.delete('https://restdbio-6b52.restdb.io/rest/database/'+this.deleted.id,{

        headers:{ 'cache-control': 'no-cache',
          'x-apikey':'608d105ef2fc22523a42c707' }
      }).then(res => {
        this.loading = false
        if(res.status == 200){
          this.getDersler()
          Metro.toast.create("İşlem Başarılı "+this.deleted.name+" Dersi Silindi", null, null, "success");

          Metro.dialog.close('#demoDialog3')
        }else{
          Metro.toast.create("İşlem Başarısız "+this.deleted.name+" Dersi Silinemedi", null, null, "alert");
        }
      })
    },
    updateDers(ders){

      this.datas = ders;
      Metro.dialog.open('#demoDialog1')
    },
    updatedDers(){
      let data = this.datas
      this.loading = true
    if (data.link == "" || data.meetingID == "" || data.pass == "" || data.phone == "" || data.title == "" || data.teacher == ""){
      this.loading = false
      Metro.toast.create("Lütfen Gerekli Alanları Doldurun", null, null, "alert")
    }else{
      axios.put("https://restdbio-6b52.restdb.io/rest/database/"+this.datas._id,{
        phone:this.datas.phone,
        meetingID:this.datas.meetingID,
        pass:this.datas.pass,
        teacher:this.datas.teacher,
        link:this.datas.link,
        title:this.datas.title
      },{
        headers:{ 'cache-control': 'no-cache',
          'x-apikey': '608d105ef2fc22523a42c707',
          "content-type": "application/json"}
      }).then(res => {
        this.loading = false

        if (res.status == 200){
          Metro.dialog.close('#demoDialog1')
          Metro.toast.create("Güncelleme İşlemi Başarılı", null, null, "success")
          this.datas = {
            _id:null,
            phone: null,
            meetingID: null,
            pass: null,
            name: null,
            teacher:null,
            link: null,
            title: null

          }

        }else{
          Metro.toast.create("Güncelleme İşlemi Başarısız", null, null, "alert")

        }
      }).catch(e => console.log(e));

    }

    },
    addDers(){
      Metro.dialog.open('#demoDialog2')
    },
    ekleDers(){
      let data = this.datas
      this.loading = true

      if (data.link == "" || data.meetingID == "" || data.pass == "" || data.phone == "" || data.title == "" || data.teacher == "" || data.link == null || data.meetingID == null || data.pass == null || data.phone == null || data.title == null || data.teacher == null){
        this.loading = false
        Metro.toast.create("Lütfen Gerekli Alanları Doldurun", null, null, "alert")
      }else{
        axios.post("https://restdbio-6b52.restdb.io/rest/database",{
          phone:this.datas.phone,
          meetingID:this.datas.meetingID,
          pass:this.datas.pass,
          teacher:this.datas.teacher,
          link:this.datas.link,
          title:this.datas.title
        },{
          headers:{ 'cache-control': 'no-cache',
            'x-apikey': '608d105ef2fc22523a42c707',
            "content-type": "application/json"}
        }).then(res => {
          this.loading = false
          if (res.status == 201){
            this.getDersler()

            Metro.toast.create("Ekleme İşlemi Başarılı", null, null, "success")
            this.datas = {
              _id:null,
              phone: null,
              meetingID: null,
              pass: null,
              name: null,
              teacher:null,
              link: null,
              title: null

            }
            Metro.dialog.close('#demoDialog2')
          }else{
            Metro.toast.create("Ekleme İşlemi Başarısız", null, null, "alert")

          }
        })
      }
    }
  }
}
</script>

