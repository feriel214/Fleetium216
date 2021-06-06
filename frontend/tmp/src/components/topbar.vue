<script>
import { authComputed } from '@state/helpers'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
	components: {
		VuePerfectScrollbar,
	},
	props: {
		user: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		isMenuOpened: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {}
	},
	computed: {
		...authComputed,
	},
	methods: {
		toggleMenu() {
			this.$parent.toggleMenu()
		},
		toggleRightSidebar() {
			this.$parent.toggleRightSidebar()
		},
	},
}
</script>

<template>
	<!-- Topbar Start -->
	<div class="navbar navbar-expand flex-column flex-md-row navbar-custom">
		<div class="container-fluid">
			<!-- LOGO -->
			<a href="/" class="navbar-brand mr-0 mr-md-2 logo">
				<span class="logo-lg">
					<img src="@assets/images/logo.png" alt height="40" />
					
				</span><span class="d-inline h5 ml-2 text-logo"></span>
				<span class="logo-sm">
					<img src="@assets/images/logo.png" alt height="40" />
				</span>
			</a>

			<ul
				class="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0"
			>
				<li class>
					<button
						class="button-menu-mobile open-left disable-btn"
						:class="{ open: isMenuOpened }"
						@click="toggleMenu"
					>
						<feather type="menu" class="menu-icon align-middle"></feather>
						<feather type="x" class="close-icon"></feather>
					</button>
				</li>
			</ul>

			
		</div>
	</div>
	<!-- end Topbar -->
</template>

<style lang="scss">
.noti-scroll {
	height: 220px;
}
.ps > .ps__scrollbar-y-rail {
	width: 8px !important;
	background-color: transparent !important;
}
.ps > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps.ps--in-scrolling.ps--y > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:active > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:hover > .ps__scrollbar-y {
	width: 6px !important;
}
.button-menu-mobile {
	outline: none !important;
}
</style>
