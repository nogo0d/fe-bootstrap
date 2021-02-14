import React, { context } from '@devexperts/rx-utils/dist/context2.utils';
import { FC } from 'react';
import { HelloWorldContainer } from '../hello-world/container';
import styles from './styles.module.css';

export const App = context.combine(
	HelloWorldContainer,
	(HelloWorldContainer): FC => () => (
		<div className={styles.container}>
			<HelloWorldContainer />
		</div>
	),
);
