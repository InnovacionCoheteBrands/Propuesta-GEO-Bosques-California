const fs = require('fs');
const pdf = require('pdf-extraction');

const dataBuffer = fs.readFileSync('./Docs/BROCHURE BOSQUES (actualizado 2026).pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(error) {
    console.error('Error al procesar el PDF:', error);
});
