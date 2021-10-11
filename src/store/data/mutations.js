

export function updateCourier (state,data) {
    state.dataSelected.courier = data
}
export function updateEstado (state,data) {
    state.dataSelected.estado = data
}
export function updateCiudad (state,data) {
    state.dataSelected.ciudad = data
}
export function updateMunicipio (state,data) {
    state.dataSelected.municipio = data
}
export function updateParroquia (state,data) {
    state.dataSelected.parroquia = data
}
export function updateOficina (state,data) {
    state.dataSelected.oficina = data
}

export function loadCouriers (state,data,error) {
    if (!error){
        state.couriersList=[]
        data.forEach(element => {
            var courierRecord = new Object
            courierRecord.label = firstUpperCase(element.nombre)
            courierRecord.value = element._id
            courierRecord.category = 1
            courierRecord.data = element
            state.couriersList.push(courierRecord)
        });
       
    }else{
        state.error = error
    }
}

export function loadEstados (state,data,error) {
    if (!error){
        state.estadosList=[]
        data.forEach(element => {
            var estadosRecord = new Object
            estadosRecord.label =element.nombre
            estadosRecord.value = element._id
            estadosRecord.category = 1
            state.estadosList.push(estadosRecord)
        });
    }else{
        state.error = error
    }
}

export function loadCiudades (state,data,error) {
    if (!error){
        state.ciudadesList=[]
        data.forEach(element => {
            var ciudadesRecord = new Object
            ciudadesRecord.label =element.nombre
            ciudadesRecord.value = element._id
            ciudadesRecord.category = 1
            state.ciudadesList.push(ciudadesRecord)
        });
    }else{
        state.error = error
    }
}

export function loadMunicipios (state,data,error) {
    if (!error){
        state.municipiosList=[]
        data.forEach(element => {
            var municipiosRecord = new Object
            municipiosRecord.label =element.nombre
            municipiosRecord.value = element._id
            municipiosRecord.category = 1
            state.municipiosList.push(municipiosRecord)
        });
    }else{
        state.error = error
    }
}

export function loadParroquias (state,data,error) {
    if (!error){
        state.parroquiasList=[]
        data.forEach(element => {
            var parroquiasRecord = new Object
            parroquiasRecord.label =element.nombre
            parroquiasRecord.value = element._id
            parroquiasRecord.category = 1
            state.parroquiasList.push(parroquiasRecord)
        });
    }else{
        state.error = error
    }
}

export function loadOficinas (state,data,error) {
    if (!error){
        state.oficinasList=[]
        data.forEach(element => {
            var oficinasRecord = new Object
            oficinasRecord.label =element.nombre
            oficinasRecord.value = element._id
            oficinasRecord.category = 1
            state.oficinasList.push(oficinasRecord)
        });
    }else{
        state.error = error
    }
}



function firstUpperCase(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }