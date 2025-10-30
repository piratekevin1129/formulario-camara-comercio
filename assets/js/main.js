var i = 0;
var j = 0;

function loadTrack(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        console.log("error cargando")
        data.callBack(null)
    })
}

function loadImg(data){
    var img = new Image()
    img.onload = function(){
        img.onload = null
        img.onerror = null
        data.callBack(img)
    }
    img.onerror = function(){
        img.onload = null
        img.onerror = null
        data.callBack(null)   
    }
    img.src = data.src
}

function getE(idname){
    return document.getElementById(idname)
}

function prepareFormulario(){
    getE('formulario-img').style.width = (window.innerWidth-200)+'px'

    for(i = 0;i<puntos.length;i++){
        var punto = document.createElement('div')
        if(puntos[i].t=='opcional'){
            punto.className = 'formulario-punto-opcional'
            getE('formulario-opcional').appendChild(punto)
        }else if(puntos[i].t=='obligatorio-si'){
            punto.className = 'formulario-punto-obligatorio-si'
            getE('formulario-obligatorio-si-causal').appendChild(punto)
        }else if(puntos[i].t=='obligatorio-no'){
            punto.className = 'formulario-punto-obligatorio-no'
            getE('formulario-obligatorio-no-causal').appendChild(punto)
        }
        punto.innerHTML = i

        punto.style.width = puntos[i].w+'%'
        var h = punto.offsetWidth
        punto.style.height = h+'px'
    }
}