/* tslint:disable:no-console */
import "dotenv/config";
import { IgApiClient } from "instagram-private-api";
import * as Bluebird from "bluebird";
import { readFile } from "fs";

const ig = new IgApiClient();
async function login() {
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  const auth = await ig.account.login(
    process.env.IG_USERNAME,
    process.env.IG_PASSWORD
  );
}

export async function postImageToInstagram(path, description) {
  await login();
  const publishResult = await ig.publish.photo({
    file: await Bluebird.fromCallback(cb => readFile(path, cb)), // image buffer, you also can specify image from your disk using fs
    caption: description // nice caption (optional)
  });
}
