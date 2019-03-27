const fetch = require('node-fetch');
const d3 = require('d3');
const R = require('ramda');

const writeJson = require('./writeJson')

// le lien vers le fichier CSV
const URL = 'https://raw.githubusercontent.com/idris-maps/heig-datavis-2019/master/20190322-node/exercice_node/ch_asylum_demands.csv';


fetch(URL).then(res => res.text())
			.then(d3.csvParse)
			//Enlève les entrées ou il y a "*" 
			.then(donnees => donnees.filter(d => d.affected !== "*")) 
			//Number traduit "1999" en 1999
			.then(donnees => donnees.map(d => ({...d, affected: Number(d.affected), year: Number(d.year)}))) 
			//Normalise les USA
			.then(donnees => donnees.map(d => ({...d, country_asylum: d.country_asylum.includes("USA") ? "USA" : d.country_asylum}) ))
			//Crée le fichier asylum.json
			.then(donnees => writeJson('asylum.json', donnees))
			.catch(console.log);