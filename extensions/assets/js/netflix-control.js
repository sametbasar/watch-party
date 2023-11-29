/*******************************************************
 * Copyright (C) 2023-2024 Watch Party, Inc. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *******************************************************/

// TODO (@samet): add skipper...
// TODO (@samet): open close sidebar event... detect click event inside iframe
// TODO (@samet): eger video baslatma isleminde video yerine div geldiyse onun kontrol edilip oyle baslatilmasi gerekiyor.
// TODO (@samet): video durduktan bir sure sonra div geldiginde video gidiyor bu yuzden socket ve eventListeners calismiyor bunun
// cozumu icin observe ile div'i takip etmemiz gerekiyor.

const netflixContent = {
  init: () => {
    window.watchparty = {
      user: {},
      settings: {
        container: "[data-uia=watch-video]",
        video: "[data-uia=video-canvas]",
      },
      socketActivity: false,
    };
    netflixContent.joinSocket();
    netflixContent.connectRoom();
    netflixContent.socketListeners();
    netflixContent.eventListeners();

    netflixContent.getUserInfo();
  },
  joinSocket: () => {
    const socket = io("http://localhost:8080", {
      reconnectionDelay: 10000,
    });
    window.watchparty.socket = socket;
  },
  connectRoom: () => {
    window.watchparty.socket.emit("room:join", {
      room: watchParty.getRoomId(),
      user: { id: "", name: "", movieControl: true },
    });
  },
  socketListeners: () => {
    window.watchparty.socket.on(
      "activity:video:get",
      async ({ activity, video }) => {
        window.watchparty.socketActivity = true;

        const messageData = {
          type: "watchplayer",
          activity,
          video,
        };

        window.postMessage(messageData, "*");

        setTimeout(() => {
          window.watchparty.socketActivity = false;
        }, 750);
      },
    );
  },
  getUserInfo: () => {
    const iframe = document.querySelector("#watch-party iframe");
    iframe.contentWindow.postMessage(
      {
        type: "GetUserInfo",
      },
      "*",
    );

    window.onmessage = (e) => {
      if (e && e.type !== "watchplayer" && e.data.type !== "watchplayer") {
        const data = JSON.parse(e.data);
        window.watchparty.user = data;
      }
    };
  },
  eventListeners: () => {
    const videoContainerSelector = document.querySelector(
      window.watchparty.settings.video,
    );
    const videoSelector = videoContainerSelector.querySelector("video");

    videoSelector.addEventListener("play", () => {
      if (window.watchparty.socketActivity === false)
        netflixContent.videoPlayActivity(videoSelector);
    });
    videoSelector.addEventListener("seeking", () => {
      if (window.watchparty.socketActivity === false)
        netflixContent.videoSeekingActivity(videoSelector);
    });
    videoSelector.addEventListener("pause", () => {
      if (window.watchparty.socketActivity === false)
        netflixContent.videoPauseActivity(videoSelector);
    });
  },
  checkUser: () => {
    if (
      window.watchparty.user === "null" ||
      typeof window.watchparty.user.name === "undefined"
    )
      netflixContent.getUserInfo();
  },
  getTime: (s) => {
    var m = Math.floor(s / 60);
    m = m >= 10 ? m : "0" + m;
    s = Math.floor(s % 60);
    s = s >= 10 ? s : "0" + s;
    return m + ":" + s;
  },
  socketActivity: (videoSelector, activity, message) => {
    netflixContent.checkUser();
    const duration = videoSelector.currentTime;

    window.watchparty.socket.emit("activity:video:post", {
      username: window.watchparty.user.name,
      message,
      activity,
      video: {
        duration,
        title: "",
      },
    });
  },
  videoPlayActivity: (videoSelector) => {
    netflixContent.socketActivity(videoSelector, "PLAY", "Video Started");
  },
  videoPauseActivity: (videoSelector) => {
    netflixContent.socketActivity(videoSelector, "PAUSE", "Video Paused");
  },
  videoSeekingActivity: (videoSelector) => {
    const duration = videoSelector.currentTime;

    netflixContent.socketActivity(
      videoSelector,
      "SEEK",
      `Started from ${netflixContent.getTime(duration)}`,
    );
  },
};

netflixContent.init();
