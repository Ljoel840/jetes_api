<template>
  <q-page class="column justify-start q-py-md">
    <div class="row justify-center q-my-xl">
      <div class="q-gutter-y-md column " style="max-width: 900px; min-width: 50%">
        <couriers/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import couriers from '../components/courierDatos.vue'
export default defineComponent({
  name: 'PageIndex',
  components:{
    couriers
  }
})
</script>
