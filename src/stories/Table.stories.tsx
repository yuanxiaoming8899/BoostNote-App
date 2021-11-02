import { Meta } from '@storybook/react/types-6-0'
import Table from '../design/components/organisms/Table'
import { createThemedTemplate } from './utils/themes'

const { Template, themeArgType } = createThemedTemplate(Table)

export default {
  title: 'Table',
  component: Table,
  argTypes: {
    theme: themeArgType,
    disabledAddColumn: {
      defaultValue: false,
      control: {
        type: 'inline-radio',
        options: [true, false],
      },
    },
    disabledAddRow: {
      defaultValue: false,
      control: {
        type: 'inline-radio',
        options: [true, false],
      },
    },
  },
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  cols: [
    {
      name: 'Title',
    },
    {
      name: 'Assignees',
    },
    {
      name: 'Due Date',
    },
    {
      name: 'Status',
    },
    {
      name: 'Assignees',
    },
    {
      name: 'Due Date',
    },
    {
      name: 'Status',
    },
  ],
  rows: [
    {
      cells: [
        { children: 'test' },
        { children: 'test' },
        { children: 'test' },
        { children: 'test' },
        { children: 'test' },
        { children: 'test' },
        { children: 'test' },
      ],
    },
  ],
}