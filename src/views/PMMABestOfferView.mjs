import View from './View.mjs';

class PMMABestOfferView extends View {
  // parentElement = document.querySelector('.vendorListContainer');

  generateMarkup() {
    let materialProperties = `<h2>${this.data.vendor}</h2>`;

    for (const property in this.data) {
      materialProperties += `<p>${property} : ${this.data[property]}</p>`;
    }
    // console.log();
    return materialProperties;
  }

  addPMMAHandler(handler) {
    document
      .querySelector('.bestOfferForPMMAButton')
      .addEventListener('click', handler);
  }
}

export default new PMMABestOfferView();
