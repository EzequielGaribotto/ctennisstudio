import realPhotos from "./behind-the-game.json"

export interface BehindPhoto {
  src: string
  width: number
  height: number
}

// Only on the local preview, so Pablo can judge the design until his own photos are added.
// In production an empty gallery means no page and no link.
const SAMPLE_PHOTOS: BehindPhoto[] = [
  { src: "/images/stringer/pablo/portada_cts.webp", width: 1200, height: 1172 },
  { src: "/images/stringer/services/racquets/equilibrado_1.webp", width: 1200, height: 1600 },
  { src: "/images/stringer/machines/babolat_machines.webp", width: 1171, height: 879 },
  { src: "/images/stringer/pablo/pablo_10_yrs_mutua_2025.webp", width: 651, height: 869 },
  { src: "/images/stringer/services/racquets/equilibrado_2.webp", width: 1200, height: 1600 },
  { src: "/images/stringer/pablo/pablo_garibotto_stringer.webp", width: 659, height: 879 },
  { src: "/images/stringer/services/racquets/equilibrado_3.webp", width: 1200, height: 1600 },
  { src: "/images/stringer/services/racquets/equilibrado_4.webp", width: 1200, height: 1600 },
]

const photos = realPhotos as BehindPhoto[]

export const BEHIND_THE_GAME_PHOTOS: BehindPhoto[] =
  photos.length > 0 ? photos : process.env.NODE_ENV === "production" ? [] : SAMPLE_PHOTOS

export const BEHIND_THE_GAME_READY = BEHIND_THE_GAME_PHOTOS.length > 0
