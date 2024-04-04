import { pipedToInvidious } from "./lib/converter";
import type { Piped } from "./lib/types/piped";

const path = "examples/piped.json";
const output = "examples/out.json";
const file = Bun.file(path);

file.text()
  .then((text: string) => {
    const piped: Piped = JSON.parse(text);
    console.log(piped);
    const invidious = pipedToInvidious(piped);
    const outString = JSON.stringify(invidious);
    Bun.write(output, outString);
  })
