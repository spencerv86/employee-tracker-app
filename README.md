[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Employee Tracker App

## Description

The Employee Tracker App is a command line interface that was created using MySQL, Express.js and the inquirer npm package. This app gives its users the ability to view, navigate, and update data from an database of employees, roles and departments within a company. 

The full process can be found on my [Github](https://github.com/spencerv86/) repository linked here:
<https://github.com/spencerv86/employee-tracker-app>

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

To install, begin by forking the repository and downloading to your computer and make sure that you have node and MySQL workbench already installed. You may need to run 
```npm init``` or ```npm install``` but no other files should be necessary. Add the schema.sql and the seeds.sql to mySQL workbench and run to populate the database. 

## Usage

To use the application, navigate into the repository in your terminal and run the following command(s):

``` node app.js ``` or ```npm start```

You will be able to choose between several prompts to view, add or update the employees, roles and departments within the company's database. Choosing view " " will display all the data for the chosen field.

![Demo Screenshot](./Assets/images/CLI_screenshot.png)

For a video demo of the application in action, please click the link below.

[Demonstration Video](https://drive.google.com/file/d/111emmLdSKaPIxbVi-k3k8wPL9NEuHPEp/view).

## Credits

Thanks to the extremely helpful fellow members of my cohort!
## License

MIT License

Copyright (c) 2021 Spencer Vaughan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
