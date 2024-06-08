import { Meta, StoryFn } from '@storybook/react'

import LayutSecondary from './Secondary'

export default {
  title: '/layout/Secondary',
  component: LayutSecondary,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof LayutSecondary>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof LayutSecondary> = (args) => <LayutSecondary {...args} />

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
