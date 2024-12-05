const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('How-to'),
    async execute(interaction) {
        await interaction.reply('Enter /qr size-of-qr your-url');
    }
}