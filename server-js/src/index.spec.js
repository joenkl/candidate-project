import chai, { expect } from 'chai';
import express from 'express';
import sinon from 'sinon';

import Session from './models/Session';

import { routes } from '.';

describe('/', () => {
  let request;

  /** @type {sinon.SinonStub} */
  let enrichedSessionFindOneStub;

  before(async () => {
    const app = express();
    app.use(routes());
    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  beforeEach(() => {
    // Stubs go here
    enrichedSessionFindOneStub = sinon.stub(Session, 'findOne');
  });

  afterEach(() => {
    // Restore stubs here
    enrichedSessionFindOneStub.restore();
  });

  it('should have a health endpoint', async () => {
    const res = await request.get('/health');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ status: 200, message: 'OK' });
  });
});
