export let getPlayTime = {
    interval : null,
    seconds : 0,
    minutes : 0,
    penalty_point : 4,

start_time: function () {
    getPlayTime.interval = window.setInterval(function () {
        getPlayTime.count_seconds();
    },1000);
},

count_seconds: function() {

    getPlayTime.seconds++

    if (getPlayTime.seconds / 60 === 1) {
        getPlayTime.seconds = 0;
        getPlayTime.minutes++;
    }

    let display_seconds = getPlayTime.get_displayable_num(getPlayTime.seconds);
    let display_minutes = getPlayTime.get_displayable_num(getPlayTime.minutes);

    document.getElementById("time").innerText = "Játékidő: " + display_minutes + ":" + display_seconds;
},

get_displayable_num: function (number) {
    if (number < 10) {
        return "0" + number.toString();
    } else {
        return number;
    }
},

stop_timer : function () {
    clearInterval(this.interval);
},

increase_timer :function () {
    getPlayTime.minutes = getPlayTime.seconds + getPlayTime.penalty_point >= 60 ? getPlayTime.minutes + 1 : getPlayTime.minutes;
    let display_minutes = getPlayTime.get_displayable_num(getPlayTime.minutes);
    getPlayTime.seconds = getPlayTime.seconds + getPlayTime.penalty_point >= 60 ? getPlayTime.seconds + getPlayTime.penalty_point - 60 : getPlayTime.seconds + getPlayTime.penalty_point;
    let display_seconds = getPlayTime.get_displayable_num(getPlayTime.seconds);
    document.getElementById("time").innerText = "Játékidő: " + display_minutes + ":" + display_seconds;
},

getTime: function () {
    let display_seconds = getPlayTime.get_displayable_num(getPlayTime.seconds);
    let display_minutes = getPlayTime.get_displayable_num(getPlayTime.minutes);
    return {"minute": display_minutes, "second": display_seconds};
}

}