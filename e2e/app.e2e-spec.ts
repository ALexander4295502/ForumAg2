import { YzAngular2Page } from './app.po';

describe('yz-angular2 App', () => {
  let page: YzAngular2Page;

  beforeEach(() => {
    page = new YzAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
