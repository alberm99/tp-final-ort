<template>

  <section class="src-components-usuarios-admim">
    <div class="jumbotron">
      <h2>Listado de Usuarios</h2>


      <div class="table-responsive" v-if="!pidiendo">
      <table class="table">
        <tr class="bg-info text-white">
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th></th>

        </tr>
        <tr class="bg-dark text-white" v-for="(u, index) in usuarios" :key="index">
          <td>{{u.name}}</td>
          <td>{{u.email}}</td>
          <td>{{u.esAdmin ? 'Administrador': 'Usuario'}}</td>
          <td><button class="btn btn-warning my-3" @click="cambiar(u, index)">{{u.esAdmin ? 'Sacar Admin' : 'Hacer Admin' }}</button> </td>
        </tr>
  
      </table>
    </div> 




    </div>
  </section>

</template>

<script >


const urlUsers = "http://localhost:3000/users/";

  export default  {
    name: 'src-components-usuarios-admim',
    props: [],
    mounted () {
      this.getUsers()
    },
    data () {
      return {
        usuarios: [],
        pidiendo: true
      }
    },
    methods: {
      async getUsers(){
        try {
          const res = await this.axios(urlUsers)
          console.log(res.data)
          this.usuarios = res.data
        } catch (error) {
          console.error(error)    
        }
        finally{
          this.pidiendo = false 
        }
      },

      async cambiar(u, index){
        console.log(u)
        const user = {
          name: u.name,
          email: u.email,
          password: u.password,
          pedidos: u.pedidos,
          esAdmin: !u.esAdmin
        }
        this.usuarios[index] = user
        const res =  await this.axios.put(urlUsers+u._id, user, {'content-type': 'application/json'})
        console.log(res.data)
        
      }


    },



    computed: {

    }
}


</script>

<style scoped lang="css">
  .table td, .table th {
    vertical-align: middle;
  }
</style>
