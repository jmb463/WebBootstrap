//Definición de variables

var actScroll = true;
var n_json = 1;
var musica = false;

$(document).ready(function(){
	$("#btn_Scroll").click(function(){activarScroll();});
	$("#btn_Sonido").click(function(){playMusica();});
	$("#btn_Noticias").click(function(){cargarNoticias();});
	/*$("#loading").hide();*/ //Esconde el gif al cargar el JSON

}); 

function activarScroll(){
	if (actScroll) {
		actScroll =	false;
		$("#btn_Scroll").text("Off");
	}
	else{
		actScroll = true;
		$("#btn_Scroll").text("Scroll");
	}

}


//Al pulsar el boton reproducir la música

function playMusica(){
        $('#btn_Sonido').toggleClass("down");

        if (musica == false) {
            document.getElementById('player').play();
            musica = true;
            $(this).toggleClass("glyphicon glyphicon-pause");

        } 
        else {
            document.getElementById('player').pause();
            musica = false;
            $(this).toggleClass("glyphicon glyphicon-play-circle");
        }
};

//Carga JSON

$(window).scroll(function (){ //Cargar con scroll
	if (actScroll){
		if ($(window).scrollTop() + $(window).height() + 5 >= $(document).height()) {
			if (n_json < 4) {
				//$("#gifCarga").fadeIn(); Muestra el div mientras carga el JSON
				$.getJSON("https://rawgit.com/jmb463/WebBootstrap/master/JSON/" + "carga" + n_json + ".JSON", function(jsonObject) {
					añadirFila(jsonObject);
					//$("#gifCarga").fadeOut(); Esconder el div al cargar el JSON
				}); n_json++;
			}	
		}
	}

});

function cargarNoticias(){ //Cargar con el botón
	if (n_json < 4) {
		//$("#gifCarga").fadeIn();
		$.getJSON("https://rawgit.com/jmb463/WebBootstrap/master/JSON/" + "carga" + n_json + ".JSON", function(jsonObject) {
			añadirFila(jsonObject);
			//$("gifCarga").fadeOut();
		}); n_json++;
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
