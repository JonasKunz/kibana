/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ENVIRONMENT_ALL } from '../../../common/environment_filter_values';
import {
  inspectSearchParams,
  SearchParamsMock,
} from '../../utils/test_helpers';
import { getTransactionBreakdown } from './breakdown';
import { getTransaction } from './get_transaction';
import { getTraceSamples } from './trace_samples';

describe('transaction queries', () => {
  let mock: SearchParamsMock;

  afterEach(() => {
    mock.teardown();
  });

  it('fetches breakdown data for transactions', async () => {
    mock = await inspectSearchParams((setup, apmEventClient) =>
      getTransactionBreakdown({
        serviceName: 'foo',
        transactionType: 'bar',
        config: setup.config,
        apmEventClient,
        environment: ENVIRONMENT_ALL.value,
        kuery: '',
        start: 0,
        end: 50000,
      })
    );

    expect(mock.params).toMatchSnapshot();
  });

  it('fetches breakdown data for transactions for a transaction name', async () => {
    mock = await inspectSearchParams((setup, apmEventClient) =>
      getTransactionBreakdown({
        serviceName: 'foo',
        transactionType: 'bar',
        transactionName: 'baz',
        config: setup.config,
        apmEventClient,
        environment: ENVIRONMENT_ALL.value,
        kuery: '',
        start: 0,
        end: 50000,
      })
    );

    expect(mock.params).toMatchSnapshot();
  });

  it('fetches transaction trace samples', async () => {
    mock = await inspectSearchParams((setup, apmEventClient) =>
      getTraceSamples({
        serviceName: 'foo',
        transactionName: 'bar',
        transactionType: 'baz',
        traceId: 'qux',
        transactionId: 'quz',
        apmEventClient,
        environment: ENVIRONMENT_ALL.value,
        kuery: '',
        start: 0,
        end: 50000,
      })
    );

    expect(mock.params).toMatchSnapshot();
  });

  it('fetches a transaction', async () => {
    mock = await inspectSearchParams((setup, apmEventClient) =>
      getTransaction({
        transactionId: 'foo',
        traceId: 'bar',
        apmEventClient,
        start: 0,
        end: 50000,
      })
    );

    expect(mock.params).toMatchSnapshot();
  });
});
