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

/* Imprimir informações do clima */
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
        let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(1)
        cidade.innerHTML = `${data.name}`
        temp.innerHTML = `<img src="./icons/temperatura.png" width="30px">${tempInCelsius}°C`
        umidade.innerHTML = `<img src="./icons/umidade.png" width="30px">${data.main.humidity}%`
        let iconName = data.weather[0].icon
        icone.innerHTML = `<img src="./icons/${iconName}.png">`
        let id = data.weather[0].id
        let iconVento = data.wind.speed
        vento.innerHTML = `<img src="./icons/vento.png" width="30px">
         ${iconVento}`
        //id = 500
        console.log(url)
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
