import tickets from '@modules/mongodb/models/Tickets'
import config from '@config/config'
import { ChannelType, PermissionOverwriteOptions, type TextChannel, type ButtonInteraction } from 'discord.js'
import patterns from '@config/patterns'
import embeds from '@modules/embeds'

const creationQueue = new Set<string>()

function generateTicketId (length: number) {
  const alphabet = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += alphabet[Math.floor(Math.random() * length)]
  }
  return result
}
export default {
  execute: async (interaction: ButtonInteraction, throwError: (title: string, description?: string) => undefined) => {
    if (creationQueue.has(interaction.user.id)) { throwError('Ошибка', 'Вы уже создаете тикет, подождите...'); return }

    await interaction.deferReply({ ephemeral: true })

    const existingTicket = await tickets.findOne({ authorId: interaction.user.id })
    if (existingTicket) { throwError('Ошибка', `Вы уже создали тикет: <#${existingTicket.channelId}>.`); return }

    creationQueue.add(interaction.user.id)

    let channel: TextChannel | undefined
    try {
      channel = await interaction.guild?.channels.create({
        type: ChannelType.GuildText,
        parent: config.tickets.categoryId,
        name: `тикет-${generateTicketId(4)}`,
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone.id,
            deny: ['ViewChannel']
          },
          {
            id: interaction.user.id,
            allow: [
              'SendMessages',
              'AttachFiles',
              'ViewChannel'
            ]
          }
        ]
      })

      if (!channel) throw new Error('Cannot create channel.')
      config.tickets.adminRoleIds.forEach((id) => {
        channel?.permissionOverwrites.edit(id, {
          ViewChannel: true,
          SendMessages: true,
          AttachFiles: true
        })
      })

      await channel.send(patterns.messages.tickets.manageMessage(interaction.user.id))

      const ticketDocument = new tickets({
        authorId: interaction.user.id,
        channelId: channel?.id,
        guildId: interaction.guild?.id
      })
      await ticketDocument.save()
    } catch (err) {
      console.log(err)
      creationQueue.delete(interaction.user.id)
      return await interaction.editReply({
        embeds: [embeds.error('Ошибка', 'Произошла ошибка, повторите попытку позже.')]
      })
    }

    creationQueue.delete(interaction.user.id)
    interaction.editReply({ content: `Ваш тикет создан: <#${channel?.id}>. Откройте канал и опишите проблему.` })
  }
}
