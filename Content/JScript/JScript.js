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
function rating_like(ratingId, id) {

    var ratingCookie = readCookie('ratgingLike' + id + '_' + ratingId);
    if (ratingCookie == 1) {
        if (id == 1) {
            alert('Bạn đã thích');
        }
        else {
            alert('Bạn đã không hài lòng');
        }
    }
    else {
        $.get('/ajax/ratinglike.html', { ratingId: ratingId, id: id }, function (data) {
            $('#ratgingLike' + id + '_' + ratingId).html(data);
        });
        createCookie('ratgingLike' + id + '_' + ratingId, '1', '24');
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

    $('#toTop').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 800);
    });
    
});
//Check email
function emailVerify(email) {
    if (email.indexOf("@") < 0) {
        alert("Vui lòng nhập địa chỉ email");
        return false;
    } else {
        return true;
    }
}
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

function callCaptcha() {
    var time = new Date().getTime();
    $("#load_captcha").load("/ajax/captcha.html?t=" + time);
}
function checkCaptcha(value) {
    var time = new Date().getTime();
    $("#check_captcha").load("/ajax/captcha.html?capt=" + value + "&id=1&t=" + time);

    $.get("/ajax/captcha.html?id=2", { capt: value, t: time }, function (data) {
        if (data == "0") {
            alert("Mã bảo mật không đúng");
            $("#formCaptcha").focus();
        }
    });

}

/*contant=======*/
$(document).ready(function () {
    //Captcha
    callCaptcha();
    $(".refresh_captcha").click(function () {
        callCaptcha();
        return false;
    });

    $(".checkFromContact").click(function () {
        var returl = true;
        var formFullname = $("#formFullname").val();
        var formTel = $("#formTel").val();
        var formEmail = $("#formEmail").val();
        var formContent = $("#formContent").val();
        var chkForm = $("#chkForm").val();
        var formCaptcha = $("#formCaptcha").val();
        var type = $("#type").val();
        var action = $("#action").val();

        if (formFullname.length < 3) {
            alert("Nhập họ và tên của bạn");
            $("#formFullname").focus();
            returl = false;
            return false;
        }
        if (formTel.length < 3) {
            alert("Nhập số điện thoại");
            $("#formTel").focus();
            returl = false;
            return false;
        }
        if (emailVerify(formEmail) == false) {
            $("#formEmail").focus();
            returl = false;
            return false;
        }
        if (formContent.length < 3) {
            alert("Vui lòng nhập bằng font Tiếng Việt có dấu");
            $("#formContent").focus();
            returl = false;
            return false;
        }
        if (!$('#checkFormContact').attr('checked')) {
            alert('Vui lòng đồng ý điều khoản, điều khiện website.');
            returl = false;
            return false;
        }
        if (returl == true) {
            $("#cartLoadSend").css({ "display": "block" });
            $.post("/ajax/sendcontact.html", {
                txtFullname: formFullname,
                txtTel: formTel,
                txtEmail: formEmail,
                txtContent: formContent,
                txtType: type,
                txtCaptcha: formCaptcha,
                action: action
            }, function (data) {
                $("#formContact").html(data);
            });
        }
    });

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
function compare_product(categoryId) {
    var current_list = document.getElementById("compare_list");
    if (current_list == 'undefined' || current_list == null) {
        alert("Cần có biến product_compare_list trong template");
        return false;
    }
    var currentNumItem = 0;
    if (current_list.value.length > 1) {
        current_list_id = current_list.value.split(",");
        currentNumItem = current_list_id.length - 2;
    }
    if (currentNumItem > 1) {
        window.location = "/so-sanh.html?categoryId=" + categoryId + "&list=" + current_list.value;
    } else {
        alert("Bạn cần chọn tối thiểu 2 sản phẩm để so sánh");
        return false;
    }
}

function likeProduct(productId) {
    $.get("/productlike.html", { productId: productId }, function(c) {
        if (c == "errorlogin") {
            if (confirm("Để sử dụng chức năng này bạn cần đăng nhập. Click OK để đăng nhập")) {
                window.location = "/dang-nhap.html";
            }
        } else {
            if (c == "errorhas") {
                alert("Bạn đã lưu rồi")
            } else {
                alert("Bạn đã lưu thành công")
            }
        }
    })
}

function historynew(newId) {
    //tao cookie
    if (readCookie('historyNew') == null) {
        createCookie('historyNew', ',', 7);
    }
    //add gia tri
    var currentNew = readCookie('historyNew');
    //kiem tra xem da duoc them vao cart hay chua
    if (currentNew.search(',' + newId + ',') == -1) {
        var newList = currentNew + newId + ',';
        createCookie('historyNew', newList, 7);
    }
}

function historyProduct(productId) {
    //tao cookie
    if (readCookie('historyProduct') == null) {
        createCookie('historyProduct', ',', 2);
    }
    else if (readCookie('historyProduct') == '') {
        createCookie('historyProduct', ',', 2);
    }
    //add gia tri
    var currentNew = readCookie('historyProduct');
    //kiem tra xem da duoc them vao cart hay chua
    if (currentNew.search(',' + productId + ',') == -1) {
        var listArr = ',' + productId + currentNew;
        createCookie('historyProduct', listArr, 2);
    }
}

function checkCouponKey() {
    var couponKey = $("#couponKey").val();
    $.get("/coupon.html", { couponKey: couponKey }, function(c) {
        if (c == "0") {
            alert("Mã khuyến mại không tồn tại hoặc đã hết hạn");
        } else {
            createCookie('couponId', c, 1);
        }
    })
}
function subscribeNewsletter() {
    $("#newsletter-submit").html("<b>Đang xử lý...</b>");
    var email = document.getElementById('email_newsletter').value;
    if (emailVerify(email)) {
        $.post("/Content/ashx/EmailNewsletter.ashx", { email: email },
        function(data) {
            if (data == '1') {
                alert("Email: " + email + " đã được đăng ký");
                $("#newsletter-submit").html("<a class=\"newsletter-submit\" onclick=\"subscribeNewsletter();\" href=\"javascript:void(0);\">ĐĂNG KÝ NGAY</a>");
            }
            else {
                if (data == '0') {
                    alert("Email: " + email + " chưa được xác thực.\nVui lòng truy cập vào mail để xác thực tài khoản");
                    $("#newsletter-submit").html("<a class=\"newsletter-submit\" onclick=\"subscribeNewsletter();\" href=\"javascript:void(0);\">ĐĂNG KÝ NGAY</a>");
                }
                else {
                    alert("Quý khách vừa đăng ký mail: " + email + ".\nVui lòng truy cập vào mail để xác thực địa chỉ email!");
                    $("#newsletter-submit").html("<a class=\"newsletter-submit\" onclick=\"subscribeNewsletter();\" href=\"javascript:void(0);\">ĐĂNG KÝ NGAY</a>");
                }
            }
        });
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

function showMoreProList() {
    var categoryId = $("#categoryId").val();
    var brandId = $("#brandId").val();
    var min = $("#min").val();
    var max = $("#max").val();
    var filter = $("#filter").val();
    var order = $("#order").val();
    var currentPage = $("#currentPage").val();
    var pageSize = $("#pageSize").val();
    $.post("/ajax/productlist.html", {
        categoryId: categoryId,
        brandId: brandId,
        min: min,
        max: max,
        filter: filter,
        order: order,
        currentPage: currentPage,
        pageSize: pageSize
    }, function (data) {
        $("#more-show").append(data);
        $("#currentPage").val(parseInt(currentPage) + 1);
    });
}

function showMoreProListR() {
    var categoryId = $("#categoryId").val();
    var brandId = $("#brandId").val();
    var min = $("#min").val();
    var max = $("#max").val();
    var order = $("#order").val();
    var currentPage = $("#currentPage").val();
    var pageSize = $("#pageSize").val();
    $.post("/ajax/productcategory.html", {
        categoryId: categoryId,
        brandId: brandId,
        min: min,
        max: max,
        order: order,
        currentPage: currentPage,
        pageSize: pageSize
    }, function (data) {
        $("#more-show").append(data);
        $("#currentPage").val(parseInt(currentPage) + 1);
    });
}
