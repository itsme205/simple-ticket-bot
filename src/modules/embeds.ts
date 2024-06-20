import Discord from 'discord.js'

export default {
  error: function (title: string, description?: string) {
    if (!title && !description) title = 'Empty string'
    const errorEmbed = new Discord.EmbedBuilder()
      .setColor(Discord.Colors.Red) // bd2222
      .setTitle(`\`\`❌\`\`  »  ${title}`)
      .setTimestamp()
      .setDescription(description ?? null)
    return errorEmbed
  },
  success: function (title: string, description?: string) {
    if (title === '' && !description) title = 'Empty string'
    const successEmbed = new Discord.EmbedBuilder()
      .setColor(Discord.resolveColor('#1ac72b'))
      .setTitle(`\`\`✅\`\`  »  ${title}`)
      .setTimestamp()
      .setDescription(description ?? null)
    return successEmbed
  },
  attention: function (title: string, description?: string) {
    if (!title) return new Discord.EmbedBuilder({ color: Discord.Colors.White, title: 'Empty string' })
    const attentionEmbed = new Discord.EmbedBuilder()
      .setColor(Discord.Colors.Yellow)
      .setTitle(`\`\`⚠\`\`  »  ${title}`)
      .setTimestamp()
      .setDescription(description ?? null)
    return attentionEmbed
  },
  default: function (description?: string) {
    if (!description) return new Discord.EmbedBuilder({ color: Discord.Colors.White, title: 'Emptry string' })
    const defaultEmbed = new Discord.EmbedBuilder()
      .setColor(Discord.resolveColor('#2b2d31'))
      .setDescription(description)
    return defaultEmbed
  }

}
