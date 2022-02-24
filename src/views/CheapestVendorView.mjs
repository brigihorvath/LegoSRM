import View from './View.mjs';

class CheapestVendorView extends View {
  generateMarkup() {
    console.log(this.data);
    return Object.keys(this.data)
      .map(
        (material) =>
          `<h2>${material}</h2><h3>Vendor: ${this.data[material].vendor}</h3><p>PPU: ${this.data[material].price} EURO</p><p>Delivery Time: ${this.data[material].deliveryTime} days</p>`
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
