<template>
    <Form
        @submit="submitMovie"
        :validation-schema="movieFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên phim</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="movieLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="time">Thời lượng</label>
            <Field
                name="time"
                type="text"
                class="form-control"
                v-model="movieLocal.time"
            />
            <ErrorMessage name="type" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="type">Thể loại</label>
            <Field
                name="type"
                type="text"
                class="form-control"
                v-model="movieLocal.type"
            />
            <ErrorMessage name="type" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="plusPoint">Điểm cộng</label>
            <Field
                name="plusPoint"
                type="text"
                class="form-control"
                v-model="movieLocal.plusPoint"
            />
            <ErrorMessage name="plusPoint" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="minusPoint">Điểm trừ</label>
            <Field
                name="minusPoint"
                type="text"
                class="form-control"
                v-model="movieLocal.minusPoint"
            />
            <ErrorMessage name="minusPoint" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="movieLocal.favorite"
            />
            <label for="favorite" class="form-check-label">
                <strong>Review phim yêu thích</strong>
            </label>
        </div>

        <div>
            <p>
                Quay lại trang <router-link to="/moviereview"
                >review phim</router-link
            >
          </p>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="movieLocal._id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="deleteMovie"
            >
                Xóa
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:movie", "delete:movie"],
    props: {
        movie: { type: Object, required: true }
    },
    data() {
        const movieFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(100, "Tên có nhiều nhất 100 ký tự."),
            time: yup
                .string()
                .required("Thời lượng phải có giá trị.")
                .min(3, "Thời lượng phải ít nhất 3 ký tự.")
                .max(30, "Thời lượng có nhiều nhất 30 ký tự."),
            type: yup
                .string()
                .required("Thể loại phải có giá trị.")
                .min(2, "Thể loại phải ít nhất 2 ký tự.")
                .max(50, "Thể loại có nhiều nhất 20 ký tự."),
            plusPoint: yup
                .string()
                .required("Điểm cộng phải có giá trị.")
                .min(2, "Điểm cộng phải ít nhất 2 ký tự.")
                .max(100, "Điểm cộng có nhiều nhất 100 ký tự."),
            minusPoint: yup
                .string()
                .required("Điểm trừ phải có giá trị.")
                .min(2, "Điểm trừ phải ít nhất 2 ký tự.")
                .max(100, "Điểm trừ có nhiều nhất 100 ký tự."),
        });
        return {
            movieLocal: this.movie,
            movieFormSchema,
        };
    },
    methods: {
        submitMovie() {
            this.$emit("submit:movie", this.movieLocal);
        },
        deleteMovie() {
            this.$emit("delete:movie", this.movieLocal.id);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>