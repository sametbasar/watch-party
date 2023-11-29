/*******************************************************
 * Copyright (C) 2023-2024 Watch Party, Inc. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *******************************************************/

window.addEventListener("message", function (event) {
  if (event.source !== window) {
    return;
  }

  if (event.data && event.data.type === "watchplayer") {
    watchPlayer.seekInteraction(event.data.activity, event.data.video.duration);
  }
});

const watchPlayer = {
  getReactInternals: (root) => {
    if (root == null) {
      return null;
    }
    var keys = Object.keys(root);
    var key = null;
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].startsWith("__reactInternalInstance")) {
        key = keys[i];
        break;
      }
    }
    return key ? root[key] : null;
  },
  getVideoPlayer: () => {
    var videoPlayer =
      window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
    var playerSessionIds = videoPlayer.getAllPlayerSessionIds();
    var t = playerSessionIds.find((val) => {
      return val.includes("watch");
    });
    return videoPlayer.getVideoPlayerBySessionId(t);
  },
  getWrapperStateNode: () => {
    const watchVideoWrapper = document.querySelector(".watch-video");
    if (watchVideoWrapper) {
      const internals = watchPlayer.getReactInternals(watchVideoWrapper);
      if (internals) {
        return internals.return.return.return.return.return.stateNode;
      }
    }
    return null;
  },
  isMovie: () => {
    try {
      const wrapperStateNode = watchPlayer.getWrapperStateNode();
      if (wrapperStateNode) {
        return wrapperStateNode.state.playableData.summary.type === "movie";
      } else {
        return false;
      }
    } catch (error) {
      // Default assume it's an episode?
      return false;
    }
  },
  tryDisablePostPlay: () => {
    if (watchPlayer.isMovie()) {
      const wrapperStateNode = watchPlayer.getWrapperStateNode();
      if (wrapperStateNode) {
        window.oldHasPostPlay = wrapperStateNode.hasPostPlay;
        wrapperStateNode.hasPostPlay = () => {
          return false;
        };
        console.log("DISABLED POST PLAY FOR MOVIE");
      }
    }
  },
  seekInteraction: function (type, time) {
    try {
      if (type === "SEEK") {
        if (time >= watchPlayer.getVideoPlayer().getDuration()) {
          watchPlayer.getVideoPlayer().pause();
          watchPlayer
            .getVideoPlayer()
            .seek(watchPlayer.getVideoPlayer().getDuration() - 100);
        } else {
          watchPlayer.getVideoPlayer().seek(String(time).replace('.',''));
        }
      } else if (type === "PAUSE") {
        watchPlayer.getVideoPlayer().pause();
      } else if (type === "FIX_POST_PLAY") {
        watchPlayer.tryDisablePostPlay();
      } else if (type === "PLAY") {
        if (watchPlayer.isMovie() && "chrome" === "edge" && 0) {
        }
        watchPlayer.getVideoPlayer().play();
      } else if (type === "GetCurrentTime") {
        const time = watchPlayer.getVideoPlayer().getCurrentTime();
        let evt = new CustomEvent("FromNode", {
          detail: { type: "CurrentTime", time, updatedAt: Date.now() },
        });
        window.dispatchEvent(evt);
      } else if (type === "NEXT_EPISODE") {
        try {
          watchPlayer.changeEpisodeFallback(e.data.videoId);
        } catch (error) {
          console.log("Caught Error in React Next Episode " + error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  isMovie: () => {
    try {
      const wrapperStateNode = watchPlayer.getWrapperStateNode();
      if (wrapperStateNode) {
        return wrapperStateNode.state.playableData.summary.type === "movie";
      } else {
        return false;
      }
    } catch (error) {
      // Default assume it's an episode?
      return false;
    }
  },
};

window.watchPlayer = watchPlayer;
