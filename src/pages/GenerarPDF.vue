<template>
  <q-page class="column justify-start q-py-md">
    <div class="row justify-center q-my-xl">
      <div class=" column col-12" style="max-width: 80%; min-width: 50%">
        <h4>Generar PDF</h4>
        <pdfDatos/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import pdfDatos from '../components/pdfDatos.vue'

export default defineComponent({
  name: 'GenerarPDF',
  components:{
    pdfDatos
  }
})
</script>
