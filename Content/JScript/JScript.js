/*dropmenu*/
jQuery(document).ready(function() { jQuery(".h_menu_item").mouseover(function() { if (this.id != '0') { jQuery('#h_menu_sub_' + this.id).show(); jQuery('#h_menu_' + this.id).addClass('mhover'); } }); jQuery(".h_menu_item").mouseout(function() { if (this.id != '0') { jQuery('#h_menu_sub_' + this.id).hide(); jQuery('#h_menu_' + this.id).removeClass('mhover'); } }); });

function clickGet(page) {
    $.get(page);
}
function productTrack(id) {
    $.get('/producttrack.vhtm', { productId: id });
}

function visitLog() {
    $.get('/visitLog.html');
}

function popup(strHref, strWidth, strHeight) {
    window.open(strHref, '_blank', 'width=' + strWidth + ',height=' + strHeight + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=yes'); return false;
}


function showProductImage(strID, imageName) {
    $("#" + strID).html("<img src=\"/uploads/medium_" + imageName + "\">");
}
function loadAjax(type, urlPage) {
    $("#" + type).load(urlPage);
}


function showMenu(id) {
    var check = $("#" + id + "").css("display");
    if (check == "none") {
        $("#" + id).slideDown("slow");
    } else {
        $("#" + id).slideUp("slow");
    }
}
    //Su xy cat noi dung
    var vproDetailContent = $('#proDContent').height(); //1000
    if (vproDetailContent > 800) {
        $("#proDContent").css({ "height": "800px" });
        $("#proDContentOther").css({ "display": "block" });
    }
    $('#proDContentOther').click(function () {
        $('#proDContent').css({ "height": "auto" });
        $("#proDContentOther").css({ "display": "none" });
    });
    $('#toTop').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 800);
    });
    
});

function clickHidden(id) {
    if ($(".click_" + id).hasClass('active')) {
        $(".click_" + id).removeClass('active');
        $(".rowHidden_" + id).css({ "display": "none" });
    }
    else {
        $(".click_all").removeClass('active');
        $(".click_" + id).addClass('active');
        $(".rowHidden_" + id).css({ "display": "block" });
    }
}

function clickHiddens(idClick, idForm) {
    $("#" + idClick + " input:checkbox").each(function() {
        if (this.checked == true)
            $("#" + idForm).css({ "display": "block" });
        else
            $("#" + idForm).css({ "display": "none" });
    });
}




    //Home menu cate

    $("#overMenuCate_sub").css({ "visibility": "hidden" });
    $("#overMenuCate").hover(function() {
        $("#overMenuCate_sub").css({ "visibility": "visible" });
        $(this).parent().hover(function() {
        }, function() {
            $("#overMenuCate_sub").css({ "visibility": "hidden" });
        });
    });

    //Checkbox hidden form
    $(".chkOnclick").click(function() {
        $(".chkOnclick input:checkbox").each(function() {
            if (this.checked == true)
                $(".hiddenForm").css({ "display": "block" });
            else
                $(".hiddenForm").css({ "display": "none" });
        });
    });
});


function onlineHidden(id) {
    if (id == 1) {
        $(".fix-onlineHidden").css({ "display": "block" });
        $(".fix-online").css({ "display": "none" });
    }
    else {
        $(".fix-onlineHidden").css({ "display": "none" });
        $(".fix-online").css({ "display": "block" });
    }
}

