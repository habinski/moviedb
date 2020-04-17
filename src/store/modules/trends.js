export default {
    actions: {
        async fetchTrends(ctx, { selectType, type, selectRegion, page }) {
            if (selectRegion.length === 2) { selectRegion = `&region=${selectRegion}` } else { selectRegion = '' }
            // selectType = selectType.replace(/ /g, "_");
            const res = await fetch(
                `https://api.themoviedb.org/3/${type}/${selectType}?api_key=6b776a3a940ec5542bf489cd16b7b5e5${selectRegion}&page=${page}`
            );
            return await res.json()
        }
    }
}