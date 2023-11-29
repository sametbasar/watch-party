/*******************************************************
 * Copyright (C) 2023-2024 Watch Party, Inc. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *******************************************************/

const WP_ENUMS = {
  ROOM_ID: "wid",
};

const watchParty = {
  init: () => {
    if (document.querySelectorAll(".watch-party").length === 0)
      watchParty.createParty();
  },
  createParty: () => {
    const body = document.createElement("div");
    body.id = "watch-party";

    body.className = "watch-party";
    const roomId = watchParty.getRoomId();
    const URL = `http://localhost:3000?${WP_ENUMS.ROOM_ID}=${roomId}`;
    body.innerHTML = `<iframe style="display: block;" id="wpChatFrame" allow="autoplay; clipboard-read; clipboard-write; payment; camera; microphone;" src="${URL}"></iframe>`;

    const netflixContainer = document.querySelector("[data-uia=watch-video]");
    if (netflixContainer) {
      netflixContainer.appendChild(body);
      netflixContainer.classList.add("wp-active");

      watchParty.injectScript("assets/js/minify/player-control.min.js");
    } else document.body.appendChild(body);
  },

  injectScript: (scriptPath) => {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL(scriptPath);
    script.onload = function () {
      console.log("Injected Watch Party Scripts");
    };
    document.head.appendChild(script);
  },
  generateUUID: () => {
    let uuid = "",
      i,
      random;

    for (i = 0; i < 16; i++) {
      random = (Math.random() * 16) | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += "-";
      }
      uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(
        16,
      );
    }

    return uuid;
  },
  getRoomId: () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get(WP_ENUMS.ROOM_ID);
    if (roomId) {
      return roomId;
    }

    const generatedId = watchParty.generateUUID();
    watchParty.addQuery(generatedId);
    return generatedId;
  },
  addQuery: (roomId) => {
    const url = new URL(window.location.href);
    url.searchParams.set(WP_ENUMS.ROOM_ID, roomId);
    window.history.replaceState(null, null, url);
  },
};

watchParty.init();
