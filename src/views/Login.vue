<template>
    <div v-if="user" class="page rounded p-2" style="background-color: white; color: black;">
        <h4>Đăng Nhập</h4>
        <hr>
        <LoginForm
            :user="user"
            @submit:user="LoginUser"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import UserService from "@/services/user.service";
export default {
    components: {
        LoginForm,
    },
    data() {
        return {
            user: {},
            message: "",
        };
    },
    methods: {
        async LoginUser(data) {
            console.log(data);
            try {
                this.user = await UserService.get(this.user.email);
                if(data.email == this.user.email && data.password == this.user.password)
                {
                    this.$router.push({name: "moviereview"});
                }
                this.message = "Email hoặc mật khẩu không đúng.";
            } catch (error) {
                console.log(error);
                this.message = "Tài khoản chưa được đăng ký.";
            }
        },
    },
};
</script>