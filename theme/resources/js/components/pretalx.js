window.addEventListener("load", function (event) {
  async function loadSchedule() {
    const agenda_url =
      "https://pretalx.com/python-brasil-2023/schedule/export/schedule.json";
    const response = await fetch(agenda_url);
    const agenda = await response.json();

    // Add Content Group tabs actions
    addElementOnclick();

    agenda.schedule.conference.days.forEach((day) => {
      let programacao = document.createElement("div");
      programacao.classList.add("programacao-day");
      programacao.classList.add("hide");
      programacao.setAttribute("data-index-day", day.index);

      createRoomsHeader(day.date, day.rooms);
    });

    // Remove skeleton and add the schedule elements
    const skeleton = document.querySelector(".event-skeleton");
    const schedule = document.querySelector(".event-schedule");
    skeleton.classList.remove("active");
    schedule.classList.add("active");
  }
  loadSchedule();
});

// Handle events
function handleClickGroup(event) {
  const id = event.currentTarget.id;
  const tabButton = document.getElementById(id);
  tabButton.toggleAttribute("disabled");
  tabButton.classList.toggle("active");
  document.querySelectorAll(".content-group").forEach((element) => {
    if (element.id !== id) {
      element.classList.remove("active");
      element.removeAttribute("disabled");
    }
  });

  const contentId = id + "_content";
  const content = document.getElementById(contentId);
  content.classList.toggle("active");
  document.querySelectorAll(".pretalx-content").forEach((element) => {
    if (element.id !== contentId) {
      element.classList.remove("active");
    }
  });

  // Set talks to active
  for (const child of content.children) {
    if (child.firstElementChild.classList.contains("pretalx-dias")) {
      child.firstElementChild.firstElementChild.click();
    }
  }
}

function handleClickDays(event) {
  if (event.currentTarget.classList.contains("active")) {
    return;
  }
  const id = event.currentTarget.id;
  const eventDate = event.currentTarget.getAttribute("data-date");
  const eventDay = event.currentTarget.getAttribute("data-index-day");
  const contentType = EventDates[eventDate];
  const tabButton = document.getElementById(id);

  // Set the content visibility
  const elementId = `${contentType}_room_${eventDay}`;
  const contentElement = document.getElementById(elementId);
  contentElement.classList.toggle("active");
  document.querySelectorAll(".programacao-dia").forEach((element) => {
    if (element.id !== elementId) {
      element.classList.remove("active");
    }
  });

  // Set room visibility
  document.querySelectorAll(".pretalx-rooms").forEach((element) => {
    if (element.getAttribute("data-date") == eventDay) {
      element.classList.toggle("active");
    }
    if (element.getAttribute("data-date") !== eventDay) {
      element.classList.remove("active");
    }
  });

  // Change the visibility of the tab button
  tabButton.classList.toggle("active");
  document.querySelectorAll(".pretalx-day").forEach((element) => {
    if (element.id !== id) {
      element.classList.remove("active");
    }
  });
}

function handleClickRoom(event) {
  const id = event.currentTarget.id;
  if (event.currentTarget.classList.contains("active")) {
    event.currentTarget.classList.remove("active");
    document.querySelectorAll(".programacao-talk").forEach((element) => {
      if (element.getAttribute("data-room") !== id) {
        element.classList.toggle("active");
      }
    });
    return;
  }

  event.currentTarget.classList.toggle("active");
  // Change the visibility of the tab button
  document.querySelectorAll(".pretalx-room").forEach((element) => {
    if (element.id !== id) {
      element.classList.remove("active");
    }
  });

  // Change the visibility of the content
  document.querySelectorAll(".programacao-talk").forEach((element) => {
    if (
      element.getAttribute("data-room") == id &&
      !element.classList.contains("active")
    ) {
      element.classList.toggle("active");
    }
    if (element.getAttribute("data-room") !== id) {
      element.classList.remove("active");
    }
  });
}

// App functions
function createRoomsHeader(date, rooms) {
  const contentType = EventDates[date];
  const contentHeaderElement = document.getElementById(contentType + "_header");
  const roomListElement = document.getElementById(contentType + "_rooms");
  const scheduleElement = document.getElementById(contentType + "_programacao");
  const formattedDate = date.replaceAll("-", "");

  const newRoomListElement = roomListElement.cloneNode(true);
  newRoomListElement.setAttribute("data-date", formattedDate);

  const newDayElement = Object.assign(document.createElement("div"), {
    id: `${contentType}_room_${formattedDate}`,
    className: "programacao-dia",
  });

  Object.keys(rooms).forEach((room, index) => {
    const newListItemElement =
      roomListElement.firstElementChild.cloneNode(true);
    newListItemElement.setAttribute("data-index-room", index);
    newListItemElement.setAttribute("data-event-date", formattedDate);
    newListItemElement.id = `${formattedDate}_${room
      .toUpperCase()
      .replaceAll(" ", "_")}`;
    newListItemElement.classList.remove("hidden");
    newListItemElement.insertAdjacentHTML("beforeend", room.toUpperCase());
    newListItemElement.onclick = handleClickRoom;
    newRoomListElement.appendChild(newListItemElement);

    // Create the talks list element
    createScheduleDay(date, rooms[room]).forEach((element) => {
      newDayElement.appendChild(element);
    });
  });

  // Create the day title element
  const dayTitleElement = `<h2>${
    contentType[0].toUpperCase() + contentType.slice(1)
  } do dia ${date.split("-").reverse().join("/")}</h2>`;
  newDayElement.insertAdjacentHTML("afterbegin", dayTitleElement);

  // For default, all room actions should be hidden
  if (formattedDate == getActiveDate()) {
    newRoomListElement.classList.add("active");
    newDayElement.classList.add("active");
  }

  // Remove the base cloned element
  newRoomListElement.firstElementChild.remove();

  // Add the room list and schedule list to the document
  contentHeaderElement.appendChild(newRoomListElement);
  scheduleElement.appendChild(newDayElement);
}

function createScheduleDay(date, rooms) {
  return rooms.map((talk, index) => {
    // Create a new talk element
    const newTalkElement = Object.assign(document.createElement("div"), {
      id: talk.id,
      className: "programacao-talk",
    });
    newTalkElement.setAttribute(
      "data-room",
      `${date.replaceAll("-", "")}_${talk.room
        .toUpperCase()
        .replaceAll(" ", "_")}`
    );

    // Create first column with the talk start
    const firstColumnElement = Object.assign(document.createElement("div"), {
      className: "talk-start " + talk.track.replaceAll(" ", "_"),
    });

    // Create second column with the talk title
    const secondColumnElement = Object.assign(document.createElement("div"), {
      className: "talk-title",
    });

    // Add the talk start time to the first column
    const talk_start = `<h3>
      ${talk.start}
    </h3>
    <span>
      ${formatTimeToBR(talk.duration)}
    </span>`;
    firstColumnElement.insertAdjacentHTML("beforeend", talk_start);

    // Create the talk title element
    const talk_title = `<h4 class="talk">${talk.title}</h4>`;

    // Create the talk level element
    const talk_level = `<div class="nivel-tipo">
      <span class="nivel ${talk.track.replaceAll(" ", "_")}">${
      talk.track
    }</span>
      <span class="tipo">${talk.type}</span>
      <span class="local">${talk.room.toUpperCase()}</span>
    </div>`;

    // Create the View More element
    const view_more = `<a href="/${parseTitle(
      talk.title
    )}.html" class="btn talk-more">Saiba mais</a>`;

    // Add the elements to the second column
    secondColumnElement.insertAdjacentHTML("afterbegin", talk_title);
    secondColumnElement.appendChild(createSpeakerContainer(talk.persons));
    secondColumnElement.insertAdjacentHTML("beforeend", talk_level);
    secondColumnElement.insertAdjacentHTML("beforeend", view_more);
    // Add the columns to the talk element
    newTalkElement.appendChild(firstColumnElement);
    newTalkElement.appendChild(secondColumnElement);

    // For default, all talks should be hidden
    newTalkElement.classList.add("active");

    return newTalkElement;
  });
}

// Utils
function createSpeakerContainer(speakers) {
  const persons = [];
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  speakers.forEach((person) => {
    const image = `<figure>
    <picture>
      <source srcset="/images/palestrantes/${person.code}_thumb.webp" width="32" type="image/webp"/>
      <img src="/images/palestrantes/${person.code}_thumb.png" width="32" type="image/png" loading="lazy" alt=${person.public_name}/>
    </picture>
    </figure>`;
    avatar.insertAdjacentHTML("beforeend", image);
    persons.push(person.public_name);
  });
  const speakers_element = document.createElement("div");
  speakers_element.className = "palestrantes";
  speakers_element.appendChild(avatar);
  speakers_element.insertAdjacentHTML(
    "beforeend",
    `<p>${persons.join(", ")}</p>`
  );
  return speakers_element;
}

function formatTimeToBR(time) {
  const time_array = time.split(":");
  const hours = Number(time_array[0]);
  const minutes = Number(time_array[1]);
  if (hours > 0) {
    if (minutes > 0) {
      return `${hours}h${minutes}min`;
    }
    return `${hours}h`;
  }
  return `${minutes}min`;
}

function parseTitle(title) {
  return title
    .toLowerCase()
    .replaceAll("- ", "")
    .replaceAll(", ", "-")
    .replaceAll(" ", "-")
    .replaceAll("ç", "c")
    .replaceAll("á", "a")
    .replaceAll("ã", "a")
    .replaceAll("é", "e")
    .replaceAll("ê", "e")
    .replaceAll("í", "i")
    .replaceAll("ó", "o")
    .replaceAll("õ", "o")
    .replaceAll("ú", "u")
    .replaceAll("ñ", "n")
    .replaceAll("ü", "u")
    .replaceAll(".", "-dot-")
    .replaceAll("/", "-")
    .replaceAll("!", "")
    .replaceAll("?", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("[", "")
    .replaceAll("]", "")
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll("=", "")
    .replaceAll("+", "")
    .replaceAll("*", "")
    .replaceAll("&", "")
    .replaceAll("#", "")
    .replaceAll("$", "")
    .replaceAll("%", "-por-cento-")
    .replaceAll("'", "")
    .replaceAll(":", "")
    .replaceAll("--", "-")
    .replaceAll("_", "-");
}

function addElementOnclick() {
  const tableHeader = document.querySelectorAll(".content-group");
  tableHeader.forEach((element) => {
    element.onclick = handleClickGroup;
  });

  const daySelectors = document.querySelectorAll(".pretalx-day");
  daySelectors.forEach((element) => {
    element.onclick = handleClickDays;
  });
}

function getActiveDate() {
  const element = document.querySelector(".pretalx-day.active");
  return element ? element.getAttribute("data-index-day") : null;
}

// Constants
const Track = {
  Beginner: "Iniciante",
  Intermediary: "Intermediário",
  Advanced: "Avançado",
  Non_technical: "Não-técnica",
};

const Type = {
  Talk: "Palestra",
  Short_tutorial: "Tutorial",
  Long_tutorial: "Tutorial",
};

const EventDates = {
  "2023-10-30": "tutoriais",
  "2023-10-31": "tutoriais",
  "2023-11-01": "tutoriais",
  "2023-11-02": "palestras",
  "2023-11-03": "palestras",
  "2023-11-04": "palestras",
  "2023-11-05": "sprint",
};
