const json = {
    read: function(state, key) {
        return JSON.parse(state.getString(key));
    },
    
    write: function(state, key, value) {
        state.setString(key, JSON.stringify(value));
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(array) {
    return array[this.random(0, array.length - 1)];
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function chance(percent) {
    return Math.random() * 100 < percent;
}

function formatTime(seconds) {
    seconds = Math.max(0, Math.floor(seconds));

    let minutes = Math.floor(seconds / 60);
    let rest = seconds % 60;

    return minutes + ":" + (rest < 10 ? "0" : "") + rest;
}

function formatNumber(value) {
    value = Math.floor(value);
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function mute(player) {
    player.mute(true);
}

function unmute(player) {
    player.mute(false);
}

function mutelocal(subject, player) {
    subject.setPlayerMuted(player, true);
}

function unmutelocal(subject, player) {
    subject.setPlayerMuted(player, false);
}

function contains(array, value) {
    if (array.indexOf(value) != -1)
    return true;
    return false;
}
