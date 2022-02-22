# LEGO Mini SRM

## Description

A JavaScript application to search and filter vendor and material data.
After opening the index.html file in the browser, the user can click on buttons to see results to 3 predefined tasks.

- Task 1 - Sort out all the vendors and the materials that the vendor offers
- Task 2/a - For each material, find the cheapest vendor and its deliver time.
- Task 2/b - For each material (by color), find the cheapest vendor and its deliver time.
- Task 3 - Find the best offer for the material Polymethyl Methacrylate (PMMA) and the melting point between 200C to 300C. Note: you should also consider the deliver time and cost, and eco-friendly, etc

Each task has a button on the screen and on click the result of the Task will appear.

## Getting Started

- The project was written with JavaScript (ES6+), so a modern browser is a requirement to properly use the app.
- no node modules are used, so no installation is required
- index.html can be opened via live-server or just in the browser

## Project structure

- The project follows the MVC (Model-View-Controller) structure. It is built with JS modules, and the controller file is included as the starting point in the html.
- controller.mjs - is a bridge between the model.mjs and the views. Makes sure that the views get the appropriate data from the model to generate the markup. It contains (and executes on load) the init() method that makes sure that the proper event listeners are attached to the buttons on the screen and this way the appropriate results are outputted
- model.mjs - contains the logic to transfrom the JSON data into the appropriate format
- Views
  - View.mjs - contains the View class - all the other view classes are subclasses of the View class. The view class defines the parent element, where the data should be output (in all the three cases) and a render method, which defines the steps how to output the data in the browser
    -VendorListView.mjs - contains the VendorListView class, which includes a generateMarkup method, to create the HTML code for Task 1. Also includes an addVendorListHandler method, which makes sure through the controller, that the appropriate event handler is attached to the Task 1 button click.
  - CheapestVendorView.mjs - contains the CheapestVendorView class which defines functions to output the proper data for Task 2. Contains event listeners and generates markup for outputting the cheapest vendor for every material and for every material, divided by colours.
  - PMMABestOfferView.mjs - through the PMMABestOffer class it ensures that the markup for Task 3 is generated properly and that when the Task 3 button is clicked, it is rendered to the screen.
- material_vendor_data.json - contains the data for the vendors and materials

## Author

The author of the project is Brigi Horvath, who is an aspiring web developer who wants to learn as much as she can about development...
