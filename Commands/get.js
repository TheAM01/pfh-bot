import {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import fetch from 'node-fetch';

const command = new SlashCommandBuilder()
    .setName('get')
    .setDescription('Fetches notes on the website.')
    .addStringOption(option => option
        .setName('grade')
        .setDescription('Grade/Class')
        .setRequired(true)
        .addChoices(
            {name: 'XI (First year)', value: 'xi'},
            {name: 'XII (Second year)', value: 'xii'}
        )
    )
    .addStringOption(option => option
        .setName('subject')
        .setDescription('Subject')
        .setRequired(true)
        .addChoices(
            {name: 'Chemistry', value: 'chem'},
            {name: 'Mathematics', value: 'maths'},
            {name: 'Physics', value: 'phys'}
        )
    )
    .addIntegerOption(option => option
        .setName('index')
        .setDescription('The chapter/exercise/index')
        .setRequired(true)
    );

function notesEmbed (title, fields, thumbnail, person) {
    return new EmbedBuilder()
        .setTitle(title)
        .setAuthor({ name: 'Parhle Fail Hojayega', iconURL: 'https://parhle.ml/cdn/pwfh_logo4.png', url: 'https://parhle.ml/' })
        .addFields(fields)
        .setTimestamp()
        .setFooter({text: `CM: GET_NOTES, U: ${person.id}`})
        .setColor('#ff454d')
        .setThumbnail(thumbnail)
}

function button (link) {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Visit')
                .setURL(link)
                .setStyle(ButtonStyle.Link),
        );
}

export default {

    data: command,

    async execute (interaction) {

        const options = interaction.options._hoistedOptions.map(u => u.value).join('/');
        const request = await fetch(`https://parhle.ml/api/${options}/`);
        const response = await request.json();
        const fields = [
            {name: "Grade", value: response.grade},
            {name: "Subject", value: response.subject},
            {name: "Index", value: response.name},
            {name: 'URL', value: `https://parhle.ml${response.url}`}
        ]

        const embed = notesEmbed(response.name, fields, response.images[0], interaction.user);
        const row = button(`https://parhle.ml${response.url}`)

        return await interaction.reply({embeds: [embed], components: [row]})

    }

}