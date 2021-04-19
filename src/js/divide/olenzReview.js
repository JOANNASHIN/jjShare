import Swiper from "swiper";

const olenzReview = () => {
    const $document = $(document);

    // ** 원래는 갯수를 체크하면 바로 슬라이드 실행을 하거나 팝업을 오픈하거나 했음 return을 활용하면 이 지점 해결가능
    // // 슬라이드 개수 확인
    // const isSliderStart = () => {
    //     const $review = $(".js__review");
    //     const $slide = $review.find(".swiper-slide");
    //     const $slideBtn = $review.find(".js__slider__nav");  
    //     // const _slideLength = ( $slide.length ); 
    //     const _slideLength = ( $slide.length / 2 ) //임시 
    //     const _showLength = 6;

    //     if ( _slideLength > _showLength ){
    //         $slideBtn.addClass("show");
    //         pageReviewSlider(); // 리뷰슬라이드 실행
    //         ReviewPopOpen(true);
    //     } 
    //     else {
    //         $slideBtn.removeClass("show");
    //         ReviewPopOpen(false);
    //     }
    //     return _slideLength;
    // }

    //선택리뷰 갯수 체크
    // const isSelectSliderStart = () => {
    //     const $selecttNav = $(".selectReview__nav");
    //     const _selectLength = $(".selectReview__slide").length;
    //     const _showLength = 1;

    //     if ( _selectLength > _showLength ){
    //         $selecttNav.addClass("show");
    //         selectReviewSlider(); //선택리뷰 슬라이더 실행
    //     } 
    //     else {
    //         $selecttNav.removeClass("show");
    //     }
    // } 
    

    // ** 각각의 <슬라이드 만들기> 함수에서, 슬라이드 갯수를 체크하고 도출한 boolean을 다음의 함수로 보냄
    // 공통함수 : 슬라이드 갯수 체크
    const canMakeSlider = function ($slides, minLength) {
        let isPass = true;

        if ($slides.length < minLength) {
            isPass = false;
        }

        return isPass; //슬라이드 만들거면 true / 아니면 false
    }


    // // 리뷰페이지 슬라이더
    // const pageReviewSlider = () => {
    //     new Swiper( ".js__reviewPage__slider", {
    //         loop: true,
    //         slidesPerView: "auto",
    //         navigation: {
    //             prevEl: '.reviewPage__button--prev',
    //             nextEl: '.reviewPage__button--next',
    //         },
    //     });
    // }

    // 페이지 슬라이드 만들기
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


    // ** 원래는 슬라이드를 클릭하면 팝업창을 열고, 슬라이드 인덱스를 넘기는 식으로 그래서 바로 슬라이드 실행
    // ** 이때 슬라이더 가능 여부의 값을 true, false로 받아와서 false이면 또 다른 함수 실행
    // 팝업창 열기
    // const ReviewPopOpen = (value) => {
    //     $document.on("click", ".js__slide__layerOpen", function() {
    //         $(".fb__reviewPop").addClass("show");
    //         let _target = $(this).attr("data-index");

    //         isSelectSliderStart() //선택리뷰 갯수 체크

    //         if ( value == true ){
    //             allReviewSlider(_target); //전체리뷰 슬라이더 실행
    //         } 
    //         else {
    //             reviewPageNotFull(_target); 
    //         }
    //     })
    // }

    // // 팝업창 닫기
    // const ReviewPopClose = () => {
    //     $document.on("click", ".fb__reviewPop__close", function() {
    //         $(".fb__reviewPop").removeClass("show");
    //     })
    // }

    // 팝업 열고 닫기
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

    // 팝업 열고 닫기 여부 체크
    const isLayerShow = function ($layer, isShow) {
        if (isShow) $layer.addClass("show");
        else $layer.removeClass("show");
    }


    // // 전체리뷰 슬라이더
    // const allReviewSlider = (_target) => {
    //     let test;
    //     test = new Swiper( ".allReview__container", {
    //         loop: true,
    //         slidesPerView: "auto",
    //         navigation: {
    //             prevEl: '.allReview__button--prev',
    //             nextEl: '.allReview__button--next',
    //         },
    //         // slideToClickedSlide : true,
    //         on: {
    //             // 페이지 슬라이더에서 선택한 슬라이드의 값과 전체리뷰 슬라이더의 슬라이드 값을 같도록!
    //             init() {
    //                 // this.slideTo(Number(_target));
    //                 if( _target > 0 ){
    //                     this.slideTo(_target, 0);
    //                 }
    //                 // console.log("고른거", _target);
    //                 // console.log("나온거", this.realIndex);
    //             },
    //         }
    //     });

    //     $document.on("click", ".allReview__slide", function (){
    //         let _index = $(this).attr("data-swiper-slide-index");
    //         console.log(test.realIndex)
    //         // test.slideTo(_index)
    //     })
    // }


    // 팝업 안 포토 슬라이드
    const photoPopupSlider = (_index) => {
        const $area = $(".js__photoPopupSlider__area");
        const $slides = $area.find(".swiper-slide");
        const minLength = 6;

        if (!canMakeSlider($slides, minLength)) {
            addActiveClass($area, _index); //선택리뷰 active
            requestphotoPopupDetail(_index); //선택리뷰 슬라이드
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
                        
                        // ** 그래 이렇게 했어야했다. 선택 슬라이드에 선택한 값이 들어있는 데이터를 넘겨야 한다!
                        //선택 슬라이드에 index 값 넘기고 실행
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
                            _clickedIndex = $clickTarget.data("index"); // ** $clickTarget.data("index" 맞다면 대입한다
                        }
                        
                        // ** 루프를 돌지 않으니까 선택할 슬라이드가 더 남았다고 view를 제공해주는 과정 (아주 놀랍다!)
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


    // // 선택한 슬라이드마다 수기로 active
    // const reviewPageNotFull = (_target) => {
    //     $(".allReview__slide").removeClass("active");
    //     $(`.allReview__slide:eq(${_target})`).addClass("active");
    // }

    const addActiveClass = ($area, _index) => {
        if (!$area) return ;

        $area.find(".swiper-slide").removeClass("active");
        $area.find(".swiper-slide").eq(_index).addClass("active");
    }


    //선택리뷰 슬라이더
    // const selectReviewSlider = () => {
    //     new Swiper('.selectReview__container', {
    //         pagination: {
    //             el: '.selectReview__pagination',
    //             type: 'fraction',
    //         },
    //         navigation: {
    //             prevEl: '.selectReview__button--prev',
    //             nextEl: '.selectReview__button--next',
    //         },
    //     });
    // }

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


    // 가장 먼저 실행되는 것
    const init = () => {
        // isSliderStart(); //페이지, 전체리뷰 갯수 체크
        // ReviewPopClose(); //팝업창 닫기
        photoSlider(); //페이지 슬라이드
        layerEvents(); //팝업 열고 닫기
    }
    
    init();
}

export default olenzReview;



//------------------------------------------------------------------------------------------------------------내가 짠 스크립트
    // // 슬라이드 개수 확인
    // const isSliderStart = () => {
    //     const $review = $(".js__review");
    //     const $slide = $review.find(".swiper-slide");
    //     const $slideBtn = $review.find(".js__slider__nav");  
    //     // const _slideLength = ( $slide.length ); 
    //     const _slideLength = ( $slide.length / 2 ) //임시 
    //     const _showLength = 6;

    //     if ( _slideLength > _showLength ){
    //         $slideBtn.addClass("show");
    //         pageReviewSlider(); // 리뷰슬라이드 실행
    //         ReviewPopOpen(true);
    //     } 
    //     else {
    //         $slideBtn.removeClass("show");
    //         ReviewPopOpen(false);
    //     }

    //     // *** 팝업 열기전 슬라이드의 값을 고정적인 값 전달하여 
    //     // *** 팝업 연 후의 슬라이드 값을 비교 않고 바로 알 수 있게 해야함
    //     // *** ( $("allReview__slide") / 2 ) = _slideLength 이면 true
    //     return _slideLength;
    // }


    // // 팝업창 열기
    // const ReviewPopOpen = (value) => {
    //     $document.on("click", ".js__slide__layerOpen", function() {
    //         $(".fb__reviewPop").addClass("show");
    //         let _target = $(this).attr("data-index");

    //         isSelectSliderStart() //선택리뷰 갯수 체크

    //         if ( value == true ){
    //             allReviewSlider(_target); //전체리뷰 슬라이더 실행
    //         } 
    //         else {
    //             reviewPageNotFull(_target); 
    //         }
    //     })
    // }


    // //선택리뷰 갯수 체크
    // const isSelectSliderStart = () => {
    //     const $selecttNav = $(".selectReview__nav");
    //     const _selectLength = $(".selectReview__slide").length;
    //     const _showLength = 1;

    //     if ( _selectLength > _showLength ){
    //         $selecttNav.addClass("show");
    //         selectReviewSlider(); //선택리뷰 슬라이더 실행
    //     } 
    //     else {
    //         $selecttNav.removeClass("show");
    //     }
    // } 


    // // 선택한 슬라이드마다 수기로 active
    // const reviewPageNotFull = (_target) => {
    //     $(".allReview__slide").removeClass("active");
    //     $(`.allReview__slide:eq(${_target})`).addClass("active");
    // }

    
    // // 리뷰페이지 슬라이더
    // const pageReviewSlider = () => {
    //     new Swiper( ".js__reviewPage__slider", {
    //         loop: true,
    //         slidesPerView: "auto",
    //         navigation: {
    //             prevEl: '.reviewPage__button--prev',
    //             nextEl: '.reviewPage__button--next',
    //         },
    //     });
    // }


    // // 전체리뷰 슬라이더
    // const allReviewSlider = (_target) => {
    //     let test;
    //     test = new Swiper( ".allReview__container", {
    //         loop: true,
    //         slidesPerView: "auto",
    //         navigation: {
    //             prevEl: '.allReview__button--prev',
    //             nextEl: '.allReview__button--next',
    //         },
    //         // slideToClickedSlide : true,
    //         on: {
    //             // 페이지 슬라이더에서 선택한 슬라이드의 값과 전체리뷰 슬라이더의 슬라이드 값을 같도록!
    //             init() {
    //                 // this.slideTo(Number(_target));
    //                 if( _target > 0 ){
    //                     this.slideTo(_target, 0);
    //                 }
    //                 // console.log("고른거", _target);
    //                 // console.log("나온거", this.realIndex);
    //             },
    //         }
    //     });

    //     $document.on("click", ".allReview__slide", function (){
    //         let _index = $(this).attr("data-swiper-slide-index");
    //         console.log(test.realIndex)
    //         // test.slideTo(_index)
    //     })
    // }
    
    
    // //선택리뷰 슬라이더
    // const selectReviewSlider = () => {
    //     new Swiper('.selectReview__container', {
    //         pagination: {
    //             el: '.selectReview__pagination',
    //             type: 'fraction',
    //         },
    //         navigation: {
    //             prevEl: '.selectReview__button--prev',
    //             nextEl: '.selectReview__button--next',
    //         },
    //     });
    // }
    

    // // 팝업창 닫기
    // const ReviewPopClose = () => {
    // $document.on("click", ".fb__reviewPop__close", function() {
    //     $(".fb__reviewPop").removeClass("show");
    // })
    // }


    // // 가장 먼저 실행되는 것
    // const init = () => {
    //     isSliderStart(); //페이지, 전체리뷰 갯수 체크
    //     ReviewPopClose(); //팝업창 닫기
    // }
    
    // init();
//------------------------------------------------------------------------------------------------------------내가 짠 스크립트