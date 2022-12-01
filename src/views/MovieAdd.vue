<template>
    <div v-if="movie" class="page">
        <h4>Thêm Review phim</h4>
        <MovieForm
            :movie="movie"
            @submit:movie="addMovie"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import MovieForm from "@/components/MovieForm.vue";
import MovieService from "@/services/movie.service";
export default {
    components: {
        MovieForm,
    },
    data() {
        return {
            movie: {},
            message: "",
        };
    },
    methods: {
        async addMovie(data) {
            try {
                await MovieService.create(this.movie);
                this.message = "Review phim đã được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>