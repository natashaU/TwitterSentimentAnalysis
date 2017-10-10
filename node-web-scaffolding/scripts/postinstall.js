#!/usr/local/bin/node

const
    os = require("os"),
    fs = require("fs"),
    path = require("path"),
    appName = "node-web-scaffolding",
    appDir = "../" + appName,
    filesToCopy = ["client", "server", "package.json", "LICENSE", "README.md"];

//==============================================================================
function _printRenameError(error) {
    if (error) {
        console.error("Error moving file to working directory", error);
        process.exit();
    }
}

//==============================================================================
function _printUnlinkError(error, i_sFile) {
    if (error) {
        console.error("Error removing ", i_sFile, " from working directory", error);
        process.exit();
    }
}

//==============================================================================
function popDir() {
    process.chdir("../");
}

//==============================================================================
function removeFile(i_sFile) {
    return new Promise(i_oResolve => {
        fs.unlink(i_sFile, (error) => {
            _printUnlinkError(error, i_sFile);
            i_oResolve();
        });
    });
}

//==============================================================================
function removeDir(i_sDirName, i_bQuiet) {
    return new Promise(i_oResolve => {
        fs.rmdir(i_sDirName, (error) => {
            if (error && !i_bQuiet) {
                _printUnlinkError(error, i_sDirName);
            }
            i_oResolve();
        });
    });
}

//==============================================================================
function moveFilesWindows() {
    fs.mkdir(appDir, error => {
        if (error) {
            console.error("Error creating application directory ", appDir);
            process.exit();
        }

        filesToCopy.forEach(i_sFile => {
            fs.rename(path.join(appName, i_sFile), path.join(appDir, i_sFile), _printRenameError);
        });

        removeFile(path.join(appName, ".npmignore"))
            .then(() => removeFile(path.join(appName, "scripts", "postinstall.js")))
            .then(() => removeDir(path.join(appName, "scripts")))
            .then(() => removeDir(path.join(appName), true))
            .then(() => removeDir(".staging"))
            .then(popDir)
            .then(() => removeDir("node_modules", true));
    });
}

//==============================================================================
function moveFilesProper() {
    fs.rename(appName, appDir, (error) => {
        _printRenameError(error);

        removeDir(".staging")
            .then(popDir)
            .then(() => removeDir("node_modules", true));
    });
}

//==============================================================================
// MAIN SCRIPT EXECUTION
//==============================================================================
popDir();

if (/^win/i.test(os.platform())) {
    // windows
    moveFilesWindows();
} else {
    // OSX / Linux
    moveFilesProper();
}
