#! /usr/bin/env node
var fs = require("fs");
var inquirer = require("inquirer");
var handlebars = require("handlebars");
var location = process.cwd();

// Command Line || Questions
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var questions = [{
  type: "input",
  name: "component-name",
  message: "vue component name",
  validate: function validate(input) {
    if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;else return "Project name may only include letters, numbers, underscores and hashes.";
  }
}];

// Command Line || Input Handler
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var fileName;
var folderName;
var templatePath = __dirname + "/template";

if (process.argv.slice(2).toString()) {
  fileName = process.argv.slice(2).toString();
  folderName = process.argv.slice(2).toString();

  // Handle "-" Format
  if (folderName.includes("-")) {
    fileName = folderName.substring(folderName.indexOf("-") + 1);
  }

  createStructure(folderName, fileName)
}
else {
  inquirer.prompt(questions).then(function(answers) {
    fileName = answers["component-name"];
    folderName = answers["component-name"];

    // Handle "-" Format
    if (folderName.includes("-")) {
      fileName = fileName.substring(fileName.indexOf("-") + 1);
    }

    createStructure(folderName, fileName)
  });
}

// Handlebars Render Controller
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function renderToString(source, data) {
  var template = handlebars.compile(source);
  return template(data);
}

// Create Folder && File Structure
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function createStructure(folder, file) {

  // File System || Create Directory
  fs.mkdirSync(location + "/" + folder);

  // File System || Create Templates
  createFile(folder, file, ".js");
  createFile(folder, file, ".scss");
  createFile(folder, file, ".vue");
}

// Create Individual Templates
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function createFile(folder, file, ext) {

  // Handlebars ||  Render Controller
  function renderToString(source, data) {
    var template = handlebars.compile(source);
    return template(data);
  }

  // File System || Primary Controller
  fs.readFile(templatePath + "/replace" + ext, function (err, data) {
    if (!err) {
      fs.writeFile(location + "/" + folder + "/" + file + ext, renderToString(data.toString(), { name: file }), function (err) {
        if (err) {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}

