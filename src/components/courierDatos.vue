<template>
    <div>

        <div class="row">
            <q-form class="q-gutter-md formulario row">
                <div class="col-2">
                    <q-select v-model="courier" :options="couriersList" label="Couriers" @blur="actualizarCourier()"  @change="actualizarCourier()"/>
                </div>
                <div class="col-2">
                    <q-select v-model= "estado" :options="estadosList" label="Estado" @blur="actualizarEstado()"  @change="actualizarEstado()"/>
                </div>
                <div class="col-2">
                    <q-select v-model="ciudad" :options="ciudadesList" label="Ciudad" @blur="actualizarCiudad()"  />
                </div>
                <div class="col-2">
                    <q-select v-model="municipio" :options="municipiosList" label="Municipio" @blur="actualizarMunicipio()" />
                </div>
                <div class="col-2">
                    <q-select v-model="parroquia" :options="parroquiasList" label="Parroquia" @blur="actualizarParroquia()" />
                </div>
                <div class="col-2">
                    <q-select v-model="oficina" :options="oficinasList" label="oficina" @blur="actualizarOficina()" />
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
        <q-badge color="red" v-if="errorValidacion">
            {{mensajeError}}
        </q-badge> 
        <br>
        <div class="row">
            <q-btn :loading="generandoGuia" color="primary" @click="crearGuia()" style="width: 150px">
            Crear Guía
            <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Loading...
            </template>
            </q-btn>
        </div>
        <br>
        <div class="row">
            <div class="col-2 q-px-sm">
                <q-input v-model="guide.guia" hint="Guia" :dense="dense" disable />
            </div>
            <div class="col-2 q-px-sm">
                <q-input v-model="guide.referencia" hint="Referencia" :dense="dense" disable />
            </div>
        </div>
        <br>
        <span class="text-h6" v-if="dataSelected.tarifa.total">Tarifa Aproximada</span>
        <div class="row" v-if="dataSelected.tarifa.total">
            <div class="col-1 q-px-sm" >
                <q-input v-model="dataSelected.tarifa.combustible" hint="Combustible" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="dataSelected.tarifa.flete" hint="Flete" :dense="dense" disable />
            </div>
            <div class="col-2 q-px-sm" >
                <q-input v-model="dataSelected.tarifa.franqueo_postal" hint="Franqueo Postal" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="dataSelected.tarifa.iva" hint="Iva" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="dataSelected.tarifa.seguro" hint="Seguro" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="dataSelected.tarifa.subtotal" hint="SubTotal" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm">
                <q-input v-model="dataSelected.tarifa.total" hint="Total" :dense="dense" disable />
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import validarDatos from '../middleware/validateData'
import { mapState } from 'vuex'
export default defineComponent({
  name:'couriers',
  components:{
  },
  data() {
    return {
      loading: true,
      generandoGuia: false,
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
        'dataSelected',
        'errorGuide',
        'guide',
        'errorTarifa'
        
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
    crearGuia(){
        
        validarDatos(this)
        if (!this.errorValidacion){
            this.cargarDatos()
            this.solicitarGuia()
            this.calcularTarifa()
        }
        
    },
    async solicitarGuia(){
        try {
            this.generandoGuia=true
            await this.$store.dispatch('data/generateGuide',
                {
                    courier: this.dataSelected.courier.value,
                    estado: this.dataSelected.estado.value,
                    ciudad: this.dataSelected.ciudad.value,
                    municipio: this.dataSelected.municipio.value,
                    parroquia: this.dataSelected.parroquia.value,
                    destinatario: this.dataSelected.destinatario,
                    contacto: this.dataSelected.contacto,
                    cirif: this.dataSelected.cirif,
                    telefono: this.dataSelected.telefono,
                    direccion: this.dataSelected.direccion,
                    inmueble: this.dataSelected.inmueble,
                    descripcionPaquete: this.dataSelected.descripcionPaquete,
                    referencia: this.dataSelected.referencia,
                    numeroPiezas: this.dataSelected.numeroPiezas,
                    peso: this.dataSelected.peso,
                    tipoEnvio: this.dataSelected.tipoEnvio,
                    valor: this.dataSelected.valor,
                    tipoServicio: this.dataSelected.tipoServicio,
                    retirarOficina: this.dataSelected.retirarOficina,
                    oficina: this.dataSelected.oficina.value,
                    seguro: this.dataSelected.seguro
            })
            this.generandoGuia=false
        } catch (error) {
            console.error(error)
        }
    },
    cargarDatos(){
        this.$store.commit('data/updateOtherData',
            {
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
    async calcularTarifa(){
        let seguro = this.dataSelected.seguro ? 1:0
        let modalidad = this.dataSelected.retirarOficina ? 'oficina': 'puerta'
        console.log('paso',this.dataSelected.courier.value,this.dataSelected.ciudad.value,this.dataSelected.numeroPiezas,this.dataSelected.peso,seguro,this.dataSelected.valor,this.dataSelected.tipoServicio,modalidad,this.dataSelected.oficina.value)
        try {
            await this.$store.dispatch('data/getTarifa',{
                courier: this.dataSelected.courier.value,
                ciudad: this.dataSelected.ciudad.value,
                cantidadPiezas: this.dataSelected.numeroPiezas,
                peso: this.dataSelected.peso,
                seguro: seguro,
                valor: this.dataSelected.valor,
                tipoTarifa:this.dataSelected.tipoServicio,
                modalidadTarifa: modalidad,
                oficina: this.dataSelected.oficina.value
            })
            console.log(this.dataSelected.tarifa)
            console.log(this.errorTarifa)
        } catch (error) {
            
        }
    }

  },
})
</script>
<style scoped>
    .formulario>*{
        min-width: 300px ;
    }
</style>