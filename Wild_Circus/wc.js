//wait screen pendant le chargement de la page
function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1600);

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
    show('page', true);
    show('loading', false);
});

//smooth scroll au clic sur un bouton du menu
$(document).ready(function() {
		$('#menu a').on('click', function(e) {
    	e.preventDefault();
			var page = $(this).attr('href');
			var speed = 750;
			$('html, body').animate( { scrollTop: $(page).offset().top }, speed );
			return false;
		});
});

//scrolling controlé via jquery
$(document).ready(function() {
	var lastAnimation = 0;
	var animationTime = 750;
	var quietPeriod = 0;

 	$('section').bind('mousewheel DOMMouseScroll', function(event){
		var page = '#' + $(this).attr('id');
		//J'ai dut rajouter ces 2 variables pour vérifier leurs
		//valeures true et éviter les erreur dans la console.
		var nextPageId = $(page).next('section').attr('id');
		var prevPageId = $(page).prev('section').attr('id');
		var nextPage = '#' + nextPageId;
		var prevPage = '#' + prevPageId;
		var timeNow = new Date().getTime();

		//Ici on vérifit que l'animation soit bien finie avant d'en relancer
		// une à nouveau, ce qui a pour effet de créer de grosses latences.
		if(timeNow - lastAnimation < quietPeriod + animationTime) {
        event.preventDefault();
        return;
    }
		else if((event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0) && (prevPageId)) {
			lastAnimation = timeNow;
			console.log("up");
			$('html, body').animate( { scrollTop: $(prevPage).offset().top }, animationTime );
			return false;
		}
		else if((event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) && (nextPageId)) {
			lastAnimation = timeNow;
			console.log("down");
			$('html, body').animate( { scrollTop: $(nextPage).offset().top}, animationTime );
			return false;
		}
		else {
			event.preventDefault();
			return;
		}
  });
});

//Menu réactif à la position de la page
$(document).ready( function() {
	$(window).scroll(function() {
	var dx = $(window).height();
	var scrollDx = $(window).scrollTop();
	function clean() {
		$('#menu a').removeClass('target');
	};
	function tar() {
		addClass('target');
	}
		if((scrollDx >= 0) && (scrollDx < 0.5 * dx)) {
			clean();
			$('#menu li:nth-child(1) a').addClass('target');
		} else if((scrollDx > 0.4 * dx) && (scrollDx < 1.5 * dx)) {
			clean();
			$('#menu li:nth-child(2) a').addClass('target');
		} else if((scrollDx > 1.4 * dx) && (scrollDx < 2.5 * dx)){
			clean();
			$('#menu li:nth-child(3) a').addClass('target');
		}
	});
});
//apparition du mini-logo quand nous ne sommes pas sur le home

$(document).ready( function() {
	$(window).scroll(function() {
		var mini = $('.mini_logo');
		 if($(window).scrollTop() > 0.99 * $(window).height() ) {
				mini.fadeIn(200);
		 } else {
				mini.fadeOut(50);
		 }
	});
});

//menu de présentation des numéros
$(document).ready(function(event) {
	var speed = 600;
	$('.pres_photo a').on('click', function(event) {
		event.preventDefault();
		var thisPerf = $(this).attr('href');
		$('article').not(thisPerf).slideUp(speed);
		$(thisPerf).slideToggle(speed);
	});
});

//mise en valeure numéro développé
$(document).ready( function() {
	$('.pres_photo').on('click', function () {
	var notThisPhoto = $('.pres_photo').not(this);
		notThisPhoto.removeClass('playing');
		notThisPhoto.find('.title').removeClass('extend');
		$(this).toggleClass('playing');
	});
});

// titres sur les photos
$(document).ready( function() {
	$('.pres_photo').mouseenter( function() {
		var pres = $(this);
		var title = pres.find('.title');
		title.addClass('extend');

		pres.mouseleave( function() {
			if(pres.hasClass('playing')) {
				return;
			}else{
					title.removeClass('extend');
			};
		});
	});
});

//menu déroulant de la page contact
$(document).ready(function() {
	$('#phone ul li').on('click', function(){
		var coord = $(this).find('p');
		$('#phone ul li p').not(coord).slideUp();
		coord.slideToggle();
	})
});
