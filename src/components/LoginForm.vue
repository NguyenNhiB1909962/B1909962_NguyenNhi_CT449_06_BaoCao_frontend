<template>
    <Form
        @submit="submitUser"
        :validation-schema="userFormSchema"
    >
        <div class="form-group">
            <label for="email">Email</label>
            <Field
                name="email"
                type="email"
                class="form-control border-dark"
                v-model="userLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <label for="password">Password</label>
            <Field
                name="password"
                type="password"
                class="form-control border-dark"
                v-model="userLocal.password"
            />
            <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div>
            <p>
                Bạn chưa có tài khoản? <router-link to="/users/registered"
                >đăng ký</router-link
            >
          </p>
        </div>

        <button class="btn btn-success">Đăng Nhập</button>
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
    emits: ["submit:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Email không đúng.")
                .max(50, "Email tối đa 50 ký tự."),
            password: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(6, "Mật khẩu phải ít nhất 6 ký tự.")
                .max(60, "Mật khẩu có tối đa 50 ký tự."),
        });
        return {
            userLocal: this.user,
            userFormSchema,
        };
    },
    methods: {
        submitUser() {
            this.$emit("submit:user", this.userLocal);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>