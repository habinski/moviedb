export default {
    actions: {
        async fetchInfo(ctx, { media_type, id, get }) {
            const res = await fetch(
                `https://api.themoviedb.org/3/${media_type}/${id}/${get}?api_key=6b776a3a940ec5542bf489cd16b7b5e5&language=en-US`
            );
            return await res.json()
        }
    }
}