import { Service } from 'egg';
const parseXmlToJson = require('xml2js').parseString;

class CommonServer extends Service {
    parseXmlToJson;
}
