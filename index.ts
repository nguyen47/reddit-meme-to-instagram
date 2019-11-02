import { getRandomPostFromSubredditMeme } from "./src/reddit";
import { postImageToInstagram } from "./src/instagram";

const fs = require("fs");
const download = require("download");
const path = require("path");
const Jimp = require("jimp");

(async function() {
  // Get Date time to log
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  const randomReddit = await getRandomPostFromSubredditMeme();
  const url = randomReddit.url;
  const name = randomReddit.name;
  const description = `${randomReddit.title} \nAuthor: ${randomReddit.author.name}`;

  // The Instagram Private API just allow the .jpg.
  if (url.split(".").pop() == "jpg") {
    const downloadImage = await download(url);
    await fs.writeFileSync(`./images/${name}.jpg`, downloadImage);
    const readJpg = await Jimp.read(`./images/${name}.jpg`);
    // The Instagram Private APi aspect the ratio
    await readJpg.resize(500, 500, Jimp.RESIZE_BEZIER);
    await postImageToInstagram(`./images/${name}.jpg`, description);
    // Delete the image after upload
    fs.unlinkSync(path.join(`images/${name}.jpg`));
    console.log(`Posted status at ${dateTime}`);
  } else {
    const downloadImage = await download(url);
    await fs.writeFileSync(`./images/${name}.png`, downloadImage);
    // Convert PNG to JPG and Resize before upload
    const readPng = await Jimp.read(`./images/${name}.png`);
    await readPng
      .resize(500, 500, Jimp.RESIZE_BEZIER)
      .writeAsync(`./images/${name}.jpg`);
    await postImageToInstagram(`./images/${name}.jpg`, description);
    // Delete all files
    fs.unlinkSync(path.join(`images/${name}.jpg`));
    fs.unlinkSync(path.join(`images/${name}.png`));
    console.log(`Posted status at ${dateTime}`);
  }
})();
