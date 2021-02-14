import { Context } from '@devexperts/rx-utils/dist/context2.utils';
import { Sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { Endomorphism, identity } from 'fp-ts/lib/function';
import {
	ComponentClass,
	ComponentType,
	PureComponent,
	createElement,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { createSelector } from 'reselect';
import { Observable, Subscription } from 'rxjs';

const isSink = <A>(value: Sink<A> | A): value is Sink<A> => (value as Sink<A>).effects !== undefined;

export const runOnMount = <E, P>(
	target: Context<E, ComponentType<P>>,
	selector: (p: Endomorphism<P>) => (props: P) => E | Sink<E>,
): ComponentClass<P> =>
	class Wrapper extends PureComponent<P> {
		static displayName = `RunOnMount`;

		private subscription: Subscription | undefined;
		private effectSubscription: Subscription | undefined;
		private p: Endomorphism<P> = identity;
		private provide = selector(this.p);
		private e = createSelector(this.p, this.provide);
		private result = createSelector(this.e, (e) => {
			const result = target(isSink(e) ? e.value : e);
			this.disposeSubscription();
			this.subscription = result.effects.subscribe();
			this.disposeEffectSubscription();
			if (isSink(e)) {
				this.effectSubscription = e.effects.subscribe();
			}
			return result;
		});

		componentWillUnmount() {
			this.disposeSubscription();
			this.disposeEffectSubscription();
		}

		render() {
			return createElement(this.result(this.props).value, this.props);
		}

		private disposeSubscription() {
			if (this.subscription) {
				this.subscription.unsubscribe();
			}
		}

		private disposeEffectSubscription() {
			if (this.effectSubscription) {
				this.effectSubscription.unsubscribe();
			}
		}
	};

export const usePrevious = <T>(value: T) => {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};

export const useObservable = <A>(fa: Observable<A>, initial: A): A => {
	const [value, setValue] = useState(() => initial);
	const subscription = useMemo(
		() =>
			fa.subscribe((a) => {
				//ignore state toggle functions and allow passing functions in Observable
				setValue(() => a);
			}),
		[fa, setValue],
	);
	useEffect(() => () => subscription.unsubscribe(), [subscription]);
	return value;
};
