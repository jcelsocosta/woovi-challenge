import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import SignUp from './SignUp'

export default {
  title: 'components/signup',
  component: SignUp,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof SignUp>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof SignUp> = (args) => (
  <MemoryRouter>
    {' '}
    <SignUp {...args} />{' '}
  </MemoryRouter>
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
