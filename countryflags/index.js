import COUNTRIES from './countries.json';
export default function hasFlag(country) {
    // We are going to retun every country that we have in our JSON file. 
return COUNTRIES.indexOf(country) >= 0;
}