import { createWebHistory, createRouter } from 'vue-router'

import ProductosAdmin from '../components/ProductosAdmin.vue'
import PedidosAdmin from '../components/PedidosAdmin.vue'
import ProductosUsuario from '../components/ProductosUsuario.vue'
import FormEditProd from '../components/FormEditProd.vue'
import DetalleAdmin from '../components/DetalleAdmin.vue'
import VerCarrito from '../components/VerCarrito.vue'
import LoginUsuarios from '../components/LoginUsuarios.vue'
import UsuariosAdmin from '../components/UsuariosAdmin.vue'
import CrearCuenta from '../components/CrearCuenta.vue'
import PedidosUsuarios from '../components/PedidosUsuarios.vue'
import DetalleUsuarios from '../components/DetalleUsuarios.vue'



const routes = [
    { path: '/', name: 'Home', component: LoginUsuarios },
    { path: '/ProductosAdmin', name: 'ProductosAdmin', component: ProductosAdmin },
    { path: '/PedidosAdmin', name: 'PedidosAdmin', component: PedidosAdmin },
    { path: '/VerCarrito', name: 'VerCarrito', component: VerCarrito },
    { path: '/CrearCuenta', name: 'CrearCuenta', component: CrearCuenta },
    { path: '/ProductosUsuario', name: 'ProductosUsuario', component: ProductosUsuario },
    { path: '/PedidosUsuarios', name: 'PedidosUsuarios', component: PedidosUsuarios },
    { path: '/LoginUsuarios', name: 'LoginUsuarios', component: LoginUsuarios },
    { path: '/UsuariosAdmin', name: 'UsuariosAdmin', component: UsuariosAdmin },
    { path: '/FormEditProd/:id', name: 'FormEditProd', component: FormEditProd, props: true},
    { path: '/DetalleAdmin/:id', name: 'DetalleAdmin', component: DetalleAdmin, props: true},
    { path: '/DetalleUsuarios/:id', name: 'DetalleUsuarios', component: DetalleUsuarios, props: true},

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router


