import React, { FC } from 'react';
import { option } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { getOrEmptyString } from '../../utils/option';

export type HelloWorldProps = { label: option.Option<string> };

export const HelloWorld: FC<HelloWorldProps> = ({ label }) => <div>Hello world {pipe(label, getOrEmptyString)}</div>;
