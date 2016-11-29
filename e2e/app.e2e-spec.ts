import { WriDmsPage } from './app.po';

describe('wri-dms App', function() {
  let page: WriDmsPage;

  beforeEach(() => {
    page = new WriDmsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
