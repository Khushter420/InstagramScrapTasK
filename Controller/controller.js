const axios = require("axios");

exports.fetchData = async (req, res, next) => {
  try {
    let userNames = [];
    let userData = [];
    const datacollection = [];
    let config1 = {
      headers: {
        "x-requested-with": "XMLHttpRequest",
        "User-Agent": "PostmanRuntime/7.28.4",
      },
    };
    let config2 = {
      headers: {
        "x-ig-app-id": "936619743392459",
      },
    };

    for (let i = 1; i <= 30; i++) {
      let instaData = await axios(
        `https://hypeauditor.com/top/ajax/?p=${i}`,
        config1
      );
      instaData.data.result.map((item) => {
        userNames.unshift(item.basic.username);
      });
    }
    console.log(userNames, " userNames");
    for (let i = 0; i < userNames.length; i++) {
      let allData = await axios(
        `https://i.instagram.com/api/v1/users/web_profile_info/?username=${names[i]}`,
        config2
      );
      userData.push(allData.data);
    }
    let result = [];
    console.log(userData, "userData");
    for (let i = 0; i < userData.length; i++) {
      let obj = {};
      let userDetails = userData[i]["data"]["user"];
      obj.profileCategory = userDetails["category_name"];
      obj.Followers = userDetails["edge_followed_by"]["count"];
      obj.Following = userDetails["edge_follow"]["count"];
      obj.PostsCount = userDetails["edge_owner_to_timeline_media"]["count"];
      obj.Username = userDetails["username"];
      let mediaData = userDetails["edge_owner_to_timeline_media"]["edges"];
      let likesum = 0,
        commentSum = 0;
      for (let j = 0; j < mediaData.length; j++) {
        let totalLike = mediaData[j]["node"]["edge_liked_by"]["count"];
        console.log(totalLike, "totalLike");
        let totalComment =
          mediaData[j]["node"]["edge_media_to_comment"]["count"];
        likesum = likesum + totalLike;
        commentSum = commentSum + totalComment;
        if (j == 14) {
          break;
        }
      }
      obj.average15dayLike = Math.floor(likesum / 15);
      obj.average15dayComment = Math.floor(commentSum / 15);
      result.push(obj);
    }

    return res
      .status(200)
      .send({ status: 200, message: "success", result: result });
  } catch (error) {
    return res.status(500).send({'status': 500,'message': 'internal server error','error': error});
  }
};
