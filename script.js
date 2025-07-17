function actualizarEstados() {
  const filas = document.querySelectorAll("#malla tbody tr");
  const aprobados = new Set();

  filas.forEach(fila => {
    const checkbox = fila.querySelector("input[type=checkbox]");
    const code = fila.getAttribute("data-code");
    if (checkbox.checked) {
      aprobados.add(code);
      fila.querySelector(".estado").textContent = "✅ Aprobado";
    }
  });

  filas.forEach(fila => {
    const code = fila.getAttribute("data-code");
    const prereqs = fila.getAttribute("data-prereqs");
    const estado = fila.querySelector(".estado");

    if (!aprobados.has(code)) {
      if (!prereqs) {
        estado.textContent = "🟡 Disponible";
      } else {
        const requisitos = prereqs.split(",");
        const cumplido = requisitos.every(r => aprobados.has(r.trim()));
        estado.textContent = cumplido ? "🟡 Disponible" : "🔒 Bloqueado";
      }
    }
  });
}
