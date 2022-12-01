<template>
  <div v-if="user" class="page p-2" style="background-color: white; color: black;">
      <h4>Đăng Ký</h4>
      <hr>
      <RegisteredForm
          :user="user"
          @submit:user="addUser"
      />
      <p>{{ message }}</p>
  </div>
</template>

<script>
import RegisteredForm from "@/components/RegisteredForm.vue";
import UserService from "@/services/user.service";
export default {
  components: {
    RegisteredForm,
  },
  data() {
      return {
          user: {},
          message: "",
      };
  },
  methods: {
      async addUser(data) {
          try {
              await UserService.create(this.user);
              this.message = "Đã đăng ký thành công.";
          } catch (error) {
              console.log(error);
          }
      },
  },
};
</script>