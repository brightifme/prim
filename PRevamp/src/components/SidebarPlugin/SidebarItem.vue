<template>

        <router-link
                :to="link.path"
                @click.native="linkClick"
                class="btn btn-lg btn-side shadow-none shadow-none--hover my-2 mx-0 p-2"
                :target="link.target"
                :href="link.path">
            <template>
                <i :class="link.icon" class="i-2x mr-0 align-middle"></i>
                <span class="ml-2 align-middle">{{ link.name }}</span>
            </template>
        </router-link>

</template>
<script>
  export default {
    name: 'sidebar-item',
    props: {
      link: {
        type: Object,
        default: () => {
          return {
            name: '',
            path: '',
            children: [],
          };
        },
        description:
          'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info'
      }
    },
    inject: {
      autoClose: {
        default: true
      }
    },
    data() {
      return {
        children: [],
        collapsed: true,
        mini: false,
      };
    },
    methods: {
      linkClick() {
        if (
          this.autoClose &&
          this.$sidebar &&
          this.$sidebar.showSidebar === true
        ) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
     watch: {
      
     }
  };
</script>
<style lang="scss" scoped>
.btn-side {
    font-weight: 400 !important;
    color: #fff;
    background-color: #0062C4;
    border-color: #0062C4;
    vertical-align: middle;

    .nav-link-text, i {
      color: #fff;
   
    }
}



.btn-side.active {
  font-weight: 400 !important;
    color: #0062C4;
    background-color: #fff;
    border-color: #0062C4;



     .nav-link-text, i{
      color: #0062C4;
    }
}

.i-2x {
    font-size: 2em;
}

</style>