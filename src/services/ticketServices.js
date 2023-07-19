import { Ticket } from '../models/TicketModel.js';

export const createTicket = async (ticketData) => {
  try {
    const newTicket = new Ticket(ticketData);
    const savedTicket = await newTicket.save();
    return savedTicket;
  } catch (error) {
    throw new Error('Error al crear el ticket');
  }
};