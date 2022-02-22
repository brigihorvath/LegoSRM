import View from './View.mjs';

class CheapestVendorView extends View {
  generateMarkup() {
    return Object.keys(this.data)
      .map(
        (material) =>
          `<h2>${material}</h2><p>${this.data[material].vendor}</p><p>${this.data[material].price}</p>`
      )
      .join('');
  }

  addCheapestVendorHandler(handler) {
    document
      .querySelector('.cheapestVendorsListButton')
      .addEventListener('click', handler);
  }

  addCheapestVendorColorHandler(handler) {
    document
      .querySelector('.cheapestVendorColorListButton')
      .addEventListener('click', handler);
  }
}

export default new CheapestVendorView();
