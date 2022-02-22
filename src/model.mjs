import data from './data/material_vendor_data.json' assert { type: 'json' };
import { exChangeRateData } from './exchangeRates.mjs';

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

  // We need a function to normalize material prices and weight units
  // since we will use it only in this class, I made it private
  // it returns the same material list (==> convertedMaterials)
  // but the PricePerUnit will be output in EURO
  // and the weight unit will be in kg
  #normalizeMaterials() {
    ////////////////////
    // CURRRENCY AND MATERIAL UNIT LISTS
    //////////////////

    // This is how I know what currencies the data has
    // const currencies = new Set(
    //   data.Materials.map((material) => material.Currency)
    // );
    // console.log(currencies);
    // const units = new Set(data.Materials.map((material) => material.Unit));
    // console.log(units);

    const currBasedOnEuro = {
      POUND: exChangeRateData.rates.GBP,
      USD: exChangeRateData.rates.USD,
      DKK: exChangeRateData.rates.DKK,
      EURO: exChangeRateData.rates.EUR,
    };

    const unitConversion = {
      kg: 1,
      lbs: 2.20462,
    };

    const convertedMaterials = data.Materials.map((material) => {
      // Price conversion to Euro ==> PricePerUnit / Exchange Rate
      // Price modification based on unit: if unit ===> lbs ===> price *= 2,20462
      const convertedPrice =
        material.PricePerUnit / currBasedOnEuro[material.Currency];
      const normalizedPrice =
        material.Unit === 'lbs'
          ? convertedPrice * unitConversion.lbs
          : convertedPrice;
      return {
        ...material,
        PricePerUnit: normalizedPrice,
        Currency: 'EURO',
        Unit: 'kg',
      };
    });
    return convertedMaterials;
  }

  //////////////////
  // TASK 2 - considering colors also
  //////////////////

  //For each material, find the cheapest vendor and its deliver time

  // I group the materials based on their names
  // taking the color into consideration
  cheapestVendorByMaterialsColors() {
    // get the materials array in a normalized format

    const convertedMaterials = this.#normalizeMaterials();

    // loop through the array and check if the material in the current color
    // is already part of the result object
    // and if the result array contains the material then check the price if it is lower

    const resultWithColors = {};

    convertedMaterials.forEach((material) => {
      const materialWithColor = `${material.Name} ${material.Color}`;
      if (
        resultWithColors[materialWithColor]?.price > material.PricePerUnit ||
        !(materialWithColor in resultWithColors)
      ) {
        resultWithColors[materialWithColor] = {};
        resultWithColors[materialWithColor].vendor =
          data.Vendors[material.VendorID - 1].Name;
        resultWithColors[materialWithColor].price =
          material.PricePerUnit.toFixed(2);
      }
    });

    // const vendorsListOrdered = convertedMaterials
    //   .sort((a, b) => a.PricePerUnit - b.PricePerUnit)
    //   .sort((a, b) => (a.Name > b.Name ? 1 : -1));
    // console.log(vendorsListOrdered);
    return resultWithColors;
  }

  //////////////////
  // TASK 2 - NOT taking colors into consideration
  //////////////////

  cheapestVendorByMaterials() {
    // get the materials array in a normalized format
    const convertedMaterials = this.#normalizeMaterials();

    // loop through the array and check if the material is already part of the result object
    // and if the result array contains the material then check the price if it is lower
    const result = {};
    convertedMaterials.forEach((material) => {
      if (
        result[material.Name]?.price > material.PricePerUnit ||
        !(material.Name in result)
      ) {
        result[material.Name] = {};
        // include the vendor's name from the Vendors array
        result[material.Name].vendor = data.Vendors[material.VendorID - 1].Name;
        result[material.Name].price = material.PricePerUnit.toFixed(2);
      }
    });

    return result;
  }

  ///////////////////
  // TASK 3
  //////////////////

  // Find the best offer for the material Polymethyl Methacrylate (PMMA) and the melting point
  // between 200C to 300C.
  //  Note: you should also consider the deliver time and cost, and eco-friendly, etc
  bestOfferPMMA() {
    // get the materials array in a normalized format
    const convertedMaterials = this.#normalizeMaterials();

    // since there are materials that's melting point is given in F and others in C
    // the melting point should be normalized
    // convert all of them to C
    const normalizedTempMaterials = convertedMaterials.map((material) => {
      const temperature =
        material.TempUnit === 'C'
          ? material.MeltingPoint
          : (material.MeltingPoint - 32) * (5 / 9);
      return {
        ...material,
        [material.MeltingPoint]: temperature,
        ['isEcoFriendly']: data.Vendors[material.VendorID - 1].ECOFriendly,
      };
    });

    // to choose the best offer, first I find the cheapest offer
    // the array needs to be filtered to the NAME and the MELTING POINT
    const bestOfferPMMA = normalizedTempMaterials
      .filter(
        (material) =>
          material.Name.includes('PMMA') &&
          material.MeltingPoint >= 200 &&
          material.MeltingPoint <= 300
      )
      .sort((a, b) => a.PricePerUnit - b.PricePerUnit);

    const cheapestOffer = bestOfferPMMA[0];

    // I compare all the offers to the cheapest one
    // I give weights to all the factors I consider
    // then I save every offers points to the offerPoints property
    // the offer with the lowest point will be the offer my algorithm choose
    const IMPORTANCE_PRICE = 200;
    const IMPORTANCE_DELIVERY_TIME = 100;
    const IMPORTANCE_ECO_FRIENDLY = 60;

    bestOfferPMMA.forEach((material) => {
      material.offerPoints =
        (material.PricePerUnit / cheapestOffer.PricePerUnit) *
          IMPORTANCE_PRICE +
        (material.DeliveryTimeDays / cheapestOffer.DeliveryTimeDays) *
          IMPORTANCE_DELIVERY_TIME +
        (material.isEcoFriendly ? 0 : IMPORTANCE_ECO_FRIENDLY);
      material.vendor = data.Vendors[material.VendorID - 1].Name;
    });
    bestOfferPMMA.sort((a, b) => a.offerPoints - b.offerPoints);

    const bestOffer = bestOfferPMMA[0];

    // return the flattened data to be easy to work with that in the view
    return {
      'Vendor ID': bestOfferPMMA[0].VendorID,
      Vendor: bestOfferPMMA[0].vendor,
      PPU: bestOfferPMMA[0].PricePerUnit,
      'Delivery Time': bestOfferPMMA[0].DeliveryTimeDays,
      'Eco Friendly': bestOfferPMMA[0].isEcoFriendly,
    };
  }
}

export default new LegoModel();
