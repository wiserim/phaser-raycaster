const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

exec('node node_modules/jsdoc/jsdoc.js -t node_modules/tsd-jsdoc/dist -r src -d ./types', (err, stdout, stderr) => {
    if(err) {
        console.error(`exec error: ${err}`);
        return;
    }

    let file = fs.readFileSync(path.resolve(__dirname, '../types/types.d.ts'), 'utf8');
    file += `
declare module 'phaser-raycaster' {
    export = PhaserRaycaster;
}`;

    fs.writeFileSync(path.resolve(__dirname, '../types/types.d.ts'), file, 'utf8');
    console.log('types.d.ts file build successfully.');
});