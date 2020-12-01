<template>
  <section class="src-components-detalle-admin">
    <br>
    <h1>Detalle del pedido</h1>
    <hr>

    <div class="table-responsive" v-if="!pidiendo">
      <table class="table">
        <tr class="bg-info text-white">
          <th>Imagen</th>
          <th>producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
        <tr class="bg-dark text-white" v-for="(p, index) in carrito" :key="index">
          <td>
            <img
              :style="{'width': '100px', 'heigth': '100px'}"
              :src="getDatos(p.idProd).imagen" 
              :alt="getDatos(p.idProd).nombre"
            >
          </td>
          <td>{{ getDatos(p.idProd).nombre }}</td>
          <td>
            <button class="btn btn-warning" @click="menos(p.idProd)"><b>-</b></button>
            {{ p.cantidad}}
            <button class="btn btn-warning" @click="mas(p.idProd)"><b>+</b></button>
          </td>
          <td> ${{ getDatos(p.idProd).precio }}</td>
          <td> ${{ getDatos(p.idProd).precio * p.cantidad }}</td>
          <td><button class="btn btn-danger" @click="eliminar(p.idProd)">Eliminar Producto</button></td>
        </tr>
        <tr class="bg-warning">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td> <b> ${{ this.getImporte() }} </b> </td>
          <td></td>
        </tr>
      </table>
    </div> 

    <div>
      <button class="btn btn-success my-3" @click="confirmar()">Finalizar compra</button>
    </div>


    <div>
      <button class="btn btn-info my-3" @click="this.goProductosUsuario()" >Seguir comprando</button>
    </div>
    <!-- <a href="" @click="this.goProductosUsuario()">Seguir comprando</a> -->

    <br />
    <br />
  </section>
</template>

<script >
const urlPedido = "http://localhost:3000/pedidos/";
const urlProductos = 'http://localhost:3000/productos/'


export default {
  name: "src-components-detalle-admin",
  props: ["id"],
  mounted() {
    this.getCarrito();
    this.getAllProductos()
  },
  data() {
    return {
      carrito: [],
      productos:[],
      pidiendo: true,

    };
  },

  methods: {
    getCarrito() {
      this.carrito = this.$store.state.carrito
    },
    async getAllProductos(){
      try {
        const res = await this.axios(urlProductos);
        console.log(res.data);
        this.productos = res.data;
      } catch (error) {
        console.error(error)
      }finally{
        this.pidiendo = false
      }
    },
    
    getDatos(id){
      return this.productos.find(a=>a._id == id)
    },
    goProductosUsuario(){
      this.$router.push('/ProductosUsuario/')
    },
    getImporte(){
      let total=0
      this.carrito.forEach(p => {
        total += Number.parseInt(this.productos.find(a=>a._id==p.idProd).precio) * Number.parseInt(p.cantidad)
      });
      return total 
    },

    async confirmar(){
      if(this.$store.state.logueado){
        const pedido = {
          emailUser: this.$store.state.user.email,
          importe: this.getImporte(),
          fecha: new Date().toLocaleString(),
          terminado: false,
          productos: this.carrito
        }
        await this.axios.post(urlPedido, pedido, {headers: {Authorization: "Bearer " + this.$store.state.user.token}}, {'content-type': 'application/json'})
        this.$store.state.carrito = []
        this.goProductosUsuario()
      }else if(confirm('Debes iniciar sesión para confirmar una compra')){
        this.$router.push('/LoginUsuarios/')
      } 
    },
    eliminar(id) {
      this.$store.dispatch('eliminar',id);
    },
    mas(id) {
      this.$store.dispatch('mas',id);
    },
    menos(id) {
      this.$store.dispatch('menos',id);
    },
    
  },
  computed: {},
};
</script>

<style scoped lang="css">

.table td, .table th {
  vertical-align: middle;
}



</style>
