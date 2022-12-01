<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4 style="color: aqua;">
                Review Phim
                <i class="far fa-list-alt"></i>
            </h4>
            <MovieList
                v-if="filteredMoviesCount > 0"
                :movies="filteredMovies"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có review phim nào.</p>

            <div class="mt-4 row justify-content-end align-items-center pr-3">
                <button class="btn btn-sm btn-success" @click="goToAddMovie">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <p>&nbsp;</p>
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllMovies"
                >
                    <i class="fas fa-trash-alt"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeMovie">
                <h4 style="color: aqua">
                Chi tiết Phim
                <i class="far fa-laugh"></i>
                </h4>
                <MovieCard :movie="activeMovie" />
                <router-link
                    :to="{
                        name: 'movie.edit',
                        params: { id: activeMovie._id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span
                    >
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import MovieCard from "@/components/MovieCard.vue";
    import InputSearch from "@/components/InputSearch.vue";
    import MovieList from "@/components/MovieList.vue";
    import MovieService from "@/services/movie.service";
    export default {
        components: {
            MovieCard,
            InputSearch,
            MovieList,
        },

        name: 'moviereview',

    data() {
        return {
            movies: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        movieStrings() {
            return this.movies.map((movie) => {
                const { name, type, time, plusPoint, minusPoint } = movie;
                return [name, type, time, plusPoint, minusPoint].join("");
            });
        },
        filteredMovies() {
            if (!this.searchText) return this.movies;
            return this.movies.filter((_movie, index) =>
                this.movieStrings[index].includes(this.searchText)
            );
        },
        activeMovie() {
            if (this.activeIndex < 0) return null;
            return this.filteredMovies[this.activeIndex];
        },
        filteredMoviesCount() {
            return this.filteredMovies.length;
        },
    },
    methods: {
        async retrieveMovies() {
            try {
                this.movies = await MovieService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveMovies();
            this.activeIndex = -1;
        },
        async removeAllMovies() {
            if (confirm("Bạn muốn xóa tất cả review phim?")) {
                try {
                    await MovieService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddMovie() {
            this.$router.push({ name: "movie.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>
