import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            carrito: [],
            user: {},
            logueado: false,
            carritoVacio: true

        }
    },
    actions: {
        agregar({commit}, prod) {
            commit('agregar', prod)
        },
        eliminar({commit}, idProd){
            commit('eliminar',idProd)
        },
        mas({commit}, idProd){
            commit('mas',idProd)
        },
        menos({commit}, idProd){
            commit('menos',idProd)
        },
        
             
    },
    mutations: {
        agregar(state,prod) {
            const aux = state.carrito.find(producto => producto.idProd == prod.idProd)
            if(aux != null){
                aux.cantidad += prod.cantidad
            }
            else{
                state.carrito.push(prod)
            }
        },
        eliminar(state,idprod) {
            const index = state.carrito.findIndex(producto => producto.idProd == idprod)
            state.carrito.splice(index,1)
        },
        mas(state,idprod) {
            const aux = state.carrito.find(producto => producto.idProd == idprod)
            aux.cantidad++
        }, 
        menos(state,idprod) {
            const aux = state.carrito.find(producto => producto.idProd == idprod)
            if(aux.cantidad==1){
                alert('Si no desea este producto oprima el botón de eliminar producto')
            }else{
                aux.cantidad--
            }
        }, 
    }
})