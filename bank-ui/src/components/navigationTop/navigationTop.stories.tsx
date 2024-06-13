import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import NavigationTop from './navigationTop'

export default {
  title: 'components/navigationTop',
  component: NavigationTop,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof NavigationTop>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof NavigationTop> = (args) => (
  <MemoryRouter>
    {' '}
    <NavigationTop {...args} />
  </MemoryRouter>
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
