import { AqconnectWebPage } from './app.po';

describe('aqconnect-web App', function() {
  let page: AqconnectWebPage;

  beforeEach(() => {
    page = new AqconnectWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
