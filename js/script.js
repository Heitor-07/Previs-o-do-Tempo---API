
const keyAPI = "Sua chave OpenWeather API";

const Wbody = document.getElementsByTagName('body')[0];
const btnSearch = document.getElementById('btn-search');
const citySearch = document.getElementById('citySearch');
const titleCity = document.querySelector('.TitleCity');
const country = document.querySelector('.country');
const descTemperatura = document.querySelector('.descTemperatura span');
const descVento = document.querySelector('.descVento');
const descUmidade = document.querySelector('.descUmidade');
const descricaoTempo = document.querySelector('.descricaoTempo');
const imageTempo = document.querySelector('.image img');

const sectionHoje = document.querySelector('.hoje');

const messageError = document.querySelector('.messageError');
const loading = document.querySelector('#loading');

const iconImage = document.querySelector('#icon-img');

const showSection = () => {
    sectionHoje.classList.add('hide');
}

const loadingData = () => {
    loading.classList.toggle('hide');
}

showSection();
loadingData();

const getWeatherCity = async(city) =>{

    Wbody.style.backgroundImage = 'url()';
    showSection();
    loadingData();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keyAPI}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    if(data.cod === '404'){
        sectionHoje.classList.add('hide');
        messageError.classList.remove('hide');
        loadingData();
        Wbody.style.backgroundImage = 'url()';
    } else{
        messageError.classList.add('hide')
        loading.classList.add('hide');
    }

    titleCity.innerText = data.name;
    country.innerText = data.sys.country;
    descTemperatura.innerText = parseInt(data.main.temp);
    descVento.innerText = `${parseInt(data.wind.speed * 10)}km/h`;
    descUmidade.innerText = `${data.main.humidity}%`;
    iconImage.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    descricaoTempo.innerText = data.weather[0].description;

    if(data.weather[0].description.indexOf('nublado') >= 0){
        Wbody.style.backgroundImage = 'url(img/nublado.jpeg)';
        Wbody.style.backgroundRepeat = 'no-repeat';
        Wbody.style.backgroundSize = 'cover';
    }
    if(data.weather[0].description.indexOf('limpo') >= 0){
        Wbody.style.backgroundImage = 'url(img/ceu_limpo_dia.jpeg)';
        Wbody.style.backgroundRepeat = 'no-repeat';
        Wbody.style.backgroundSize = 'cover';
    }
    if(data.weather[0].description.indexOf('nuvens') >= 0){
        Wbody.style.backgroundImage = 'url(img/nuvens_dispersas.jpeg)';
        Wbody.style.backgroundRepeat = 'no-repeat';
        Wbody.style.backgroundSize = 'cover';
    }
    if(data.weather[0].description.indexOf('chuva') >= 0){
        Wbody.style.backgroundImage = 'url(img/chuvas_moderada.jpg)';
        Wbody.style.backgroundRepeat = 'no-repeat';
        Wbody.style.backgroundSize = 'cover';
    }

    sectionHoje.classList.remove('hide');

    console.log(data);

}

btnSearch.addEventListener('click', (e) => {

    const city = citySearch.value.toUpperCase();

    getWeatherCity(city);
    console.log(city)
})

citySearch.addEventListener('keyup', (e) => {
    if(e.code === 'Enter'){
        const city = citySearch.value.toUpperCase();

        getWeatherCity(city);
    }
})

