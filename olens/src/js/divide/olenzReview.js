import Swiper from "swiper";

const olenzReview = () => {
    const $document = $(document);

    // 슬라이드 개수 확인
    const isSliderStart = () => {
        const $review = $(".js__review");
        const $slide = $review.find(".swiper-slide");
        const $slideBtn = $review.find(".js__slider__nav");  
        // const _slideLength = ( $slide.length ); 
        const _slideLength = ( $slide.length / 2 ) //임시 
        const _showLength = 6;

        if ( _slideLength > _showLength ){
            $slideBtn.addClass("show");
            pageReviewSlider(); // 리뷰슬라이드 실행
            ReviewPopOpen(true);
        } 
        else {
            $slideBtn.removeClass("show");
            ReviewPopOpen(false);
        }

        // *** 팝업 열기전 슬라이드의 값을 고정적인 값 전달하여 
        // *** 팝업 연 후의 슬라이드 값을 비교 않고 바로 알 수 있게 해야함
        // *** ( $("allReview__slide") / 2 ) = _slideLength 이면 true
        return _slideLength;
    }


    // 팝업창 열기
    const ReviewPopOpen = (value) => {
        $document.on("click", ".js__slide__layerOpen", function() {
            $(".fb__reviewPop").addClass("show");
            let _target = $(this).attr("data-index");

            isSelectSliderStart() //선택리뷰 갯수 체크

            if ( value == true ){
                allReviewSlider(_target); //전체리뷰 슬라이더 실행
            } 
            else {
                reviewPageNotFull(_target); 
            }
        })
    }


    //선택리뷰 갯수 체크
    const isSelectSliderStart = () => {
        const $selecttNav = $(".selectReview__nav");
        const _selectLength = $(".selectReview__slide").length;
        const _showLength = 1;

        if ( _selectLength > _showLength ){
            $selecttNav.addClass("show");
            selectReviewSlider(); //선택리뷰 슬라이더 실행
        } 
        else {
            $selecttNav.removeClass("show");
        }
    } 


    // 선택한 슬라이드마다 수기로 active
    const reviewPageNotFull = (_target) => {
        $(".allReview__slide").removeClass("active");
        $(`.allReview__slide:eq(${_target})`).addClass("active");
    }

    
    // 리뷰페이지 슬라이더
    const pageReviewSlider = () => {
        new Swiper( ".js__reviewPage__slider", {
            loop: true,
            slidesPerView: "auto",
            navigation: {
                prevEl: '.reviewPage__button--prev',
                nextEl: '.reviewPage__button--next',
            },
        });
    }


    // 전체리뷰 슬라이더
    const allReviewSlider = (_target) => {
        let test;
        test = new Swiper( ".allReview__container", {
            loop: true,
            slidesPerView: "auto",
            navigation: {
                prevEl: '.allReview__button--prev',
                nextEl: '.allReview__button--next',
            },
            // slideToClickedSlide : true,
            on: {
                // 페이지 슬라이더에서 선택한 슬라이드의 값과 전체리뷰 슬라이더의 슬라이드 값을 같도록!
                init() {
                    // this.slideTo(Number(_target));
                    if( _target > 0 ){
                        this.slideTo(_target, 0);
                    }
                    // console.log("고른거", _target);
                    // console.log("나온거", this.realIndex);
                },
            }
        });

        $document.on("click", ".allReview__slide", function (){
            let _index = $(this).attr("data-swiper-slide-index");
            console.log(test.realIndex)
            // test.slideTo(_index)
        })
    }
    
    
    //선택리뷰 슬라이더
    const selectReviewSlider = () => {
        new Swiper('.selectReview__container', {
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
    

    // 팝업창 닫기
    const ReviewPopClose = () => {
    $document.on("click", ".fb__reviewPop__close", function() {
        $(".fb__reviewPop").removeClass("show");
    })
    }


    // 가장 먼저 실행되는 것
    const init = () => {
        isSliderStart(); //페이지, 전체리뷰 갯수 체크
        ReviewPopClose(); //팝업창 닫기
    }
    
    init();
}

export default olenzReview;


//=======================================================================================================백업

    // //슬라이드 개수 확인
    // const isSliderStart = () => {
    //     const $review = $(".js__review");
    //     const $slide = $review.find(".swiper-slide");
    //     const $slideBtn = $review.find(".js__slider__nav");  
    //     // const _slideLength = ( $slide.length ); 
    //     const _slideLength = ( $slide.length / 2 ) //임시 
    //     const _showLength = 6;

    //     if ( _slideLength > _showLength ){
    //         $slideBtn.addClass("show");
    //         pageReviewSlider(); // 리뷰페이지 실행
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
    //         slidesPerView: 6,
    //         navigation: {
    //             prevEl: '.reviewPage__button--prev',
    //             nextEl: '.reviewPage__button--next',
    //         },
    //     });
    // }


    // // 전체리뷰 슬라이더
    // const allReviewSlider = (_target) => {
    //     new Swiper( ".allReview__container", {
    //         loop: true,
    //         // centeredSlides: true,
    //         loopFillGroupWithBlank: true,
    //         initialSlide: 0,
    //         slidesPerView: "auto",
    //         navigation: {
    //             prevEl: '.allReview__button--prev',
    //             nextEl: '.allReview__button--next',
    //         },
    //         slideToClickedSlide : true,
    //         on: {
    //             // 페이지 슬라이더에서 선택한 슬라이드의 값과 전체리뷰 슬라이더의 슬라이드 값을 같도록!
    //             init() {
    //                 this.slideTo(Number(_target), 1, true)
    //                 // console.log("고른거", _target);
    //                 // console.log("나온거", this.realIndex);
    //             },
    //         }
    //     });

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

//=======================================================================================================백업