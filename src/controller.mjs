import legoModel from './model.mjs';
import vendorListView from './views/VendorListView.mjs';

class Controller {
  /// the controller makes sure that when the HTML is loaded
  // the eventListeners are attached to the appropriate buttons
  init() {
    vendorListView.addVendorListHandler(this.#vendorListHandler);
  }

  /// the handler function that event listener in the vendorListView gets
  // passes the data received from the legoModel to the view
  // where the view will generate the markup and outputs the result
  #vendorListHandler() {
    const data = legoModel.listVendors();
    vendorListView.render(data);
  }
}

const controller = new Controller();
controller.init();
