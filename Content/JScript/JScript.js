/*dropmenu*/
jQuery(document).ready(function() { jQuery(".h_menu_item").mouseover(function() { if (this.id != '0') { jQuery('#h_menu_sub_' + this.id).show(); jQuery('#h_menu_' + this.id).addClass('mhover'); } }); jQuery(".h_menu_item").mouseout(function() { if (this.id != '0') { jQuery('#h_menu_sub_' + this.id).hide(); jQuery('#h_menu_' + this.id).removeClass('mhover'); } }); });
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

    $(window).scroll(function () {
        //Fix detail
        var vscrollC = $('#scrollContent').height() - 450;
        var vscrollL = $('#scrollTop').height() + 100;
        //alert($(this).scrollTop() + "-" + vscrollC); //1220-1484, 1220-1484
        if ($(this).scrollTop() > vscrollL) {
            if ($(this).scrollTop() < vscrollC) {
                $("#proDetail-fix").css({ "position": "fixed", "top": "5px", "width": "390px" });
            }
            else {
                $("#proDetail-fix").css({ "position": "fixed", "top": "auto", "bottom": "280px", "width": "390px" });
            }
        }
        else {
            $("#proDetail-fix").css({ "position": "relative", "top": "auto", "width": "auto", "bottom": "auto" });
        }

       //toTop
        if ($(this).scrollTop() >= 50) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });

function showSub(groupId) {
    var check = $("#" + groupId + "").css("display");
    if (check == "none") {
        $("#" + groupId).slideDown("slow");
        $("#img_" + groupId).attr("src", "/Content/Images/onOut.png");
    } else {
        $("#" + groupId).slideUp("slow");
        $("#img_" + groupId).attr("src", "/Content/Images/onMove.png");
    }
}
function showMenu(id) {
    var check = $("#" + id + "").css("display");
    if (check == "none") {
        $("#" + id).slideDown("slow");
    } else {
        $("#" + id).slideUp("slow");
    }
}

    $('#toTop').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 800);
    });
    
});



function clickHiddens(idClick, idForm) {
    $("#" + idClick + " input:checkbox").each(function() {
        if (this.checked == true)
            $("#" + idForm).css({ "display": "block" });
        else
            $("#" + idForm).css({ "display": "none" });
    });
}




/
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


/*So sanh san pham*/
function addCompareList(productId) {
    var checked = document.getElementById("compareItem_" + productId).checked;
    var currentList = document.getElementById("compare_list").value;
    var currentNumItem = currentList.split(",").length - 2;
    if (checked) {
        if (currentNumItem > 10) {
            //Cho phep so sánh tối đa 6 sản phẩm
            document.getElementById("compareItem_" + productId).checked = "";
            alert("Bạn chỉ có thể so sánh tối đa 10 sản phẩm");
        }
        else {
            document.getElementById("compare_list").value = currentList + productId + ",";            
        }
    }
    else {
        document.getElementById("compare_list").value = currentList.replace("," + productId + ",", ",");
    }
}



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


//Check form dat hang
$(document).ready(function() {

    //Tab 3
    $(".tabContent_cate2").fadeOut(); // Ẩn toàn bộ nội dung của tab
    $(".tabContent_cate2:first").fadeIn(); // Mặc định sẽ hiển thị tab1
    $("#tabTitle_cate2 ul li").click(function() { //Khai báo sự kiện khi click vào một tab nào đó
        var activeTab = $(this).attr("rel");
        $("#tabTitle_cate2 ul li").removeClass("active");
        $(this).addClass("active");
        $(".tabContent_cate2").hide();
        $(activeTab).fadeIn();
    });

});



