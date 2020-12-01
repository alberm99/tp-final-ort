<template>
  <section class="src-components-productos-usuario">
    <div class="container-fluid my-3">
      <div class="jumbotron">
        <h2>Armá tu pedido!!!</h2>

        <hr />

        <!-- <h5>{{$store.state.logueado}}</h5> -->
        <!-- <p>{{mostrar()}}</p> -->
        
        <div>
          <button class="btn btn-success my-3" @click="verCarrito()">Ver carrito</button>
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

              <div>
                <label for="cant">Cantidad</label>
                <input type="number" min="0" id="cant" v-model="producto.cant" :style="{'margin' : '8px'}">
              </div>

              <button class="btn btn-info ml-3" @click="agregar(producto._id, producto.cant)">
                Agregar al carrito
              </button>

            </div>
          </div>
        </div>

        <div v-else-if="!pidiendo" class="alert alert-warning msgNoHay">
          No hay Productos en venta
        </div>
      </div>
    </div>
  </section>
</template>

<script>

const urlServidor = 'http://localhost:3000/productos/'


export default {
  name: "src-components-productos-usuario",
  props: [],

  mounted() {
    this.getProductos()
  },
  data() {
    return {
      productos: [], 
      pidiendo: true,
      //carrito:[]
    };
  },
  methods: {
    async getProductos() {
      try {
        let res = await this.axios(urlServidor)
        this.productos = res.data
        this.initCant()
        console.log(res.data)
      }
      catch(error) {
        console.log('HTTP GET ERROR', error)
      }
      finally{
        this.pidiendo = false 
      }
    },
    agregar(id, cant){
      if(cant>0){
        this.$store.state.carritoVacio = false
        this.productos.find(a=>a._id == id).cant = 0
        const prod = { idProd: id, cantidad: Number.parseInt(cant)}
        this.$store.dispatch('agregar', prod)
      }else if(cant<0){
        alert('Debe ingresar un valor positivo')
      }

    },
    mostrar(){
      return this.$store.state.carrito
    }
    ,initCant(){
      this.productos.forEach(p => {
        p.cant=0
      });
    },
    verCarrito(){
      if(this.$store.state.carrito.length == 0){
        alert('Tu carrito está vacío.') 
      }else{
        this.$router.push('/VerCarrito/')
      }

    }

  },
  computed: {},
};
</script>

<style scoped lang="css">



</style>
