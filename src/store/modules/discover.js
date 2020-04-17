export default {
    actions: {
        async discover(ctx, { media_type, sort_by, page, min_year, max_year, vote_count, vote_average, geners }) {
            if (media_type == 'tv') {

            }
            const res = await fetch(
                `https://api.themoviedb.org/3/discover/${media_type}?api_key=6b776a3a940ec5542bf489cd16b7b5e5&language=en-US&sort_by=${sort_by}&include_adult=false&include_video=false&page=${page}&primary_release_date.gte=${min_year}&primary_release_date.lte=${max_year}&first_air_date.gte=${min_year}&first_air_date.lte=${max_year}&vote_count.gte=${vote_count}&vote_average.gte=${vote_average}&with_genres=${geners}`
            );
            return await res.json()
        }
    }
}