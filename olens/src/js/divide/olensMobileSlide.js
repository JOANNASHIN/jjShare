import Swiper from "swiper"

const olensMobileSlide = () => {
    const slideInit = () => {
        new Swiper(".fb__slidetest__slider", {
            loop: true,
            slidesPerView: "auto"
        })
    }

    const init = () => {
        slideInit();
    }

    init();
}

export default olensMobileSlide;