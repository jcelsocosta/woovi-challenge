import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'

export default {
  title: 'components/login',
  component: Login,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof Login>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Login> = (args) => (
  <MemoryRouter>
    {' '}
    <Login {...args} />
  </MemoryRouter>
)

export const Base = Template.bind({})
