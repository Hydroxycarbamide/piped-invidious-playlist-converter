import type { Invidious, Playlist as InvidiousPlaylist } from "./types/invidious";
import type { Piped, Playlist as PipedPlaylist } from "./types/piped";

const URL_PREFIX = "https://youtube.com/watch?v=";

const pipedToInvidious = (piped: Piped): Invidious => {
  const invidious: Invidious = {
    playlists: piped.playlists.map((playlist: PipedPlaylist) => ({
      title: playlist.name,
      description: "",
      privacy: playlist.visibility,
      videos: playlist.videos.map(url => url.substring(URL_PREFIX.length)),
    } as InvidiousPlaylist))
  };

  return invidious;
}

const invidiousToPiped = (invidious: Invidious) => {
  const piped: Piped = {
    playlists: invidious.playlists.map((playlist: InvidiousPlaylist) => ({
      name: playlist.title,
      description: "",
      visibility: playlist.privacy,
      videos: playlist.videos.map(url => url.substring(URL_PREFIX.length)),
    } as PipedPlaylist))
  };

  return piped;
}


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
