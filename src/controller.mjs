import legoModel from './model.mjs';
import cheapestVendorView from './views/CheapestVendorView.mjs';
import PMMABestOfferView from './views/PMMABestOfferView.mjs';
import vendorListView from './views/VendorListView.mjs';

class Controller {
  /// the controller makes sure that when the HTML is loaded
  // the eventListeners are attached to the appropriate buttons
  init() {
    vendorListView.addVendorListHandler(this.#vendorListHandler);
    cheapestVendorView.addCheapestVendorHandler(
      this.#cheapestVendorListHandler
    );
    cheapestVendorView.addCheapestVendorColorHandler(
      this.#cheapestVendorColorListHandler
    );
    PMMABestOfferView.addPMMAHandler(this.#PMMABestOfferHandler);
  }

  /// the handler function that event listener in the vendorListView gets
  // passes the data received from the legoModel to the view
  // where the view will generate the markup and outputs the result
  #vendorListHandler() {
    const data = legoModel.listVendors();
    vendorListView.render(data);
  }
  // handler function to find the cheapest Vendor by Materials
  // passes the data received from the legoModel to the view
  // where the view will generate the markup and outputs the result

  #cheapestVendorListHandler() {
    const data = legoModel.cheapestVendorByMaterials();
    cheapestVendorView.render(data);
  }
  // handler function to find the cheapest Vendor by Materials and Colors
  // passes the data received from the legoModel to the view
  // where the view will generate the markup and outputs the result

  #cheapestVendorColorListHandler() {
    const data = legoModel.cheapestVendorByMaterialsColors();
    cheapestVendorView.render(data);
  }

  #PMMABestOfferHandler() {
    const data = legoModel.bestOfferPMMA();
    PMMABestOfferView.render(data);
  }
}
const controller = new Controller();
controller.init();
