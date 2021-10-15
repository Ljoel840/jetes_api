<template>
    <div>
        <div class="row">
            <q-form class="q-gutter-md formulario row">
                <div class="col-2">
                    <q-select v-model="courier" :options="couriersList" label="Couriers" @blur="actualizarCourier()"  @change="actualizarCourier()"/>
                </div>
                <div class="col-2">
                    <q-select v-model= "estado" :options="estadosList" label="Estado" @blur="actualizarEstado()"  @change="actualizarEstado()" :disable="estadosList.length<=0 ? true : false"/>
                </div>
                <div class="col-2">
                    <q-select v-model="ciudad" :options="ciudadesList" label="Ciudad" @blur="actualizarCiudad()" :disable="ciudadesList.length<=0 ? true : false"  />
                </div>
                <div class="col-2">
                    <q-select v-model="municipio" :options="municipiosList" label="Municipio" @blur="actualizarMunicipio()" :disable="municipiosList.length<=0 ? true : false"/>
                </div>
                <div class="col-2">
                    <q-select v-model="parroquia" :options="parroquiasList" label="Parroquia" @blur="actualizarParroquia()" :disable="parroquiasList.length<=0 ? true : false"/>
                </div>
                <div class="col-2">
                    <q-select v-model="oficina" :options="oficinasList" label="oficina" @blur="actualizarOficina()" :disable="oficinasList.length<=0 ? true : false"/>
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
        <q-badge color="red" v-if="errorList">
            {{errorList}}
        </q-badge> 
        <q-badge color="red" v-if="errorValidacion">
            {{mensajeError}}
        </q-badge> 
        <br>
        <div class="row">
            <q-btn :loading="generandoGuia" color="primary" @click="generarGuia()" style="width: 150px" class="q-ma-sm">
                Crear Guía
                <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Loading...
                </template>
            </q-btn>
            <q-btn :loading="generandoTracking" color="primary" @click="generarTracking()" style="width: 150px" class="q-ma-sm">
                Tracking
                <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Loading...
                </template>
            </q-btn>
            <q-btn :loading="generandoTarifa" color="primary" @click="generarTarifa()" style="width: 150px" class="q-ma-sm">
                Tarifa
                <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Loading...
                </template>
            </q-btn>
            <q-btn :loading="generandoPdfGuia" color="primary" @click="generarPdfGuia()" style="width: 150px" class="q-ma-sm">
                Generar PDF
                <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Loading...
                </template>
            </q-btn>
        </div>
        <br>
        <div class="row" v-if="guide.ok">
            <div class="col-2 q-px-sm">
                <q-input v-model="guide.data.guia" hint="Guia" :dense="dense" disable />
            </div>
            <div class="col-2 q-px-sm">
                <q-input v-model="guide.data.referencia" hint="Referencia" :dense="dense" disable />
            </div>
        </div>
        <q-badge color="red" v-if="guide.error">
            {{guide.error}}
        </q-badge>
        <br>
        <span class="text-h6" v-if="tarifa.ok">Tarifa Aproximada</span>
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
        <br>
        <span class="text-h6" v-if="tracking.ok">Tracking</span>
        <div class="row" v-if="tracking.ok">
            <div class="col-1 q-px-sm" >
                <q-input v-model="tracking.data.guia" hint="Guia" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="tracking.data.referencia" hint="Referencia" :dense="dense" disable />
            </div>
            <div class="col-2 q-px-sm" >
                <q-input v-model="tracking.data.codigo_cliente" hint="Código de Clinte" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="tracking.data.fecha" hint="Fecha" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="tracking.data.codigo_estatus" hint="Cod. Estatus" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm" >
                <q-input v-model="tracking.data.estatus" hint="Estatus" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm">
                <q-input v-model="tracking.data.descripcion_estatus" hint="Desc. Estatus" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm">
                <q-input v-model="tracking.data.receptor" hint="Receptor" :dense="dense" disable />
            </div>
            <div class="col-1 q-px-sm">
                <q-input v-model="tracking.data.hora" hint="Hora" :dense="dense" disable />
            </div>
        </div>
        <q-badge color="red" v-if="tracking.error">
            {{tracking.error}}
        </q-badge>
        <br>
        <span class="text-h6" v-if="pdfGuide.ok">Guía en Pdf</span>
        <div class="row" v-if="pdfGuide.ok">
            <!-- <a download="documento" :href="pdfGuide.data.encode" title="Mostrar Guía PDF" target="_blank" /> -->
            <object :data="`data:application/pdf;base64,${pdfGuide.data.value}`" type="application/pdf" width="100%" height="600px"></object>
        </div>
        <q-badge color="red" v-if="pdfGuide.error">
            {{pdfGuide.error}}
        </q-badge>

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
        'guide',
        'tarifa',
        'tracking',
        'pdfGuide'
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
      this.$store.commit('data/initEstados')
      this.$store.commit('data/initCiudades')
      this.$store.commit('data/initMunicipios')
      this.$store.commit('data/initParroquias')
      this.$store.commit('data/initOficinas')
      this.estado=null
      this.$store.dispatch('data/loadEstados',this.courier)
    },
    actualizarEstado(){
      this.$store.commit('data/updateEstado',this.estado)
      this.$store.commit('data/initCiudades')
      this.$store.commit('data/initMunicipios')
      this.$store.commit('data/initParroquias')
      this.$store.commit('data/initOficinas')
      this.ciudad=null
      this.$store.dispatch('data/loadCiudades',this.estado)
    },
    actualizarCiudad(){
      this.$store.commit('data/updateCiudad',this.ciudad)
      this.$store.commit('data/initMunicipios')
      this.$store.commit('data/initParroquias')
      this.$store.commit('data/initOficinas')
      this.municipio=null
      this.$store.dispatch('data/loadMunicipios',this.ciudad)
    },
    actualizarMunicipio(){
      this.$store.commit('data/updateMunicipio',this.municipio)
      this.$store.commit('data/initParroquias')
      this.$store.commit('data/initOficinas')
      this.parroquia=null
      this.$store.dispatch('data/loadParroquias',{ciudad:this.ciudad,municipio:this.municipio})
    },
    actualizarParroquia(){
      this.$store.commit('data/updateParroquia',this.parroquia)
      this.$store.commit('data/initOficinas')
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
            this.solicitarGuia()
        }
    },
    generarTarifa(){
        if (!this.guide.ok) {
            this.generarGuia()
        }
        this.calcularTarifa()
    },
    generarTracking(){
        if (!this.guide.ok) {
            this.generarGuia()
        }
        this.solicitartracking()
    },
    generarPdfGuia(){
        if (!this.guide.ok) {
            this.generarGuia()
        }
        this.solicitarPdfGuia()
    },
    cargarDatos(){
        this.$store.commit('data/updateOtherData',{
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

    async solicitarGuia(){
        try {
            this.generandoGuia=true
            await this.$store.dispatch('data/generateGuide',{
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
            
        } catch (error) {
            console.error(error)
        }finally{
            this.generandoGuia=false
        }
    },
    async solicitartracking(){
        try {
            this.generandoTracking=true
            await this.$store.dispatch('data/getTracking',{
                courier: this.dataSelected.courier.value,
                guia_id: this.guide.data._id,
                numero_guia: this.guide.data.guia,
            })
            console.log(this.tracking.data)
        } catch (error) {
            console.error(error)
        }finally{
            this.generandoTracking=false
        }
    },
    async calcularTarifa(){
        let seguro = this.dataSelected.seguro ? 1:0
        let modalidad = this.dataSelected.retirarOficina ? 'oficina': 'puerta'
        this.generandoTarifa = true
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
        } catch (error) {
            console.error(error)
        } finally{
            this.generandoTarifa = false
        }
    },
        async solicitarPdfGuia(){
        try {
            this.generandoPdfGuia=true
            await this.$store.dispatch('data/generatePdfGuide',{
                courier: this.dataSelected.courier.value,
                guia_id: this.guide.data._id,
                numero_guia: this.guide.data.guia,
            })
            console.log(this.pdfGuide.data)
        } catch (error) {
            console.error(error)
        }finally{
            this.generandoPdfGuia=false
        }
    },

  },
})
</script>
<style scoped>
    .formulario>*{
        min-width: 300px ;
    }
</style>