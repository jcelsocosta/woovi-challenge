import { Meta, StoryFn } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import NavigationLeft from './navigationLeft'

export default {
  title: 'components/navigationLeft',
  component: NavigationLeft,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as Meta<typeof NavigationLeft>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof NavigationLeft> = (args) => (
  <MemoryRouter>
    <NavigationLeft {...args} />
  </MemoryRouter>
)

export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
