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
    //getE('formulario-img').style.width = (window.innerWidth-200)+'px'

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
        if(puntos[i].h!=null&&puntos[i].h!=undefined){
            if(puntos[i].h=='1/2'){
                h = (punto.offsetWidth/2)
            }else if(puntos[i].h=='1/3'){
                h = (punto.offsetWidth/3)
            }else if(puntos[i].h=='1/10'){
                h = (punto.offsetWidth/10)
            }
        }

        if(puntos[i].m!=null&&puntos[i].m!=undefined){
            var signo = document.createElement('div')
            if(puntos[i].mp!=null&&puntos[i].mp!=undefined){
                signo.className = 'signo signo-'+puntos[i].mp
            }else{
                signo.className = 'signo signo-right'
            }
            signo.innerHTML = '<img src="assets/images/icon-signo.svg" />'
            signo.setAttribute('onclick','clickSigno('+i+',this)')
            punto.appendChild(signo)
        }
        punto.style.height = h+'px'
        punto.style.left = puntos[i].x+'%'
        punto.style.top = puntos[i].y+'%'
    }
}

var animating_signo = false;
var animacion_signo = null;
var tooltip_status = 'off'

function clickSigno(s,div){
    if(!animating_signo){
        if(tooltip_status=='off'){
            getE('tooltip-txt').innerHTML = puntos[s].m
            getE('tooltip').className = 'tooltip-on'
            setTooltipPos(s,div)
            tooltip_status = 'on'
        }else{
            animating_signo = true;
            getE('tooltip').className = 'tooltip-off'
            animacion_signo = setTimeout(function(){
                clearTimeout(animacion_signo)
                animacion_signo = null

                getE('tooltip-txt').innerHTML = puntos[s].m
                getE('tooltip').className = 'tooltip-on'
                setTooltipPos(s,div)
                tooltip_status = 'on'
                animating_signo = false;
            },250)
        }
    }
}

function setTooltipPos(s,div){
    over_mp3.play()
    var posx = div.getBoundingClientRect().left
    var posy = div.getBoundingClientRect().top

    var signo_width = (div.getBoundingClientRect().width / 2)
    getE('tooltip').style.left = (posx + signo_width)+'px'
    getE('tooltip').style.top = (posy - 10)+'px'
}

function zoomIn(){
    
}