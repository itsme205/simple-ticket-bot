import embeds from '@modules/embeds'
import Discord from 'discord.js'

export default {
  embeds: {},
  components: {},
  messages: {
    tickets: {
      /**
       * Tickets create message.
       * @returns MessageCreateOptions
       */
      message: (): Discord.MessageCreateOptions => {
        return {
          embeds: [
            embeds.default('Для создания тикета нажмите на кнопку ниже и следуйте дальнейшим инструкциям.')
          ],
          components: [
            new Discord.ActionRowBuilder<Discord.ButtonBuilder>().setComponents([
              new Discord.ButtonBuilder({
                label: 'Создать тикет',
                customId: 'ticket_create',
                style: Discord.ButtonStyle.Secondary
              })
            ])
          ]
        }
      },
      /**
       * Ticket manage message.
       * @param authorId ID of ticket author
       * @returns MessageCreateOptions
       */
      manageMessage: (authorId: string): Discord.MessageCreateOptions => {
        return {
          embeds: [
            embeds.default(
              `Автор тикета: <@${authorId}>\n` +
              `Дата создания: <t:${Math.floor(new Date().getTime() / 1000)}:D> (<t:${Math.floor(new Date().getTime() / 1000)}:R>)`
            )
          ],
          components: [
            new Discord.ActionRowBuilder<Discord.ButtonBuilder>().setComponents([
              new Discord.ButtonBuilder({
                label: 'Закрыть тикет',
                customId: 'ticket_close',
                style: Discord.ButtonStyle.Danger
              })
            ])
          ]
        }
      }
    }
  }
}
