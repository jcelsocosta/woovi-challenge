import { Meta, StoryFn } from '@storybook/react'

import LayutPrimary from './Primary'

export default {
  title: '/layout/primary',
  component: LayutPrimary,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof LayutPrimary>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof LayutPrimary> = (args) => <LayutPrimary {...args} />

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
