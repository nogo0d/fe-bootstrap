import { Observable } from 'rxjs';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { filter, map } from 'rxjs/operators';
import { isSuccess, toOption } from '@devexperts/remote-data-ts';
import { option } from 'fp-ts';
import { GodService } from '../../services/god';

export interface HelloWorldViewModel {
	label$: Observable<option.Option<string>>;
}

export const createHelloWorldViewModel = context.combine(
	context.key<GodService>()('godService'),
	({ getSon }) => (): HelloWorldViewModel => {
		const label$ = getSon().pipe(filter(isSuccess), map(toOption));

		return {
			label$,
		};
	},
);
