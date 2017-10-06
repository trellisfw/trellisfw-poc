const pages = ['auditors', 'login'];
function changePageFactory (page) {
  if (pages.includes(page) === false) {
    throw Error('Invaild Page "'+page+'" for App/factories/changePage');
  }
  function ChangePage ({state}) {
    state.set('App.view.page', page);
  }
  return ChangePage
}

export default changePageFactory;
