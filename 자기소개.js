const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("자기소개")
    .setDescription("자기소개를 해주시면 관리자가 본후에 결정합니다."),
    /**
    *
    * @parm {import("discord.js").ChatInputCommandInteraction} interaction
    */
    async execute(interaction) {
        const modal = new ModalBuilder().setCustomId("inquiry").setTitle("자기소개서");

        const title = new ActionRowBuilder({
            components: [
                new TextInputBuilder()
                .setCustomId("title")
                .setLabel("이름")
                .setStyle(TextInputStyle.Short),
            ],
        });

        const ds = new ActionRowBuilder({
            components: [
                new TextInputBuilder()
                .setCustomId("ds")
                .setLabel("유입경로 및 성별 나이 적어주세요!! ")
                .setStyle(TextInputStyle.Paragraph),
            ],
        });

        modal.addComponents(title,ds);

        await interaction.showModal(modal);

        const collector = await interaction.awaitModalSubmit({time:10*60*1000});

        if(collector){
            const title_value = collector.fields.fields.get("title")?.value;
            const ds_value = collector.fields.fields.get("ds")?.value;

            const embed = new EmbedBuilder()
            .setTitle(`**자기소개서 도착!! (${interaction.user.tag})**`)
            .setDescription(`**이름 : ${title_value}\n\n나이 및 자세한 설명 : ${ds_value}**`)
            .setFooter({ text: `유저아이디 : ${interaction.user.id}` })
            .setColor("Green")
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic:true }));

            const developer_channel = interaction.client.channels.cache.get(
                "1072515107638214676"
            );

            developer_channel.send({ embeds: [embed] });

            collector.reply({
                ephemeral: true,
                content: `**자기소개가 전송되었어요!!**`,
            })
        }
    },
};
