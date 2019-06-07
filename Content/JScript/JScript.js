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

function couponsCheck(type, couponKey) {
    if (couponKey != '') {
        $.get("/ajax/couponscheck.html", { couponKey: couponKey }, function (data) {
            if (data == "1") {
                $("#loadcart_coupon").load("/ajax/cartcoupon.html");
            } else {
                alert("Mã không hợp lệ!");
                $("#loadcart_coupon").load("/ajax/cartcoupon.html");
            }
        });
    }
}

function couponsCheckLoad() {
    var couponKey = $("#couponKey").val();
    if (couponKey != '') {
        $.get("/ajax/couponscheck.html", { couponKey: couponKey }, function (data) {
            if (data == "1") {
                $("#loadcart_coupon").load("/ajax/cartcoupon.html");
            } else {
                alert("Mã không hợp lệ!");
                $("#loadcart_coupon").load("/ajax/cartcoupon.html");
            }
        });
    }
}

function couponsCheckPro(productId, couponKey) {
    if (couponKey != '') {
        $.get("/ajax/couponscheck.html?id=1", {productId:productId, couponKey: couponKey }, function (data) {
            if (data == "1") {
                $("#loadcart_coupon").load("/ajax/cartcoupon.html");
            } else {
                alert("Mã không hợp lệ!");
                $("#loadcart_coupon").load("/ajax/cartcoupon.html");
            }
        });
    }
}

function couponsCheckProLoad(productId) {
    var couponKey = $("#couponKey_" + productId).val();
    if (couponKey != '') {
        $.get("/ajax/couponscheck.html?id=1", {productId: productId, couponKey: couponKey }, function (data) {
            if (data == "1") {
                $("#loadcart_coupon").load("/ajax/cartcoupon.html");
            } else {
                alert("Mã không hợp lệ!");
                $("#loadcart_coupon").load("/ajax/cartcoupon.html");
            }
        });
    }
}


/*customer========*/
function loginHtml() {
    if (readCookie('clientCustomerID') == "" || readCookie('clientCustomerID') == "0")
        $("#loginHtml").load("/loginfalse.html");
    else
        $("#loginHtml").load("/logintrue.html");
}

function deleteGlobal(idDel, page) {
    if (confirm('Bạn chắc chắn muốn xóa ?')) {
        $("#row_" + idDel).html("<b>Đang thực hiện. Vui lòng chờ...</b>");
        $.get(page, { idDel: idDel }, function(data) {
            $("#row_" + idDel).fadeOut();
        });
    }
}

/*cookie===========================*/
//tao cookie
function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}
//doc cookie
function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return unescape(c.substring(nameEQ.length, c.length)).replace("%2C", ",");
        }
    }
    return "";
}
//xoa bo cookie
function removeCookie(name) {
    createCookie(name, "", -1);
}

/*carts===========================*/
//them san pham vao gio hang
function cartRedirect(type ,productId, quantity) {

    //tao cookie gio hang neu cua co
    if (readCookie('shoppingCart') == null) {
        createCookie('shoppingCart', '', 1);
    }
    //add gia tri vao shopping cart
    var currentCart = readCookie('shoppingCart');

    //kiem tra xem da duoc them vao cart hay chua
    if (currentCart.search(',' + type + '-' + productId + '-') == -1) {
        var newCart = currentCart + ','+ type + '-' + productId + '-' + quantity;
        createCookie('shoppingCart', newCart, 1);
        window.location.href = '/gio-hang/payment.html';
    } else {
        window.location.href = '/gio-hang/payment.html';
    }
}
//cap nhat so luong san pham trong cart

function cartUpdate(type, productId, quantity) {    
    var newquantity = $("#quantity_" + productId).val();
    newquantity = parseInt(newquantity);
    if (newquantity < 1) {
        cartDeleteFrom(type, productId, quantity);
    } else {
        if (newquantity > 99) {
            alert('Bạn chỉ được phép mua tối đa số lượng 99 cho mỗi sản phẩm');
            newquantity = 99;
        }
        var currentCart = readCookie('shoppingCart');
        new_cart = currentCart.replace("," + type + "-" + productId + '-' + quantity, "," + type + "-" + productId + '-' + newquantity);
        createCookie('shoppingCart', new_cart, 1);
        window.location.href = '/gio-hang/payment.html';
    }
}

function cartUpdateType(type, productId, quantity, idQuantity) {
    var newquantity = $("#" + idQuantity).val();
    newquantity = parseInt(newquantity);
    if (newquantity < 1) {
        cartDeleteFrom(type, productId, quantity);
    } else {
        if (newquantity > 99) {
            alert('Bạn chỉ được phép mua tối đa số lượng 99 cho mỗi sản phẩm');
            newquantity = 99;
        }
        var currentCart = readCookie('shoppingCart');
        new_cart = currentCart.replace("," + type + "-" + productId + '-' + quantity, "," + type + "-" + productId + '-' + newquantity);
        createCookie('shoppingCart', new_cart, 1);
        window.location.href = '/gio-hang/payment.html';
    }
}


//xoa bo item trong cart
function cartDeleteFrom(type, productId, quantity) {
    if (confirm('Bạn muốn xóa sản phẩm này khỏi giỏ hàng ? ')) {
        var currentCart = readCookie('shoppingCart');
        new_cart = currentCart.replace("," + type + "-" +productId + '-' + quantity, "");
        createCookie('shoppingCart', new_cart, 1);
        window.location.href = '/gio-hang/payment.html';
    }
}

//Xoa toan bo don hang
function cartDelAll() {
    if (confirm('Bạn muốn xóa tất cả sản phẩm trong đơn hàng? ')) {
        removeCookie('shoppingCart');
        window.location.href = '/';
    }
}
//Lua chon phuong thuc thanh toan, van chuyen
function cartCheckSelect(index, count, paymentId, type) {
    if ($('#check_' + type + '_' + index).attr('checked')) {
        for (var i = 0; i < count; i++) {
            if (i == index) {
                $('#content_' + type + '_' + i).css({ 'display': 'block' });
                $('#' + type + '_' + i).css({ 'background-color': 'Yellow' });
                $('#' + type + 'Id').val(paymentId);
            }
            else
                $('#' + type + '_' + i).css({ 'display': 'none' });
        }
    }
    else {
        for (var i = 0; i < count; i++) {
            $('#' + type + '_' + i).css({ 'display': 'block' });
        }
        $('#content_' + type + '_' + index).css({ 'display': 'none' });
        $('#' + type + '_' + index).css({ 'background-color': '#ffffff' });
        $('#' + type + 'Id').val('0');
    } 
}

function cartCheckVAT() {
    if ($('#chkVAT').attr('checked')) {
        $('.loadVAT').css({ 'display': 'block' });
    }
    else {
        $('.loadVAT').css({ 'display': 'none' });
    }
}

function cartLoadTel(tel) {
    $.get('/ajax/customerload.html', { tel: tel },
    function (data) {
        if (data != '') {
            var listArr = data.split('|');
            for (var i = 0; i < listArr.length; i++) {
                switch (i) {
                    case 0:
                        $(".cssCartFullname").val(listArr[i]);
                        break;
                    case 1:
                        $(".cssCartAddress").val(listArr[i]);
                        break;
                    case 2:
                        $(".cssCartEmail").val(listArr[i]);
                        break;
                }
            }

        }
        else {
            $(".cssCartFullname").val('');
            $(".cssCartAddress").val('');
            $(".cssCartEmail").val('');
        }
    });
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
//Check form dat hang
$(document).ready(function() {
    $(".checkFormCart").click(function() {
        if ($('.cssCartFullname').val() == '') {
            alert('Vui lòng cho biết tên bạn?');
            $('.cssCartFullname').focus();
            return false;
        }
        var vTel = $('.cssCartTel').val().trim();
        if ($('.cssCartTel').val() == '') {
            alert('Vui lòng cho biết điện thoại của bạn?');
            $('.cssCartTel').focus();
            return false;
        }
        vTel = vTel.replace(" ", "").replace(".", "").replace(",", "").replace(" ", "").replace(".", "").replace(",", "").replace(" ", "").replace(".", "").replace(",", "");
        if (isNaN(vTel) || vTel.length < 9 || vTel.length > 12) {
            alert('Số điện thoại không hợp lệ.?');
            $('.cssCartTel').focus();
            return false;
        }
        if ($('.cssCartAddress').val() == '') {
            alert('Vui lòng biết địa chỉ của bạn?');
            $('.cssCartAddress').focus();
            return false;
        }

        if ($('#shippingId').val() == '0') {
            alert('Vui lòng chọn phương thức vận chuyển?');
            return false;
        }
        if ($('#paymentId').val() == '0') {
            alert('Vui lòng chọn phương thức thanh toán?');
            return false;
        }
        if (!$('#checkFormCart').attr('checked')) {
            alert('Vui lòng đồng ý điều khoản, điều khiện website.');
            return false;
        }
        if ($('.cssCartEmail').val() != '') {
            if (!emailVerify($('.cssCartEmail').val())) {
                $('.cssCartEmail').focus();
                return false;
            }
        }
        if ($('#formCaptcha').val() == '') {
            alert('Vui lòng nhập mã bảo mật?');
            $('#formCaptcha').focus();
            return false;
        }
        $("#cartLoadSend").css({ "display": "block" });
    });


    //Check register
    $(".checkFormRegister").click(function() {
        if (!emailVerify($('.regEmail').val())) {
            $('.regEmail').focus();
            return false;
        }
        if ($('.regPass').val() == '') {
            alert('Vui lòng nhập mật khẩu.');
            $('.regPass').focus();
            return false;
        }
        if ($('.regPass').val() != $('.regPass1').val()) {
            alert('Mật khẩu nhập lại không hợp lệ.');
            $('.regPass1').focus();
            return false;
        }
        if ($('.regFullname').val() == '') {
            alert('Vui lòng nhập họ tên.');
            $('.regFullname').focus();
            return false;
        }
        if ($('.regAddress').val() == '') {
            alert('Vui lòng nhập địa chỉ.');
            $('.regAddress').focus();
            return false;
        }
        var vTel = $('.regTel').val().trim();
        if ($('.regTel').val() == '') {
            alert('Vui lòng cho biết điện thoại của bạn?');
            $('.regTel').focus();
            return false;
        }
        vTel = vTel.replace(" ", "").replace(".", "").replace(",", "").replace(" ", "").replace(".", "").replace(",", "").replace(" ", "").replace(".", "").replace(",", "");
        if (isNaN(vTel) || vTel.length < 9 || vTel.length > 12) {
            alert('Số điện thoại không hợp lệ.?');
            $('.regTel').focus();
            return false;
        }
    });
    
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
        var vscrollC = $('#scrollContent').height() +450;
        var vscrollL = $('#scrollTop').height() - 100;
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
