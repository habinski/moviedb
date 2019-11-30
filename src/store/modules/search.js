export default {
    actions: {
        async fetchSearch(ctx, { search }) {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=6b776a3a940ec5542bf489cd16b7b5e5&language=en-US&query=${search}&page=1`
            );
            return await res.json()
        }
    }
}