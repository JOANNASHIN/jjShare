import _ from "lodash";
import $ from 'jquery';
import moment from "moment";

window.$ = window.jquery = window.jQuery = $;
window.moment = moment;

//공통
import common from "./divide/common";

//
import olenzFreegift from "./divide/olenzFreegift";

const appMethods = {
    common,
    olenzFreegift
}

const appInit = () => {
    const appName = $("body").attr("id");

    if (appName) [common, appMethods[appName]].forEach(method => {
        if (method) method();
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    appInit();
})