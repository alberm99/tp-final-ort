<template>
  <section class="src-components-detalle-admin">
    <br>
    <h1>Detalle del pedido</h1>
    <hr>

    <div v-if="!pidiendo">
      <div>
        <div class="media-body ml-3">
          <p>
            Pedido número: <i>{{ pedido._id }}</i>
          </p>
          <p>
            Fecha: <i>{{ pedido.fecha }}</i>
          </p>
          <p>
            Estado: <i>{{ pedido.terminado ? "Terminado" : "Pendiente" }}</i>
          </p>
        </div>
      </div>
      
      <br>

      <div class="table-responsive">
        <table class="table">
          <tr class="bg-info text-white">
            <th>Imagen</th>
            <th>producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
          <tr class="bg-dark text-white" v-for="(p, index) in pedido.productos" :key="index">
            <td>
              <img
                :style="{'width': '100px', 'heigth': '100px'}"
                :src="getDatos(p.idProd).imagen" 
                :alt="getDatos(p.idProd).nombre"
              >
            </td>
            <td>{{ getDatos(p.idProd).nombre }}</td>
            <td>{{ p.cantidad}}</td>
            <td> ${{ getDatos(p.idProd).precio }}</td>
            <td> ${{ getDatos(p.idProd).precio * p.cantidad }}</td>
          </tr>
          <tr class="bg-warning">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td> <b> ${{ pedido.importe }} </b> </td>
          </tr>
        </table>
      </div>  
    </div>

      
      
      
    

    <a href="" @click="this.goPedidosUsuarios()">Volver</a>

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
    this.getPedido();
    this.getAllProductos()
  },
  data() {
    return {
      pedido: {},
      productos:[],
      pidiendo: true
    };
  },

  methods: {
    async getPedido() {
      const res = await this.axios(urlPedido + this.id);
      console.log(res.data);
      this.pedido = res.data;
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
    goPedidosUsuarios(){
      this.$router.push('/PedidosUsuarios/')
    },
    async terminar() {
      this.pedido.terminado = true;
      let res = await this.axios.put(urlPedido + this.id, this.pedido, {'content-type': 'application/json'});
      console.log(res.data);
    }
  },
  computed: {},
};
</script>

<style scoped lang="css">

.table td, .table th {
  vertical-align: middle;
}



</style>
