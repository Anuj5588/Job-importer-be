import axios from "axios";
import xml2js from "xml2js";
import  jobQueue  from "../queues/job.queue.js";
import ImportLog from "../models/ImportLog.js";

const FEED_URLS = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
  "https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france",
  "https://jobicy.com/?feed=job_feed&job_categories=design-multimedia",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
  "https://jobicy.com/?feed=job_feed&job_categories=copywriting",
  "https://jobicy.com/?feed=job_feed&job_categories=business",
  "https://jobicy.com/?feed=job_feed&job_categories=management",
  "https://www.higheredjobs.com/rss/articleFeed.cfm"
];


const parser = new xml2js.Parser({ explicitArray: false });

 const importJobs = async () => {
  for (const feedUrl of FEED_URLS) {
    let totalFetched = 0;
    let newJobs = 0;
    let updatedJobs = 0;
    let failedJobs = [];

    try {
   
      const { data: xmlData } = await axios.get(feedUrl);


      const jsonData = await parser.parseStringPromise(xmlData);

      const jobs =
        jsonData?.rss?.channel?.item ??
        jsonData?.jobs ??
        [];

      totalFetched = jobs.length;


      for (const job of jobs) {
        try {
          await jobQueue.add("import-job", {
            feedUrl,
            jobData: job
          });
          newJobs++;
        } catch (err) {
          failedJobs.push({
            reason: err.message
          });
        }
      }
    } catch (err) {
      failedJobs.push({
        reason: err.message
      });
    }

    await ImportLog.create({
      fileName: feedUrl,
      totalFetched,
      totalImported: newJobs + updatedJobs,
      newJobs,
      updatedJobs,
      failedJobs
    });
  }
};

export default importJobs