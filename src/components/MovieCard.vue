<script>
export default {
    props: {
        movie: { type: Object, required: true },
    },
};
</script>

<template>
    <div style="background-color: white; color: black;">
        <div class="p-1">
            <strong>Tên phim:</strong>
            {{ movie.name }}
        </div>
        <div class="p-1">
            <strong>Thời lượng:</strong>
            {{ movie.time }}
        </div>
        <div class="p-1">
            <strong>Thể loại:</strong>
            {{ movie.type }}
        </div>
        <div class="p-1">
            <strong>Điểm cộng:</strong>
            {{ movie.plusPoint }}
        </div>
        <div class="p-1">
            <strong>Điểm trừ:</strong>
            {{ movie.minusPoint }}
        </div>
        <div class="p-1">
            <strong>Yêu thích:&nbsp;</strong>
            <i v-if="movie.favorite" class="far fa-check-circle"></i>
            <i v-else class="fas fa-times-circle"></i>
        </div>
    </div>
</template>
