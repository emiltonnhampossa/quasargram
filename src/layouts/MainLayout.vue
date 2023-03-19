<template>
  <q-layout view="lHh Lpr lFf">
    <q-header 
    class="bg-white text-grey-10"
    bordered
    >
      <q-toolbar class="constrain">
       <q-btn
       to="/camera"
       class="large-screen-only"
       color="primary"
       icon="eva-camera-outline"
       size="18px"
       flat
       round
       dense
       />
       <q-separator 
       class="large-screen-only"
       vertical 
       spaced/>

        <q-toolbar-title
        class="text-grand-hotel text-bold">
          Quasargram
        </q-toolbar-title>
       <q-btn
       to="/"
       class="large-screen-only"
       color="primary"
       icon="eva-home-outline"
       size="18px"
       flat
       round
       dense/>
      </q-toolbar>
    </q-header>

    <q-footer
     class="bg-white small-screen-only"
     bordered
     >
        <q-tabs
         class="text-grey-10"
         active-color="primary"
         indicator-color="transparent"
         >
        <q-route-tab
        to="/"
        name="home"
        icon="eva-home-outline"
  
        />
        <q-route-tab
        to="/camera"
        name="camera" 
        icon="eva-camera-outline"
     
        />
      </q-tabs>

    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  
  data () {
    return {
      
    }
  }
}
</script>

<style lang="sass">
  .text-grand-hotel
    font-family: 'Grand Hotel', cursive

  .q-toolbar
    @media (min-width: $breakpoint-sm-min)
    height: 77px
  .q-toolbar__title
    font-size: 30px
    @media (max-width: $breakpoint-xs-max)
      text-align: center
  .q-footer
  .q-tab__icon
    font-size: 30px


    //app.sass
  .small-screen-only
    @media (max-width: $breakpoint-xs-max)
        display: block
    @media (min-width: $breakpoint-sm-min)
        display: none

  .large-screen-only
     @media (max-width: $breakpoint-xs-max)
        display: none
     @media (min-width: $breakpoint-sm-min)
        display: block

  .constrain
    max-width: 975px
    margin: 0 auto

    .constrain-more
    max-width: 600px
    margin: 0 auto

        
</style>
