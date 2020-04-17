export default {
    actions: {
        async fetchGenre(ctx, { media_type }) {
            const res = await fetch(
                `https://api.themoviedb.org/3/genre/${media_type}/list?api_key=6b776a3a940ec5542bf489cd16b7b5e5&language=en-US`
            );
            return await res.json()
        }
    }
}