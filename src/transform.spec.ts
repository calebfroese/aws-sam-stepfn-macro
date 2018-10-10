import { expect } from 'chai';
import { transform } from './transform';

describe('Transform', () => {
  it('transforms the template', done => {
    const event = {
      region: 'us-east-1',
      accountId: '$ACCOUNT_ID',
      fragment: {},
      transformId: '$TRANSFORM_ID',
      params: {},
      requestId: '$REQUEST_ID',
      templateParameterValues: {},
    };
    transform(event, null, (err: any, data: any) => {
      expect(data).to.deep.eq({});
      expect(err).null;
      done();
    });
  });
});
