<template>
    <div>
        <div class="row col-12" >
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
                    <q-select v-model="oficina" :options="oficinasList" label="Oficina" @blur="actualizarOficina()" :disable="oficinasList.length<=0 || isLiberty ? true : false"/>
                </div>
                <div class="col-12"></div>
                <div class="col-2">
                    <q-input v-model="numeroPiezas" type="number" label="Número de Piezas" /> 
                </div>
                <div class="col-2">
                    <q-input v-model="peso" type="number" label="Peso" /> 
                </div>
                <div class="col-2">
                    <!-- <q-input v-model="tipoEnvio" label="Tipo de Envio" />  -->
                     <q-select v-model="tipoEnvio" :options="envios" label="Tipo deEnvío" />
                </div>
                <div class="col-2">
                    <q-input v-model="valor" type="number" label="Valor" /> 
                </div>
                <div class="col-2">
                    <!-- <q-input v-model="tipoServicio" label="Tipo de Servicio" />  -->
                    <q-select v-model="tipoServicio" :options="servicios" label="Tipo de Servicio" />
                </div>
                <div class="col-2">
                    <q-toggle v-model="retirarOficina" label="Retirar en la Oficina" :disable="isLiberty ? true:false" />
                </div>
                <div class="col-2">
                    <q-toggle v-model="seguro" label="Seguro" />
                </div>
            </q-form>
        </div>
           
       <div class="row q-ma-md">
            <q-btn :loading="generandoTarifa" color="primary" @click="generarTarifa()" style="width: 150px">
                Calcular 
                <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Loading...
                </template>
            </q-btn>
            <q-dialog v-model="alerta">
              <q-card>
                  <q-card-section>
                  <div class="text-h6">Error</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                  {{alertaMsg}}
              </q-card-section>

              <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
        </q-dialog>
       </div>
      <div class="row col-12 q-py-md">
        <q-badge class="col-2" color="red" v-if="errorList">
            {{errorList}}
        </q-badge> 
      </div>
       <br>
        <q-dialog v-model="tarifaModal">
            <q-card>
                <q-card-section>
                <div class="text-h6">Tarifa Aproximada</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div class="row" v-if="tarifa.ok">
                    <div class="col-2 q-px-sm" >
                        <q-input v-model="tarifa.data.combustible" hint="Combustible" :dense="dense" disable class="text-weight-bold"/>
                    </div>
                    <div class="col-1 q-px-sm" >
                        <q-input v-model="tarifa.data.flete" hint="Flete" :dense="dense" disable class="text-weight-bold"/>
                    </div>
                    <div class="col-2 q-px-sm" >
                        <q-input v-model="tarifa.data.franqueo_postal" hint="Franqueo Postal" :dense="dense" disable class="text-weight-bold"/>
                    </div>
                    <div class="col-1 q-px-sm" >
                        <q-input v-model="tarifa.data.iva" hint="Iva" :dense="dense" disable class="text-weight-bold"/>
                    </div>
                    <div class="col-2 q-px-sm" >
                        <q-input v-model="tarifa.data.seguro" hint="Seguro" :dense="dense" disable class="text-weight-bold"/>
                    </div>
                    <div class="col-2 q-px-sm" >
                        <q-input v-model="tarifa.data.subtotal" hint="SubTotal" :dense="dense" disable class="text-weight-bold"/>
                    </div>
                    <div class="col-2 q-px-sm">
                        <q-input v-model="tarifa.data.total" hint="TOTAL" :dense="dense" disable class="text-weight-bold"/>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
            </q-card>
        </q-dialog>
        <q-badge color="red" v-if="tarifa.error">
            Tarifa: {{tarifa.error}}
        </q-badge>
    </div>

</template>

<script>
import { mapState } from 'vuex'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'pdfDatos',
  components:{
  },
  data() {
    return {
      loading: true,
      alerta: false,
      tarifaModal: false,
      alertaMsg:'',
      limpiando: false,
      courier: '',
      guiaId: '',
      guiaNro: '',
      generandoTarifa: false,
      mensajeError: null,
      dense: false,
      estado: '',
      ciudad: '',
      municipio: '',
      parroquia:'',
      oficina:'',
      numeroPiezas:0,
      peso:0,
      tipoEnvio: '',
      valor:0,
      tipoServicio: '',
      retirarOficina: true,
      seguro: true,
      errorValidacion: false,
      isLiberty: false,
      servicios: [
          {
              label: 'Cobro Destino',
              value: 'cod',
              category: 1
          },
          {
              label: 'Pago Contado',
              value: 'contado',
              category: 2
          }
      ],
      envios: [
          {
              label: 'Mercancia',
              value: 'M',
              category: 1
          },
          {
              label: 'Documento',
              value: 'D',
              category: 2
          }
      ],

    }
  },
  computed: {
      ...mapState('data', [
        'couriersList',
        'estadosList',
        'ciudadesList',
        'municipiosList',
        'parroquiasList',
        'oficinasList',
        'ciudadesList',
        'tarifa',
        'errorList',
      ]),
  },
  mounted() {
      this.getCouriers()
      this.$store.commit('data/initTracking')
  },

  methods: {
          actualizarCourier(){
      if (this.courier.label == 'Liberty'){
          this.isLiberty=true
          this.retirarOficina= false
      }else{
          this.isLiberty=false
          this.retirarOficina= true
      }
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

      async getCouriers(){
      try{
        this.loading = true
        await this.$store.dispatch('data/loadCouriers')
        this.loading = false
      }catch (error) {
        console.error(error);
      }
    },
    generarTarifa(){
        if (!this.courier || !this.guiaNro || !this.pdfGuia || !this.cantidadPiezas || !this.peso || !this.valor || !this.tipoServicio || !this.oficina) {
          this.alerta = true
          this.alertaMsg = 'Completar los Datos'
        }else{
          this.calcularTarifa()
        }
    },
    
    async calcularTarifa(){
        let seguro = this.dataSelected.seguro ? 1:0
        let modalidad = this.dataSelected.retirarOficina ? 'oficina': 'puerta'
        this.generandoTarifa = true
        this.alertaMsg = ''
        try {
            await this.$store.dispatch('data/getTarifa',{
                courier: this.courier.value,
                ciudad: this.ciudad.value,
                cantidadPiezas: this.numeroPiezas,
                peso: this.peso,
                seguro: seguro,
                valor: this.valor,
                tipoTarifa:this.tipoServicio,
                modalidadTarifa: modalidad,
                oficina: this.oficina.value
            })
            if (this.tarifa.error){
                this.alerta = true
                this.alertaMsg = this.tarifa.error
            }else{
                this.tarifaModal = true
            }
        } catch (error) {
            console.error(error)
            this.alerta = true
            this.alertaMsg = error
        } finally{
            this.generandoTarifa = false
        }
    },
  }
})
</script>
