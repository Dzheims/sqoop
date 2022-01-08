import * as cheerio from 'cheerio';
const fetch = require('node-fetch');
import {
  resolvers as googleApiResolver,
  googleFactCheckParams,
} from '../googleApi/queries';
import { Claim } from '../googleApi/models';

interface veraFilesParams {
  keyword: string;
}

interface veraFiles {
  id: Number;
  author: string;
  description: string;
  title: string;
  date: string | undefined;
  dateText: string;
  category: string;
  url: string | undefined;
  imageStyle: string | undefined;
  imageUrl: string | undefined;
}

export const resolvers = {
  Query: {
    // UNABLE TO SCRAPE IN VERAFILES.ORG DUE TO DDoS PROTECTION USE API INSTEAD WITH VERA RESULTS ALONE
    veraFilesFactCheck: async (_: any, args: veraFilesParams, context: any) => {
      let { keyword } = args;
      let veraKeyword: googleFactCheckParams = {
        keyword: `site:verafiles.org ${keyword}`,
      };
      const result: Claim[] =
        await googleApiResolver.Query.googleFactCheckSearch(
          _,
          veraKeyword,
          context
        );

      const veraFiles = result.map((claim: Claim, index) => {
        const {
          text: description,
          publisherName: author,
          url,
          title,
          reviewDate: date,
          textualRating: category,
        } = claim;

        return {
          id: index,
          author,
          description,
          title,
          date,
          category,
          url,
        };
      });
      return veraFiles;
    },
    veraFilesFactCheck2: async (
      _: any,
      args: veraFilesParams,
      context: any
    ) => {
      let { keyword } = args;
      const { jwtClaims } = context;
      // if (!jwtClaims) throw new Error();

      const queryParams = new URLSearchParams();
      queryParams.set('query', keyword || '');
      const response = await fetch(
        `https://verafiles.org/results?search_paths%5B%5D=&query=${keyword}&submit=Search`
      );

      const result = await response.text();
      if (result.status === 'error') {
        return result;
      }
      const contents: veraFiles[] = [];
      const $ = cheerio.load(result, {
        xml: {
          normalizeWhitespace: true,
        },
      });

      const contentItems = $(
        "div[class='column page-list-article page-list-article--three-column-grid']"
      );
      contentItems.each(function (id, element) {
        const author = $(element)
          .find(
            "div[class='page-list-article__author page-list-article__author--three-column-grid']"
          )
          .text()
          .trim();
        const description = $(element)
          .find("div[class='page-list-article__description']")
          .text()
          .trim();
        const title = $(element)
          .find(
            "div[class='page-list-article__title page-list-article__title--three-column-grid']"
          )
          .text()
          .trim();
        const date = $(element)
          .find("div[class='page-list-article__date']>p>time")
          .attr('datetime')
          ?.trim();
        const dateText = $(element)
          .find("div[class='page-list-article__date']>p>time")
          .text()
          .trim();
        const category = $(element)
          .find("div[class='page-list-article__category']")
          .text()
          .trim();
        const url = $(element)
          .find(
            "a[class='page-list-article__link page-list-article__link--three-column-grid']"
          )
          .attr('href')
          ?.trim();
        const imageStyle = $(element)
          .find(
            "figure[class='page-list-article__thumbnail page-list-article__thumbnail--three-column-grid']"
          )
          .attr('style')
          ?.trim();
        const imageUrl = imageStyle
          ?.replace("background-image: url('", 'https://verafiles.org')
          .replace("')", '');

        const content = {
          id,
          author,
          description,
          title,
          date,
          dateText,
          category,
          url,
          imageStyle,
          imageUrl,
        };
        contents.push(content);
      });
      return contents;
    },
  },
};
