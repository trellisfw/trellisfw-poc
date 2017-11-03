var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var portals = ['distributingexcellence', 'pspperfection', 'retailfresh'];
var ignore = ['node_modules', '.DS_Store', 'updateOtherPortals.js'];
var dontOverwrite = ['config', 'public'];

function copyFileSync( sourceFile, targetFile ) {
    fs.writeFileSync(targetFile, fs.readFileSync(sourceFile));
}

function copyFolderRecursiveSync( sourceFolder, targetFolder ) {
    var files = [];

    if ( !fs.existsSync( sourceFolder ) ) {
      console.log(sourceFolder, 'does not exist');
      return;
    }
    //check if folder needs to be created or integrated
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.lstatSync( sourceFolder ).isDirectory() ) {
        files = fs.readdirSync( sourceFolder );
        files.forEach( function ( file ) {
            var sourceFile = path.join( sourceFolder, file );
            var targetFile = path.join( targetFolder, file );
            if (_.includes(ignore, file)) return;
            if (_.includes(dontOverwrite, file)) {
              if (fs.existsSync(targetFile)) {
                return;
              }
            }
            if ( fs.lstatSync( sourceFile ).isDirectory() ) {
                copyFolderRecursiveSync( sourceFile, targetFile );
            } else {
                copyFileSync( sourceFile, targetFile );
            }
        } );
    }
}

_.forEach(portals, (portal) => {
  copyFolderRecursiveSync('../growersync', '../'+portal);
});
