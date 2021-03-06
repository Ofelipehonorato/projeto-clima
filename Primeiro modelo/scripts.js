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
    relogio.innerHTML = `${hour}:${minute}:${second}`
    /*if (hours == 19){
        document.body.style.backgroundImage = 'url("./img/noite.jpg")'
        document.body.style.backgroundSize = '1920px 1280px'
    } else {
        document.getElementsByClassName('.fundo')
    }*/
}
setInterval (() =>{
    getHours()
}, 1000)

    /* Dia da semana e o mês*/
    //const day = document.getElementById('day')
    const today = document.getElementById('today')
    const dayName = new Array ("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado")
    const monName = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",  "Agosto", "Outubro", "Novembro", "Dezembro")
    const now = new Date
    //day.innerHTML = `${dayName[now.getDay()]}`
    today.innerHTML = `${dayName[now.getDay()]}, ${now.getDate()} de ${monName[now.getMonth()]}`
    //${now.getFullYear()}`

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

/*

function getUserPosition (){
    let url
    navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude
    let long = pos.coords.longitude
    let lat = -24.185328146414506
    let long = -53.027645501892295
    console.log(lat,long)
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=8976b0eb3f4b9db17efd2dec5afd210b`;
    fetchApi(url);
    })     
}

getUserPosition()
*/


/* Imprimir informações do clima */
function fetchApi(url){
    let cidade = document.querySelector('.cidade')
    let temp = document.querySelector('.temp')
    let umidade = document.querySelector('.umidade')
    let icone = document.querySelector('.icone')
    fetch(url)
    .then((data) => {
        return data.json();
})
    .then((data) =>{
        let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(1)
        cidade.innerHTML = `${data.name}`
        temp.innerHTML = `🌡${tempInCelsius}°C`
        umidade.innerHTML = `💧${data.main.humidity}%`
        let iconName = data.weather[0].icon
        icone.innerHTML = `<img src="../icons/${iconName}.png">`
        let id = data.weather[0].id
        console.log(iconName)
        if (id >= 200 && id <= 531){ // Chuva
            document.querySelector('#fundo').setAttribute('src', '../img/chuvisco1.jpg')
            document.querySelector('.display').style.color = '#edf6f9'
        }
        else if (id >= 600 && id <= 622){ // Neve
            document.querySelector('#fundo').setAttribute('src', '../img/neve1.jpg');
            document.querySelector('.display').style.color = '#edf6f9'
        } 
        else if (id >= 701 && id <= 781){ // Vento
            document.querySelector('#fundo').setAttribute('src', '../img/vendaval1.jpg');
            document.querySelector('.display').style.color = '#e5e5e5'
        } 
        else if (id >= 801 && id <= 805){ // Nublado 1
            document.querySelector('#fundo').setAttribute('src', '../img/nublado1.jpg');
            document.querySelector('.display').style.color = 'black'
        } 
        else if (id == 800){ // Céu limpo dia
            document.querySelector('#fundo').setAttribute('src', '../img/sol.jpg');
            document.querySelector('.display').style.color = '#edf6f9'
        } 
        
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
