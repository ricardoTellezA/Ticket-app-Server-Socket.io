const TicketList = require("./ticket_list");

class Sockets {
  constructor(io) {
    this.io = io;

    // CREAR INSTANCIA DE TICKET LIST
    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {

      socket.on("solicitar-ticket", (_, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
      });

      socket.on(
        "siguiente-ticket-trabajar",
        ({ agente, escritorio }, callback) => {
          const suTicket = this.ticketList.asignarTicket(agente, escritorio);
          callback(suTicket);

          this.io.emit('ticket-asignado', this.ticketList.ultimos13);
        }
      );

      // Escuchar evento: mensaje-to-server
      // socket.on('mensaje-to-server', ( data ) => {
      //     console.log( data );

      //     this.io.emit('mensaje-from-server', data );
      // });
    });
  }
}

module.exports = Sockets;
