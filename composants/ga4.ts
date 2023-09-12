//GA4

import { GA4React } from "ga-4-react";

const ga4react = new GA4React("G-0B5F0G7CCB").initialize();

export interface AnalyticsData {
    path: string;
    search: string;
    title: string;
}

const trackPathForAnalytics = (data: AnalyticsData) => {
    const { path, search, title } = data;
    ga4react
        .then((ga) => {
            ga.pageview(path, search, title);
        })
        .catch((err) => console.error(`Analytics failed: ${err}`));
};

export default trackPathForAnalytics;

