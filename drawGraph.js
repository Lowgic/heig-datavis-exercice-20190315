const d3 = require('d3')
const fs = require('fs')

//Chargement des données 
const DATA = require('./asylumByCountry.json');

const COLORS = ["#66ff99",
				"#00ffff",
				"#0099ff",
				"#cc99ff",
				"ff0066",
				"#ff9900",
				"#999966",
				"#9933ff",
				"#ffccff",
				"#cc3300",
				"#006699",
				"#ffff00",
				"#cc6699",
				"#6600cc",
				"#66ffcc",
				"#ff9900",
				"#ccffff",
				"#ff5050",
				"#0066ff"]

const graph = DATA => 
`<svg width="1920" heigth="1080" xmlns="http://www.w3.org/2000/svg">
${DATA.map((d,i) => `<circle cx="${(i+1)*65}" cy="85" r="${d.somme}" fill="${COLORS[i]}" />
					 <text x="${(i+1)*65}" y="25" font-family="Arial" font-size="8">${d.country_asylum}(${d.somme})</text>`).join('\n')}
					 <text x="45" y="170" font-family="Arial" font-size="20">Swiss Migration Destination</text>
</svg>`

const writeSvg = svg =>
  fs.writeFileSync('graph.svg', svg, 'utf-8')
// passez la chaine de charactère à writeSvg pour écrire graph.svg((

writeSvg(graph(DATA));