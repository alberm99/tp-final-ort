<template>

  <section class="src-components-crear-cuenta">
    <form novalidate autocomplete="off" @submit.prevent="registrar()">
      <h5>{{mensajeError}}</h5>


      <br>
      <br>
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          class="form-control"
          v-model="v.f.name.$model"
        />
        <!-- CARTELES DE VALIDACIÓN -->
        <div
          v-if="v.f.name.$error && v.f.name.$dirty"
          class="alert alert-danger mt-1"
        >
          <div v-if="v.f.name.required.$invalid">Este campo es requerido</div>
        </div>
      </div>


      <!-- ------------ -->
      <!-- CAMPO EMAIL -->
      <!-- ------------ -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="v.f.email.$model"
        />
        <!-- CARTELES DE VALIDACIÓN -->
        <div
          v-if="v.f.email.$error && v.f.email.$dirty"
          class="alert alert-danger mt-1"
        >
          <div v-if="v.f.email.required.$invalid">Este campo es requerido</div>
          <div v-if="v.f.email.email.$invalid">Debe proveer un email</div>
        </div>
      </div>
      <!-- ------------- -->
      <!-- CAMPO PASSWORD -->
      <!-- ------------- -->
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="v.f.password.$model"
        />
        <!-- CARTELES DE VALIDACIÓN -->
        <div
          v-if="v.f.password.$error && v.f.password.$dirty"
          class="alert alert-danger mt-1"
        >
          <div v-if="v.f.password.required.$invalid">
            Este campo es requerido
          </div>
        </div>
      </div>


<!--       <div class="form-group">
        <label for="password2">Confirmar Contraseña</label>
        <input
          type="password"
          id="password2"
          class="form-control"
          v-model="v.f.password2.$model"
        />
       
        <div
          v-if="v.f.password2.$error && v.f.password2.$dirty"
          class="alert alert-danger mt-1"
        >
          <div v-if="v.f.password2.required.$invalid">
            Este campo es requerido
          </div>
         
          <div v-if="v.f.password2.validado.$invalid">
            Este campo es requerido
          </div>
        </div>
      </div>
 -->


      <!-- ------------ -->
      <!-- BOTÓN ENVÍO  -->
      <!-- ------------ -->
      <div class="form-group">
        <input
          type="submit"
          :disabled="v.$invalid"
          class="btn btn-success mt-4"
          value="Registrarme"
        />
      </div>

      <br />
      <br />
    </form>
  </section>

</template>

<script>


const urlServidor = "http://localhost:3000/users/";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
/* 
function validarContraseña(value, pass){
  return value==pass
} */



  export default  {
    name: 'src-components-crear-cuenta',
    props: [],
    mounted () {

    },
    created() {
      const rules = {
        f: {
          name: {
            required
          },
          email: {
            required,
            email,
          },
          password: {
            required,
          },
          /* password2: {
            required,
            validado: validarContraseña(this.f.password)
          }, */
          
        },
      };

      const f = this.f;
      this.v = useVuelidate(rules, { f });
    },
    data() {
      return {
        mensajeError: '',
        f: {
          name: "",
          email: "",
          password: "",
         /*  password2: "",  */
        },
        v: null,

      };
    },
    
    methods: {

      async sendDatosFormAxios(datos) {
        try {
          let res = await this.axios.post(urlServidor, datos, {"content-type": "application/json",})
          console.log(res.data);
        } catch (error) {
          console.log("HTTP POST ERROR", error);
        }
      },


      async registrar() {
        this.v.$touch();
        if (!this.v.$invalid) {
          this.f.pedidos = []
          this.f.esAdmin = false
          /* delete this.f.password2 */
          /* let form = this.f; */
          console.log(this.f);
          await this.sendDatosFormAxios(this.f);
          this.v.$reset();
          this.$router.push('/LoginUsuarios/')
        }
      }  
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-crear-cuenta {

  }
</style>
