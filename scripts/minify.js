const fs = require('fs');
const path = require('path');
var minify = require('minify');

const options = {
    html: {
        removeAttributeQuotes: false,
        removeOptionalTags: false
    }
};

minifyJS(path.resolve(path.dirname(__filename), '../dist/.'));

function minifyJS(dirPath) {
    flag = false;
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (
            stat.isFile() &&
            stat.size != 0 &&
            (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.css'))
        ) {
            flag = true;
            minify(filePath, options)
                .then((content) =>
                    fs.writeFile(filePath, content, function(err) {
                        if (err) throw err;
                    })
                )
                .catch(console.error);
        } else if (stat.isDirectory()) {
            minifyJS(filePath);
        }
    }
    if (flag) console.log('### INFO: minified files in directory: ' + dirPath);
}