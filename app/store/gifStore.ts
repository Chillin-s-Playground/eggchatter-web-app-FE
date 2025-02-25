import { create } from "zustand";

interface GifStore {
    gif_urls: string[];
    addGifUrl: (url: string) => void; 
    resetGifUrls: () => void
}

export const useGifStore = create<GifStore>((set) => ({
    gif_urls: [], 
    addGifUrl: (url: string | string[]) => set((state) => ({
        gif_urls: Array.isArray(url)
            ? [...state.gif_urls, ...url.filter(item => !state.gif_urls.includes(item))]
            : state.gif_urls.includes(url)
            ? state.gif_urls
            : [...state.gif_urls, ...url],
    })),
    resetGifUrls: () => set({ gif_urls: [] })
}));
