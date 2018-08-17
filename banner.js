var data_artikel;
var banner_data=[];
var kategori=new Array();
function awal(data){
   banner(data);
    buat_kategori(data);
    console.log(data);
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
    console.log(banyak_artikel);
    for(var t=0;t<5;++t){
        var e=Math.floor((Math.random() * 87) + 0);
        if(banner_data.indexOf(e)==-1){
             banner_data.push(e);
             if(t==0){
                 $('#gambar-besar').css('background-image','url('+besarkan(data.feed.entry[e].media$thumbnail.url,500)+')');
                  $('#banner-besar h3').text(data.feed.entry[e].title.$t);
             }else{
                 $('#banner'+t+' .gambar-kecil' ).css('background-image','url('+besarkan(data.feed.entry[e].media$thumbnail.url,300)+')');
                 
                 $('#banner'+t+' h3').text(data.feed.entry[e].title.$t);
             }
        }else{
            --t;
        }
    }

}

function tampilkan_preview(kategori_text){
   console.log(kategori[kategori_text.toLowerCase()]);
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
      $('.navlist-active').removeClass('navlist-active');
      tampilkan_preview($(this).text());
      $(this).addClass('navlist-active');
       $('#preview-konten').css({"transform":"translateY(-115px)"});
   //    $('.navigasi-scrool').css("overflow-x","hidden");
    },function(){
 //   if($('#preview-konten').is(":hover")){
       // $('.navlist-active').removeClass('navlist-active');
             $('#preview-konten').css({"transform":"translateY(-200%)"});
        //     $('.navigasi-scrool').css("overflow-x","scroll");
     //   }

    });
});

function besarkan(gambar, ukuran){
    return gambar.replace('s72-c', "s"+ukuran);
}
