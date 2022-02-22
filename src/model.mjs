import data from './data/material_vendor_data.json' assert { type: 'json' };

class LegoModel {
  test() {
    console.log(data);
  }
}

export default new LegoModel();
