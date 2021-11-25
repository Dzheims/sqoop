const fetch = require('node-fetch');

interface googleFactCheckParams {
  keyword: string;
}

export const resolvers = {
  Query: {
    googleFactCheckSearch: async (
      _: any,
      args: googleFactCheckParams,
      context: any
    ) => {
      let { keyword } = args;
      const { jwtClaims } = context;
      if (!jwtClaims) throw new Error('Unauthorized user');

      const queryParams = new URLSearchParams();
      queryParams.set('query', keyword || '');
      queryParams.set('languageCode', 'en-US');
      queryParams.set('key', process.env.GOOGLE_API_KEY || '');
      const response = await fetch(
        `https://factchecktools.googleapis.com/v1alpha1/claims:search?${queryParams}`,
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      const result = await response.json();

      if (result.error) throw new Error(result.error.message);

      const claims = result.claims.map((claim: any) => {
        const {
          claimReview: [
            {
              publisher: { name: publisherName, site: publisherSite },
              ...claimReviewContent
            },
          ],
          ...claimant
        } = claim;
        return {
          ...claimReviewContent,
          publisherName,
          publisherSite,
          ...claimant,
        };
      });
      return claims;
    },
  },
};
