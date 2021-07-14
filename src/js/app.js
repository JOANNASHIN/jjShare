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
import todoJSON from "./divide/todoJSON";
import tableJSON from "./divide/tableJSON";

// 페이지
import mobileJieunOlensSlide from "./divide/mobileJieunOlensSlide";

import pcOlensFreegift from "./divide/pcOlensFreegift";
import pcOlensReview from "./divide/pcOlensReview";

import pcJieunOlensReviewFeedback from "./divide/pcJieunOlensReviewFeedback";
import pcJieunTodoFeedback from "./divide/pcJieunTodoFeedback";

import pcJiwonTodo from "./divide/pcJiwonTodo";
import pcJiwonQuest from "./divide/pcJiwonQuest";
import pcJiwonJoinUs from "./divide/pcJiwonJoinUs";
import pcJiwonGetDate from "./divide/pcJiwonGetDate";
import pcJiwonFilter from "./divide/pcJiwonFilter";

import pcMinjuTodo from "./divide/pcMinjuTodo";


const swiper = new Swiper;
const htmlDoc = document.documentElement;
let enSizing = false;

// rem 적용을 위해 추가
const setFontSize = () => {
    //750 이하에서만 적용
    if (window.innerWidth > window.innerHeight || window.innerWidth > 750) return ;
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
    tableJSON,
    todoJSON,

    mobileJieunOlensSlide,

    pcOlensFreegift,
    pcOlensReview,

    pcJieunOlensReviewFeedback,
    pcJieunTodoFeedback,

    pcJiwonTodo,
    pcJiwonQuest,
    pcJiwonJoinUs,
    pcJiwonGetDate,
    pcJiwonFilter,

    pcMinjuTodo,
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