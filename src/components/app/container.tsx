import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createGodService } from '../../services/god';
import { runOnMount } from '../../utils/react';
import { App } from './component';

const godService = createGodService();

const Container = context.combine(context.defer(App, 'godService'), (App) =>
	runOnMount(App, () => () => ({ godService })),
);

export const AppContainer = runOnMount(Container, () => () => ({}));
