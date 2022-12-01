<template>
    <div v-if="movie" class="page">
        <h4>Hiệu chỉnh Review phim</h4>
        <MovieForm
            :movie="movie"
            @submit:movie="updateMovie"
            @delete:movie="deleteMovie"
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            movie: null,
            message: "",
        };
    },
    methods: {
        async getMovie(id) {
            try {
                this.movie = await MovieService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateMovie(data) {
            try {
                await MovieService.update(this.movie._id, data);
                this.message = "Review phim được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteMovie() {
            if (confirm("Bạn muốn xóa Review phim này?")) {
                try {
                    await MovieService.delete(this.movie._id);
                    this.$router.push({ name: "moviereview" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getMovie(this.id);
        this.message = "";
    },
};
</script>