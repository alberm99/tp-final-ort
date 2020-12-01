<template>
  <section class="src-components-estructura">
    <div class="jumbotron">
      <h2>Productos Publicados</h2>
      <hr />
      <div>
        <button class="btn btn-success my-3" @click="mostrar=!mostrar">{{!mostrar? 'Agregar Producto': 'Ocultar'}}</button>
        <br>
        <div v-if="mostrar"> 
          <FormABMProdu/>
        </div>
      </div>

      <div v-if="productos.length">
        <div
          class="media alert alert-warning"
          v-for="(producto, index) in productos"
          :key="index"
        >
          <img :src="producto.imagen" width="200" :alt="producto.nombre" />
          <div class="media-body ml-3">
            <h5>
              <u>{{ producto.nombre }}</u>
            </h5>
            <br />
            <p>
              Descripcion: <i>{{ producto.descripcion }}</i>
            </p>
            <p>
              Precio: <i>{{ producto.precio }}</i>
            </p>
            <button class="btn btn-info ml-3" @click="editar(producto._id)">
              Editar
            </button>
            <button class="btn btn-danger ml-3" @click="borrar(producto)">
              Borrar
            </button>
          </div>
        </div>      
      </div>

      <div v-else-if="!pidiendo" class="alert alert-warning msgNoHay">
        No hay Productos cargados
      </div>
    </div>   
  </section>
</template>

<script>


import FormABMProdu from './FormABMProdu.vue'
const urlServidor = 'http://localhost:3000/productos/' 


export default {
  name: "src-components-estructura",
  props: [],
  components:{
    FormABMProdu
  },
  mounted() {
    this.getProductos() 
  },
  data() {
    return {
      
      productos: [], 
      mostrar: false,
      pidiendo: true
      
    }
    
  },
  

  methods: {
    async getProductos() {
      try {
        let res = await this.axios(urlServidor)
        this.productos = res.data
        console.log(res.data)
      }
      catch(error) {
        console.log('HTTP GET ERROR', error)
      }
      finally{
        this.pidiendo = false 
      }
    },
    async borrar(prod){
      try {

        if(confirm(`Estas Seguro de eliminar el producto ${prod.nombre}? `)){
          let res = await this.axios.delete(urlServidor+prod._id)
          location.reload()
          console.log(res.data)
        }

      } catch (error) {
        console.log('HTTP DELETE ERROR', error)
      }
    },

    async editar(id){
      try {
        this.$router.push('/FormEditProd/' + id)
      } catch (error) {
        console.error(error)
      }
    }
      
  },
         
  computed: {
   
  },
};
</script>

<style scoped lang="css">


  .jumbotron {
  background-color: rgb(167, 39, 64);
  color: white;
  }

  hr {
  background-color: #ddd;
  }

  .table td, .table th {
    vertical-align: middle;
  }

  .msgNoHay{
    text-align: center;
    height: 100px;
    margin: auto;
    font-size: 50px;
    font-family: Arial;
  }


</style>
