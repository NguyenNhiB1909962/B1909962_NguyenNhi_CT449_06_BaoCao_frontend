<script>
export default {
    props: {
        movies: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <ul class="list-group" style="color: #000;">
        <li
            class="list-group-item"
            v-for="(movie, index) in movies"
            :key="movie._id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
            {{ movie.name }}
        </li>
    </ul>
</template>
