//Definición de variables

var actScroll = true;
var n_json = 1;
var musica = false;
var myaudio = new Audio('musicaPagina/unravel.MP3');

$(document).ready(function(){
	$("#btn_Scroll").click(function(){activarScroll();});
	$("#btn_Sonido").click(function(){playMusica();});
	$("#btn_Noticias").click(function(){cargarNoticias();});
	$("#gifCarga").hide(); //Esconde el gif al cargar el JSON


}); 

function activarScroll(){
	if (actScroll) {
		actScroll =	false;
		$("#btn_Scroll").text("Scroll Off");
		//$('#btn_Scroll').alert("Scroll Desactivado");
	}
	else{
		actScroll = true;
		$("#btn_Scroll").text("Scroll");
		//$('#btn_Scroll').alert("Scroll Activado");
	}

}


//Al pulsar el boton reproducir la música

function playMusica(){
        $('#btn_Sonido').toggleClass("down");

        if (musica == false) {
            myaudio.play();
            musica = true;

        } 
        else {
            myaudio.pause();
            musica = false;
        }
};

//Carga JSON

$(window).scroll(function (){ //Cargar con scroll
	if (actScroll){
		if ($(window).scrollTop() + $(window).height() + 5 >= $(document).height()) {
			if (n_json < 4) {
				$("#gifCarga").fadeIn(250); //Muestra el div mientras carga el JSON
				$.getJSON("https://rawgit.com/jmb463/WebBootstrap/master/JSON/" + "carga" + n_json + ".JSON", function(jsonObject) {
					añadirFila(jsonObject);
					$("#gifCarga").fadeOut(250); //Esconder el div al cargar el JSON
				}); n_json++;
			}

			else{
				$("#boton").text("No hay mas noticias");
			}

		}
	}

});

function cargarNoticias(){ //Cargar con el botón
	
	if (n_json < 4) {
		$("#gifCarga").fadeIn(250); //Muestra el div mientras carga el JSON
		$.getJSON("https://rawgit.com/jmb463/WebBootstrap/master/JSON/" + "carga" + n_json + ".JSON", function(jsonObject) {
			añadirFila(jsonObject);
			$("#gifCarga").fadeOut(250); //Esconder el div al cargar el JSON
		}); n_json++;
	}
	else{
		$("#boton").text("No hay mas noticias");
	}
};

//Colocar los archivos JSON en el container

function añadirFila(json){
	$.each(json, function(i, item) {
		$("#noticias").append(
			'<div class="col-sm-4 col-md-4">'
				+ '<div class="thumbnail">'
					+ '<img src="' + item.imagen + '" class="img-responsive img-circle" "alt="Imagen">'
					+ '<h3 "class="text-center">' + item.titulo + "</h3>"
					+ '<p class="text-muted">' + item.publicacion + "</p>"
					+ '<p class="text-center">' + item.descripcion + "</p>"
			)
	});
};
