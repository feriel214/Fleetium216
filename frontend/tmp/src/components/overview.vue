
<script>
import Stat from './widget-stat.vue'
/**
 * Overview - a simple listing to showcase some stats or numbers
 */
export default {
	components:{Stat},
	props: {
		title: {
			type: String,
			default: 'Overview',
		},
		items: {
			type: Array,
			default: () => [],
		},
		classObject: {
			class: String
		}
	
	},
}
</script>
<template>
			<div class="row">
			<div v-for="stat of items" :key="stat.title" class="col-md-6 col-xl-4">
				<Stat
					:title="stat.title"
					:value="stat.value"
					:icon="stat.icon"
					:color="stat.color"
				/>
			</div>
		</div>
</template>
