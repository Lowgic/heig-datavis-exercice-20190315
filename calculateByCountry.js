const fetch = require('node-fetch');
const d3 = require('d3');
const R = require('ramda');

const writeJson = require('./writeJson')

// asylum.json doit être créé avec prepareData
const DATA = require('./asylum.json')

//Récupère tous les pays impliqués 
const COUNTRIES = R.uniq(DATA.map(R.prop("country_asylum")));

//fonction qui trouve toutes les données selon le pays
const findAndCountCountry = country_asylum => ({
	country_asylum, somme :
							//récupère les infos par pays
						   DATA.filter(d => d.country_asylum === country_asylum)
						   //crée un tableau avec que le nbr de migrant
						  .map(d => d.affected)
						   //incrémente les valeurs
						  .reduce((somme, d) => somme + d, 0)
});

let COUNTRIES_STATS = COUNTRIES.map(pays => findAndCountCountry(pays));

writeJson('asylumByCountry.json', COUNTRIES_STATS);

