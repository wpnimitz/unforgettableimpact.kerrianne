jQuery(document).ready(function($) {
 
	$('.current-year').html(new Date().getFullYear());
    
    $(".switch input").on("click", function() {
        var sClass = $(this).data("class");
        //check if all switch is checked
        if($('.switch input:checked').length > 0)  {
            console.log("showing content");
            $("." + sClass).removeClass("hidden");
			$('html, body').animate({ scrollTop: $(this).offset().top + 100 }, 1000);
        }else {
            $("." + sClass).addClass("hidden");
        }
    });
	
	$(".gallery-item a").on('click', function(e) {
		//e.preventDefault();
		$(".menu-hidden").removeClass("hidden");
	});
    
    $(".three-more").on("click", function(e) {
        
        $(this).closest('.svnty-shock').toggleClass("hide-bg").addClass('show-bg');
        e.preventDefault();
            $(".have-it").toggleClass("hidden");
            
            if( $(this).hasClass("open") ) {
                $(this).removeClass("open");
                $('html,body').animate({ scrollTop: $(this.hash).offset().top}, 200);
            } else {
                $(this).addClass("open");               
            }
            
            $(this).addClass("hidden");
    });




    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function deleteCookie(cname) {
        document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    $(".create-cname").on("click", function(){
        setCookie("beenhere", "yes", 60);
    });

    $(".delete-cname").on("click", function(){
        deleteCookie("beenhere");
    });


    if (getCookie('beenhere') == 'yes' && window.location.pathname == '' ) {
       window.location = window.location.hostname + "/welcome-back"
    }

    $('.et_pb_accordion .et_pb_toggle_open').addClass('et_pb_toggle_close').removeClass('et_pb_toggle_open');

    $('.et_pb_toggle_title').click(function(){
        var $toggle = $(this).closest('.et_pb_toggle');
        if (!$toggle.hasClass('et_pb_accordion_toggling')) {
          var $accordion = $toggle.closest('.et_pb_accordion');
          if ($toggle.hasClass('et_pb_toggle_open')) {
            $accordion.addClass('et_pb_accordion_toggling');
            $toggle.find('.et_pb_toggle_content').slideToggle(700, function() { 
              $toggle.removeClass('et_pb_toggle_open').addClass('et_pb_toggle_close'); 
                        
            });
          }
          setTimeout(function(){ 
            $accordion.removeClass('et_pb_accordion_toggling'); 
          }, 750);
        }
      });
	
	
	if( $( ".wn-slider" ).length ) {
	  var sCount = 0;
	  console.log("Slider detected");

	  //let's add class to the child rows
	  $( ".wn-slider .et_pb_image" ).each(function(){
		sCount++;
		$(this).addClass("slide slider-" + sCount);
		  
		if(sCount == 1) {
			$(this).addClass("active");
		}
	  });

	  //make sure that the first slider is visible
	  $(this).find(".slider-1").addClass("active");

	  console.log("Slider Count: " + sCount);
	  //find if navigation is set
	  //else provide one.
	  if( $(this).find(".wn-navigation").length ) {
		  $('.wn-slider .wn-navigation').removeClass("slide").removeClass("slider-" + sCount);
		  sCount = sCount -1;
		  console.log("decrease count")
	  } else {
		  //lets add something if we don't have a navigation
		  var navOpen = "<div class='wn-navigation'></div>";
		  var closeDiv = "</div'>";

		  var navBackOpen = "<div class='gold-back' style='display:none;'></div>";
		  var navNextOpen = "<div class='gold-next'></div>";

		  var navNextImgURL = 'https://unforgettableimpact.com/files/SLIDER-BUTTON-NEXT-180814.jpg';
		  var navBackImgURL = 'https://unforgettableimpact.com/files/SLIDER-BUTTON-BACK-180814.jpg';

		  var navNextImg = '<img src="' + navNextImgURL + '">';
		  var navBackImg = '<img src="' + navBackImgURL + '">';

		  $(this).find(".slider-" + sCount).after(navOpen);
		  $(this).find(".wn-navigation").html(navBackOpen);
		  $(this).find(".wn-navigation").append(navNextOpen);

		  $(this).find(".gold-next").html(navNextImg);
		  $(this).find(".gold-back").html(navBackImg);

		  if( $( ".wn-slider.restart" ).length ) {
			  var restartOpen = "<div class='restart-slide' style='display:none;'></div>";
			  var restartImgURL = 'https://unforgettableimpact.com/files/ui-restart.png';
			  var restartImg = '<img src="' + restartImgURL + '">';
			  
			  $(this).find(".wn-navigation").append(restartOpen);
			  $(this).find(".restart-slide").html(restartImg);
		  }
	  }


	  //set current active slider
	  var GoldSlider = 1


	  $(".gold-next").on("click", function() {
		  var $next = $('.slide.active').removeClass('active').next('.slide');
		  GoldSlider = GoldSlider + 1;

		  if (GoldSlider == sCount) {
			  $(".slider-" + sCount).addClass('active');
			  $(this).closest('.wn-navigation').addClass("hidden");
			  
			  if( $( ".wn-slider.restart" ).length ) {
				  $(".restart-slide").show();
				  $(".gold-next").hide();
				  $(".gold-back").hide();
				  $(this).closest('.wn-navigation').removeClass("hidden");
			  }
			  
			  
		  } else {
			  $next.addClass('active');
			  $(".gold-back").css('display', 'block');
		  }

	  });

	  $(".gold-back").on("click", function() {
		var $prev = $('.slide.active').removeClass('active').prev('.slide');
		GoldSlider = GoldSlider - 1;

		if (GoldSlider==1) {
			$(this).css('display', 'none');
			$(".slider-1").addClass('active');
		} else {
			$prev.addClass('active');
		}

	  });
		
		$(".restart-slide").on("click", function() {
			GoldSlider = 1
			$(".gold-next").show();
			$(".slider-" + sCount).removeClass('active');
			$(".slider-1").addClass('active');
			$(this).hide();
		});


	  console.log("Slider Count: " + sCount);
	  


	} //end if .wn-slider
	
	
	




}); // end active campaign script //



 


(function($) {
/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

$(window).load(function() {
    //for custom slider testimonial
    //will work only once in a page
    function slidingDiv(tel, bel) {
        var thumbs = $(tel),
            firstThumb = thumbs.eq(0),
            banners = $(bel),
            all = thumbs.add(banners),
            duration = 7000,
            rotating = false,
            intervalRotate;
        
        function setAutoRotate(){
           intervalRotate = setInterval(autoRotate, duration);
           rotating = true;
        }
        
        function stopAutoRotate(){
           clearInterval(intervalRotate);
           rotating = false;
        }
        
        function autoRotate(){
            var nextThumb = thumbs.filter('.active').next();
            if(!nextThumb.length) nextThumb = firstThumb;
            rotate(nextThumb);
        }
                    
        function rotate(activeThumb){
            thumbs.removeClass('active');
            activeThumb.addClass('active');
            banners.removeClass('active').eq(thumbs.index(activeThumb)).addClass('active');
        }

        thumbs.on('click mouseover' ,function(e){
            e.preventDefault();
            var thumb = $(this);
            if(thumb.hasClass('clicked')){
                thumb.removeClass('clicked');
            }else{
                stopAutoRotate();
                thumbs.removeClass('clicked');
                thumb.addClass('clicked');
                rotate(thumb);
            }
        });
        
        all.on('mouseenter',function(){
            if(rotating) stopAutoRotate();
        });
        
        all.on('mouseleave',function(){
            if(!thumbs.filter('.clicked').length) setAutoRotate();
        });
        
        setAutoRotate();
    }




    slidingDiv('.rotating-control .et_pb_image', '.rotating-testimonial .testimonial');
    slidingDiv('.portfolio-control .et_pb_image', '.portfolio-slides .et_pb_module');

    

    setTimeout(function() {
        //$('.portfolio-slides .et_pb_module').not(':first').addClass("hidden");
        $('.portfolio-slides .et_pb_module').addClass("hidden");
        // $('.portfolio-slides .et_pb_module').each(function(index) {

        // });

        $('.portfolio-slides .et_pb_module:first-child').addClass('active');


    }, 1500);



    //making sure that the other slider is working
    // var bacontainer = $('.twentytwenty-container'),
    //     baheight = bacontainer.eq(0).height(),
    //     baminheight = '512px';

    // if(baheight == 0) baheight = baminheight;

    // $(".portfolio-control .et_pb_image").on('click mouseenter', function() {
    //     bacontainer.eq($(this).index()).css("height", baheight);
    //     var beforeimg = bacontainer.eq(0).find('.twentytwenty-before').css('clip'),
    //     afterimg = bacontainer.eq(0).find('.twentytwenty-after').css('clip');

    //     bacontainer.eq($(this).index()).find('.twentytwenty-before').css("clip", beforeimg);
    //     bacontainer.eq($(this).index()).find('.twentytwenty-after').css("clip", afterimg);


    // });
});



})( jQuery );









