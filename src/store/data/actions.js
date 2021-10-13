import { api } from 'boot/axios'

export async function loadCouriers ({commit}) {
    await api.get(`/get/couriers`)
    .then((response) =>{
        commit('loadCouriers',response.data,null)
    }).catch(error => {
        commit('loadCouriers',null,error)
    })
}

export async function loadEstados ({commit},data) {
    await api.get(`/get/estados?courier=${data.value}`)
    .then((response) =>{
        commit('loadEstados',response.data,null)
    }).catch(error => {
        commit('loadEstados',null,error)
    })
}

export async function loadCiudades ({commit},data) {
    await api.get(`/get/ciudades?estado=${data.value}`)
    .then((response) =>{
        commit('loadCiudades',response.data,null)
    }).catch(error => {
        commit('loadCiudades',null,error)
    })
}

export async function loadMunicipios ({commit},data) {
    await api.get(`/get/municipios?ciudad=${data.value}`)
    .then((response) =>{
        commit('loadMunicipios',response.data,null)
    }).catch(error => {
        commit('loadMunicipios',null,error)
    })
}

export async function loadParroquias ({commit},data) {
    await api.get(`/get/parroquias?ciudad=${data.ciudad.value}&municipio=${data.municipio.value}`)
    .then((response) =>{
        commit('loadParroquias',response.data,null)
    }).catch(error => {
        commit('loadParroquias',null,error)
    })
}

export async function loadOficinas ({commit},data) {
    await api.get(`/get/oficinas?ciudad=${data.value}`)
    .then((response) =>{
        commit('loadOficinas',response.data,null)
    }).catch(error => {
        commit('loadOficinas',null,error)
    })
}



export async function generateGuide ({commit,state},data) {
    await api.post(`/generar/guia`,
        data,
        state.configHeader
    )
    .then((response) =>{
        commit('generatedGuide',response.data,null)
    }).catch(error => {
        commit('generatedGuide',null,error)
    })
}


export async function getTarifa ({commit,state},data) {
    await api.get(`/get/calcularTarifa?courier=${data.courier}&ciudad=${data.ciudad}&cantidadPiezas=${data.cantidadPiezas}&peso=${data.peso}&seguro=${data.seguro}&valor=${data.valor}&tipoTarifa=${data.tipoTarifa}&modalidadTarifa=${data.modalidadTarifa}&oficina=${data.oficina}`,state.configHeader)
    .then((response) =>{
        commit('loadTarifa',response.data,null)
    }).catch(error => {
        commit('loadTarifa',null,error)
    })
}

