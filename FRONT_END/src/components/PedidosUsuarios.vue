<template>

  <section class="src-components-pedidos-usuarios">
   <div class="jumbotron">
      <h2>Pedidos Publicados</h2>
      <hr />
      
      <div v-if="pedidos.length">
        <div
          class="media alert alert-warning"
          v-for="(pedido, index) in pedidos"
          :key="index"
        >
          <div class="media-body ml-3">
            <p>
              Pedido número: <i>{{ pedido._id }}</i>
            </p>            
            <p>
              Fecha: <i>{{ pedido.fecha }}</i>
            </p>
            <p>
              Importe: <i> ${{ pedido.importe }}</i>
            </p>
            <p>
              Estado: <i>{{ pedido.terminado?'Terminado': 'Pendiente' }}</i>
            </p>
            

            <button class="btn btn-success ml-3" @click="detalle(pedido._id)">
              Ver detalle del pedido
            </button>
            

          </div>
        </div>
      </div>

      <div v-else-if="!pidiendo" class="alert alert-warning msgNoHay">
        No tienen pedidos en el historial
      </div>
    </div>
  </section>

</template>

<script>


const urlServidor = 'http://localhost:3000/pedidos/' 

  export default  {
    name: 'src-components-pedidos-usuarios',
    props: [],
    mounted () {
      this.getPedidos()
    },
    data () {
      return {
        pedidos: [],
        pidiendo: true,
      };
      
    },
    methods: {
      async getPedidos(){
        try {
          const res = await this.axios(urlServidor)
          console.log(res.data)
          const aux = res.data
          this.pedidos = aux.filter(p=>p.emailUser == this.$store.state.user.email)
        } catch (error) {
          console.error(error)    
        }
        finally{
          this.pidiendo = false 
        }
      },
  
      detalle(id){
        try {
          this.$router.push('/DetalleUsuarios/' + id)
        } catch (error) {
          console.error(error)
        }
      }


    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-pedidos-usuarios {

  }
</style>
