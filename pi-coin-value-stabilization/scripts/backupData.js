// scripts/backupData.js
const fs = require('fs');
const path = require('path');

function backupData() {
    const sourceDir = path.join(__dirname, '../data');
    const backupDir = path.join(__dirname, '../backup');

    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    fs.readdir(sourceDir, (err, files) => {
        if (err) {
            console.error('Error reading source directory:', err);
            return;
        }

        files.forEach(file => {
            const sourceFile = path.join(sourceDir, file);
            const backupFile = path.join(backupDir, file);
            fs.copyFile(sourceFile, backupFile, (err) => {
                if (err) {
                    console.error(`Error backing up file ${file}:`, err);
                } else {
                    console.log(`Backed up ${file} to ${backupDir}`);
                }
            });
        });
    });
}

backupData();
