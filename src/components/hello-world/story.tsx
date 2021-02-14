import React from 'react';
import { option } from 'fp-ts';
import { HelloWorld, HelloWorldProps } from './component';

export default {
	title: 'hello-world',
	component: <HelloWorld label={option.none} />,
};

const Template = (args: HelloWorldProps) => <HelloWorld {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: option.some('RXJS'),
};
