import { failure, RemoteData, success } from '@devexperts/remote-data-ts';
import { Lazy } from 'fp-ts/lib/function';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export interface GodService {
	getSon: Lazy<Observable<RemoteData<Error, string>>>;
}

export const createGodService: Lazy<GodService> = () => ({
	getSon: () =>
		timer(0, 1000).pipe(
			map(() => {
				const isFailure = Math.random() < 0.5;

				return isFailure ? failure(new Error('Someting went really bad')) : success('RXJS');
			}),
		),
});
