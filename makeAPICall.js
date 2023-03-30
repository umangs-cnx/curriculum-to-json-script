const axios = require('axios');

const baseURL = 'https://graph.brightclass.com/g-api/group';
const contentURL = 'https://graph.brightclass.com/g-api/content';
const headers = {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1cmF0b3JAY3liZXJuZXR5eC5jb20iLCJpYXQiOjE1NjcwNjUyMDd9.kippKdiFSPR18kC1q4qplWs9S3AgmOUKi0Adp7iXFss'
};
class MakeAPICall {
  async makeCall(additionalUrl = '') {
    try {
      const response = await axios.get(
        baseURL + additionalUrl,
        {
          headers
        }
      );
      return response.data;
    } catch (error) {
      console.log('Error', error.statusCode, error.message);
    }
  }

  async getContent(topicId) {

    try {
      const imageContent = axios.get(
        contentURL + `/getContent?topic_id=${topicId}&type=image`,
        {
          headers
        }
      );
      const webpageContent = axios.get(
        contentURL + `/getContent?topic_id=${topicId}&type=web-page`,
        {
          headers
        }
      );
      const videoContent = axios.get(
        contentURL + `/getContent?topic_id=${topicId}&type=video`,
        {
          headers
        }
      );

      Promise.all([imageContent, webpageContent, videoContent]).then(values => {
        const imageData = values[0].data.data.content;
        const webPageData = values[1].data.data.content;
        const videoData = values[2].data.data.content;
        return {
          ...imageData,
          ...webPageData,
          ...videoData
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MakeAPICall();
