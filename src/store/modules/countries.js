export default {
    actions: {
        async fetchCountries() {
            const res = await fetch(
                `https://api.themoviedb.org/3/configuration/countries?api_key=6b776a3a940ec5542bf489cd16b7b5e5`
            );
            return await res.json()
        }
    }
}