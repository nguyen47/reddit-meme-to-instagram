const snoowrap = require("snoowrap");
import "dotenv/config";

const r = new snoowrap({
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  refreshToken: process.env.refreshToken
});

export async function getRandomPostFromSubredditMeme() {
  return await r.getSubreddit("meme").getRandomSubmission();
}
