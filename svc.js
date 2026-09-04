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
