
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
         aktif.addClass('navlist-active');
       $('#preview-konten').css({"transform":"translateY(-115px)"});
     //  $('.navigasi-scrool').css("overflow-x","hidden");
    },function(){
 //   if($('#preview-konten').is(":hover")){
            $('.navlist-active').removeClass('navlist-active');
             $('#preview-konten').css({"transform":"translateY(-200%)"});
          //   $('.navigasi-scrool').css("overflow-x","scroll");
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





var data_artikel;
var banner_data=[];
var kategori=new Array();
var aktif;
function awal(data){
   banner(data);
    buat_kategori(data);
    artikel_samping(data);
   data_artikel=data;
}


function buat_kategori(data){
    var banyak_artikel = data.feed.entry.length;
    var banyak_kategori= data.feed.category.length;
 for(var t=0;t<banyak_kategori;++t){
     var temp=[];
     for(var u=0;u<banyak_artikel;++u){
        try {
    if(data.feed.entry[u].category[0].term===data.feed.category[t].term){
         temp.push(u);
        if(temp.length==5){
            break;
        }
         }
}
catch(error) {
   
}
       
         
         
     }
     kategori[data.feed.category[t].term]=temp;
 }
}


function banner(data){
    var banyak_artikel = data.feed.entry.length;
   
    for(var t=0;t<5;++t){
        var e=Math.floor((Math.random() * 87) + 0);
        if(banner_data.indexOf(e)==-1){
             banner_data.push(e);
             if(t==0){
                 $('#gambar-besar').css('background-image','url('+besarkan(data.feed.entry[e].media$thumbnail.url,500)+')');
                  $('#banner-besar h3').text(data.feed.entry[e].title.$t);
                  $('#banner-besar').parent().attr('href', data.feed.entry[e].link[4].href);
             }else{
                 $('#banner'+t+' .gambar-kecil' ).css('background-image','url('+besarkan(data.feed.entry[e].media$thumbnail.url,300)+')');
                  $('#banner'+t).attr('href',data.feed.entry[e].link[4].href);
                 $('#banner'+t+' h3').text(data.feed.entry[e].title.$t);
             }
        }else{
            --t;
        }
    }

}

function tampilkan_preview(kategori_text){
 
    $('#preview-konten').empty();
    var counter=kategori[kategori_text.toLowerCase()].length;
    for(var g=0;g<counter;++g){
        var url=data_artikel.feed.entry[kategori[kategori_text.toLowerCase()][g]].link[4].href;
      var gambar=besarkan(data_artikel.feed.entry[kategori[kategori_text.toLowerCase()][g]].media$thumbnail.url,300);
//    var gambar=    "https://1.bp.blogspot.com/-yIhXlQfYN1E/WMksG192LLI/AAAAAAAAA9w/txsqdQfykVksDEFshayeN54c0Gu6C3AAwCLcB/s1600/glow.gif";
        var judul=data_artikel.feed.entry[kategori[kategori_text.toLowerCase()][g]].title.$t;
     $('#preview-konten').append('<a href="'+url+'"> <div style="background-image: url('+gambar+');" class="preview-artikel"><div class="preview-gambar"></div><h2>'+judul+'</h2></div></a>');
        
    }
    
  
}

$(document).ready(function(){
  $('.navigasi-scrool li').hover(function() {
     // console.log();
      aktif= $(this);
      $('.navlist-active').removeClass('navlist-active');
      tampilkan_preview($(this).text());
     aktif.addClass('navlist-active');
       $('#preview-konten').css({"transform":"translateY(-115px)"});
   //    $('.navigasi-scrool').css("overflow-x","hidden");
    },function(){
 //   if($('#preview-konten').is(":hover")){
        $('.navlist-active').removeClass('navlist-active');
             $('#preview-konten').css({"transform":"translateY(-200%)"});
        //     $('.navigasi-scrool').css("overflow-x","scroll");
     //   }

    });
});

function besarkan(gambar, ukuran){
    return gambar.replace('s72-c', "s"+ukuran);
}


function artikel_samping(data){
    var banyak_artikel=data.feed.entry.length;
    var jumlah_artikel=15;
    var daftar_index_artikel=new Array();
     
   // console.log(data);
    for(var w=0;w<jumlah_artikel;++w){
        var angka_random=Math.floor((Math.random() * banyak_artikel) + 0);
    //   console.log(angka_random);
       
        if(daftar_index_artikel.indexOf(angka_random)===-1){
              daftar_index_artikel.push(angka_random);
        }else if(daftar_index_artikel.indexOf(angka_random)!==-1){
            --w;
        }
    }
    
    
      for(var x=0;x<daftar_index_artikel.length;++x){
            var link   = data.feed.entry[daftar_index_artikel[x]].link[4].href;
            var judul  = data.feed.entry[daftar_index_artikel[x]].link[4].title;
            var gambar = data.feed.entry[daftar_index_artikel[x]].media$thumbnail.url;
          //  console.log(gambar);
          $("#daftar-artikel-samping").append('<li class="list-artikel"> <a href="'+link+'"><div class="gambar-list-artikel" style="background-image: url('+gambar+')"></div><h3 class="judul-list-artikel">'+judul+'</h3></a></li>')
      }
    
    
}










$(document).ready(function(){ 

if($('#daftar-artikel').height()>$('#sidebar').height()){
$('#sidebar').css('height',$('#daftar-artikel').height()+'px');

}
});
