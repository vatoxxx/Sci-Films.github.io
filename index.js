$(document).ready(() => {
    $('#hamburger-menu').click(() => {
        $('#hamburger-menu').toggleClass('active')
        $('#nav-menu').toggleClass('active')
    })




})





const API_KEY = 'api_key=eb14a09f4c58d08704bd4b4def69934e';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?${API_KEY}&with_genres=878&language=es-ES&with_original_language=en`;



const API_URL_POPULAR = `${BASE_URL}/discover/movie?${API_KEY}&with_genres=878&language=es-ES&sort_by=popularity.desc&page=3`;


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















//*parte de abajo*/

const main2 = document.getElementById('main2'); // Use the correct variable name

const TRENDING_API_URL = `${BASE_URL}/trending/movie/week?${API_KEY}&with_genres=878&language=es-ES&with_original_language=en`;

getMovies2(TRENDING_API_URL);

// Declare carouselContent at a higher scope
const carouselContent2 = document.createElement('div');
carouselContent2.classList.add('owl-carousel', 'top-movies-slide');


// Use async/await to handle asynchronous calls
async function getMovies2(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        await Promise.all(data.results.map(movie => getMovieDetails2(movie.id)));
        console.log('All movie details fetched.');
        // Now call showMovies after all details have been fetched
        showMovies2();
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function getMovieDetails2(movieId) {
    const MOVIE_DETAILS_URL = `${BASE_URL}/movie/${movieId}?${API_KEY}&append_to_response=casts,videos,images,releases&language=es-ES`;

    return fetch(MOVIE_DETAILS_URL)
        .then(res => res.json())
        .then(data => {
            const movieEl = showMovie2(data);
            carouselContent2.appendChild(movieEl);
            console.log('Movie details fetched:', data);
        })
        .catch(error => console.error('Error fetching movie details:', error));
}


function showMovies2() {
    main2.innerHTML = '';
    main2.appendChild(carouselContent2);

    $('.owl-carousel.top-movies-slide').owlCarousel({ // Use the correct class selector
        items: 6,
        dots: false,
        loop: true,
        autoplay: false,
        autoplayHoverPause: true,
        responsive:{
            500:{
                items:3
            },
            1280:{
                items:4
            },
            1600:{
                items:6
            }
        }
    });
}

function showMovie2(data) {
    const { title, poster_path, vote_average, overview, backdrop_path, runtime, id, releases:{countries:[{certification}]}  } = data;


    const roundedVoteAverage = parseFloat(vote_average).toFixed(2);

    const movieEl2 = document.createElement('div');
    movieEl2.classList.add('movie-item');

    movieEl2.innerHTML = `
    <!--movie item-->
    <div class="top-movie-slide">
    <a href="peliculas.html" onclick="getmoviedeta(${id})">
        <img src="${IMG_URL + poster_path}" alt="">
    </a>
        <div class="movie-item-content">
            <div class="movie-item-title">
                <!--nombre-->
                ${title}
            </div>
            <div class="movie-infos">
                <div class="movie-info">
                    <i class="bx bxs-star"></i>
                    <span>${roundedVoteAverage}</span>
                </div>
                <div class="movie-info">
                    <i class="bx bxs-time"></i>
                    <span>${runtime} m</span>
                </div>
                <div class="movie-info">
                    <span>HD</span>
                </div>
                <div class="movie-info">
                    <span>${certification}</span>
                </div>
            </div>
        </div>
    </div>
    <!--end movie item-->
    `;
        

    return movieEl2;

   
}



/*Mejores puntuadas*/


const API_URL_TOP_RATED = `${BASE_URL}/discover/movie?${API_KEY}&with_genres=878&language=es-ES&with_original_language=en&vote_average.gte=7.5&vote_count.gte=300`;

const main3 = document.getElementById('main3'); // Use the correct variable name

getMovies3(API_URL_TOP_RATED);

function getMovies3(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            const sortedMovies = data.results.sort((a, b) => b.vote_average - a.vote_average);
            showMovies3(sortedMovies);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function showMovies3(data) {
    // Fix the getElementById method
    main3.innerHTML = '';

    const header = document.createElement('div');
    header.classList.add('section-header'); // Keep the class names consistent
    header.textContent = 'Mejores Puntuadas';

    const Container = document.createElement('div');
    Container.classList.add('container'); // Keep the class names consistent

    const section = document.createElement('div');
    section.classList.add('section'); // Keep the class names consistent

    const carouselContent3 = document.createElement('div');
    carouselContent3.classList.add('movies-slide','carousel-nav-center','owl-carousel'); // Keep the class names consistent

    data.forEach(movie => {
        const movieEl3 = createMovieElement3(movie);
        carouselContent3.appendChild(movieEl3);

    });

    section.appendChild(Container);

    Container.appendChild(header);

    main3.appendChild(section);

    main3.appendChild(carouselContent3);

    let navtext = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"];

    $('.movies-slide').owlCarousel({

        items: 2,
        dots: false,
        nav:true,
        navText:navtext,
        margin:15,
        responsive:{
            500:{
                items:2
            },
            1280:{
                items:4
            },
            1600:{
                items:6
            }
        }

})
}

function createMovieElement3(data) {
    const { title, vote_average, overview, backdrop_path, runtime, poster_path, id , release_date} = data;

    const roundedVoteAverage = parseFloat(vote_average).toFixed(2);

    const movieEl3 = document.createElement('div');


    movieEl3.innerHTML = `
                <a class="movie-item" href="peliculas.html" onclick="getmoviedeta(${id})">
                    <img src="${IMG_URL + poster_path}" alt="">
                    <div class="movie-item-content">
                        <div class="movie-item-title">
                            <!--nombre-->
                            ${title}
                        </div>
                        <div class="movie-infos">
                            <div class="movie-info">
                                <i class="bx bxs-star"></i>
                                <span>${roundedVoteAverage}</span>
                            </div>
                         
                            <div class="movie-info">
                                <span>${release_date.split("-")[0]}</span>
                            </div>
                           
                        </div>
                    </div>
                </a>

`;

    return movieEl3;
}



/*Peliculas Populares*/


const main4 = document.getElementById('main4'); // Use the correct variable name

getMovies4(API_URL_POPULAR);

   // Fix the getElementById method
   main4.innerHTML = '';

   const header = document.createElement('div');
   header.classList.add('section-header'); // Keep the class names consistent
   header.textContent = 'Peliculas Populares';

   const Container = document.createElement('div');
   Container.classList.add('container'); // Keep the class names consistent

   const section = document.createElement('div');
   section.classList.add('section'); // Keep the class names consistent

   const carouselContent4 = document.createElement('div');
   carouselContent4.classList.add('movies-slide','carousel-nav-center','owl-carousel'); // Keep the class names consistent


// Use async/await to handle asynchronous calls
async function getMovies4(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        await Promise.all(data.results.map(movie => getMovieDetails4(movie.id)));
        console.log('All movie details fetched.');
        // Now call showMovies after all details have been fetched
        showMovies4();
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function getMovieDetails4(movieId) {
    const MOVIE_DETAILS_URL = `${BASE_URL}/movie/${movieId}?${API_KEY}&append_to_response=casts,videos,images,releases&language=es-ES`;

    return fetch(MOVIE_DETAILS_URL)
        .then(res => res.json())
        .then(data => {
            const movieEl = showMovie4(data);
            carouselContent4.appendChild(movieEl);
            console.log('Movie details fetched:', data);
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

function showMovies4() {
    section.appendChild(Container);

    Container.appendChild(header);

    main4.appendChild(section);

    main4.appendChild(carouselContent4);

    let navtext = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"];

    $('.movies-slide').owlCarousel({

        items: 2,
        dots: false,
        nav:true,
        navText:navtext,
        margin:15,
        responsive:{
            500:{
                items:2
            },
            1280:{
                items:4
            },
            1600:{
                items:6
            }
        }

});
}

function showMovie4(data) {
    const { title, poster_path, vote_average, overview, backdrop_path, runtime, id, releases:{countries:[{certification}]}  } = data;


    const roundedVoteAverage = parseFloat(vote_average).toFixed(2);

    const movieEl4 = document.createElement('div');
    movieEl4.classList.add('movie-item');

    movieEl4.innerHTML = `
    <!--movie item-->
    <div class="top-movie-slide">
    <a href="peliculas.html" onclick="getmoviedeta(${id})">
        <img src="${IMG_URL + poster_path}" alt="">
    </a>
        <div class="movie-item-content">
            <div class="movie-item-title">
                <!--nombre-->
                ${title}
            </div>
            <div class="movie-infos">
                <div class="movie-info">
                    <i class="bx bxs-star"></i>
                    <span>${roundedVoteAverage}</span>
                </div>
                <div class="movie-info">
                    <i class="bx bxs-time"></i>
                    <span>${runtime} m</span>
                </div>
                <div class="movie-info">
                    <span>HD</span>
                </div>
                <div class="movie-info">
                    <span>${certification}</span>
                </div>
            </div>
        </div>
    </div>
    <!--end movie item-->
    `;
        

    return movieEl4;

   
}


/*prueba*/

const getmoviedeta = function(movieID){
    window.localStorage.setItem("movieID",String(movieID));
    console.log(movieID);
}

/*end prueba*/ 


/*Pelicula destacada*/




const MOVIE_DESTACADA = `${BASE_URL}/movie/18491?${API_KEY}&append_to_response=casts,videos,images,releases&language=es-ES`;

const main5 = document.getElementById('main5'); // Use the correct variable name

getMovies5(MOVIE_DESTACADA);

async function getMovies5(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        showMovies5(data);
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

function showMovies5(data) {
    // Fix the getElementById method
    main5.innerHTML = '';

    const section = document.createElement('div');
    section.classList.add('section'); // Keep the class names consistent

    const movieEl5 = createMovieElement5(data);
    section.appendChild(movieEl5);



    main5.appendChild(section);


}

function createMovieElement5(data) {
    const { title, vote_average, overview, backdrop_path, runtime, poster_path , id, releases:{countries:[{certification}]} } = data;

    const roundedVoteAverage = parseFloat(vote_average).toFixed(2);

    const movieEl5 = document.createElement('div');
    movieEl5.classList.add('hero-slide-item');

    movieEl5.innerHTML = `
        <img src="${IMG_URL + backdrop_path}" alt="">
        <div class="overlay"></div>
        <div class="hero-slide-item-content">
            <div class="item-content-wrapper">
                <div class="item-content-title">
                    ${title}
                </div>
                <div class="movie-infos">
                    <div class="movie-info">
                        <i class="bx bxs-star"></i>
                        <span>${roundedVoteAverage}</span>
                    </div>
                    <div class="movie-info">
                        <i class="bx bxs-time"></i>
                        <span>${runtime} mins</span>
                    </div>
                    <div class="movie-info">
                        <span>HD</span>
                    </div>
                    <div class="movie-info">
                        <span>${certification}</span>
                    </div>
                </div>
                <div class="item-content-description">
                    ${overview}
                </div> 
                <div class="item-action">
                    <a href="peliculas.html" class="btn btn-hover" onclick=getmoviedeta(${id})>
                        <i class="bx bxs-right-arrow"></i>
                        <span>Ver Ahora</span>
                    </a>
                </div>
            </div>
        </div>
    </div>`;

    return movieEl5;
}