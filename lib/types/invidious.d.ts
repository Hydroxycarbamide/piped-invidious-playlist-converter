export type Playlist = {
  title: string
  description: string
  privacy: string
  videos: string[]
}

export type Invidious = {
  playlists: Playlist[]
};

