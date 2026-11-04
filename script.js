let tareas = JSON.parse(localStorage.getItem("tareas")) || [
  { titulo: "Create a Js project", id: 0, hecho: true },
  { titulo: "upload it online", id: 1, hecho: false },
  { titulo: "Add project link in the resume", id: 2, hecho: false },
];

const campo = document.querySelector(".tarea");

const botonAdd = document.querySelector(".boton");

botonAdd.addEventListener("click", function () {
  const textoTarea = campo.value.trim();

  if (textoTarea === "") {
    return;
  }

  tareas.push({ titulo: textoTarea, id: Date.now(), hecho: false });
  campo.value = "";

  guardarTareas();

  dibujarLista();
});

campo.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    botonAdd.click();
  }
});

const lista = document.querySelector(".lista");

function dibujarLista() {
  lista.innerHTML = "";

  for (const tarea of tareas) {
    lista.innerHTML += `
      <li data-id="${tarea.id}">
        <label>
          <input type="checkbox" ${tarea.hecho ? "checked" : ""}/>
          <span class="${tarea.hecho ? "hecha" : ""}">${tarea.titulo}</span>
        </label>
        <button>&times;</button>
      </li>
    `;
  }
}

dibujarLista();

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

lista.addEventListener("click", function (evento) {
  const fila = evento.target.closest("li");

  if (!fila) {
    return;
  }

  const numero = Number(fila.dataset.id);
  const tarea = tareas.find(function (t) {
    return t.id === numero;
  });

  if (evento.target.matches("input")) {
    tarea.hecho = !tarea.hecho;
    guardarTareas();
    dibujarLista();
  }

  if (evento.target.matches("button")) {
    tareas = tareas.filter(function (t) {
      return t.id !== numero;
    });
    guardarTareas();

    dibujarLista();
  }
});
