<template>
	<base-nav
		class="navbar-top navbar-light bg-white d-none d-md-block position-sticky"
		style="z-index: 1000"
		id="navbar-main"
		:show-toggle-button="false"
		expand
	>
		<template slot="brand">
			<router-link class="font-weight-700" to="/">
				<span class="text-primary"
					>Welcome
					{{ user ? user.full_name.split(" ")[0] : null }}!</span
				>
			</router-link>
		</template>
<!-- 
		<form class="navbar-search form-inline mr-3 d-none d-lg-flex mx-lg-auto">
			<base-input
				placeholder="Search"
				class="input-group-alternative rounded border-0 bg-light"
				addon-left-icon="fas fa-search text-primary"
			>
			</base-input>
		</form> -->
		<ul class="navbar-nav align-items-center d-none d-md-flex ml-auto">
			<li class="nav-item">
				<base-button type="secondary" size="sm" class="px-4 mx-2 shadow-none"
					>Upgrade</base-button
				>
			</li>


			<li class="nav-item">
				<base-button
					type="light"
					class="mx-1 shadow-none"
					size="sm"
					icon="fas fa-bell text-primary"
				></base-button>
			</li>

			<li class="nav-item dropdown">
				<base-dropdown
					class="nav-link pr-0"
					id="dropdown-1"
					menuClasses=" dropdown-menu-right dropdown-menu-arrow"
				>
					<div class="media align-items-center" slot="title">
						<span
							class="avatar avatar-sm rounded-circle"
							style="height: 28px; width: 28px"
						>
							<img
								alt="Image placeholder"
								:src="
									user
										? (user.profile_img ? user.profile_img : '/img/theme/default-avatar.jpg')
										: '/img/theme/default-avatar.jpg'
								"
							/>
						</span>
					</div>

					<template>
						<div class="dropdown-header">
							<p class="text-default text-capitalize mb-0">
								{{ currentWorkspace ? currentWorkspace.name : (user ? user.full_name : '')  }}
							</p>
						</div>
						<div class="dropdown-divider"></div>
						<li class="dropdown-item">
							<router-link to="/profile">
								<span class="text-secondary">Upgrade</span>
							</router-link>
						</li>
						<li class="dropdown-item">
							<router-link to="/account/profile">
								<span class="text-dark">Edit Profile</span>
							</router-link>
						</li>

						<base-dropdown
							class="dropdown-item dropleft"
							menuClasses="dropdown-menu-right submenu"
						>
							<a class="" slot="title">
								<span>More Options <i class="ml-5 fa fa-caret-right"></i></span
							></a>
							<a class="dropdown-item" href="#">Create new workspace</a>
							<a class="dropdown-item" href="#">Leave workspace</a>
							<base-dropdown
								class="dropdown-item dropleft"
								menuClasses="dropdown-menu-right submenu"
							>
								<a class="" slot="title">
									<span>Transfer workspace ownership</span></a
								>
								<a class="dropdown-item" href="#">Create new workspace</a>
								<a class="dropdown-item" href="#">Leave workspace</a>
								<a class="dropdown-item" href="#"
									>Transfer workspace ownership</a
								>
								<a class="dropdown-item" href="#">Invite collaborators</a>
							</base-dropdown>
							<a class="dropdown-item" href="#">Invite collaborators</a>
						</base-dropdown>
						<li class="dropdown-item">
							<router-link to="/account/settings">
								<span class="text-dark">Settings</span>
							</router-link>
						</li>
						<li class="dropdown-item">
							<a @click="logout()">
								<span class="text-danger">Logout</span>
							</a>
						</li>
					</template>
				</base-dropdown>
			</li>
		</ul>
	</base-nav>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
	data() {
		return {
			activeNotifications: false,
			showMenu: false,
			searchQuery: "",
		};
	},
	computed: {
		...mapGetters("auth", ["user"]),
		...mapGetters("workspace", ["currentWorkspace"]),
	},
	methods: {
		toggleSidebar() {
			this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
		},
		hideSidebar() {
			this.$sidebar.displaySidebar(false);
		},
		toggleMenu() {
			this.showMenu = !this.showMenu;
		},
		logout() {
			this.$store.dispatch("auth/logout");
			this.$router.push("/login");
			this.$notify({
				type: "success",
				message: "Session Logout",
				icon: "fa fa-check",
			});
		},
	},
};
</script>
<style lang="scss" >
input.form-control {
	margin-top: -0.25rem !important;
	margin-bottom: -0.25rem !important;
}
.dropdown-item.active,
.dropdown-item:active {
	color: unset !important;
	text-decoration: none;
	background-color: #fff !important;
}
</style>
