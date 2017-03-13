import { TodomvcPage } from './app.po';

describe('todomvc App', () => {
  let page: TodomvcPage;

  beforeEach(() => {
    page = new TodomvcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
