<template>
    <div>
        <div class="row">
            <q-form class="q-gutter-md formulario row">
                <div class="col-2">
                    <q-select v-model="courier" :options="couriersList" label="Couriers" @blur="actualizarCourier()"  @change="actualizarCourier()"/>
                </div>
                <div class="col-2">
                    <q-select v-model= "estado" :options="estadosList" label="Estado" @blur="actualizarEstado()"  @change="actualizarEstado()" :disabled="estadosList.length<0 ? true : false"/>
                </div>
                <div class="col-2">
                    <q-select v-model="ciudad" :options="ciudadesList" label="Ciudad" @blur="actualizarCiudad()" :disabled="ciudadesList.length<0 ? true : false"  />
                </div>
                <div class="col-2">
                    <q-select v-model="municipio" :options="municipiosList" label="Municipio" @blur="actualizarMunicipio()" :disabled="municipiosList.length<0 ? true : false"/>
                </div>
                <div class="col-2">
                    <q-select v-model="parroquia" :options="parroquiasList" label="Parroquia" @blur="actualizarParroquia()" :disabled="parroquiasList.length<0 ? true : false"/>
                </div>
                <div class="col-2">
                    <q-select v-model="oficina" :options="oficinasList" label="oficina" @blur="actualizarOficina()" :disabled="oficinasList.length<0 ? true : false"/>
                </div>
                <div class="col-12"></div>
                <div class="col-2">
                    <q-input v-model="destinatario" label="Destinatario" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="contacto" label="Contacto" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="cirif" label="CI/RIF" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="telefono" type="tel" label="Telefono" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="direccion" label="Dirección" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="inmueble" label="Inmueble" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="descripcionPaquete" label="Descripción Paquete" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="referencia" label="Referencia" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="numeroPiezas" type="number" label="Número de Piezas" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="peso" type="number" label="Peso" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="tipoEnvio" label="Tipo de Envio" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="valor" type="number" label="Valor" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="tipoServicio" label="Tipo de Servicio" /> 
                </div>
                <div class="col-2">
                    <q-toggle v-model="retirarOficina" label="Retirar en la Oficina" />
                </div>
                <div class="col-2">
                    <q-toggle v-model="seguro" label="Seguro" />
                </div>
            </q-form>
        </div>
        <br>
        <q-badge color="red" v-if="errorlist">
            {{errorList}}
        </q-badge> 
        <q-badge color="red" v-if="errorValidacion">
            {{mensajeError}}
        </q-badge> 
        <br>
        <div class="row">
            <q-btn :loading="generandoGuia" color="primary" @click="aceptarDatos()" style="width: 150px">
                {{tituloBoton}}
                <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Loading...
                </template>
            </q-btn>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import validarDatos from '../middleware/validateData'
import { mapState } from 'vuex'
export default defineComponent({
  name:'formulario',
  props:{
      tituloBoton:{
          value: String,
          default: 'Aceptar'
      }
  },
  data() {
    return {
      loading: true,
      generandoGuia: false,
      generandoTracking: false,
      generandoTarifa: false,
      generandoPdfGuia: false,
      courier: '',
      estado: '',
      ciudad: '',
      municipio: '',
      parroquia:'',
      oficina:'',
      destinatario:'Joel',
      contacto:'Joel',
      cirif:'11785840',
      telefono:'04145281112',
      direccion:'Calle 22',
      inmueble:'Casa',
      descripcionPaquete:'Caja',
      referencia:'1234',
      numeroPiezas:2,
      peso:2,
      tipoEnvio: 'M',
      valor:100,
      tipoServicio: 'cod',
      retirarOficina: true,
      seguro: true,
      errorValidacion: false,
      mensajeError: null,
      dense: false

    }
  },
  computed: {
      ...mapState('data', [
        'couriersList',
        'courierSelected',
        'estadosList',
        'ciudadesList',
        'municipiosList',
        'parroquiasList',
        'oficinasList',
        'errorList',
        'dataSelected',
      ])

      
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
    },
    actualizarOficina(){
      this.$store.commit('data/updateOficina',this.oficina)
      
    },
    generarGuia(){
        validarDatos(this)
        if (!this.errorValidacion){
            this.cargarDatos()
            this.$emit('aceptar',true)
        }
    },
    cargarDatos(){
        this.$store.commit('data/updateOtherData', {
            destinatario: this.destinatario,
            contacto: this.contacto,
            cirif: this.cirif,
            telefono: this.telefono,
            direccion: this.direccion,
            inmueble: this.inmueble,
            descripcionPaquete: this.descripcionPaquete,
            referencia: this.referencia,
            numeroPiezas: this.numeroPiezas,
            peso: this.peso,
            tipoEnvio: this.tipoEnvio,
            valor: this.valor,
            tipoServicio: this.tipoServicio,
            retirarOficina: this.retirarOficina,
            seguro: this.seguro
        })
    },
  },
})
</script>
<style scoped>
    .formulario>*{
        min-width: 300px ;
    }
</style>