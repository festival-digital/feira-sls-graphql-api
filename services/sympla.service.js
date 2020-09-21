import axios from 'axios';

export default class Sympla {
  constructor(SYMPLA_KEY) {
    this.SYMPLA_KEY = SYMPLA_KEY;
  }

  /**
  * getTicket - Função que busca um ingresso no sympla e o retorna
  *
  * @function getTicket
  * @param {object} data
  * @param {string} data.event_id it contains the id of an event
  * @param {string} data.ticket_number it contains the ticket number
  */
  async getTicket({ event_id, ticket_number }) {
    let ticket;
    try {
      ticket = await axios.get(
        `https://api.sympla.com.br/public/v3/events/${event_id}/participants/ticketNumber/${ticket_number}`,
        {
          headers: {
            s_token: this.SYMPLA_KEY,
          },
        },
      );
    } catch (err) {
      console.log('err:', [err]);
      throw new TypeError('sympla/unexpected_error/ticket');
    }
    if (!ticket.data.data.id) {
      throw new TypeError('sympla/not_found/ticket');
    }
    return ticket.data.data;
  }

  /**
  * mapTicket - Função que mapeia o ticket do sympla, mudando o nome dos campos
  *
  * @function getTicket
  * @param {object} ticket
  * @param {string} ticket.id it contains the id of the ticket
  * @param {string} ticket.order_id it contains the order id
  * @param {string} ticket.ticket_number it contains the ticket number
  * @param {string} ticket.ticket_num_qr_code it contains the ticket qr code number
  * @param {string} ticket.ticket_name it contains the ticket name
  * @param {string} ticket.ticket_sale_price it contains the ticket sale price
  * @param {string} ticket.first_name it contains the buyer name
  * @param {string} ticket.last_name it contains the buyer last name
  * @param {string} ticket.email it contains the buyer e-mail
  */
  mapTicket({
    id,
    order_id,
    ticket_number,
    ticket_num_qr_code,
    ticket_name,
    ticket_sale_price,
    first_name,
    last_name,
    email,
  }) {
    return ({
      sympla_id: id,
      code: ticket_number,
      sympla_order_id: order_id,
      sympla_ticket_number: ticket_number,
      sympla_qr_code: ticket_num_qr_code,
      sympla_ticket_name: ticket_name,
      sympla_sale_price: ticket_sale_price,
      sympla_buyer_first_name: first_name,
      sympla_buyer_last_name: last_name,
      sympla_buyer_email: email,
    });
  }
}
