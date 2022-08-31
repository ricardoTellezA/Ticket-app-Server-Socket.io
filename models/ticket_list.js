const Ticket = require("./ticket");

class TicketList {
  constructor() {
    this.ultimoNumero = 0;

    this.pendientes = [];
    this.asignado = [];
  }

  get siguienteNumero() {
    this.ultimoNumero++;
    return this.ultimoNumero;
  }

  //    3 que solo se veran en las tarjetas y 10 en el historial

  get ultimos13() {
    return this.asignado.slice(0, 13);
  }

  crearTicket() {
    const nuevoTicket = new Ticket(this.siguienteNumero);
    this.pendientes.push(nuevoTicket);
    return nuevoTicket;
  }

  asignarTicket(agente, escritorio) {
    if (this.pendientes.length === 0) return null;

    const siguenteTicket = this.pendientes.shift();
    siguenteTicket.agente = agente; 
    siguenteTicket.escritorio = escritorio;

    this.asignado.unshift(siguenteTicket);
    return siguenteTicket;
  }
}


module.exports = TicketList;