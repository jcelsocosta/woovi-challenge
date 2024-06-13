import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

export default {
  title: 'components/home',
  component: Home,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof Home>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Home> = (args) => (
  <MemoryRouter>
    {' '}
    <Home {...args} />{' '}
  </MemoryRouter>
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
