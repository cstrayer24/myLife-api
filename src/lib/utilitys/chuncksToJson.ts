export default function chuncksToJson(chuncks: Buffer[]) {
  const chunckStr = Buffer.concat(chuncks).toString();

  return JSON.parse(chunckStr);
}
