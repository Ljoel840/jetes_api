<template>
  <q-page class="column justify-start q-py-md">
    <div class="row justify-center q-my-xl">
      <div class=" column col-12" style="max-width: 80%; min-width: 50%">
        <h4>Tracking</h4>
        <trackingDatos/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import trackingDatos from '../components/trackingDatos.vue'
export default defineComponent({
  name: 'GenerarGuia',
  components:{
    trackingDatos
  }
})
</script>
