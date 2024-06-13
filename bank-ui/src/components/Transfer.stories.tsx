import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Transfer from './Transfer'

export default {
  title: 'components/transfer',
  component: Transfer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof Transfer>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Transfer> = (args) => (
  <MemoryRouter>
    {' '}
    <Transfer {...args} />{' '}
  </MemoryRouter>
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
