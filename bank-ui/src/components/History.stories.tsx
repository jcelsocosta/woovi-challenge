import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import History from './History'

export default {
  title: 'components/history',
  component: History,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof History>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof History> = (args) => (
  <MemoryRouter>
    {' '}
    <History {...args} />{' '}
  </MemoryRouter>
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
