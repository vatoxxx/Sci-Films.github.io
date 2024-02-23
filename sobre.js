'use strict';

const getmoviedeta = function(movieID){
    window.localStorage.setItem("movieID",String(movieID));
    console.log(movieID);
}

$(document).ready(() => {
    $('#hamburger-menu').click(() => {
        $('#hamburger-menu').toggleClass('active')
        $('#nav-menu').toggleClass('active')
    })




    const movieID = window.localStorage.getItem("movieID");




    const main3 = document.getElementById('main3'); // Use the correct variable name


    main3.innerHTML = `
        <div class="section">
            <div class="container">
                <div class="section-header">
                    Sobre Nosotros
                </div>
                <div class="item-content-description">Bienvenido a Sci-Films, 
                tu destino definitivo para explorar el fascinante universo de la ciencia ficción cinematográfica. 
                Nos enorgullece presentar un espacio cuidadosamente creado para los amantes del género, 
                donde la imaginación se fusiona con la tecnología para transportarte a mundos inexplorados y 
                desafiar los límites de lo posible.</div>
                <div class="section-header">
                Nuestra Misión: Elevando la Imaginación a Nuevos Horizontes
                </div>
                <div class="item-content-description">En Sci-Films, creemos fervientemente en la importancia de la ciencia ficción como motor de inspiración y catalizador del progreso tecnológico. Desde sus humildes raíces literarias hasta las grandes producciones cinematográficas de hoy en día, la ciencia ficción ha sido una fuerza impulsora detrás de la innovación y el desarrollo tecnológico.</div>  

                <div class="section-header">
                Explorando Fronteras: La Ciencia Ficción y la Tecnología
                </div>
                <div class="item-content-description">La ciencia ficción no es simplemente entretenimiento; es un faro que ilumina posibilidades futuras. Desde las visiones utópicas hasta las distopías cautivadoras, cada obra nos desafía a contemplar el impacto de la tecnología en nuestras vidas. En Sci-Films, celebramos la capacidad única de la ciencia ficción para anticipar el futuro, inspirar la creatividad y provocar reflexiones profundas sobre la dirección de la sociedad y la tecnología.</div>
                
                <div class="section-header">
                La Influencia de la Ciencia Ficción en la Tecnología Actual
                </div>
                <div class="item-content-description">No podemos subestimar la conexión intrínseca entre la ciencia ficción y la realidad tecnológica. Muchas de las tecnologías que hoy damos por sentado fueron concebidas por primera vez en la mente de visionarios que exploraron el futuro a través de la pluma y la pantalla. Desde comunicadores inspirados en Star Trek hasta asistentes virtuales que evocan a HAL 9000, la ciencia ficción ha desempeñado un papel fundamental al inspirar a los innovadores a convertir la fantasía en realidad.</div>

                <div class="section-header">
                Únete a Nuestra Comunidad: Explora, Comparte, Inspírate
                </div>
                <div class="item-content-description">En Sci-Films, invitamos a todos los entusiastas de la ciencia ficción a unirse a nuestra comunidad. Aquí, puedes explorar las últimas noticias, reseñas y análisis de las películas más emocionantes del género. Únete a conversaciones significativas, comparte tus pensamientos y descubre cómo la ciencia ficción continúa influyendo en nuestro mundo.</div>

                <div class="section-header">
                Descubre el Futuro Hoy
                </div>
                <div class="item-content-description">Sumérgete en un viaje a través de las estrellas y las posibilidades infinitas que solo la ciencia ficción puede ofrecer. En Sci-Films, celebramos el pasado, presente y futuro de la ciencia ficción, reconociendo su impacto duradero en la forma en que percibimos y abrazamos la tecnología. ¡Bienvenido a una experiencia donde la imaginación se encuentra con la innovación!</div>
            </div> 
        </div>`;
 


})





const API_KEY = 'api_key=eb14a09f4c58d08704bd4b4def69934e';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?${API_KEY}&with_genres=878&language=es-ES&with_original_language=en`;



const API_URL_SERIES = `${BASE_URL}/discover/tv?${API_KEY}&with_genres=10765&language=es-ES&with_original_language=en`;
const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
const main = document.getElementById('main');

getMovies(API_URL);

// Declare carouselContent at a higher scope
const carouselContent = document.createElement('div');
carouselContent.classList.add('owl-carousel', 'carousel-nav-center');
carouselContent.id = 'hero-carousel';

// Use async/await to handle asynchronous calls
async function getMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        await Promise.all(data.results.map(movie => getMovieDetails(movie.id)));
        console.log('All movie details fetched.');
        // Now call showMovies after all details have been fetched
        showMovies();
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function getMovieDetails(movieId) {
    const MOVIE_DETAILS_URL = `${BASE_URL}/movie/${movieId}?${API_KEY}&append_to_response=casts,videos,images,releases&language=es-ES`;

    return fetch(MOVIE_DETAILS_URL)
        .then(res => res.json())
        .then(data => {
            const movieEl = showMovie(data);
            carouselContent.appendChild(movieEl);
            console.log('Movie details fetched:', data);
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

function showMovies() {
    main.innerHTML = '';
    main.appendChild(carouselContent);

    let navtext = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"];
    $('#hero-carousel').owlCarousel({
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: navtext,
        autoplay: true,
        autoplayHoverPause: true
    });
}


function showMovie(data) {
    const { title, poster_path, vote_average, overview, backdrop_path, runtime, id, releases:{countries:[{certification}]}  } = data;

    const roundedVoteAverage = parseFloat(vote_average).toFixed(2);

    const movieEl = document.createElement('div');
    movieEl.classList.add('hero-slide');

    
    movieEl.innerHTML = `
        <div class="hero-slide-item">
            <img src="${IMG_URL + backdrop_path}" alt="">
            <div class="overlay"></div>
            <div class="hero-slide-item-content">
                <div class="item-content-wrapper">
                    <div class="item-content-title top-down ">${title}</div>
                    <div class="movie-infos top-down delay-2">
                        <div class="movie-info">
                            <i class="bx bxs-star"></i>
                            <span>${roundedVoteAverage}</span>
                        </div>
                        <div class="movie-info">
                            <i class="bx bxs-time"></i>
                            <span>${runtime} minutos</span>
                        </div>
                        <div class="movie-info">
                            <span>HD</span>
                        </div>
                        <div class="movie-info">
                            <span>${certification}</span>
                        </div>
                    </div>
                    <div class="item-content-description top-down delay-4">${overview}</div> 
                    <div class="item-action top-down delay-6">
                        <a href="peliculas.html" class="btn btn-hover" onclick="getmoviedeta(${id})">
                            <i class="bx bxs-right-arrow"></i>
                            <span>Ver Ahora</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;


        

    return movieEl;

   
}



