var source1,
    source2,
    temp,
    pass;
var EnterKey = 13;
$(document).ready(function() {
    source1 = $("#passTemplate").html();
    source2 = $("#adminTemplate").html();
    temp = Handlebars.compile(source1);
    document.getElementById('mainNest').innerHTML = temp('');
    checkit("#pass", /[a-zA-Zа-яА-Я]+/, "red", "blue", 20);
    $('input').keypress(function(e) {
          if (e.which === EnterKey) {
       checkPass(); 
          }
    });
});

function hidePass() {
    try {
        $.getJSON("system/info.json", function(data) {
            try {
                if (data !== undefined) {
                    var pointData = data.password.toString();
                    $.ajax({
                        url: "system/pass.php",
                        type: "post",
                        data: ({
                            text: CryptoJS.AES.encrypt(pointData, rhex('Nest Admin Panel')) + 'hide'
                        }),
                        beforeSend: function() {
                            $('body').append('<div id="frame" class="overflow_hidden  b_1px_solid_black br_100% bgc_rgb(255,255,255) w_140px h_140px absolute clean center"><img id="spin" src="system/spinner.gif"  class="w_100px absolute clean center"></div>');
                            createatom();
                        },
                        dataType: "text"
                    }).done(function() {
                        alert("Rewrite password!");
                        $('#spin').remove();
                        $('#frame').remove();
                        window.location.reload();
                    });
                } else {
                    alert('Load error or IP access denied!');
                }
            } catch (e) {
                console.log(e);
                alert('Load error or IP access denied!');
            }
        }).fail(function() {
            alert('Load error, IP access denied or Password is hidden!');
        });
    } catch (e) {
        console.log(e);
    }
}

		

function checkPass() {
        $.getJSON("system/newinfo.json", function(data) {
            try {
                if (data !== undefined) {
                    pass = data;
                    //alert(pass);
                    checkNewPass();
                } else {
                    alert('Load error or IP access denied!');
                }
            } catch (e) {
                console.log(e);
                alert('Load error or IP access denied!');
            }
        }).fail(function() {
            alert('Load error or IP access denied!');
        });

        function checkNewPass() {
            if (pass !== undefined) {
                if ($('#pass').val() === CryptoJS.AES.decrypt(pass.password.replace('hide', ''), rhex('Nest Admin Panel')).toString(CryptoJS.enc.Utf8)) {
                    temp = Handlebars.compile(source2);
                    document.body.innerHTML = temp('');
                    draw();
                    $("#classSelect").on('change', setval);
                    try{
                    CKEDITOR.replace('classText', {
                        toolbar: [{
                            name: 'document',
                            items: ['Source', '-', '-', 'NewPage', 'Preview', 'Print', '-', 'Templates']
                        }, {
                            name: 'clipboard',
                            items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
                        }, {
                            name: 'editing',
                            items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt']
                        }, {
                            name: 'forms',
                            items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField']
                        }, '/', {
                            name: 'basicstyles',
                            items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
                        }, {
                            name: 'paragraph',
                            items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language']
                        }, {
                            name: 'links',
                            items: ['Link', 'Unlink', 'Anchor']
                        }, {
                            name: 'insert',
                            items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
                        }, '/', {
                            name: 'styles',
                            items: ['Styles', 'Format', 'Font', 'FontSize']
                        }, {
                            name: 'colors',
                            items: ['TextColor', 'BGColor']
                        }, {
                            name: 'tools',
                            items: ['Maximize', 'ShowBlocks']
                        }, {
                            name: 'about',
                            items: ['-']
                        }]
                    });}
                    catch(e){
                        
                    }
                    createatom();
     
list();
//----------------------------------------------
                } else {
                    alert('False');
                }
            }
                
        }
    }
    //-------------------------------------------------------------------------------------------------
    /*
     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
     * Digest Algorithm, as defined in RFC 1321.
     * Copyright (C) Paul Johnston 1999 - 2000.
     * Updated by Greg Holt 2000 - 2001.
     * See http://pajhome.org.uk/site/legal.html for details.
     */
    /*
     * Convert a 32-bit number to a hex string with ls-byte first
     */
var hex_chr = "0123456789abcdef";

function rhex(num) {
        str = "";
        for (j = 0; j <= 3; j++) str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((num >> (j * 8)) & 0x0F);
        return str;
    }
    /*
     * Convert a string to a sequence of 16-word blocks, stored as an array.
     * Append padding bits and the length, as described in the MD5 standard.
     */
function str2blks_MD5(str) {
        nblk = ((str.length + 8) >> 6) + 1;
        blks = new Array(nblk * 16);
        for (i = 0; i < nblk * 16; i++) blks[i] = 0;
        for (i = 0; i < str.length; i++) blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
        blks[i >> 2] |= 0x80 << ((i % 4) * 8);
        blks[nblk * 16 - 2] = str.length * 8;
        return blks;
    }
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
function add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    /*
     * Bitwise rotate a 32-bit number to the left
     */
function rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }
    /*
     * These functions implement the basic operation for each round of the
     * algorithm.
     */
function cmn(q, a, b, x, s, t) {
    return add(rol(add(add(a, q), add(x, t)), s), b);
}

function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
    /*
     * Take a string and return the hex representation of its MD5.
     */
function calcMD5(str) {
    x = str2blks_MD5(str);
    a = 1732584193;
    b = -271733879;
    c = -1732584194;
    d = 271733878;
    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i + 10], 17, -42063);
        b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = hh(a, b, c, d, x[i + 5], 4, -378558);
        d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = add(a, olda);
        b = add(b, oldb);
        c = add(c, oldc);
        d = add(d, oldd);
    }
    return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

               //----------------ToDoList------------------------------
                   

$.fn.isBound = function(type, fn) {
    var data = this.data('events')[type];

    if (data === undefined || data.length === 0) {
        return false;
    }

    return (-1 !== $.inArray(fn, data));
};

	function runBind() {
        $('.destroy').on('click', function(e) {
          $currentListItem = $(this).closest('li');

          $currentListItem.remove();
        });

        $('.toggle').on('click', function(e) {
          var $currentListItemLabel = $(this).closest('li').find('label');
		
		  if ( $currentListItemLabel.attr('data') == 'done' ) {
			  $currentListItemLabel.attr('data', '');
		      $currentListItemLabel.css('text-decoration', 'none');
		  }
		  else {
			  $currentListItemLabel.attr('data', 'done');
        $currentListItemLabel.css('text-decoration', 'line-through');
		  }
			});
		}
function list() {
runBind();
	var todoList = $('#todo-list');
	$('#new-todo').keypress(function(e) {
    if (e.which === EnterKey) {
        if($('#new-todo').val()!==undefined && $('#new-todo').val()!==''){
			$('.destroy').off('click');
			$('.toggle').off('click');
			//var todos = todoList.html();
     var todos = "<li>" +
          "<div class='view'>" +
            "<input class='toggle' type='checkbox'>" +
            "<label data=''>" + " " + $('#new-todo').val() + "</label>" +
            "<a class='destroy'></a>" +
          "</div>" +
        "</li>";
   	  
	  $(this).val('');
		todoList.html(todoList.html()+todos);
		runBind();
		dataPack.toDoList = $('#todo-list').html();
    
  }else{
      alert('Empty field!');
  }}});
    	$('#add').click(function(e) {

        if($('#new-todo').val()!==undefined && $('#new-todo').val()!==''){
			$('.destroy').off('click');
			$('.toggle').off('click');
			//var todos = todoList.html();
     var todos = "<li>" +
          "<div class='view'>" +
            "<input class='toggle' type='checkbox'>" +
            "<label data=''>" + " " + $('#new-todo').val() + "</label>" +
            "<a class='destroy'></a>" +
          "</div>" +
        "</li>";
   	  
	  $(this).val('');
		todoList.html(todoList.html()+todos);
		runBind();
	dataPack.toDoList = $('#todo-list').html();
                        saveList();
    
  }else{
    //console.log($('#todo-list').find('li').length);
      if($('#todo-list').find('li').length==undefined||$('#todo-list').find('li').length==0){
          	dataPack.toDoList = $('#todo-list').html();
           saveList();
           alert('List Clean!');
      }else{
 if($('#todo-list').find('li').length!==undefined||$('#todo-list').find('li').length>0){
          	dataPack.toDoList = $('#todo-list').html();
           saveList();
           alert('List Updated!');
      }else{
            alert('Empty field!');
      }
      }
  }});
}