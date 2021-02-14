import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { runOnMount } from '../../utils/react';
import { HelloWorld } from './component';
import { DEFAULT_LABEL } from './model';
import { createHelloWorldViewModel, HelloWorldViewModel } from './view-model';

const Container = context.combine(context.key<HelloWorldViewModel>()('helloWorldViewModel'), ({ label$ }) =>
	withRX(HelloWorld)(() => ({
		defaultProps: {
			label: DEFAULT_LABEL,
		},
		props: {
			label: label$,
		},
	})),
);

export const HelloWorldContainer = context.combine(
	context.defer(Container, 'helloWorldViewModel'),
	createHelloWorldViewModel,
	(Container, createHelloWorldViewModel) =>
		runOnMount(Container, () => () => ({ helloWorldViewModel: createHelloWorldViewModel() })),
);
