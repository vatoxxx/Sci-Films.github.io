'use strict';

$(document).ready(() => {
    $('#hamburger-menu').click(() => {
        $('#hamburger-menu').toggleClass('active')
        $('#nav-menu').toggleClass('active')
    })




})

const getmoviedeta = function(movieID){
    window.localStorage.setItem("movieID",String(movieID));
    console.log(movieID);
}


const movieID = window.localStorage.getItem("movieID");

const API_KEY = 'api_key=eb14a09f4c58d08704bd4b4def69934e';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w1280';

const CAST =`${BASE_URL}/tv/${movieID}?${API_KEY}&append_to_response=casts,videos,images,releases,credits&language=es-ES`;

const RECOMENDATIONS=`https://api.themoviedb.org/3/tv/${movieID}/recommendations?api_key=eb14a09f4c58d08704bd4b4def69934e&append_to_response=casts,videos,images,releases,credits&language=es-ES`;

const getgenres = function(genrelist){
    const newgenrelist=[];

    for (const {name} of genrelist) newgenrelist.push(name);
    return newgenrelist.join(", ");
}

const getcasts = function(castlist){
    const newcastlist=[];

    for (let i =0, len=castlist.length;i<len && i<10; i++){
        const{name}= castlist[i];
        newcastlist.push(name);
    }
    return newcastlist.join(", ")
}

const getdirectors = function(crewlist){
    const directors=crewlist.filter(({job}) => job=== "Producer");

    const directorlist=[];

    for(const{name} of directors) directorlist.push(name);

    return directorlist.join(", ")
}

const filtervideos = function(videolist){
    return videolist.filter(({type,site}) => (type === "Trailer" || type === "Teaser" && site === "Youtube"));
}


const fetchdata = `${BASE_URL}/movie/${movieID}?${API_KEY}&language=es-ES`;

const main = document.getElementById('main6'); // Use the correct variable name

getMovies5(CAST);

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
    main.innerHTML = '';

    const section = document.createElement('div');
    section.classList.add('section'); // Keep the class names consistent

    const movieEl5 = createMovieElement5(data);
    section.appendChild(movieEl5);



    main.appendChild(section);

 

      


}



function createMovieElement5(data) {
    const { name, vote_average, overview, backdrop_path, runtime, poster_path , id, credits:{cast,crew}, videos:{results:videos}, first_air_date
    ,  genres , number_of_seasons} = data;

    const roundedVoteAverage = parseFloat(vote_average).toFixed(2);


    main.innerHTML = `
    <div class="movie-detail">
    <div class="backdrop-image" style="background-image: url('${IMG_URL + backdrop_path}');"> 
    </div>
    <figure class="poster-box movie-poster">
        <img src="${IMG_URL + poster_path}" alt="" class="img-cover">
    </figure>

    <div class="detail-box">
        <div class="detail-content">
            <h1 class="heading">
                ${name}
            </h1>
            <div class="movie-infos">
                <div class="movie-info">
                    <i class="bx bxs-star"></i>
                    <span>${roundedVoteAverage}</span>
                </div>
                <div class="movie-info">
                    <i class='bx bxs-video-recording' ></i>
                    <span>${number_of_seasons} Temporadas </span>
                </div>
                <div class="movie-info">
                    <i class='bx bx-door-open'></i>
                    <span> Estreno: ${first_air_date}</span>
                </div>
                <div class="movie-info">
                    <span></span>
                </div>
            </div>
            <p class="genre">
                ${getgenres(genres)}
            </p>
            <p class="overview">
            ${overview}
            </p>
            <ul class="detail-list">
                <div class="list-item">
                    <p class="list-name">Elenco:</p>
                    <p>
                        ${getcasts(cast)}
                    </p>
                </div>

                <div class="list-item">
                    <p class="list-name">Producida por:</p>
                    <p>
                        ${getdirectors(crew)}
                    </p>
                </div>



            </ul>


        </div>

        <div class="title-wrapper">
            <h3 class="title-large"> Trailers y Clips</h3>
        </div>

        <div class="slider-list">
            <div class="slider-inner">
          
            </div>
        </div>

        <h1>Valoración de Películas</h1>

<form id="movieForm">
  <label for="comment">Comentario:</label>
  <textarea id="comment" rows="4" cols="50"></textarea>
  <br>
  <label for="rating">Valoración:</label>
  <input type="number" id="rating" min="1" max="10" required>
  <br>
  <button type="button" onclick="submitReview()">Enviar Valoración</button>
</form>

<div id="comments">
  <h2>Comentarios:</h2>
  <ul id="commentsList"></ul>
</div>

    </div>
</div>`;

for (const {key, name} of filtervideos(videos)){

    const videocard = document.createElement('div');
    videocard.classList.add("video-card");

    videocard.innerHTML= `
    <iframe width='500' height='294' src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" 
    allowfullscreen="1" title="${name}" class='img-cover' loading="lazy"></iframe>
    `;

    main.querySelector(".slider-inner").appendChild(videocard);

    


}





}

/*COMENTARIOS DE LA PELICULA*/ 
function submitReview() {
    var commentInput = document.getElementById('comment');
    var ratingInput = document.getElementById('rating');

    var comment = commentInput.value;
    var rating = ratingInput.value;

    if (comment.trim() === '' || isNaN(rating) || rating < 1 || rating > 10) {
      alert('Por favor, ingrese un comentario válido y una valoración entre 1 y 10.');
      return;
    }

    // Crear un elemento de lista con el comentario y la valoración
    var listItem = document.createElement('li');
    listItem.textContent = 'Comentario: ' + comment + ' - Valoración: ' + rating;

    // Agregar el elemento de lista al ul
    var commentsList = document.getElementById('commentsList');
    commentsList.appendChild(listItem);

    // Limpiar los campos del formulario
    commentInput.value = '';
    ratingInput.value = '';
}


/*END COMENTARIOS DE LA PELICULA*/ 


/* recomendaciones */ 

const main4 = document.getElementById('main4'); // Use the correct variable name

getMovies4(RECOMENDATIONS);

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
    const MOVIE_DETAILS_URL = `${BASE_URL}/tv/${movieId}?${API_KEY}&append_to_response=casts,videos,images,releases&language=es-ES`;

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
    const { name, poster_path, vote_average, overview, backdrop_path, runtime, id , number_of_seasons } = data;


    const roundedVoteAverage = parseFloat(vote_average).toFixed(2);

    const movieEl4 = document.createElement('div');
    movieEl4.classList.add('movie-item');

    movieEl4.innerHTML = `
    <!--movie item-->
    <div class="top-movie-slide">
    <a href="seriesdetails.html" onclick="getmoviedeta(${id})">
        <img src="${IMG_URL + poster_path}" alt="">
    </a>
        <div class="movie-item-content">
            <div class="movie-item-title">
                <!--nombre-->
                ${name}
            </div>
            <div class="movie-infos">
                <div class="movie-info">
                    <i class="bx bxs-star"></i>
                    <span>${roundedVoteAverage}</span>
                </div>
                <div class="movie-info">
                    <i class='bx bxs-video-recording' ></i>
                    <span>${number_of_seasons} Temporadas</span>
                </div>
                <div class="movie-info">
                    <span>HD</span>
                </div>
                <div class="movie-info">
                    <span></span>
                </div>
            </div>
        </div>
    </div>
    <!--end movie item-->
    `;
        

    return movieEl4;

   
}