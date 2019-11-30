export default {
    actions: {
        async fetchFullInfo(ctx, { media_type, id }) {
            const res = await fetch(
                `https://api.themoviedb.org/3/${media_type}/${id}?api_key=6b776a3a940ec5542bf489cd16b7b5e5&language=en-US`
            );
            return await res.json()
        }
    }
}