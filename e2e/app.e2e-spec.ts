import { YaojiangjiePage } from './app.po';

describe('Yaojiangjie App', function() {
  let page: YaojiangjiePage;

  beforeEach(() => {
    page = new YaojiangjiePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
