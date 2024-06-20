import { SlashCommand } from '@classes/default/SlashCommand'
import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'

import ticketsMessageSubcommand from './tickets_message'

export default new SlashCommand()
  .setSlashCommandBuilder(
    new SlashCommandBuilder()
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .setName('tickets')
      .setDescription('Управление тикетами.')
  )
  .addSubCommand(ticketsMessageSubcommand)
