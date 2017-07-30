$(".mainMenu ul li.toggle").click(function(event) { 

  if ( $(".item").is(":hidden")) {
    	$(".item.items").slideDown('slow');
  }
  else {
  	$(".item.items").slideUp('slow');
  }

});