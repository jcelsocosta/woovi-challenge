import { Meta, StoryFn } from '@storybook/react'

import SignUp from './SignUp'

export default {
  title: 'components/signup',
  component: SignUp,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof SignUp>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof SignUp> = (args) => <SignUp {...args} />

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
