<template>
	<nav
		class="navbar navbar-vertical fixed-left navbar-expand-sm overflow-visible"
		style="z-index: 1000"
		:class="'bg-' + backgroundColor"
		id="sidenav-main"
	>
		<div class="container-fluid">
			<div class="align-items-center d-flex sidenav-header">
				<base-dropdown class="my-auto" menuClasses=" dropdown-menu-left">
					<div class="d-flex p-2" slot="title">
						<router-link class="navbar-brand" to="/">
							<img
								:src="logo"
								class="navbar-brand-img my-auto"
								style="height: 32px"
								alt="..."
							/>
						</router-link>
						<base-button
							type="transparent shadow-none shadow-none--hover text-white "
							style="font-size: 11.37px"
							class="dropdown-toggle w-brand"
						>
							{{ currentWorkspace ? currentWorkspace.name : 'null'  }}
						</base-button>
					</div>

					<a
						v-for="workspace in workspaces"
						:key="workspace._id"
						class="dropdown-item"
						href="#"
						>{{ workspace.name || 'NULL' }}</a
					>
					<a class="dropdown-item text-primary" href=""
						><i class="fas fa-plus"></i>Create workspace</a
					>
				</base-dropdown>
			</div>

			<!--Toggler-->
			<navbar-toggle-button @click.native="showSidebar">
				<span class="navbar-toggler-icon"></span>
			</navbar-toggle-button>

			<div class="d-none d-md-block">
				<base-button
					type="primary"
					size="sm"
					class="shadow-none position-absolute right--2 btn-icon-only"
					@click="toggleMini"
				>
					<i
						class="fa align-middle mr-0"
						:class="{ 'fa-chevron-right': mini, 'fa-chevron-left': !mini }"
					></i>
				</base-button>
			</div>
			<div class="sidenav-toggler d-none d-xl-block">
				<div class="sidenav-toggler-inner">
					<i class="sidenav-toggler-line"></i>
					<i class="sidenav-toggler-line"></i>
					<i class="sidenav-toggler-line"></i>
				</div>
			</div>

			<slot name="mobile-right">
				<ul class="nav align-items-center d-md-none">
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
									src="img/theme/team-4-800x800.jpg"
								/>
							</span>
						</div>

						<template>
							<div class="dropdown-header">
								<p class="text-default text-capitalize mb-0">
									Primus Test team
								</p>
							</div>
							<div class="dropdown-divider"></div>
							<li class="dropdown-item">
								<router-link to="/profile">
									<span class="text-secondary">Upgrade</span>
								</router-link>
							</li>

							<router-link to="/profile" class="dropdown-item">
								<span>Edit Profile</span>
							</router-link>
							<router-link to="/profile" class="dropdown-item">
								<span>More Options</span>
							</router-link>

							<router-link to="/profile" class="dropdown-item">
								<span>Settings</span>
							</router-link>
							<router-link to="/profile" class="dropdown-item">
								<span class="text-danger">Logout</span>
							</router-link>
						</template>
					</base-dropdown>
				</ul>
			</slot>

			<div
				v-show="$sidebar.showSidebar"
				class="navbar-collapse collapse show"
				id="sidenav-collapse-main"
			>
				<div class="navbar-collapse-header d-md-none">
					<div class="row">
						<div class="col-6 collapse-brand">
							<router-link to="/">
								<img :src="logoAlt || logo" />
							</router-link>
						</div>
						<div class="col-6 collapse-close">
							<navbar-toggle-button
								@click.native="closeSidebar"
							></navbar-toggle-button>
						</div>
					</div>
				</div>

				<ul class="navbar-nav mb-0 mx-1">
					<slot name="links"> </slot>
				</ul>

				<ul class="navbar-nav mb-0 mt-auto mx-1">
					<base-button size="lg" type="secondary" class="d-flex">
						<small class="text-left"> Upgrade to Premium </small>
						<small class="text-left mt-auto text-nowrap" style="font-size: 8px">
							Try Now <i class="fa fa-arrow-right"></i>
						</small>
					</base-button>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";
import {mapGetters} from 'vuex';
export default {
	name: "sidebar",
	components: {
		NavbarToggleButton,
	},
	data() {
		return {
			mini: false,
		};
	},
	props: {
		title: {
			type: String,
			default: "Primus Track Team",
			description: "Active Workspace Title",
		},
		backgroundColor: {
			type: String,
			default: "primary",
			description: "Sidebar background color",
		},
		logo: {
			type: String,
			default: "img/brand/green.png",
			description: "Sidebar app logo",
		},
		logoAlt: {
			type: String,
			default: "img/brand/green.png",
			description: "Sidebar app alt logo",
		},
		autoClose: {
			type: Boolean,
			default: true,
			description:
				"Whether sidebar should autoclose on mobile when clicking an item",
		},
	},
	provide() {
		return {
			autoClose: this.autoClose,
		};
	},
	computed: {
		...mapGetters("workspace", ["workspaces"]),
		...mapGetters("workspace", ["currentWorkspace"]),
	},
	methods: {
		closeSidebar() {
			this.$sidebar.displaySidebar(false);
		},
		showSidebar() {
			this.$sidebar.displaySidebar(true);
		},
		toggleMini() {
			if (document.body.classList.contains("sidebar-mini")) {
				document.body.classList.remove("sidebar-mini");
				this.mini = false;
			} else {
				document.body.classList.add("sidebar-mini");
				this.mini = true;
			}
		},
	},
	beforeDestroy() {
		if (this.$sidebar.showSidebar) {
			this.$sidebar.showSidebar = false;
		}
	},
};
</script>
<style lang="scss" scoped>
.btn-side {
	font-weight: 400 !important;
	color: #fff;
	background-color: #0062c4;
	border-color: #0062c4;
	text-align: center;
	vertical-align: middle;

	.nav-link-text,
	.i {
		color: #fff;
		background-color: #0062c4;
		border-color: #0062c4;
	}
}

.btn-side.active {
	font-weight: 400 !important;
	color: #0062c4;
	background-color: #fff;
	border-color: #0062c4;
	text-align: center;
	vertical-align: middle;
}
</style>