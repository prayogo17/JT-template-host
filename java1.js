
var scrool=0;
var scrooltempkanan=0;
var jalan=true;
var counter;
var kananscroll;
var kiriscroll;
var cari=false;
 var s=70;
$(window).resize(function(){
     var lebar=$( window ).width();
     // $('.navigasi-scrool').css("width",lebar*0.0512445095+"%");
     counter=hitungscroll()-hitungouter();
    counter=Math.ceil(counter/5);
   
    
    
    
 //   console.log(lebar);
   
if($(window).width()<=1030&&!cari){
   //jika ukuran kecil cari ditutup
    $('#cari').hide();
    $('#penutup').hide();
    $('.caritoggle').removeClass("navlist1");
    
}else if($(window).width()>=1031&&!cari){
     //jika ukuran besar cari ditutup
    tutupcari();
    
}else if($(window).width()>=1031&&cari){
    //jika ukuran besar cari dibuka
    
    bukacari();
}else if($(window).width()<=1030&&cari){
    //jika ukuran kecil cari dibuka
    $('#cari').show();
     $('#penutup').hide();
      $('.caritoggle').removeClass("navlist1");
}
      
    
});

function tutupcari(){
     cari=false;
    if($(window).width()<=1030){
         $('#cari').hide();
    }else{
     $('#cari').show();
    $('#penutup').hide();
   
    $('.caritoggle').removeClass("navlist1");
    $('#cari').css({"transform":"translateY(-200%)"});
    $('.caritoggle').css('color','#e9ecf2');
}
}


function bukacari(){
      cari=true;
       if($(window).width()<=1030){
         $('#cari').show();
          $('#cari input').focus();
    }else{
  
    $('#cari').show();
    $('#penutup').show();
     $('#cari input').focus();
    $('.caritoggle').css('color','#1d90cc');
    $('.caritoggle').addClass("navlist1");
    $('#cari').css({"transform":"translateY(-22%)"});
}}


$(document).on('click','.caritoggle', function(){

    if(cari){
        tutupcari();
    }else{
        bukacari();
    }
   
});


$(document).on('click','#close-cari', function(){
        tutupcari();
});

$(document).on('click','#penutup', function(){
tutupcari();
});



$(document).ready(function(){
 
    counter=hitungscroll()-hitungouter();
    counter=Math.ceil(counter/5);
    
$( ".glyphicon-menu-right" ).hover(function() {
   scroolkanan();
   kananscroll=true;
},function(){
    kananscroll=false;
    stopscroll();
    
    });
    
     $('#preview-konten').hover(function() {
       $('#preview-konten').css({"transform":"translateY(-115px)"});
     //  $('.navigasi-scrool').css("overflow-x","hidden");
    },function(){
 //   if($('#preview-konten').is(":hover")){
             $('#preview-konten').css({"transform":"translateY(-200%)"});
          //   $('.navigasi-scrool').css("overflow-x","scroll");
     //   }

    });
    
    
    $('.navigasi-scrool li').hover(function() {
       $('#preview-konten').css({"transform":"translateY(-115px)"});
   //    $('.navigasi-scrool').css("overflow-x","hidden");
    },function(){
 //   if($('#preview-konten').is(":hover")){
             $('#preview-konten').css({"transform":"translateY(-200%)"});
        //     $('.navigasi-scrool').css("overflow-x","scroll");
     //   }

    });
    
  
   
    
    $( ".glyphicon-menu-left" ).hover(function() {
     scroolkiri();
        kiriscroll=true;
},function(){
        kiriscroll=false;
        stopscroll();
    });


    $('.navigasi-scrool').scroll(function(){
    cekpanahhilang(200);
    if(kananscroll){
        scrooltempkanan+=1;
    }else if(kiriscroll){
        scrooltempkanan-=1;
    }
    

    });
    
    
    
});

function stopscroll(){
    var elementnavigasiscroll=$('.navigasi-scrool');
    elementnavigasiscroll.stop(true);
}
function hitungscroll(){
    var elementnavigasiscroll=$('.navigasi-scrool');
  
    var newScrollLeft = elementnavigasiscroll.scrollLeft();
   // width=$elem.outerWidth(),
    var scrollW= elementnavigasiscroll.get(0).scrollWidth;
   // console.log(scrollW);
    return scrollW-newScrollLeft;

}

function hitungouter(){
    var elementnavigasiscroll=$('.navigasi-scrool');
    return Math.round(elementnavigasiscroll.outerWidth());
}

function scroolkiri(){
    
     var elementnavigasiscroll=$('.navigasi-scrool');
 
    
  for(var a=scrooltempkanan*-1;a<=counter+1;++a){
      $(".navigasi-scrool").animate({scrollLeft: -(a*5)}, 5);
     // --counter;
  }


}

function scroolkanan(){
   var elementnavigasiscroll=$('.navigasi-scrool');
 
    
  for(var a=scrooltempkanan;a<=counter+1;++a){
      $(".navigasi-scrool").animate({scrollLeft: a*5}, 5);
     // --counter;
  }

  }

function cekpanahhilang(durasi){
    var elementnavigasiscroll=$('.navigasi-scrool');
       if(elementnavigasiscroll.scrollLeft()==0){
           $( ".glyphicon-menu-left" ).fadeOut(durasi);
       }else{
           $( ".glyphicon-menu-left" ).fadeIn(durasi);
       }
 
    
      if(hitungouter()==hitungscroll()){
          
      $( ".glyphicon-menu-right" ).fadeOut(durasi);
       }else{
           $( ".glyphicon-menu-right" ).fadeIn(durasi);
       }
    
}
