<template>
    <div>
        <div class="row col-12" >
            <q-form class="q-gutter-md formulario row">
                <div class="col-12">
                    <q-select v-model="courier" :options="couriersList" label="Couriers" />
                </div>

                <div class="col-12">
                    <q-input v-model="guiaNro" label="Nro de guía" /> 
                </div>
                <div class="col-12">
                    <q-input v-model="guiaId" label="Guía Id" /> 
                </div>
            </q-form>
        </div>
           
       <div class="row q-ma-md">
            <q-btn :loading="generandoPdfGuia" color="primary" @click="generarPdf()" style="width: 150px">
                Generar 
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
        <q-dialog v-model="pdfModal" full-width>
            <q-card>
                <q-card-section>
                <div class="text-h6">Guía PDF</div>
            </q-card-section>

            <q-card-section class="q-pt-none scroll" style="max-height: 60vh">
                <div class="row" v-if="pdfGuia.ok">
                    <object :data="`data:application/pdf;base64,${pdfGuia.data.value}`" type="application/pdf" width="100%" height="600px"></object>
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
            </q-card>
        </q-dialog>
        <q-badge color="red" v-if="pdfGuia.error">
           Pdf: {{pdfGuia.error}}
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
      pdfModal: false,
      alertaMsg:'',
      limpiando: false,
      courier: '',
      guiaId: '',
      guiaNro: '',
      generandoPdfGuia: false,
      mensajeError: null,
      dense: false,
    }
  },
  computed: {
      ...mapState('data', [
        'couriersList',
        'pdfGuia',
        'errorList',
      ]),
  },
  mounted() {
      this.getCouriers()
      this.$store.commit('data/initTracking')
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
    generarPdf(){
        if (!this.courier || !this.guiaNro || !this.pdfGuia) {
          this.alerta = true
          this.alertaMsg = 'Completar los Datos'
        }else{
          this.solicitartPdfGuia()
        }
    },
    
    async solicitarPdfGuia(){
        try {
            this.alertaMsg = ''
            this.generandoPdfGuia=true
            await this.$store.dispatch('data/generatePdfGuia',{
                courier: this.courier.value,
                guia_id: this.guiaId,
                numero_guia: this.guiaNro,
            })
            if (this.pdfGuia.error){
                this.alerta = true
                this.alertaMsg = this.pdfGuia.error
            }else{
                this.pdfModal = true
            }
        } catch (error) {
            console.error(error)
            this.alerta = true
            this.alertaMsg = error
        }finally{
            this.generandoPdfGuia=false
        }
    }
  }
})
</script>
