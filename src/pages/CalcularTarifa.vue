<template>
  <q-page class="column justify-start q-py-md">
    <div class="row justify-center q-my-xl">
      <div class=" column col-12" style="max-width: 80%; min-width: 50%">
        <h4>Calcular Tarifa</h4>
        <formulario tituloBoton="Calcular Tarifa" @aceptar="obtenerTarifa()"/>
        <span class="text-h6" v-if="tarifa.ok">Resultados</span>
        <div class="row" v-if="tarifa.ok">
            <div class="col-1 q-px-sm" >
                <q-input v-model="tarifa.data.combustible" hint="Combustible" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="tarifa.data.flete" hint="Flete" :dense="dense" disable />
            </div>
            <div class="col-2 q-px-sm" >
                <q-input v-model="tarifa.data.franqueo_postal" hint="Franqueo Postal" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="tarifa.data.iva" hint="Iva" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="tarifa.data.seguro" hint="Seguro" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="tarifa.data.subtotal" hint="SubTotal" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm">
                <q-input v-model="tarifa.data.total" hint="Total" :dense="dense" disable />
            </div>
        </div>
        <q-badge color="red" v-if="tarifa.error">
            {{tarifa.error}}
        </q-badge>

      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex'
import formulario from '../components/formulario.vue'
export default defineComponent({
  name: 'CalcularTarifa',
  components:{
    formulario
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
    obtenerFatura(){
      console.log('Tarifa')
    },
  },
})
</script>
