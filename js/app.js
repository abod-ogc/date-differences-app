import initTheme from "./themes/init.theme.js";
import bindThemeEvents from "./themes/event.theme.js";
import dateUtil from "./utils/date.js";

const state = {
    startDate: null,
    endDate: null,
    seconds: null,
    totalDays: null,
    weeks: null,
    remainingDays: null,
    months: null,
    years: null,
    incDayCount: false
}

const toastStates = {
    success: 1,
    err: 0
}

const logStates = {
    normal: 2,
    ready: 1,
    err: 0
}

const messages = {
    successCalc: "Data calculated successfully.",
    futureErr: "date cannot be in the future.",
    emptyFields: "Please fill in all required fields.",
    swapErr: "End date must be after the start date."
}

let toastTimeout;

const calcBtn = document.querySelector('.calculate');
const demoBtn = document.querySelector('.demo-btn');
const clearBtn = document.querySelector('.clear-btn');

const startDate = document.getElementById('start-date-input');
const endDate = document.getElementById('end-date-input');
const autoSwapToggle = document.getElementById('auto-swap-toggle');
const inclusiveDayCount = document.getElementById('inclusive-day-count-toggle');


const statesTag = document.querySelector('.states-tag');
const totalDaysBlock = document.querySelector('.total-days');
const totalWeeksBlock = document.querySelector('.total-weeks');
const totalMonthsBlock = document.querySelector('.total-months');
const totalYearsBlock = document.querySelector('.total-years');
const startDateTxt = document.querySelector('.start-date-placeholder');
const endDateTxt = document.querySelector('.end-date-placeholder');
const differenceTxt = document.querySelector('.difference-placeholder');
const secondsTxt = document.querySelector('.txt-seconds');
const toastAlert = document.querySelector('.toast-alert');

startDate.addEventListener('change', (e) => {
    state.startDate = handleDateChange("Start", e.target.value);
});

endDate.addEventListener('change', (e) => {
    state.endDate = handleDateChange("End", e.target.value);
});

inclusiveDayCount.addEventListener('change', (e) => {
    if(!state.startDate || !state.endDate)
        return;

    state.incDayCount = inclusiveDayCount.checked;
    processResult();
});

calcBtn.addEventListener('click', () => {
    if(!state.startDate || !state.endDate){
        toggleToastAlert(toastStates.err, messages.emptyFields);
        renderStatus(logStates.err);
        return;
    }

    if(state.startDate >= state.endDate){
        if(!autoSwapToggle.checked){
            toggleToastAlert(toastStates.err, messages.swapErr);
            renderStatus(logStates.err);
            return;
        }

        [state.startDate, state.endDate] = [state.endDate, state.startDate];
        startDate.valueAsDate = state.startDate;
        endDate.valueAsDate = state.endDate;
    }

    processResult();
});

demoBtn.addEventListener('click', () => {
    state.endDate = new Date();
    state.startDate = new Date(state.endDate);
    state.startDate.setDate(state.startDate.getDate() - 90);

    startDate.value = state.startDate.toISOString().split('T')[0];
    endDate.value = state.endDate.toISOString().split('T')[0];

    processResult();
});

clearBtn.addEventListener('click', () => {
    clear();
    renderUI();
});

function handleDateChange(type, value){
    const date = dateUtil.setDate(value);

    if(dateUtil.isFutureDate(date)){
        toggleToastAlert(
            toastStates.err,
            `${type} ${messages.futureErr}`
        );

        renderStatus(logStates.err);
        return null;
    }

    renderStatus(logStates.ready);
    return date;
}

function setData(){        
    let data = dateUtil.calcDiff(state.startDate, state.endDate, state.incDayCount);

    state.seconds = data.seconds.toLocaleString();
    state.totalDays = data.totalDays;
    state.remainingDays = data.days;
    state.weeks = data.weeks;
    state.months = data.months;
    state.years = data.years;
}

function processResult(){
    setData();
    renderUI();
    toggleToastAlert(toastStates.success, messages.successCalc);
    renderStatus(logStates.ready);
}

function toggleToastAlert(alertState, msg){
    let isSuccess = alertState === toastStates.success;

    const iconClass = isSuccess ? "success-icon" : "err-icon";
    const iconType = isSuccess ? "check_circle" : "cancel";

    toastAlert.innerHTML = `
        <span class="material-symbols-outlined ${iconClass}">${iconType}</span>
        ${msg}
    `;   
    toastAlert.classList.add('show');
    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toastAlert.classList.remove("show");
    }, 3000);
}

function clear(){
    startDate.value = "";
    endDate.value = "";

    inclusiveDayCount.checked = false;

    state.startDate = null;
    state.endDate = null;
    state.seconds = null;
    state.totalDays = null;
    state.remainingDays = null;
    state.weeks = null;
    state.months = null;
    state.years = null;
    state.incDayCount = false;
}

function renderUI(){
    renderBlocks();
    renderSummary();
}

function renderStatus(logState){
    statesTag.classList.remove("ready-state", "err-state");

    if(logState === logStates.normal){
        statesTag.textContent = "Waiting";
    }else if(logState === logStates.ready){
        statesTag.textContent = "Ready";
        statesTag.classList.add("ready-state");
    }else{
        statesTag.textContent = "Error";
        statesTag.classList.add("err-state");
    }
}

function renderBlocks(){
    totalDaysBlock.textContent = state.totalDays || "0";
    totalWeeksBlock.textContent = state.weeks || "0";
    totalMonthsBlock.textContent = state.months || "0";
    totalYearsBlock.textContent = state.years || "0";
}

function renderSummary(){
    let diffInText = "";

    if(
        state.remainingDays == null ||
        state.months == null ||
        state.years == null
    ){
        differenceTxt.textContent = "-";
    }
    else{
        diffInText = `${state.years} years`;
        diffInText += `, ${state.months} months`;
        diffInText += `, ${state.remainingDays} days`;

        differenceTxt.textContent = diffInText;
    }
    
    startDateTxt.textContent = dateUtil.formatDate(state.startDate) || "-";
    endDateTxt.textContent = dateUtil.formatDate(state.endDate) || "-";
    secondsTxt.textContent = state.seconds || "-";
}

function init(){
    startDate.value = "";
    endDate.value = "";

    initTheme();
    renderUI();
    bindThemeEvents();
}

init();