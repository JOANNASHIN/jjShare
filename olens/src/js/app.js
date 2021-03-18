import _ from "lodash";
import $ from 'jquery';
import moment from "moment";
import Swiper from "swiper";
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);
window.$ = window.jquery = window.jQuery = $;
window.moment = moment;

//공통
import common from "./divide/common";

// 페이지
import olenzReview from "./divide/olenzReview";
import olenzFreegift from "./divide/olenzFreegift";

const swiper = new Swiper;
const htmlDoc = document.documentElement;
let enSizing = false;

// rem 적용을 위해 추가
const setFontSize = () => {
	htmlDoc.style.fontSize =  (parseInt((htmlDoc.offsetWidth/320*62.5) * 100000) / 100000) + '%';
}

$(window).on("resize", function(e) {
	if (!enSizing) {
		window.requestAnimationFrame(function() {
			setFontSize();
			enSizing = false;
		});
	}
	enSizing = true;
});

const appMethods = {
    common,
    olenzFreegift,
    olenzReview
}

const appInit = () => {
    const appName = $("body").attr("id");

    if (appName) [common, appMethods[appName]].forEach(method => {
        if (method) method();
        setFontSize();
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    appInit();
})