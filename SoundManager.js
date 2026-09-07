const sound = {
    fadein: function(c, sound, targetVolume, seconds) {
        if (sound == null) {
            return;
        }

        var ticks = Math.max(1, Math.round(seconds * 20));

        c.setValue("fade_sound", sound);
        c.setValue("fade_target", targetVolume);
        c.setValue("fade_ticks", ticks);
        c.setValue("fade_current", 0);

        sound.setVolume(0.0);

        c.scheduleScript(1, function (c) {
            var current = c.getValue("fade_current") + 1;
            var total = c.getValue("fade_ticks");
            var target = c.getValue("fade_target");
            var currentSound = c.getValue("fade_sound");

            var progress = current / total;

            if (progress > 1.0) {
                progress = 1.0;
            }

            currentSound.setVolume(target * progress);
            c.setValue("fade_current", current);

            if (current < total) {
                c.scheduleScript(1, arguments.callee);
            }
        });
    },

    fadeout: function(c, sound, seconds) {
        if (sound == null) {
            return;
        }

        var ticks = Math.max(1, Math.round(seconds * 20));
        var startVolume = sound.getVolume();
        var currentTick = 0;

        var update = function(c) {
            currentTick++;

            var progress = currentTick / ticks;

            if (progress > 1.0) {
                progress = 1.0;
            }

            var volume = startVolume * (1.0 - progress);
            sound.setVolume(volume);

            if (currentTick < ticks) {
                c.scheduleScript(1, update);
            } else {
                sound.stop();
            }
        };

        c.scheduleScript(1, update);
    },

    fade: function(c, managedSound, maxVolume, fadeInSeconds, holdSeconds, fadeOutSeconds) {
        if (managedSound == null) {
            return;
        }

        var fadeInTicks = Math.max(1, Math.round(fadeInSeconds * 20));
        var holdTicks = Math.max(0, Math.round(holdSeconds * 20));
        var fadeOutTicks = Math.max(1, Math.round(fadeOutSeconds * 20));

        var currentTick = 0;
        var totalTicks = fadeInTicks + holdTicks + fadeOutTicks;

        managedSound.setVolume(0.0);

        var update = function(c) {
            currentTick++;

            var volume;

            if (currentTick <= fadeInTicks) {
                var fadeInProgress = currentTick / fadeInTicks;
                volume = maxVolume * fadeInProgress;
            } else if (currentTick <= fadeInTicks + holdTicks) {
                volume = maxVolume;
            } else {
                var fadeOutTick = currentTick - fadeInTicks - holdTicks;
                var fadeOutProgress = fadeOutTick / fadeOutTicks;

                if (fadeOutProgress > 1.0) {
                    fadeOutProgress = 1.0;
                }

                volume = maxVolume * (1.0 - fadeOutProgress);
            }

            managedSound.setVolume(volume);

            if (currentTick < totalTicks) {
                c.scheduleScript(1, update);
            } else {
                managedSound.setVolume(0.0);
                managedSound.stop();
            }
        };

        c.scheduleScript(1, update);
    }
}
