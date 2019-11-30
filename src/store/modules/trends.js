export default {
    actions: {
        async fetchTrends(ctx, { selectType, selectTime }) {
            const res = await fetch(
                `http://api.themoviedb.org/3/trending/${selectType}/${selectTime}?api_key=6b776a3a940ec5542bf489cd16b7b5e5`
            );
            return await res.json()
        }
    }
}