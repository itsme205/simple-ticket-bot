import { SlashSubCommand } from '@classes/default/SlashSubCommand'
import { SlashCommandSubcommandBuilder } from 'discord.js'
import patterns from '@config/patterns'

export default new SlashSubCommand()
  .setExecute(async (interaction, throwError) => {
    await interaction.deferReply({ ephemeral: true })
    try {
      await interaction.channel?.send(patterns.messages.tickets.message())
    } catch (err) {
      console.log(err)
      return await throwError('Ошибка', 'Не удалось отправить сообщение. Подробности в консоли.')
    }

    interaction.editReply({ content: 'Сообщение отправлено.' })
  })
  .setSlashSubCommandBuilder(
    new SlashCommandSubcommandBuilder()
      .setName('message')
      .setDescription('Отправить сообщение для создания тикета.')
  )
