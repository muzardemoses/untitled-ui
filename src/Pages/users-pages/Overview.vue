<template>
  <div class="px-8 pt-8 pb-12 flex flex-col gap-7 w-full">
    <h1 class="text-gray-900 font-semibold text-3xl">Users</h1>
    <hr class="border-gray-200" />
    <div class="w-full border border-gray-200 rounded-xl">
      <table class="table-auto text-left w-full rounded-xl shadow-sm">
        <thead class="  ">
          <tr
            class="border-b-gray-200 border-b font-medium text-xs text-gray-600 bg-gray-50 rounded"
          >
            <th class="py-3.5 pl-6 rounded-tl-xl">Name</th>
            <th class="py-3.5 pl-6">Date Joined</th>
            <th class="py-3.5 pl-6 rounded-tr-xl">Last Login</th>
          </tr>
        </thead>
        <tbody v-for="user in users" :key="user.id">
          <tr
            class="border-b-gray-200 border-b"
            style="
              background-color: #f6f8ff;
              box-shadow: 0 16px 30px -10px rgba(70, 96, 187, 0.2);
            "
          >
            <td class="py-4 pl-6 rounded-bl-xl">
              <router-link
                :to="{ name: 'Profile', params: { username: user.username } }"
                class="flex gap-5 items-center borer-gray-200 border w-96 p-3 rounded-lg border-gray-100 bg-white"
              >
                <img
                  :src="
                    user.photoURL
                      ? user.photoURL
                      : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                  "
                  alt="avatar"
                  class="h-20 w-20 rounded-lg"
                />
                <div>
                  <h1 class="text-gray-900 font-semibold text-lg capitalize">
                    {{ user.displayName ? user.displayName : "" }}
                    <span v-if="user.admin" class="relative" title="Admin">
                      <img
                        src="../../assets/profileIcons/admin-tag.svg"
                        alt="admin"
                        class="h-6 w-6 inline-block"
                        title="Admin"
                      />
                      <p
                        class="absolute top-1 left-2 text-xs font-semibold text-white"
                      >
                        A
                      </p>
                    </span>
                    <span
                      v-if="user.email === me.email"
                      class="text-gray-400 font-normal text-sm"
                      >(you)</span
                    >
                  </h1>
                  <h1 class="text-gray-600 font-normal text-sm">
                    @{{ user.username }}
                  </h1>
                </div>
              </router-link>
            </td>
            <td class="pl-6">
              <h3 class="">
                {{
                  new Date(user.createdAt.seconds * 1000).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )
                }}
              </h3>
            </td>

            <td class="pl-6 border-br-xl">
              {{
                user.lastLogin
                  ? formatDistanceToNow(
                      new Date(user.lastLogin.seconds * 1000)
                    ) + " ago"
                  : "loading.."
              }}
              <!-- <span v-if="user.online" class="text-green-500">Online</span> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatDistanceToNow } from "date-fns";
import { getDoc } from "@firebase/firestore";
import devAvatar from "@/assets/dashboardIcons/avatar-default.png";

export default {
  computed: {
    ...mapState(["user", "users"]),
    //set me as user
    me() {
      return this.user;
    },
  },
  methods: {
    formatDistanceToNow,
  },
};
</script>

<style scoped>
.table-auto {
  width: 100%;
  border-collapse: collapse;
}
</style>
