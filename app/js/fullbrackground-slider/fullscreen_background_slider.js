/************************************************************
* Filename: full_screen_background_slider.js				*
* Title: Full Screen Background Slider - jQuery File		*
* Description: Custom Javascript / jQuery file				*
* Author: Pantherius										*
* Author Page: http://codecanyon.net/user/pantherius		*
* Website: http://pantherius.com							*
*															*
* release date: 24-01-2014									*
*															*
************************************************************/

(function( $ ){
    var methods = {
        init : function(options) {
		var defaults = { 
		animation_time:			    	'30',
		animation_type:					'crossfade',
		pattern:						false,
		fontfamily:						'',
		control:						true,
		background:						'#000',
		loaded:							function () {console.log("ready");}
	  }; 
	var paused = false;
	var runcounter = 1;
	var options = jQuery.extend({}, defaults, options); 
	var anim_types = ["slidelefttoright","slidelefttoleft","slidelefttotop","slidelefttobottom","sliderighttoleft","sliderighttoright","sliderighttotop","sliderighttobottom","slidetoptotop","slidetoptobottom","slidetoptoleft","slidetoptoright","slidebottomtotop","slidebottomtobottom","slidebottomtoleft","slidebottomtoright"];
	var mainobject = jQuery(this);
	var fsbsimgs = [];
		jQuery(".fsb-slider img").each(function( index ) {
			fsbsimgs.push(this.src);
			jQuery('<img/>')[0].src = this.src;
		});
		options.loaded();
	
	if (options.control==true)
	{
		if (!jQuery("link[href='http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css']").length) jQuery('head').append('<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" type="text/css" />');
		jQuery("body").append('<div id="fsb-slider-control"><i class="pauseslider fa fa-pause fa-2x fa-fw"></i></div>');
	}
	if (options.fontfamily!=""&&options.fontfamily!="undefined")
	{
			if (!jQuery("link[href='http://fonts.googleapis.com/css?family="+jQuery("#font_family").val()+"']").length) jQuery('head').append('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family='+options.fontfamily+'" type="text/css" />');
			if (jQuery(".fsbslider-text").length!=0) jQuery(".fsb-slider div").css("font-family",options.fontfamily+", serif");
	}
	jQuery('<div id="hidden_fsbs" />').hide().html(jQuery(this).html()).appendTo('body');
	jQuery(".fsb-slider").css("background",options.background);
	if ( !Modernizr.csstransitions ) {
	function start_animation()
	{
	var anim = options.animation_type;
		jQuery(mainobject).children().each(function( index ) {
	if (options.animation_type=="randomslide") anim = anim_types[Math.floor(Math.random()*anim_types.length)];
			if (jQuery(this).children(1).css("background-image")=="none") {
			jQuery(this).children("span").css("background-image","url("+jQuery(this).children(1).children().attr("src")+")");
			jQuery(this).children("span").css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+jQuery(this).children(1).children().attr("src")+"',sizingMethod='scale');");
			jQuery(this).children("span").css("-ms-filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+jQuery(this).children(1).children().attr("src")+"',sizingMethod='scale');");
			jQuery(this).children("span").html("");
			}
			if (anim=="crossfade")
			{
			jQuery(this).children(0).css("top","0px").css("left","0px").css("width",jQuery(window).width()+"px").css("height",jQuery(window).height()+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(index*thistime).fadeTo( thisstep1 , 0.2);
				jQuery(this).children(0).delay(index*thistime).animate({top:"-5px",left:"-15px",width: jQuery(this).children(0).width()*1.05+"px",height: jQuery(window).height()*1.05+"px"},thisstep1,"easeInOutQuad",function(){
				//step2 - opacity: 0.5, scale: 1.1
				jQuery(this).children(0).fadeTo( thisstep2 , 0.2);
				jQuery(this).children(0).animate({top:"-1px",left:"-1px",width: jQuery(this).children(0).width()*1.1+"px",height: jQuery(window).height()*1.1+"px"},thisstep2,"easeInOutQuad")
				});
				//step3 - opacity: 0.7, scale: 1.2
				jQuery(this).children(0).delay(thisstep1).fadeTo( thisstep3 , 0.7);
				jQuery(this).children(0).delay(thisstep1).animate({top:"-5px",left:"-5px",width: jQuery(this).children(0).width()*1.2+"px",height: jQuery(window).height()*1.2+"px"},thisstep3,"easeInOutQuad",function(){
				});
				//step4 - opacity: 0, scale: 1
				if (index==parseInt(jQuery(mainobject).children().length-1)) {
				jQuery(this).children(0).delay(thisstep1).animate({top:"-7px",left:"-3px",width: jQuery(this).children(0).width()*1.1+"px",height: jQuery(window).height()*1.1+"px"},thisstep3,"easeInOutQuad",function(){
				jQuery(this).children().children().first().css("top","0px").css("left","0px").css("width",jQuery(window).width()+"px").css("height",jQuery(window).height()+"px");
				jQuery(this).children().children().first().fadeTo( thisstep1 , 0.2);
				});
				jQuery(this).children(0).delay(thisstep2).fadeOut( thisstep4 ,function(){start_animation();});
				}
				else 
				{
				jQuery(this).children(0).delay(thisstep1).animate({top:"-3px",left:"-7px",width: jQuery(this).children(0).width()*1.07+"px",height: jQuery(window).height()*1.07+"px"},thisstep3,"easeInOutQuad",function(){
				});				
				jQuery(this).children(0).delay(thisstep2).fadeOut( thisstep4 );
				}
			}
			if (anim=="slidefade"||anim=="rotatefade")
			{
			if (index>0) var thistimedelay = index*(thistime+thisstep1+thisstep2);
			else var thistimedelay = 0;
				if (runcounter>1&&index==0)
				{
				//step2 - opacity: 0.5, scale: 1.1
				jQuery(this).children(0).fadeTo( thisstep2 , 0.2);
				jQuery(this).children(0).animate({top:"-1px",left:"-1px",width: jQuery(window).width()*1.1+"px",height: jQuery(window).height()*1.1+"px"},thisstep2,"easeInOutQuad");
				}
				else
				{
				jQuery(this).children(0).css("top",jQuery(window).height()/4+"px").css("left",jQuery(window).width()/4+"px").css("width",jQuery(window).width()/2+"px").css("height",jQuery(window).height()/2+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay((index*thistime)+thistimedelay).fadeTo( thisstep1 , 0.2).animate({top:"-5px",left:"-15px",width: jQuery(window).width()*1.05+"px",height: jQuery(window).height()*1.05+"px"},thisstep1,"easeInOutQuad",function(){
				//step2 - opacity: 0.5, scale: 1.1
				jQuery(this).children(0).fadeTo( thisstep2 , 0.2);
				jQuery(this).children(0).animate({top:"-1px",left:"-1px",width: jQuery(window).width()*1.1+"px",height: jQuery(window).height()*1.1+"px"},thisstep2,"easeInOutQuad",function(){})
				});
				}
				
				//step3 - opacity: 0.7, scale: 1.2
				jQuery(this).children(0).delay(thisstep1).fadeTo( thisstep3 , 0.7);
				jQuery(this).children(0).delay(thisstep1).animate({top:"-5px",left:"-5px",width: jQuery(window).width()*1.2+"px",height: jQuery(window).height()*1.2+"px"},thisstep3,"easeInOutQuad",function(){
				});
				//step4 - opacity: 0, scale: 1
				if (index==parseInt(jQuery(mainobject).children().length-1)) {
				jQuery(this).children(0).delay(thisstep1).fadeTo( thisstep2 , 0.2);
				jQuery(this).children(0).delay(thisstep1).animate({top:jQuery(window).height()/4+"px",left:jQuery(window).width()/4+"px",width: jQuery(window).width()/2+"px",height: jQuery(window).height()/2+"px"},thisstep3,"easeInOutQuad",function(){
				});				
				jQuery(this).children(0).delay(thisstep2).fadeOut( thisstep2 ,function(){start_animation();});
				}
				else 
				{
				jQuery(this).children(0).delay(thisstep1).animate({top:jQuery(window).height()/4+"px",left:jQuery(window).width()/4+"px",width: jQuery(window).width()/2+"px",height: jQuery(window).height()/2+"px"},thisstep3,"easeInOutQuad",function(){
				});				
				jQuery(this).children(0).delay(thisstep2).fadeOut( thisstep2 ,function(){
				if (index==parseInt(jQuery(mainobject).children().length-2)) {
				jQuery(this).children().children().first().css("top",jQuery(window).height()/4+"px").css("left",jQuery(window).width()/4+"px").css("width",jQuery(window).width()/2+"px").css("height",jQuery(window).height()/2+"px");
				jQuery(this).children().children().first().fadeTo( thisstep1 , 0.2).animate({top:"-5px",left:"-15px",width: jQuery(window).width()*1.05+"px",height: jQuery(window).height()*1.05+"px"},thisstep1,"easeInOutQuad",function(){
				//step2 - opacity: 0.5, scale: 1.1
				jQuery(this).children(0).fadeTo( thisstep2 , 0.2);
				jQuery(this).children(0).animate({top:"-1px",left:"-1px",width: jQuery(window).width()*1.1+"px",height: jQuery(window).height()*1.1+"px"},thisstep2,"easeInOutQuad")
				});
				}
				});
				}
			}		
			if (anim=="slidelefttoright"||anim=="glidelefttoright")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",jQuery(window).height()/8+"px").css("left","-"+jQuery(this).width()+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({left:jQuery(window).width()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({left:jQuery(window).width()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidelefttoleft"||anim=="glidelefttoleft")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",jQuery(window).height()/8+"px").css("left","-"+jQuery(this).width()+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({left:jQuery(window).width()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({left:"-"+jQuery(window).width()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidelefttotop"||anim=="glidelefttotop")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",jQuery(window).height()/8+"px").css("left","-"+jQuery(this).width()+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({left:jQuery(window).width()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({top:"-"+jQuery(window).height()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidelefttobottom"||anim=="glidelefttobottom")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",jQuery(window).height()/8+"px").css("left","-"+jQuery(this).width()+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({left:jQuery(window).width()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({top:2*jQuery(window).height()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="sliderighttoright"||anim=="gliderighttoright")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",jQuery(window).height()/8+"px").css("left",1.5*jQuery(this).width()+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({left:jQuery(window).width()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({left:1.5*jQuery(window).width()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="sliderighttoleft"||anim=="gliderighttoleft")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",jQuery(window).height()/8+"px").css("left",1.5*jQuery(this).width()+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({left:jQuery(window).width()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({left:"-"+jQuery(window).width()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="sliderighttotop"||anim=="gliderighttotop")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",jQuery(window).height()/8+"px").css("left",1.5*jQuery(this).width()+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({left:jQuery(window).width()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({top:"-"+jQuery(window).height()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="sliderighttobottom"||anim=="gliderighttobottom")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",jQuery(window).height()/8+"px").css("left",1.5*jQuery(this).width()+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({left:jQuery(window).width()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({top:2*jQuery(window).height()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidetoptotop"||anim=="glidetoptotop")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top","-"+jQuery(window).height()+"px").css("left",jQuery(this).width()/8+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({top:jQuery(window).height()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({top:"-"+jQuery(window).height()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidetoptobottom"||anim=="glidetoptobottom")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top","-"+jQuery(window).height()+"px").css("left",jQuery(this).width()/8+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({top:jQuery(window).height()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({top:2*jQuery(window).height()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidetoptoleft"||anim=="glidetoptoleft")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top","-"+jQuery(window).height()+"px").css("left",jQuery(this).width()/8+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({top:jQuery(window).height()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({left:"-"+jQuery(window).width()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidetoptoright"||anim=="glidetoptoright")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top","-"+jQuery(window).height()+"px").css("left",jQuery(this).width()/8+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({top:jQuery(window).height()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({left:2*jQuery(window).width()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidebottomtobottom"||anim=="glidebottomtobottom")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",2*jQuery(window).height()+"px").css("left",jQuery(this).width()/8+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({top:jQuery(window).height()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({top:2*jQuery(window).height()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidebottomtotop"||anim=="glidebottomtotop")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",2*jQuery(window).height()+"px").css("left",jQuery(this).width()/8+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({top:jQuery(window).height()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({top:"-"+jQuery(window).height()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidebottomtoleft"||anim=="glidebottomtoleft")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",2*jQuery(window).height()+"px").css("left",jQuery(this).width()/8+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({top:jQuery(window).height()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({left:"-"+jQuery(window).width()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
			if (anim=="slidebottomtoright"||anim=="glidebottomtoright")
			{
			var delaytime = 2*(thisstep2+thisstep3+thisstep4);
			if (runcounter>1&&index==0) delaytime = 0; 
			jQuery(this).children(0).css("top",2*jQuery(window).height()+"px").css("left",jQuery(this).width()/8+"px").css("width",jQuery(this).width()*0.75+"px").css("height",jQuery(window).height()*0.75+"px");
				//step1 - opacity: 0.2 and scale: 1.05
				jQuery(this).children(0).delay(delaytime*index).fadeTo( thisstep1 , 0.2).animate({top:jQuery(window).height()/8+"px"},thisstep1,"easeInOutQuad").animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep2,"easeInOutQuad").fadeTo( thisstep2 , 0.7).animate({left:"0px",top:"0px",width:jQuery(window).width()+"px",height:jQuery(window).height()+"px"},thisstep3,"easeInOutQuad").fadeTo( thisstep3 , 0.2).animate({top:jQuery(window).height()/8+"px",left:jQuery(window).width()/8+"px",width: jQuery(window).width()*0.75+"px",height: jQuery(window).height()*0.75+"px"},thisstep4,"easeInOutQuad").animate({left:2*jQuery(window).width()+"px"},thisstep4,"easeInOutQuad",function(){
				if (index==parseInt(jQuery(mainobject).children().length-1)) start_animation();
				});
			}
		runcounter++;
	})
	}

	jQuery(this).children().children().css("display","none");
	jQuery(this).children(0).css("top","0px").css("left","0px").css("width",jQuery(window).width()+"px").css("height",jQuery(window).height()+"px");
			var thistime = (options.animation_time*1000)/jQuery(mainobject).children().length;
			var thisstep1 = ((thistime/100)*12);
			var thisstep2 = ((thistime/100)*8);
			var thisstep3 = ((thistime/100)*16);
			var thisstep4 = ((thistime/100)*12);
	start_animation(options.animation_type,thistime);
	}
	else
	{
	var anim = options.animation_type;
	if (options.animation_type=="randomslide") anim = anim_types[Math.floor(Math.random()*anim_types.length)];
					jQuery(mainobject).children().children().css({
				"-webkit-animation-duration":parseInt(options.animation_time)+"s",
				"-moz-animation-duration":parseInt(options.animation_time)+"s",
				"-o-animation-duration":parseInt(options.animation_time)+"s",
				"-ms-animation-duration":parseInt(options.animation_time)+"s",
				"animation-duration":parseInt(options.animation_time)+"s"
				});
		jQuery(this).children().each(function( index ) {
	if (options.animation_type=="randomslide") 
		{
			if (options.animation_type=="randomslide") anim = anim_types[Math.floor(Math.random()*anim_types.length)];
		}
		jQuery(this).children("span").css("background-image","url("+jQuery(this).children(1).children().attr("src")+")");
				var dtime = index*(options.animation_time/jQuery(mainobject).children().length);
				jQuery(this).children(0).css({
				"-webkit-animation-name":anim,
				"-moz-animation-name":anim,
				"-o-animation-name":anim,
				"-ms-animation-name":anim,
				"animation-name":anim,
				"-webkit-animation-fill-mode":"forwards",
				"-moz-animation-fill-mode":"forwards",
				"-o-animation-fill-mode":"forwards",
				"-ms-animation-fill-mode":"forwards",
				"animation-fill-mode":"forwards",
				"-webkit-animation-delay":dtime+"s",
				"-moz-animation-delay":dtime+"s",
				"-o-animation-delay":dtime+"s",
				"-ms-animation-delay":dtime+"s",
				"animation-delay":dtime+"s",
				"-webkit-animation-iteration-count":"infinite",
				"-moz-animation-iteration-count":"infinite",
				"-o-animation-iteration-count":"infinite",
				"-ms-animation-iteration-count":"infinite",
				"animation-iteration-count":"infinite"});
			jQuery(this).children("span").html("");
		})
		}
		 jQuery(this).removeClass("hidepattern").removeClass("pattern").removeClass("pattern1").removeClass("pattern2").removeClass("pattern3").removeClass("pattern4").removeClass("pattern5").removeClass("pattern6").removeClass("pattern7").removeClass("pattern8").removeClass("pattern9").removeClass("pattern10").removeClass("pattern11").removeClass("pattern12").removeClass("pattern13").removeClass("pattern14").removeClass("pattern15").removeClass("pattern16").removeClass("pattern17").removeClass("pattern18").removeClass("pattern19").removeClass("pattern20");
		if (options.pattern=="pattern") jQuery(this).addClass('pattern')
		else if (options.pattern=="pattern1") jQuery(this).addClass('pattern1')
		else if (options.pattern=="pattern2") jQuery(this).addClass('pattern2')
		else if (options.pattern=="pattern3") jQuery(this).addClass('pattern3')
		else if (options.pattern=="pattern4") jQuery(this).addClass('pattern4')
		else if (options.pattern=="pattern5") jQuery(this).addClass('pattern5')
		else if (options.pattern=="pattern6") jQuery(this).addClass('pattern6')
		else if (options.pattern=="pattern7") jQuery(this).addClass('pattern7')
		else if (options.pattern=="pattern8") jQuery(this).addClass('pattern8')
		else if (options.pattern=="pattern9") jQuery(this).addClass('pattern9')
		else if (options.pattern=="pattern10") jQuery(this).addClass('pattern10')
		else if (options.pattern=="pattern11") jQuery(this).addClass('pattern11')
		else if (options.pattern=="pattern12") jQuery(this).addClass('pattern12')
		else if (options.pattern=="pattern13") jQuery(this).addClass('pattern13')
		else if (options.pattern=="pattern14") jQuery(this).addClass('pattern14')
		else if (options.pattern=="pattern15") jQuery(this).addClass('pattern15')
		else if (options.pattern=="pattern16") jQuery(this).addClass('pattern16')
		else if (options.pattern=="pattern17") jQuery(this).addClass('pattern17')
		else if (options.pattern=="pattern18") jQuery(this).addClass('pattern18')
		else if (options.pattern=="pattern19") jQuery(this).addClass('pattern19')
		else if (options.pattern=="pattern20") jQuery(this).addClass('pattern20')
		else jQuery(this).addClass('hidepattern');
		jQuery( document ).on("click",".pauseslider",function() {
		if (paused==false)
			{
			jQuery( mainobject ).children().children("span").css({"-webkit-animation-play-state":"paused","-moz-animation-play-state":"paused","-o-animation-play-state":"paused","-ms-animation-play-state":"paused","animation-play-state":"paused"});
			jQuery( mainobject ).children().children("div").css({"-webkit-animation-play-state":"paused","-moz-animation-play-state":"paused","-o-animation-play-state":"paused","-ms-animation-play-state":"paused","animation-play-state":"paused"});
			jQuery("#fsb-slider-control").html('<i class="pauseslider fa fa-play fa-2x fa-fw"></i>');
			paused = true;
			}
			else
			{
			jQuery( mainobject ).children().children("span").css({"-webkit-animation-play-state":"running","-moz-animation-play-state":"running","-o-animation-play-state":"running","-ms-animation-play-state":"running","animation-play-state":"running"});
			jQuery( mainobject ).children().children("div").css({"-webkit-animation-play-state":"running","-moz-animation-play-state":"running","-o-animation-play-state":"running","-ms-animation-play-state":"running","animation-play-state":"running"});
			jQuery("#fsb-slider-control").html('<i class="pauseslider fa fa-pause fa-2x fa-fw"></i>');
			paused = false;
			}
		});	
        },
        destroy : function( ) {
		jQuery(this).html(jQuery('#hidden_fsbs').html());
		jQuery('#hidden_fsbs').remove();
		jQuery(this).removeClass("pattern").removeClass("pattern1").removeClass("pattern2").removeClass("pattern3").removeClass("pattern4").removeClass("pattern5").removeClass("pattern6").removeClass("pattern7").removeClass("pattern8").removeClass("pattern9").removeClass("pattern10").removeClass("pattern11").removeClass("pattern12").removeClass("pattern13").removeClass("pattern14").removeClass("pattern15").removeClass("pattern16").removeClass("pattern17").removeClass("pattern18").removeClass("pattern19").removeClass("pattern20").addClass("hidepattern");
		fsbslider = null;
		return 1;
		},
		updatepattern: function(options) {
		 jQuery(this).removeClass("hidepattern").removeClass("pattern").removeClass("pattern1").removeClass("pattern2").removeClass("pattern3").removeClass("pattern4").removeClass("pattern5").removeClass("pattern6").removeClass("pattern7").removeClass("pattern8").removeClass("pattern9").removeClass("pattern10").removeClass("pattern11").removeClass("pattern12").removeClass("pattern13").removeClass("pattern14").removeClass("pattern15").removeClass("pattern16").removeClass("pattern17").removeClass("pattern18").removeClass("pattern19").removeClass("pattern20");
			if (options.pattern=="pattern") jQuery(this).addClass('pattern')
			else if (options.pattern=="pattern1") jQuery(this).addClass('pattern1')
			else if (options.pattern=="pattern2") jQuery(this).addClass('pattern2')
			else if (options.pattern=="pattern3") jQuery(this).addClass('pattern3')
			else if (options.pattern=="pattern4") jQuery(this).addClass('pattern4')
			else if (options.pattern=="pattern5") jQuery(this).addClass('pattern5')
			else if (options.pattern=="pattern6") jQuery(this).addClass('pattern6')
			else if (options.pattern=="pattern7") jQuery(this).addClass('pattern7')
			else if (options.pattern=="pattern8") jQuery(this).addClass('pattern8')
			else if (options.pattern=="pattern9") jQuery(this).addClass('pattern9')
			else if (options.pattern=="pattern10") jQuery(this).addClass('pattern10')
			else if (options.pattern=="pattern11") jQuery(this).addClass('pattern11')
			else if (options.pattern=="pattern12") jQuery(this).addClass('pattern12')
			else if (options.pattern=="pattern13") jQuery(this).addClass('pattern13')
			else if (options.pattern=="pattern14") jQuery(this).addClass('pattern14')
			else if (options.pattern=="pattern15") jQuery(this).addClass('pattern15')
			else if (options.pattern=="pattern16") jQuery(this).addClass('pattern16')
			else if (options.pattern=="pattern17") jQuery(this).addClass('pattern17')
			else if (options.pattern=="pattern18") jQuery(this).addClass('pattern18')
			else if (options.pattern=="pattern19") jQuery(this).addClass('pattern19')
			else if (options.pattern=="pattern20") jQuery(this).addClass('pattern20')
			else jQuery(this).addClass('hidepattern')
		}
    };
jQuery.fn.fsbslider = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            jQuery.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.fsbslider' );
        }    
    };
})( jQuery );