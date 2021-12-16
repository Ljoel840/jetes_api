<template>
  <q-page class="column justify-start q-py-md">
    <div class="row justify-center q-my-xl">
      <div class=" column col-12" style="max-width: 80%; min-width: 50%">
        <h4>Calcular Tarifa</h4>
        <tarifaDatos/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex'
import tarifaDatos from '../components/tarifaDatos.vue'
export default defineComponent({
  name: 'CalcularTarifa',
  components:{
    tarifaDatos
  },
    data() {
    return {
      generandoTarifa: false,
      dense: false
    }
  },

  computed: {
      ...mapState('data', [
        'dataSelected',
        'tarifa',
      ])

      
  },
  methods:{
    obtenerTarifa(){
      console.log('Tarifa')
    },
  },
})
</script>
