/* Hora e ano*/
function getHours() {
    let relogio = document.getElementsByClassName('relogio')[0]
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let hour = minutes < 10 ? `${hours}` : hours
    let minute = minutes < 10 ? `0${minutes}` : minutes
    let second = seconds < 10 ? `0${seconds}` : seconds
    relogio.innerHTML = `${hour}<br>${minute}<br>Hr`
}
setInterval (() =>{
    getHours()
}, 1000)

    /* Dia da semana e o mês*/
    let dia = document.querySelector('.dia')
    let data = document.querySelector('.data')
    let dayName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    let monName = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",  "Agosto", "Outubro", "Novembro", "Dezembro")
    let now = new Date
    dia.innerHTML = `<img src="./icons/calendario.png" width="30px">${dayName[now.getDay()]}, ${now.getDate()} de ${monName[now.getMonth()]}`
    //data.innerHTML = `${now.getDate()} de ${monName[now.getMonth()]}`
    let diaDoDia
switch (now.getDay()){
    case 0:
        diaDoDia = 'Domingo'
        document.querySelector('.domingo').style.backgroundColor = '#fca311'
        document.querySelector('.domingo').style.borderRadius = '50%'
        document.querySelector('.domingo').style.height = '30px'
        document.querySelector('.domingo').style.width = '30px'
        break  
    case 1:
        diaDoDia = 'Segunda'
        document.querySelector('.segunda').style.backgroundColor = '#fca311'
        document.querySelector('.segunda').style.borderRadius = '50%'
        document.querySelector('.segunda').style.height = '30px'
        document.querySelector('.segunda').style.width = '30px'
        break
    case 2:
        diaDoDia = 'Terça'
        document.querySelector('.terca').style.backgroundColor = '#fca311'
        document.querySelector('.terca').style.borderRadius = '50%'
        document.querySelector('.terca').style.height = '30px'
        document.querySelector('.terca').style.width = '30px'
        break
    case 3:
        diaDoDia = 'Quarta'
        document.querySelector('.quarta').style.backgroundColor = '#fca311'
        document.querySelector('.quarta').style.borderRadius = '50%'
        document.querySelector('.quarta').style.height = '30px'
        document.querySelector('.quarta').style.width = '30px'
        break
    case 4:
        diaDoDia = 'Quinta'
        document.querySelector('.quinta').style.backgroundColor = '#fca311'
        document.querySelector('.quinta').style.borderRadius = '50%'
        document.querySelector('.quinta').style.height = '30px'
        document.querySelector('.quinta').style.width = '30px'
        break
    case 5:
        diaDoDia = 'Sexta'
        document.querySelector('.sexta').style.backgroundColor = '#fca311'
        document.querySelector('.sexta').style.borderRadius = '50%'
        document.querySelector('.sexta').style.height = '30px'
        document.querySelector('.sexta').style.width = '30px'
        break
    case 6:
        diaDoDia = 'Sabado'
        document.querySelector('.sabado').style.backgroundColor = '#fca311'
        document.querySelector('.sabado').style.borderRadius = '50%'
        document.querySelector('.sabado').style.height = '30px'
        document.querySelector('.sabado').style.width = '30px'
        break
}


/* Consulta da localização  */
window.addEventListener('load', () => {
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(getUserPosition, showError)
    }
    else {
        alert('Suporte a localização não habilitado')
    }
    function getUserPosition(position){
        let url
        let lat = position.coords.latitude;
        let long = position.coords.longitude
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=8976b0eb3f4b9db17efd2dec5afd210b`;
    fetchApi(url);
    }
    function showError(error){
        alert(`Suporte a localização não habilitado`)
    }
})

/* Imprimir informações do clima da API */
function fetchApi(url){
    let cidade = document.querySelector('.cidade')
    let temp = document.querySelector('.temp')
    let umidade = document.querySelector('.umidade')
    let icone = document.querySelector('.icone')
    let vento = document.querySelector('.vento')
    
    fetch(url)
    .then((data) => {
        return data.json();
})
    .then((data) =>{
        let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(0)
        cidade.innerHTML = `${data.name}`
        temp.innerHTML = `<img src="./icons/temperatura.png" width="30px">${tempInCelsius}°C`
        umidade.innerHTML = `<img src="./icons/umidade.png" width="30px">${data.main.humidity}%`
        let iconName = data.weather[0].icon
        let id = data.weather[0].id
        icone.innerHTML = `<img src="./icons/${iconName}.png">`
        let iconVento = (1.60 * (data.wind.speed)).toFixed(0)
        vento.innerHTML = `<img src="./icons/vento.png" width="30px">${iconVento}Km/h`
        iconName = 800
        console.log(iconName)
        resizeImage();
})
    .catch((error) => {
    alert('Impossível acessar sua localização')
    cidade.innerText = ``
    temp.innerText = `-`
    })    
    
}

window.onresize = resizeImage;

function resizeImage()
{
    let height = window.innerHeight;
    let width = window.innerWidth;
    
    var nWidth =  (height*1920)/1080;
    var nHeight = (width*1080)/1920;
    if(nWidth <= width){        
        document.querySelector('#fundo').style.width=width+"px";
        document.querySelector('#fundo').style.height=height+"px";
    }
    else{      
        document.querySelector('#fundo').style.width=nWidth+"px";
        document.querySelector('#fundo').style.height=height+"px";
    }
    //document.querySelector('#fundo');
}
