<template>
  <q-page class="constrain-more q-pa-md">
    <div class="constrain camera-frame q-pa-md">
      <video
      v-show="!imageCaptured"
      ref="video"
      class="full-width"
      autoplay
  >
    </video>
    <canvas
    v-show="imageCaptured"
      ref="canvas"
      class="full-width"
      height="240">
    </canvas>
      

    
    </div>
    <div class="text-center q-pa-md">
      <q-btn
      v-if="hasCameraSuport"
      @click="captureImage"
      round
      color="grey-10"
      icon="eva-camera" 
      size="lg"
      />
      <q-file 
      v-else
      outlined 
      v-model="imageUpload"
      @input="captureImageFallback"
      label="choose an image"
      accept="image/*"
      >
      
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
      <div class="row justify-center q-ma-md">
        <q-input
         v-model="post.caption" 
         class="col col-sm-6"
         label="Caption"
         dense />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
        :loading="locationLoading"
         v-model="post.location" 
         class="col col-sm-6"
         label="Location"
         dense >

         <template v-slot:append>
          <q-btn 
          v-if="!locationLoading"
          @click="getLocation"
          round
          dense
          flat 
          icon="eva-navigation-2-outline" />
        </template>
         </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn 
        unelevated 
        rounded 
        color="primary" 
        label="Post Image"
         />
      </div>
      
    </div>
    
  </q-page>
</template>

<script>
import{ uid } from 'quasar'

export default {
  name: 'PageCamera',
  data(){
    return{
      post:{
        id:uid(),
        caption:'',
        location:'',
        photo:null,
        date:Date.now()  
      },
      imageCaptured:false,
      imageUpload:[],
      hasCameraSuport:true,
      locationLoading:false
    }
  },
  computed:{
    locationSupported(){
      if('geolocatio'in navigator)return true
      return false
    }
  },
  methods:{
    initCamera(){
      navigator.mediaDevices.getUserMedia({
        video:true
      }).then(stream=>{
        this.$refs.video.srcObject=stream
      }).catch(error=>{
        this.hasCameraSuport=false
      })
    },
 
  captureImage(){
    let video = this.$refs.video
    let canvas = this.$refs.canvas
    canvas.width=video.getBoundingClientRect().width
    canvas.width=video.getBoundingClientRect().height
    let context = canvas.getContext('2d')
    context.drawImage(video,0, 0,canvas.width,canvas.height)
    this.imageCaptured=true
    this.post.photo=this.dataURLtoBlobcanvas.toDataURL()
    this.disableCamera()
  },
  captureImageFallback(file){
    this.post.photo=file

    let canvas = this.$refs.canvas
    let context = canvas.getContext('2d')

    var reader = new FileReader();
    reader.onload = event=>{
        var img = new Image()
        img.onload = ()=>{
            canvas.width = img.width
            canvas.height = img.height
            context.drawImage(img,0,0)
            this.imageCaptured=true
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(file)
  },
  disableCamera(){
    this.$refs.video.srcObject.getVideoTracks().forEach(track=>{
      track.stop()
    })
  },
   dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});


},
getLocation(){
  
  navigator.geolocation.getCurrentPosition(position=>{
    this.getCityAndCountry(position)
  },err =>{
    this.locationError()
  },{timeout:7000})
},
  getCityAndCountry(position){
    let apiUrl=`https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
    this.$axios.get(apiUrl).then(result =>{
      this.locationSuccess(result)
    }).catch(err=>{
    this.locationError()
    })
  },
  locationSuccess(result){
    this.post.location=result.data.city
    if(result.data.country){
      this.posts.location +=`,${result.data.country}`
    }
    this.locationLoading=false
  },
  locationError(){
    this.$q.dialog({
        title: 'Error',
        message: 'Could not find your locaion'
      })
      this.locationLoading=false
  }
},
  mounted(){
    this.initCamera()
  
  },
  beforeDestroy(){
    if(this.hasCameraSuport){
      this.disableCamera()
    }
  }
}
</script>
<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
 