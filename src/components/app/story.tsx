import React from 'react';
import { AppContainer } from './container';

export default {
	title: 'app',
	component: <AppContainer />,
};

const Template = () => <AppContainer />;

export const Default = Template.bind({});
Default.args = {};
