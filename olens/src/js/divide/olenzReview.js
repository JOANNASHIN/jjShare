import Swiper from "swiper";

const olenzReview = () => {
    const $document = $(document) 

    const ReviewPopClose = () => {
        $document.on("click", ".fb__reviewPop__close", function() {
            $(".fb__reviewPop__layer").removeClass("show");
        })
    }

    // 슬라이드 갯수가 설정해놓은 값을 초과하면 슬라이드가 실행되며 버튼 나타남
    const allReviewStart = () => {
        const $slide = $(".allReview__slide");
        //하나로 컨트롤
        const $slideBtn = $(".allReview__button");
        const _slideLength = $slide.length;
        const _showLength = 6;

        if( _slideLength > _showLength ){
            $slideBtn.addClass("show");
            allReviewSlider(); //전체리뷰 슬라이드 실행
        } else {
            $slideBtn.removeClass("show");
        }

        // 슬라이드를 클릭하면 해당 슬라이드 active됨
        $document.on("click", ".allReview__slide", function() {
            $(".allReview__slide").removeClass("active");
            $(this).addClass("active");
        })
    }
    
    const allReviewSlider = () => {
        new Swiper( ".allReview__container", {
            // loop: true,
            slidesPerView: 6,
            navigation: {
                prevEl: '.allReview__button--prev',
                nextEl: '.allReview__button--next',
            },
        });
    }
    
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
    
    const init = () => {
        ReviewPopClose(); //팝업창 닫기
        allReviewStart(); //전체리뷰 슬라이드
        selectReviewSlider(); //선택리뷰 슬라이드
    }

    init();

}

export default olenzReview;