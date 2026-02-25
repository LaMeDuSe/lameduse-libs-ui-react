import type { Meta, StoryObj } from '@storybook/react';
import DynamicFormBuilder from './DynamicFormBuilder.mog';
import type { FormField } from './Form';
import type { ButtonProps } from '../Icon2/Icon';

const meta: Meta<typeof DynamicFormBuilder> = {
  title: 'LaMeDuSe/Components/Form',
  component: DynamicFormBuilder,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'radio' },
      options: ['grid', 'vertical', 'horizontal'],
      defaultValue: 'grid',
      description: 'Disposition générale du formulaire',
    },
    fields: {
      control: { type: 'object' },
      description: 'Liste des champs dynamiques',
      table: {
        type: {
          summary: 'FormField[]',
          detail: `{
  name: string;
  label?: string;
  type?: string;
  value: string;
  placeholder?: string;
  copy?: boolean;
  rowSize?: 1 | 2; // 1 = plein, 2 = demi
}`,
        },
      },
    },
    icons: {
      control: { type: 'object' },
      description: 'Icônes à afficher en bas du formulaire',
      table: {
        type: {
          summary: 'ButtonProps[]',
          detail: `{
  icon: "LINKEDIN" | "TWITTER" | "DISCORD" | "GITHUB" | "MAILBOX" | "CHECK" | "OUTBOX" | "INBOX" | "WARNING" | "CROSSMARK" | "BOX";
  href?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "tertiary" | "darkgrey";
}`,
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    layout: 'grid',
    fields: [
      {
        name: 'nom',
        label: 'Nom',
        type: 'text',
        value: '',
        placeholder: 'Entrez votre nom',
        copy: false,
        rowSize: 2,
      },
      {
        name: 'prenom',
        label: 'Prénom',
        type: 'text',
        value: '',
        placeholder: 'Entrez votre prénom',
        copy: false,
        rowSize: 2,
      },
      {
        name: 'email',
        label: 'Adresse email',
        type: 'email',
        value: '',
        placeholder: 'Entrez votre email',
        copy: false,
        rowSize: 1,
      },
    ],
    icons: [
      { icon: 'GITHUB', href: 'https://github.com', size: 'medium', color: 'darkgrey' },
      { icon: 'TWITTER', href: 'https://twitter.com', size: 'medium', color: 'primary' },
    ],
  },
};
