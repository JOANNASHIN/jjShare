import Swiper from "swiper";

const olenzReview2 = () => {
    const $document = $(document);

    const isLayerShow = function ($layer, isShow) {
        if (isShow) $layer.addClass("show");
        else $layer.removeClass("show");
    }
    

    //공통함수 (슬라이드 실행여부)
    const canMakeSlider = function ($slides, minLength) {
        let isPass = true;

        if ($slides.length < minLength) {
            isPass = false;
        }

        return isPass; //슬라이드 만들거면 true / 아니면 false
    }

    //첫번째 슬라이드 만들기
    const photoSlider = function () {
        const $area = $(".js__photoSlider__area");
        const $slides = $area.find(".swiper-slide");
        const minLength = 6;

        if (!canMakeSlider($slides, minLength)) return ;


        $area.find(".js__slider__nav").addClass("show");

        new Swiper(".js__photoSlider__area .swiper-container", {
            loop: true,
            slidesPerView: "auto",
            navigation: {
                prevEl: '.reviewPage__button--prev',
                nextEl: '.reviewPage__button--next',
            },
        })
    }

    //레이어 함수
    const layerEvents = function () {
        const $layer = $(".fb__reviewPop");

        $document
            //팝업열기
            .on("click", ".js__slide__layerOpen", function () {
                const _index = $(this).data("index");

                isLayerShow($layer, true);
                photoPopupSlider(_index);                
            })
            //팝업닫기
            .on("click", ".fb__reviewPop__close", function () {
                isLayerShow($layer, false);
            })
    }

    const _loopCaseActiveClass = ($area, _index) => {
        if (!$area) return ;

        $area.find(".swiper-slide").removeClass("active");
        $area.find(".swiper-slide-active").addClass("active");

           // $(".allReview__slide").on("click", function(){
        //     sliders.slideTo($(this).index())
        // })
    }

    const addActiveClass = ($area, _index) => {
        if (!$area) return ;

        $area.find(".swiper-slide").removeClass("active");
        $area.find(".swiper-slide").eq(_index).addClass("active");
    }

    // 팝업 안 포토 슬라이드
    const photoPopupSlider = (_index) => {
        const $area = $(".js__photoPopupSlider__area");
        const $slides = $area.find(".swiper-slide");
        const minLength = 6;

        if (!canMakeSlider($slides, minLength)) {
            addActiveClass($area, _index);
            requestphotoPopupDetail(_index);
        }
        else {
            $area.find(".js__slider__nav").addClass("show");
    
            new Swiper(".js__photoPopupSlider__area .swiper-container", {
                // loop: true,
                slidesPerView: "auto",

                navigation: {
                    prevEl: '.allReview__button--prev',
                    nextEl: '.allReview__button--next',
                },
                on: {
                    init() {
                        //해당 슬라이드로 이동
                        this.slideToLoop(Number(_index));

                        //선택한 슬라이드에 active
                        addActiveClass($area, _index);
                        
                        //
                        requestphotoPopupDetail(_index);
                    },
    
                    click(swiper, e) {
                        const $clickTarget = $(e.target);
                        if (!$clickTarget.closest(".swiper-slide").data("index")) return ;
    
                        let _clickedIndex = 0;
                        
                        if (!$clickTarget.data("index")) {
                            _clickedIndex = $clickTarget.closest(".swiper-slide").data("index");
                        }
                        else {
                            _clickedIndex = $clickTarget.data("index");
                        }
                        
                        //갈수있는 슬라이드가 남아있는지 체크
                        if (_clickedIndex <= ($slides.length - minLength)) {
                            this.slideToLoop(Number(_clickedIndex), 1000, true)
                        }
    
                        //선택한 슬라이드에 active
                        addActiveClass($area, _clickedIndex);
                        requestphotoPopupDetail(_clickedIndex);
                    }
                }
            })
        }

    }

    const requestphotoPopupDetail = function (_index) {
        //api연동 필요 

        const $area = $(".js__photoDetail__area");
        const $slides = $area.find(".swiper-slide");
        const minLength = 1;

        if (!canMakeSlider($slides, minLength)) return ;

        $area.find(".js__slider__nav").addClass("show");
        
        new Swiper('.js__photoDetail__area .swiper-container', {
            pagination: {
                el: '.selectReview__pagination',
                type: 'fraction',
            },
            navigation: {
                prevEl: '.selectReview__button--prev',
                nextEl: '.selectReview__button--next',
            },
        });
    }
   

    const init = () => {
        photoSlider();
        layerEvents(); //팝업 오픈
    }
    
    init();
}

export default olenzReview2;

