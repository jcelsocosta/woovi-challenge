import { Meta, StoryFn } from '@storybook/react'

import NavigationTop from './navigationTop'

export default {
  title: 'components/navigationTop',
  component: NavigationTop,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof NavigationTop>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof NavigationTop> = (args) => <NavigationTop {...args} />

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
