const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { execute } = require('./ping');
const QRCode = require('qrcode');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qr')
        .setDescription('Create qr code')
        .addSubcommand(subcommand => 
            subcommand
                .setName('200')
                .setDescription('size 200x200')
                .addStringOption(option => 
                    option
                        .setName('url')
                        .setDescription('Enter a valid URL')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('300')
                .setDescription('size 300x300')
                .addStringOption(option => 
                    option
                        .setName('url')
                        .setDescription('Enter a valid URL')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('400')
                .setDescription('size 400x400')
                .addStringOption(option => 
                    option
                        .setName('url')
                        .setDescription('Enter a valid URL')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const subcommandSize = interaction.options.getSubcommand();
        const url = interaction.options.getString('url');
        const filePath = './qrcode.png';
        try {
            if (subcommandSize == '200' || subcommandSize == '300' || subcommandSize == '400') {
                await QRCode.toFile(filePath, url, { width:subcommandSize });
                const attachment = new AttachmentBuilder(filePath, { name: 'qrcode.png' });
    
                await interaction.reply({
                    content: "Here is your QR code:",
                    files: [attachment],
                });
            } else {
                await interaction.reply('Enter one of these values: 200, 300, 400.');
            }
            fs.unlinkSync(filePath);
        } catch (error) {
            console.error('Error generation QR code:', error);
            await interaction.reply('Failed to generate QR code.');
        }
    }
}

// npm install qrcode

