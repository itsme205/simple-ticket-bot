import config from '@config/config'
import embeds from '@modules/embeds'
import tickets from '@modules/mongodb/models/Tickets'
import { memberHasOneRole } from '@modules/utils'
import { ChannelType, GuildMember, PermissionOverwriteOptions, TextChannel, type ButtonInteraction } from 'discord.js'

export default {
  execute: async (interaction: ButtonInteraction, throwError: (title: string, description?: string) => undefined) => {
    if (!(interaction.member instanceof GuildMember)) { throwError('Ошибка', 'Повторите попытку позже.'); return }

    if (!memberHasOneRole(interaction.member, config.tickets.adminRoleIds) && !interaction.member.permissions.has('Administrator')) { throwError('Ошибка', 'Отказано в доступе.'); return }

    await interaction.deferReply({ ephemeral: true })
    const ticketData = await tickets.findOne({ channelId: interaction.channelId })
    if (!ticketData) { throwError('Ошибка', 'Тикет не найден в базе данных.'); return }

    await interaction.message.edit({ components: [] })
    await tickets.deleteMany({ _id: ticketData._id })
    await interaction.channel?.send({
      embeds: [
        embeds.attention('Внимание', 'Тикет будет закрыт через **5 секунд**, а канал удалён. Отменить это действие невозможно.')
      ]
    })
    await interaction.editReply({
      embeds: [
        embeds.success('Готово', 'Вы запустили процесс удаления тикета.')
      ]
    }).catch((err) => {
      console.log(err)
    })

    setTimeout(() => {
      interaction.channel?.delete()
        .catch((err) => { console.log(err) })
    }, 5000)
  }
}
