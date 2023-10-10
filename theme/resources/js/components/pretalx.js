window.addEventListener("load", function (event) {
  function handleClickDays(event) {
    document.querySelectorAll(".pretalx-day").forEach((elm) => {
      elm.classList.remove("active");
    });

    document.querySelectorAll(".programacao-day").forEach((elm) => {
      const idx = event.target.getAttribute("data-index-day");
      const idx_day = elm.getAttribute("data-index-day");
      if (!elm.classList.contains("hide")) {
        elm.classList.add("hide");
      }
      if (idx == idx_day) {
        elm.classList.remove("hide");
      }
    });
    event.target.classList.add("active");
  }

  function handleClickRooms(event) {
    document.querySelectorAll(".pretalx-room").forEach((elm) => {
      elm.classList.remove("active");
    });

    document.querySelectorAll(".room").forEach((elm) => {
      const idx = event.target.getAttribute("data-index-room");
      const idx_day = elm.getAttribute("data-index-room");
      if (!elm.classList.contains("hide")) {
        elm.classList.add("hide");
      }
      if (idx == idx_day) {
        elm.classList.remove("hide");
      }
    });
    event.target.classList.add("active");
  }

  async function loadSchedule() {
    const agenda_url =
      "https://pretalx.com/python-brasil-2023/schedule/export/schedule.json";
    const response = await fetch(agenda_url);
    const agenda = await response.json();

    console.log(agenda.schedule.conference.days);

    const pretalx_days = document.getElementById("pretalx-dias");
    const pretalx_prog = document.getElementById("pretalx-programacao");

    agenda.schedule.conference.days.forEach((day) => {
      let dia = document.createElement("li");
      dia.classList.add("pretalx-day");
      dia.onclick = handleClickDays
      dia.id = `day-${day.index}`;
      dia.setAttribute("data-index-day", day.index);
      dia.innerHTML = day.date.split("-").reverse().join("/");
      
      pretalx_days.appendChild(dia);

      let programacao = document.createElement("div");
      programacao.classList.add("programacao-day");
      programacao.classList.add("hide");
      programacao.setAttribute("data-index-day", day.index);

      let programacao_title = document.createElement("h2");
      programacao_title.innerHTML = `Dia ${dia.innerHTML}`;
      programacao_title.classList.add("programacao-day-title");
      programacao.appendChild(programacao_title);

      let list_salas = document.createElement("ul");
      list_salas.classList.add("pretalx-rooms");
      
      programacao.appendChild(list_salas);

      Object.keys(day.rooms).forEach((room, index) => {
        let sala_item = document.createElement("li");
        sala_item.innerHTML = room;
        sala_item.classList.add("pretalx-room");
        sala_item.setAttribute("data-index-room", index);
        sala_item.onclick = handleClickRooms
      
        list_salas.appendChild(sala_item);

        let sala = document.createElement("div");
        sala.classList.add("room");
        sala.classList.add("hide");
        sala.setAttribute("data-index-room", index);

        let sala_title = document.createElement("h2");
        sala_title.classList.add("room-title");
        sala_title.innerHTML = room;
        sala.appendChild(sala_title);

        const sala_talks = document.createElement('ul')
        sala_talks.classList.add('talks')

        day.rooms[room].forEach((talk)=> {
          const time_space = document.createElement('div')
          const talk_space = document.createElement('div')
        
          time_space.classList.add('time-space')
          talk_space.classList.add('talk-space')
          
          const sala_talk = document.createElement('li')

          const talk_horario = document.createElement('h3')
          talk_horario.innerHTML = talk.start
          time_space.appendChild(talk_horario)

          const sala_talk_title = document.createElement('h4')
          sala_talk.classList.add('talk')
          sala_talk_title.innerHTML = talk.title

          const sala_talk_nivel = document.createElement('span')
          sala_talk_nivel.classList.add('nivel')
          sala_talk_nivel.classList.add(talk.track.toLowerCase())
          sala_talk_nivel.innerHTML = talk.track
          const sala_talk_person = document.createElement('p')
          
          let persons = []
          talk.persons.forEach((person)=> {
            persons.push(person.public_name)
          })
          
          sala_talk_person.innerHTML = persons.join(', ')
        
          talk_space.appendChild(sala_talk_title)
          talk_space.appendChild(sala_talk_person)
          talk_space.appendChild(sala_talk_nivel)

          sala_talk.appendChild(time_space)
          sala_talk.appendChild(talk_space)

          sala_talks.appendChild(sala_talk)
        })

        sala.appendChild(sala_talks);

        programacao.appendChild(sala);

      });

      pretalx_prog.appendChild(programacao);
      
    });
  }
  loadSchedule();
});
