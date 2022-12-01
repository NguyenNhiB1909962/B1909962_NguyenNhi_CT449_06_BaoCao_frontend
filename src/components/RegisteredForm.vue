<template>
    <Form
        @submit="submitUser"
        :validation-schema="userFormSchema"
    >
        <div class="form-group">
            <label for="name">Username</label>
            <Field
                name="name"
                type="text"
                class="form-control border-dark"
                v-model="userLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

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
            <label for="address">Địa chỉ</label>
            <Field
                name="address"
                type="text"
                class="form-control border-dark"
                v-model="userLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
      
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field
                name="password"
                type="password"
                class="form-control border-dark"
                v-model="userLocal.password"
            />
            <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="re_password">Nhập lại mật khẩu</label>
            <Field
                name="re_password"
                type="password"
                class="form-control border-dark"
                v-model="userLocal.re_password"
            />
            <ErrorMessage name="re_password" class="error-feedback" />
        </div>

        <div>
            <p>
                Bạn đã có tài khoản? <router-link to="/"
                >đăng nhập</router-link
            >
            </p>
        </div>

        <div class="form-group">
            <button class="btn btn-success">Đăng Ký</button>
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
    emits: ["submit:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(100, "Tên có nhiều nhất 100 ký tự."),
            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Email không đúng.")
                .max(50, "Email tối đa 50 ký tự."),
            address: yup
                .string()
                .max(100, "Địa chỉ tối đa 100 ký tự."),
            password: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(6, "Mật khẩu phải ít nhất 6 ký tự.")
                .max(60, "Mật khẩu có tối đa 50 ký tự."),
            re_password: yup
                .string()
                .test('So khớp mật khẩu', 'Mật khẩu không trùng khớp', function(value){
                    return this.parent.password === value
                })
                .required("Nhập lại mật khẩu phải có giá trị.")
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