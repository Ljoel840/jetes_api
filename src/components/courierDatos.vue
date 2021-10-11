<template>
  <div class="row">
    <!-- <span class="text-h5 q-px-md q-py-xl text-weight-bolder col-12 ">Couriers</span> -->
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-select v-model="courier" :options="couriersList" label="Couriers" @blur="actualizarCourier()"  @change="actualizarCourier()"/>
        </div>
    </div>

    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-select v-model="estado" :options="estadosList" label="Estado" @blur="actualizarEstado()"  @change="actualizarEstado()"/>
        </div>
    </div>

    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-select v-model="ciudad" :options="ciudadesList" label="Ciudad" @blur="actualizarCiudad()"  />
        </div>
    </div>

    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-select v-model="municipio" :options="municipiosList" label="Municipio" @blur="actualizarMunicipio()" />
        </div>
    </div>
    
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-select v-model="parroquia" :options="parroquiasList" label="Parroquia" @blur="actualizarParroquia()" />
        </div>
    </div>

    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-select v-model="oficina" :options="oficinasList" label="oficina"  />
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="destinatario" label="Destinatario" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="contacto" label="Contacto" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="cirif" label="CI/RIF" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="telefono" type="tel" label="Telefono" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="direccion" label="Dirección" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="inmueble" label="Inmueble" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="descripcionPaquete" label="Descripción Paquete" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="referencia" label="Referencia" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="numeroPiezas" type="number" label="Número de Piezas" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="peso" type="number" label="Peso" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="tipoEnvio" label="Tipo de Envio" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="valor" type="number" label="Valor" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-input v-model="tipoServicio" label="Tipo de Servicio" /> 
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-toggle v-model="retirarOficina" label="Retirar en la Oficina" />
        </div>
    </div>
    <div class="q-pa-md" style="min-width: 300px">
        <div class="q-gutter-md">
            <q-toggle v-model="seguro" label="Seguro" />
        </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name:'couriers',
  components:{
  },
  data() {
    return {
      loading: true,
      courier: '',
      estado: '',
      ciudad: '',
      municipio: '',
      parroquia:'',
      oficina:'',
      destinatario:'',
      contacto:'',
      cirif:'',
      telefono:'',
      direccion:'',
      inmueble:'',
      descripcionPaquete:'',
      referencia:'',
      numeroPiezas:0,
      peso:0,
      tipoEnvio: '',
      valor:0,
      tipoServicio: '',
      retirarOficina: true,
      seguro: true

    }
  },
  computed: {
      couriersList(){
          return this.$store.state.data.couriersList
      },
      courierSelected(){
          return this.$store.state.data.datosSelected
      },
      estadosList(){
          return this.$store.state.data.estadosList
      },
      ciudadesList(){
          return this.$store.state.data.ciudadesList
      },
      municipiosList(){
          return this.$store.state.data.municipiosList
      },
      parroquiasList(){
          return this.$store.state.data.parroquiasList
      },
      oficinasList(){
          return this.$store.state.data.oficinasList
      },
      
  },
  mounted() {
      this.getCouriers()
  },

  methods: {
      async getCouriers(){
      try{
        this.loading = true
        await this.$store.dispatch('data/loadCouriers')
        this.loading = false
      }catch (error) {
        console.error(error);
      }
    },
    actualizarCourier(){
      this.$store.commit('data/updateCourier',this.courier)
      this.estado=null
      this.$store.dispatch('data/loadEstados',this.courier)
    },
    actualizarEstado(){
      this.$store.commit('data/updateEstado',this.estado)
      this.ciudad=null
      this.$store.dispatch('data/loadCiudades',this.estado)
    },
    actualizarCiudad(){
      this.$store.commit('data/updateCiudad',this.ciudad)
      this.municipio=null
      this.$store.dispatch('data/loadMunicipios',this.ciudad)
    },
    actualizarMunicipio(){
      this.$store.commit('data/updateMunicipio',this.municipio)
      this.parroquia=null
      this.$store.dispatch('data/loadParroquias',{ciudad:this.ciudad,municipio:this.municipio})
    },
    actualizarParroquia(){
      this.$store.commit('data/updateParroquia',this.parroquia)
      this.oficina=null
      this.$store.dispatch('data/loadOficinas',this.ciudad)
    }
  },
})
</script>