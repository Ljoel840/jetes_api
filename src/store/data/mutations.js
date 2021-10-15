//---------- Inicializar List-----------------
export function initCouriers (state) {
    state.couriersList = []
}
export function initEstados (state) {
    state.estadosList = []
}
export function initCiudades (state) {
    state.ciudadesList = []
}
export function initMunicipios (state) {
    state.municipiosList = []
}
export function initParroquias (state) {
    state.parroquiasList = []
}
export function initOficinas (state) {
    state.oficinasList = []
}

//---------- Actualizar List-----------------
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


export function updateOtherData (state,data) {
    state.dataSelected.destinatario= data.destinatario,
    state.dataSelected.contacto= data.contacto,
    state.dataSelected.cirif= data.cirif,
    state.dataSelected.telefono= data.telefono,
    state.dataSelected.direccion= data.direccion,
    state.dataSelected.inmueble= data.inmueble,
    state.dataSelected.descripcionPaquete= data.descripcionPaquete,
    state.dataSelected.referencia= data.referencia,
    state.dataSelected.numeroPiezas= data.numeroPiezas,
    state.dataSelected.peso= data.peso,
    state.dataSelected.tipoEnvio= data.tipoEnvio,
    state.dataSelected.valor= data.valor,
    state.dataSelected.tipoServicio= data.tipoServicio,
    state.dataSelected.retirarOficina= data.retirarOficina,
    state.dataSelected.seguro= data.seguro
}

//---------- Cargar List-----------------
export function loadCouriers (state,data,error) {
    state.errorList = null
    if (!error){
        state.couriersList=[]
        data.forEach(element => {
            var courierRecord = new Object
            courierRecord.label = firstUpperCase(element.nombre)
            courierRecord.value = element._id
            courierRecord.category = 1
            // courierRecord.data = element
            state.couriersList.push(courierRecord)
        });
       
    }else{
        state.errorList = error
    }
}

export function loadEstados (state,data,error) {
    state.errorList = null
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
        state.errorList = error
    }
}

export function loadCiudades (state,data,error) {
    state.errorList = null
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
        state.errorList = error
    }
}

export function loadMunicipios (state,data,error) {
    state.errorList = null
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
        state.errorList = error
    }
}

export function loadParroquias (state,data,error) {
    state.errorList = null
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
        state.errorList = error
    }
}

export function loadOficinas (state,data,error) {
    state.errorList = null
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
        state.errorList = error
    }
}

//--------------------------------------------------
export function loadTarifa (state,data,error) {
    state.tarifa.ok= false
    state.tarifa.data={}
    if (!error){
        state.tarifa.data=data
        state.tarifa.ok= true
    }else{
        state.tarifa.error = error
    }
}

export function generatedGuide (state,data,error) {
    state.guide.ok = false
    state.guide.data = {}
    if (!error){
        state.guide.data = data
        state.guide.ok = true
    }else{
        state.guide.error = error
    }
}

export function generatedTracking (state,data,error) {
    state.tracking.ok= false
    state.tracking.data={}
    if (!error){
        state.tracking.data=data
        state.tracking.ok= true
    }else{
        state.tracking.error = error
    }
}

export function generatedPdfGuide (state,data,error) {
    state.pdfGuide.ok = false
    state.pdfGuide.data = {}
    if (!error){
        state.pdfGuide.data = data
        state.pdfGuide.ok = true
    }else{
        state.pdfGuide.error = error
    }
}




// --------------------------------------------------------------------------
function firstUpperCase(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }