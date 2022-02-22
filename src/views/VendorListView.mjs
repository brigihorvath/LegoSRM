// the VendorListView is a subclass of the View
// this view's task is to generate the markup from the data that it receives in the controller
// when the vendorListButton is clicked

import View from './View.mjs';

class VendorListView extends View {
  generateMarkup() {
    // loops through the data that comes from the legoModel
    // and creates the HTML code
    return this.data
      .map(
        (vendor) =>
          `<h2>${vendor.name}</h2> ${vendor.materials
            .map((material) => `<p>${material.Name} - ${material.Color}</p>`)
            .join('')}`
      )
      .join('');
  }

  addVendorListHandler(handler) {
    // handler function comes from the controller
    document
      .querySelector('.vendorsListButton')
      .addEventListener('click', handler);
  }
}

export default new VendorListView();
