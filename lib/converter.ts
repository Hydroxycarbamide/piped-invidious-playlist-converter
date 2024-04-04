import type { Invidious, Playlist as InvidiousPlaylist } from "./types/invidious";
import type { Piped, Playlist as PipedPlaylist } from "./types/piped";

const URL_PREFIX = "https://youtube.com/watch?v=";

export const pipedToInvidious = (piped: Piped): Invidious => {
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

export const invidiousToPiped = (invidious: Invidious) => {
  const piped: Piped = {
    playlists: invidious.playlists.map((playlist: InvidiousPlaylist) => ({
      name: playlist.title,
      visibility: playlist.privacy,
      videos: playlist.videos.map(url => url.substring(URL_PREFIX.length)),
    } as PipedPlaylist))
  };

  return piped;
}
