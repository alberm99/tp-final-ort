<template>
  <section class="src-components-form-abm-produ">
    <form novalidate autocomplete="off" @submit.prevent="enviar()">
      <!-- ------------ -->
      <!-- CAMPO NOMBRE -->
      <!-- ------------ -->
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          class="form-control"
          v-model="v.f.nombre.$model"
        />
        <!-- CARTELES DE VALIDACIÓN -->
        <div
          v-if="v.f.nombre.$error && v.f.nombre.$dirty"
          class="alert alert-danger mt-1"
        >
          <div v-if="v.f.nombre.required.$invalid">Este campo es requerido</div>
          <div v-if="v.f.nombre.minLength.$invalid">
            Este campo debe tener al menos
            {{ v.f.nombre.minLength.$params.length }} caracteres
          </div>
          <div v-if="v.f.nombre.maxLength.$invalid">
            Este campo debe tener máximo
            {{ v.f.nombre.maxLength.$params.max }} caracteres
          </div>
          <!--    <div v-if="v.f.nombre.conEspacios.$invalid">No se permiten espacios en este campo</div> -->
        </div>
      </div>
      <!-- ------------- -->
      <!-- CAMPO DESCRIPCION -->
      <!-- ------------- -->
      <div class="form-group">
        <label for="descripcion">descripcion</label>
        <input
          type="text"
          id="descripcion"
          class="form-control"
          v-model="v.f.descripcion.$model"
        />
        <!-- CARTELES DE VALIDACIÓN -->
        <div
          v-if="v.f.descripcion.$error && v.f.descripcion.$dirty"
          class="alert alert-danger mt-1"
        >
          <div v-if="v.f.descripcion.required.$invalid">
            Este campo es requerido
          </div>
        </div>
      </div>
      <!-- ------------ -->
      <!--  CAMPO PRECIO -->
      <!-- ------------ -->
      <div class="form-group">
        <label for="precio">precio</label>
        <input
          type="number"
          id="precio"
          class="form-control"
          v-model.number="v.f.precio.$model"
        />
        <!-- CARTELES DE VALIDACIÓN -->
        <div
          v-if="v.f.precio.$error && v.f.precio.$dirty"
          class="alert alert-danger mt-1"
        >
          <div v-if="v.f.precio.required.$invalid">Este campo es requerido</div>
        </div>
      </div>

      <!-- ------------ -->
      <!--  CAMPO imagen -->
      <!-- ------------ -->

      <div class="form-group">
        <label for="precio">Imagen</label>
        <br>
        <div v-if="urlImagen != ''">
          <img :src="urlImagen"  :style="{'width': '250px', 'heigth': '250px', 'border': '1px solid blue' }" class="mb-3" :alt="this.v.f.nombre.$model">
        </div>
        <input
          type="text"
          id="imagen"
          class="form-control"
          v-model.number="v.f.imagen.$model"
        />
        <!-- CARTELES DE VALIDACIÓN -->
        <div
          v-if="v.f.imagen.$error && v.f.imagen.$dirty"
          class="alert alert-danger mt-1"
        >
          <div v-if="v.f.imagen.required.$invalid">Este campo es requerido</div>
        </div>
      </div>

      <!-- ------------ -->
      <!-- BOTÓN ENVÍO  -->
      <!-- ------------ -->
      <div class="form-group">
        <input
          type="submit"
          :disabled="v.$invalid"
          class="btn btn-success mt-4"
          value="Agregar"
        />
      </div>

      <br>
      <br>  
    </form>
  </section>
</template>

<script>

const urlServidor = 'http://localhost:3000/productos' 
import useVuelidate from '@vuelidate/core'
import {required, minLength, maxLength } from '@vuelidate/validators'

export default {

  name: "src-components-form-abm-produ",
  props: [],
  mounted() {},
  created() {
    const rules = {
      f: {
        nombre: { 
          required,
          minLength: minLength(3),
          maxLength: maxLength(50)
        },
        descripcion: { 
          required
        },
        precio: { 
          required
        },
        imagen: {
          required
        }
      }
    }

    const f = this.f
    this.v = useVuelidate(rules, {f})
  },
  data() {
    return {
      f: {
        nombre: '',
        descripcion : '',
        precio : '',
        imagen: ''
      },
      v : null,
    };
  },
  methods: {
    async sendDatosFormAxios(datos) {
      try {
        let res = await this.axios.post(urlServidor, datos, {'content-type': 'application/json'})
        console.log(res.data)
      }
      catch(error) {
        console.log('HTTP POST ERROR', error)
      }
    },
    async enviar() {
        this.v.$touch()
        if(!this.v.$invalid) {
          let form = this.f
          console.log(form)
          await this.sendDatosFormAxios(form)
          this.resetForm()
          this.v.$reset()
        }
      },
      resetForm() {
        this.v.f.nombre.$model = ''
        this.v.f.descripcion.$model = ''
        this.v.f.precio.$model = ''
        this.v.f.imagen.$model = ''
        location.reload()
      }
       
    

  },
  computed: {
     
     urlImagen(){
      return this.v.f.imagen.$model
    }
  },
};
</script>

<style scoped lang="css">
.src-components-form-abm-produ {
}
</style>
