import xml2js from "xml2js";

const parseXML = async (xml) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = await parser.parseStringPromise(xml);
  return result?.rss?.channel?.item || [];
};

export default parseXML;
