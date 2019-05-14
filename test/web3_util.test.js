import web3util from '../src/web3functions/web_util'

test('get VAT period equal to 2019-2', () => {
  expect(web3util.getVATPeriod()).toBe('2019-2');
});

it('reject web3 instance', async () => {
  expect.assertions(1);
  await expect(web3util.init()).rejects.toEqual('Metamask not found');
});
