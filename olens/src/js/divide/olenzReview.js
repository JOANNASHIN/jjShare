import Swiper from "swiper";

const olenzReview = () => {
    const $document = $(document);
    
    // 리뷰페이지 슬라이드
    const pageReviewSlider = () => {
        new Swiper( ".js__reviewPage__slider", {
            loop: true,
            slidesPerView: 6,
            navigation: {
                prevEl: '.reviewPage__button--prev',
                nextEl: '.reviewPage__button--next',
            },
        });
    }

    // 팝업창 열기
    const ReviewPopOpen = () => {
        $document.on("click", ".js__slide__layerOpen", function() {
            $(".fb__reviewPop").addClass("show");
            ReviewPopStart();
            let _target = $(this).attr("data-index");
            allReviewStart(_target);
        })
    }


    // 팝업창 닫기
    const ReviewPopClose = () => {
        $document.on("click", ".fb__reviewPop__close", function() {
            $(".fb__reviewPop").removeClass("show");
        })
    }


    // 팝업창 스크립트 실행 
    const ReviewPopStart = () => {
        selectReviewSlider(); //선택리뷰 슬라이드
    }

    
    // 전체리뷰 슬라이드 갯수에 따른 실행 정의
    const allReviewStart = (_target) => {
        const $area = $(".js__allreview");
        
        const $slide = $area.find(".swiper-slide");
        const $slideBtn = $area.find(".js__slider__nav");
        const _slideLength = $slide.length;
        const _showLength = 6;
        
        if( _slideLength > _showLength ){
            $slideBtn.addClass("show");
            allReviewSlider(_target, _showLength); //전체리뷰 슬라이드 실행
        } else {
            $slideBtn.removeClass("show");
        }
    }


    // 전체리뷰 슬라이드
    const allReviewSlider = (_target, _showLength) => {
        new Swiper( ".js__allreview .swiper-container", {
            loop: true,
            // preventClicks: true,
            // preventClicksPropagation: true,
            slidesPerView: 6,
            navigation: {
                prevEl: '.allReview__button--prev',
                nextEl: '.allReview__button--next',
            },
            slideToClickedSlide : true,
            on: {
                // 페이지 레이아웃의 슬라이드 값과 같은 값의 팝업창 전체리뷰 슬라이드를!
                init() {
                    this.slideTo(Number(_target) + Number(_showLength), 1, true)
                },

                // click(swiper, event) {
                //     //그 인덱스로 가라
                //     // this.slideTo()
            
                //     // console.log("this", this); //this
                //     // console.log("swiper", swiper); //this
                //     // console.log("swiper", event); //사용 가능한 event
                //     console.log("clickedIndex", this.clickedIndex); //this의 realIndex 
                //     // realIndex가 슬라이드 한번 할 때마다 바뀜 0 - 1 - 2 -3 - 4 - 5 - 6 - 0
                //     console.log("activeIndex", this.activeIndex); 
                //     // 6 - 7 - 8 - 9 - 10 - 11 - 12 - 13 - 7
                // }
            }
        });

        // window.test = test;
    }
    
    
    //선택리뷰 슬라이드
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
    
    // 가장 먼저 실행되는 것
    const init = () => {
        pageReviewSlider(); //리뷰페이지 슬라이드
        ReviewPopOpen(); //팝업창 열기
        ReviewPopClose(); //팝업창 닫기
    }
    
    init();
}

export default olenzReview;



// // active 위치값 고정일 때, 전체리뷰 active
// const allReviewActive = () => {
//     const _activePosition = $(".allReview__slide:nth-child(3)").position().left;

//     // 슬라이드를 클릭하면 동작
//     $document.on("click", ".allReview__slide", function() {
//         const _thisPosition = $(this).position().left;
//         const _thisMovePosition = -(_thisPosition) + _activePosition
        
//         $(".allReview__slide").removeClass("active");
//         $(this).addClass("active");

//         $(".allReview__slider").css("transform","translate("+ _thisMovePosition + "px)");
//         $(".allReview__slider").css("transition" ,"transform 0.3s");
//     })
// }