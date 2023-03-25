import { promises, existsSync, mkdirSync } from 'fs';
import sharp from 'sharp';

// Input parameters
const inputFile = './scripts/imageChopper/input/image.jpg';
const outputFolder = './scripts/imageChopper/output/';
// const rows = 6;
// const cols = 6;
const size = 200;

// Create the output folder if it doesn't exist
if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder);
} else {
    async function clearFolder(folderPath) {
        const files = await promises.readdir(folderPath);

        for (const file of files) {
            await promises.unlink(`${folderPath}/${file}`);
        }

        console.log(`Cleared folder: ${folderPath}`);
    }
    clearFolder(outputFolder);
}

// Load the input image
sharp(inputFile).toBuffer((err, buffer) => {
    if (err) {
        console.error(err);
        return;
    }

    // Calculate the width and height of each square image
    sharp(buffer)
        .metadata()
        .then(metadata => {
            // const width = metadata.width / cols;
            // const height = metadata.height / rows;
            // const squareSize = Math.min(metadata.width / rows, metadata.height / cols);
            // Loop through the rows and columns
            const rows = Math.floor(metadata.height / size);
            const remainderX = metadata.width % size;
            const cols = Math.floor(metadata.width / size);
            const remainderY = metadata.height % size;

            for (let row = 0, i = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    // Extract the square image
                    sharp(buffer)
                        .extract({
                            left: col * size + remainderX / 2,
                            top: row * size + remainderY / 2,
                            width: size,
                            height: size,
                        })
                        .toFile(outputFolder + `${++i}.jpg`, err => {
                            if (err) {
                                console.error(err);
                                return;
                            }

                            console.log(`Saved tile ${row}_${col} as ${i}.jpg`);
                        });
                }
            }
            console.log('rows: ' + rows + ' cols: ' + cols + ' remainderX: ' + remainderX + ' remainderY: ' + remainderY + ' size: ' + size);
        });
});
