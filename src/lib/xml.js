import { parseString } from 'react-native-xml2js';

export function getXML(url) {
  return fetch(url).then(res => res.text()).then(
    xml =>
      new Promise(resolve => {
        parseString(xml, (err, result) => {
          resolve(result);
        });
      })
  );
}
