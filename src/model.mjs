import data from './data/material_vendor_data.json' assert { type: 'json' };

class LegoModel {
  //////////////////
  // TASK 1
  //////////////////

  // Sort out all the vendors and the materials that the vendor offers

  listVendors() {
    /// looping through all the vendors and returns their name
    // filters the materials for the VendorID in order to find all the materials that the vendor offers
    // returns an array
    const vendorMap = data.Vendors.map((vendor) => {
      return {
        name: vendor.Name,
        materials: data.Materials.filter(
          (material) => material.VendorID === vendor.ID
        ),
      };
    });
    return vendorMap;
  }
}

export default new LegoModel();
