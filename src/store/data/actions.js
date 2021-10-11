import { api } from 'boot/axios'

export async function loadCouriers ({commit}) {
    await api.get(`/get/couriers`)
    .then((response) =>{
        commit('loadCouriers',response.data,null)
    }).catch(error => {
        commit('loadCouriers',null,error)
    })
}

export async function loadEstados ({commit,state},data) {
    await api.get(`/get/estados?courier=${data.value}`,{
        headers: {
            'Authorization': `Bearer ${state.token}`,
        }
    })
    .then((response) =>{
        commit('loadEstados',response.data,null)
    }).catch(error => {
        commit('loadEstados',null,error)
    })
}

export async function loadCiudades ({commit,state},data) {
    await api.get(`/get/ciudades?estado=${data.value}`,{
        headers: {
            'Authorization': `Bearer ${state.token}`,
        }
    })
    .then((response) =>{
        commit('loadCiudades',response.data,null)
    }).catch(error => {
        commit('loadCiudades',null,error)
    })
}

export async function loadMunicipios ({commit,state},data) {
    await api.get(`/get/municipios?ciudad=${data.value}`,{
        headers: {
            'Authorization': `Bearer ${state.token}`,
        }
    })
    .then((response) =>{
        commit('loadMunicipios',response.data,null)
    }).catch(error => {
        commit('loadMunicipios',null,error)
    })
}

export async function loadParroquias ({commit,state},data) {
    await api.get(`/get/parroquias?ciudad=${data.ciudad.value}&municipio=${data.municipio.value}`,{
        headers: {
            'Authorization': `Bearer ${state.token}`,
        }
    })
    .then((response) =>{
        commit('loadParroquias',response.data,null)
    }).catch(error => {
        commit('loadParroquias',null,error)
    })
}

export async function loadOficinas ({commit,state},data) {
    await api.get(`/get/oficinas?ciudad=${data.value}`,{
        headers: {
            'Authorization': `Bearer ${state.token}`,
        }
    })
    .then((response) =>{
        commit('loadOficinas',response.data,null)
    }).catch(error => {
        commit('loadOficinas',null,error)
    })
}

