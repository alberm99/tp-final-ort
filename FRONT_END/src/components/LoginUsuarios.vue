<template>
  
  <section class="src-components-form-abm-produ jumbotron">
    <form novalidate autocomplete="off" @submit.prevent="enviar()">
      <!-- ------------ -->
      <!-- CAMPO EMAIL -->
      <!-- ------------ -->
      <h5>{{mensajeError}}</h5>


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
        <label for="password">Password</label>
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
      <!-- ------------ -->
      <!-- BOTÓN ENVÍO  -->
      <!-- ------------ -->
      <div class="form-group">
        <input
          type="submit"
          :disabled="v.$invalid"
          class="btn btn-success mt-4"
          value="Ingresar"
        />
      </div>

      <a href="" @click="this.$router.push('/CrearCuenta/')">No estas registrado? Create una cuenta</a>

      <br />
      <br />
    </form>
  </section>
</template>

<script>
const urlServidor = "http://localhost:3000/users/";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

  export default {
    name: "src-components-login-usuarios",
    props: [],
    mounted() {},
    created() {
      const rules = {
        f: {
          email: {
            required,
            email,
          },
          password: {
            required,
          },
        },
      };

      const f = this.f;
      this.v = useVuelidate(rules, { f });
    },
    data() {
      return {
        mensajeError: '',
        f: {
          email: "",
          password: "",
        },
        v: null,
      };
    },
    methods: {

      async getUser(){
        
        const res =  await this.axios(urlServidor+this.f.email)
        this.$store.state.user = res.data
      },

      async sendDatosFormAxios(datos) {
        let res = ''
        try {
           res = await this.axios.post(urlServidor+'login', datos, {
            "content-type": "application/json",
          })
          console.log(res.data);
          
        } catch (error) {
          console.log("HTTP POST ERROR", error);
          
        }
        return res
        
      },
      async enviar() {
        this.v.$touch();
        if (!this.v.$invalid) {
          let form = this.f;
          console.log(form);
          let res = await this.sendDatosFormAxios(form);
          if (res.status == 200) {
            await this.getUser()
            this.$store.state.user.token = res.data
            this.$store.state.logueado = true
            console.log(this.$store.state.user)
            this.$router.push('/ProductosUsuario/')
          }else {
            this.mensajeError = 'No se puede loguear'
          }
          this.v.$reset();
        }
        
      },
    },

    computed: {},
  };
</script>

<style scoped lang="css">
.src-components-login-usuarios {
}
.jumbotron {
  background-color: #ddd;
}
</style>
