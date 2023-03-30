const makeAPICall = require('./makeAPICall');
const exportToJSON = require('./exportToJSON');

let curriculumData = {};
async function start() {

  // Fetch Board Info
  const boardInfo = await makeAPICall.getGroup('/get-my-groups');
  curriculumData = boardInfo.groups;

  // Iterate over the board info and fetch the class for each board
  for (let i = 0 ; i < curriculumData.length ; i++) {

    console.log(`Fetching classes for board: ${curriculumData[i].name}`);
    const grades = (await makeAPICall.getGroup(`/get-info?group_id=${curriculumData[i]._id}`)).subGroups;

    // Iterate over each class and fetch Subject for each class
    for (let j = 0; j < grades.length; j++) {

      console.log(`Fetching subject for class: ${grades[j].name}`);
      const subjects = (await makeAPICall.getGroup(`/get-info?group_id=${grades[j]._id}`)).subGroups;

      // Iterate over each subject and fetch each chapter for the subject
      for (let k = 0; k < subjects.length; k++) {

        console.log(`Fetching chapters for subject: ${subjects[k].name}`);
        const chapters = (await makeAPICall.getGroup(`/get-info?group_id=${subjects[k]._id}`)).subGroups;

        // Iterate over each chapter and fetch all topics for the chapter
        for (let l = 0; l < chapters.length; l++) {

          console.log(`Fetching topics for chapter: ${chapters[l].name}`);
          const topics = (await makeAPICall.getGroup(`/get-info?group_id=${chapters[l]._id}`)).topics;

          // Iterate over each topic and fetch content for the topic
          for (let m = 0; m < topics.length; m++) {
            console.log(`Fetching content for topic: ${topics[m].name}`);
            topics[m].content = await makeAPICall.getContent(topics[m]._id);
          }
          chapters[l].topics = topics;
        }
        subjects[k].chapters = chapters;
      }
      grades[j].subjects = subjects;
    }

    curriculumData[i].grades = grades;
  }
  exportToJSON.writeToFile(JSON.stringify(curriculumData));
}
start();
