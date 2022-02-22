// all the views will inherit from this view
// every view will receive a data at render (through the controller from the model)
// the generateMarkup function will generate the HTML code from the data
// the clear function makes sure that the container, in which we will output the data is empty
// in this case all the views share the same parentElement, because he result will be shown always
// in the same container

export default class View {
  data;
  parentElement = document.querySelector('.vendorListContainer');

  render(data) {
    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this.parentElement.innerHTML = '';
  }
}
