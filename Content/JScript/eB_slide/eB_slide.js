$(document).ready(function () {
    
    /*Slide banner new 2018*/
    HomeBannerSlide_New2018();
    /*NAV*/
    HomeBannerSlide_New2018_Nav();
});
function HomeBannerSlide_New2018() {
    if ($("#homebanner_new_slide").hasClass("homebanner_new_slide")) {
        //alert("hi");
        var _eB_widthItem = -705;
        var _eB_widthAction = -142;
        var _eB_limitBanner = 5;
        /*DEFAULT*/
        var _eB_Action_Length = parseInt($(".homebanner_new_slide .eB_slide_action li").length);
        var _eB_Action_Width = parseInt($(".homebanner_new_slide .eB_slide_action li").width());
        $(".homebanner_new_slide .eB_slide_action").css("width", "" + parseInt(_eB_Action_Length * _eB_Action_Width) + "");

        $(".homebanner_new_slide .eB_slide_action li").eq(0).addClass("active");

        var setInterval_SlideNew2018 = setInterval(function () {

            var _itemInterval = parseInt($(".homebanner_new_slide .eB_slide_action li.active").attr("data-id")) + parseInt(1);
            var _lengthInterval = $(".homebanner_new_slide .eB_slide_action li").length;

            if (parseInt(_itemInterval) >= parseInt(_lengthInterval)) {
                _itemInterval = 0;
            }

            //action
            $(".homebanner_new_slide .eB_slide_action li").removeClass("active");
            $(".homebanner_new_slide .eB_slide_action li").eq(_itemInterval).addClass("active");
            //item
            $(".homebanner_new_slide .eB_slide_banner").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + (_itemInterval * _eB_widthItem) + "px, 0px, 0px)" });

            /*LIMIT*/
            if (parseInt(_itemInterval + 1) >= parseInt(_eB_limitBanner) && parseInt(_itemInterval + 1) < parseInt($(".homebanner_new_slide .eB_slide_banner li").length)) {
                _itemInterval = parseInt(_itemInterval) - parseInt(_eB_limitBanner) + 2;
                $(".homebanner_new_slide .eB_slide_action").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + parseInt(_itemInterval * _eB_widthAction) + "px, 0px, 0px)" });
            }
            else if (_itemInterval <= _eB_limitBanner) {
                $(".homebanner_new_slide .eB_slide_action").css({ "transition": "all 1000ms ease", "transform": "translate3d(0px, 0px, 0px)" });
            }

        }, 3000);

        //width: 6900px; left: 0px; display: block; transition: all 1000ms ease; transform: translate3d(0px, 0px, 0px);

        $("#homebanner_new_slide").mouseenter(function () {
            //alert(setInterval_SlideNew2018);
            clearInterval(setInterval_SlideNew2018);
        }).mouseleave(function () {
            //alert(setInterval_SlideNew2018);
            setInterval_SlideNew2018 = setInterval(function () {
                var _itemInterval = parseInt($(".homebanner_new_slide .eB_slide_action li.active").attr("data-id")) + parseInt(1);
                var _lengthInterval = $(".homebanner_new_slide .eB_slide_action li").length;

                if (parseInt(_itemInterval) >= parseInt(_lengthInterval)) {
                    _itemInterval = 0;
                }

                /*Action*/
                $(".homebanner_new_slide .eB_slide_action li").removeClass("active");
                $(".homebanner_new_slide .eB_slide_action li").eq(_itemInterval).addClass("active");
                /*Item*/
                $(".homebanner_new_slide .eB_slide_banner").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + (_itemInterval * _eB_widthItem) + "px, 0px, 0px)" });

                /*LIMIT*/
                if (parseInt(_itemInterval + 1) >= parseInt(_eB_limitBanner) && parseInt(_itemInterval + 1) < parseInt($(".homebanner_new_slide .eB_slide_banner li").length)) {
                    _itemInterval = parseInt(_itemInterval) - parseInt(_eB_limitBanner) + 2;
                    $(".homebanner_new_slide .eB_slide_action").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + parseInt(_itemInterval * _eB_widthAction) + "px, 0px, 0px)" });
                }
                else if (_itemInterval <= _eB_limitBanner) {
                    $(".homebanner_new_slide .eB_slide_action").css({ "transition": "all 1000ms ease", "transform": "translate3d(0px, 0px, 0px)" });
                }

            }, 3000);
        });

        $(".homebanner_new_slide .eB_slide_action li").click(function () {
            //alert("1");
            /*Action*/
            $(".homebanner_new_slide .eB_slide_action li").removeClass("active");
            $(this).addClass("active");
            var _itemInterval = parseInt($(this).attr("data-id"));
            /*Item*/
            $(".homebanner_new_slide .eB_slide_banner").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + parseInt(_itemInterval * _eB_widthItem) + "px, 0px, 0px)" });

            /*LIMIT*/
            if (parseInt(_itemInterval + 1) >= parseInt(_eB_limitBanner) && parseInt(_itemInterval + 1) < parseInt($(".homebanner_new_slide .eB_slide_banner li").length)) {
                _itemInterval = parseInt(_itemInterval) - parseInt(_eB_limitBanner) + 2;
                $(".homebanner_new_slide .eB_slide_action").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + parseInt(_itemInterval * _eB_widthAction) + "px, 0px, 0px)" });
            }
            else if (_itemInterval <= _eB_limitBanner) {
                $(".homebanner_new_slide .eB_slide_action").css({ "transition": "all 1000ms ease", "transform": "translate3d(0px, 0px, 0px)" });
            }

        });

    }
};
function HomeBannerSlide_New2018_Nav() {
    /*LEFT*/
    $(".homebanner_new_slide .eB_slide_nav_left").click(function () {

        var _eB_widthItem = -705;
        var _eB_widthAction = -142;
        var _eB_limitBanner = 5;

        var _itemInterval = parseInt($(".homebanner_new_slide .eB_slide_action li.active").attr("data-id")) - parseInt(1);

        if (parseInt(_itemInterval) < 0) {
            _itemInterval = parseInt($(".homebanner_new_slide .eB_slide_banner li").length) - 1;
        }

        /*Action*/
        $(".homebanner_new_slide .eB_slide_action li").removeClass("active");
        $(".homebanner_new_slide .eB_slide_action li").eq(_itemInterval).addClass("active");

        $(".homebanner_new_slide .eB_slide_banner").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + parseInt(_itemInterval * _eB_widthItem) + "px, 0px, 0px)" });

        /*LIMIT*/
        if (parseInt(_itemInterval) - parseInt(_eB_limitBanner) > 0) {
            _itemInterval = parseInt(_itemInterval) - parseInt(_eB_limitBanner) + 1;
            $(".homebanner_new_slide .eB_slide_action").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + parseInt(_itemInterval * _eB_widthAction) + "px, 0px, 0px)" });
        }
        else if (_itemInterval == 0) {
            $(".homebanner_new_slide .eB_slide_action").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + parseInt(_itemInterval * _eB_widthAction) + "px, 0px, 0px)" });
        }

    });

    /*RIGHT*/
    $(".homebanner_new_slide .eB_slide_nav_right").click(function () {

        var _eB_widthItem = -705;
        var _eB_widthAction = -142;
        var _eB_limitBanner = 5;
        var _itemInterval = parseInt($(".homebanner_new_slide .eB_slide_action li.active").attr("data-id")) + parseInt(1);

        if (parseInt(_itemInterval) >= parseInt($(".homebanner_new_slide .eB_slide_banner li").length)) {
            _itemInterval = 0;
        }

        /*Action*/
        $(".homebanner_new_slide .eB_slide_action li").removeClass("active");
        $(".homebanner_new_slide .eB_slide_action li").eq(_itemInterval).addClass("active");

        $(".homebanner_new_slide .eB_slide_banner").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + parseInt(_itemInterval * _eB_widthItem) + "px, 0px, 0px)" });

        /*LIMIT*/
        if (_itemInterval >= _eB_limitBanner) {
            _itemInterval = parseInt(_itemInterval) - parseInt(_eB_limitBanner) + 1;
            $(".homebanner_new_slide .eB_slide_action").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + parseInt(_itemInterval * _eB_widthAction) + "px, 0px, 0px)" });
        }
        else if (_itemInterval == 0) {
            $(".homebanner_new_slide .eB_slide_action").css({ "transition": "all 1000ms ease", "transform": "translate3d(" + parseInt(_itemInterval * _eB_widthAction) + "px, 0px, 0px)" });
        }

    });
};