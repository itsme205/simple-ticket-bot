import Mongoose from 'mongoose'

export interface ITickets extends Mongoose.Document {
  authorId: string
  guildId: string
  channelId: string
}

const ticketSchema: Mongoose.Schema = new Mongoose.Schema<ITickets>({
  authorId: { type: String, required: true },
  guildId: { type: String, required: true },
  channelId: { type: String, required: true }
})

const tickets = Mongoose.model<ITickets>('tickets', ticketSchema)

export default tickets
