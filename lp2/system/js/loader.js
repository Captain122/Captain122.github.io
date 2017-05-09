   try {
       $.getJSON("system/data.json", function(data) {
           dataPack = data;
           try {
               $.each(data, function(key, val) {
                   $(key).html(val);
                     try {
                         if($){
                   createatom();
                         }
                     }
                    catch (e) {
       console.log(e);
       window.location.reload();
   }
               });
           } catch (e) {
               console.log(e);
           }
       }).fail(function(){
           	window.location.reload();
       });
   } catch (e) {
       console.log(e);
   }