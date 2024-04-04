export type Playlist = {
  name: string
  visibility: string
  videos: string[]
}

export type Piped = {
  playlists: Playlist[]
};
