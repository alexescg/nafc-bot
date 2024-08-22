const questionnaire = {
  name: { header: "What's the event name?", placeholder: 'Event Idea name' },
  amountOfPeople: {
    header: 'No. of people needed',
    placeholder: 'It can be a fixed number or a range eg 8 to 12'
  },
  description: { header: 'Description', placeholder: 'Write a brief description of the event' },
  cost: { header: 'What is the estimated cost?', placeholder: 'In dkk or equivalent preferably' }
};

// Thread template
const threadTemplate = `
# {name}
-----------------------
**__Amount of people:__**: {amountOfPeople}
**__Cost:__**: {cost}
**__Description:__**:
{description}
`;

import {
  CommandContext,
  ComponentType,
  ModalInteractionContext,
  SlashCommand,
  SlashCreator,
  TextInputStyle
} from 'slash-create/web';

module.exports = class IHaveAnEventIdeaCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'i-have-an-event-idea',
      description: 'Template for creating an event idea'
    });
  }

  // You can send a modal this way
  // Keep in mind providing a callback is optional, but no callback requires the custom_id to be defined.
  async run(ctx: CommandContext) {
    const callback = async (mctx: ModalInteractionContext) => {
      const threadContent = Object.keys(questionnaire).reduce((result, key) => {
        return result.replace(`{${key}}`, mctx.values[key]);
      }, threadTemplate);

      return mctx.send(threadContent);
    };
    await ctx.sendModal(
      {
        title: 'New Event Idea',
        components: [
          {
            type: ComponentType.ACTION_ROW,
            components: [
              {
                type: ComponentType.TEXT_INPUT,
                label: questionnaire['name'].header,
                style: TextInputStyle.SHORT,
                custom_id: 'name',
                placeholder: questionnaire['name'].placeholder
              }
            ]
          },
          {
            type: ComponentType.ACTION_ROW,
            components: [
              {
                type: ComponentType.TEXT_INPUT,
                label: questionnaire['amountOfPeople'].header,
                style: TextInputStyle.SHORT,
                custom_id: 'amountOfPeople',
                placeholder: questionnaire['amountOfPeople'].placeholder
              }
            ]
          },
          {
            type: ComponentType.ACTION_ROW,
            components: [
              {
                type: ComponentType.TEXT_INPUT,
                label: questionnaire['cost'].header,
                style: TextInputStyle.SHORT,
                custom_id: 'cost',
                placeholder: questionnaire['cost'].placeholder
              }
            ]
          },
          {
            type: ComponentType.ACTION_ROW,
            components: [
              {
                type: ComponentType.TEXT_INPUT,
                label: questionnaire['description'].header,
                style: TextInputStyle.PARAGRAPH,
                custom_id: 'description',
                placeholder: questionnaire['description'].placeholder
              }
            ]
          }
        ]
      },
      callback
    );
  }
};
