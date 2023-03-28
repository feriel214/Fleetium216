<script>
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

export default {
  name: 'Summary',
  components: { Layout, PageHeader},
  data(){},
  mounted() {},
  methods: {}
}
</script>

<style>

</style>

<template>
  <Layout>
    <PageHeader   />
      <div id="summary">
          <h1>Hello in Summary </h1>
      </div>


    <!--    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mt-0 mb-1">Top 10 Drivers</h4>
            <p class="text-muted font-13 mb-4"></p>
            <div class="row mb-md-2">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select
                    >&nbsp;entries
                  </label>
                </div>
              </div>
            
              <div class="col-sm-12 col-md-6">
                <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-right"
                >
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
             
            </div>
          
            <div class="table-responsive mb-0">
              <b-table
                :items="tableData"
                :fields="fields"
                responsive
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template #cell(score)="row">
                  {{ row.item.score }} /10
                  <span style="color: blue">
                    <i v-if="row.item.score > 5" class="uil uil-smile-beam"></i>
                  </span>
                  <span style="color: green">
                    <i v-if="row.item.score == 5" class="uil uil-meh-alt"></i>
                  </span>
                  <span style="color: red">
                    <i v-if="row.item.score < 5" class="uil uil-sad-squint"></i>
                  </span>
                </template>
                <template #cell(actions)="row">
                  <button
                    v-if="index1 != row.index"
                    type="button"
                    class="btn btn-show"
                    @click="showStatistics(row.item, row.index)"
                  >
                    Show statistics
                  </button>
                  <button
                    v-if="index1 == row.index"
                    type="button"
                    class="btn btn-hide"
                    @click="HideStatistics(true)"
                  >
                    Hide statistics
                  </button>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-right"
                >
                  <ul class="pagination pagination-rounded mb-0">
                  
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
 
 <!-- 	<div class="row">
			<div
				v-for="stat of statChart"
				:key="stat.mainTitle"
				class="col-md-6 col-xl-3"
			>
				<StatChart
					:main-title="stat.mainTitle"
					:value="stat.value"
					:sub-value="stat.subValue"
					:chart-color="stat.chartColor"
				/>
			</div>
		</div>
    <div class="row">
      <div
        v-for="stat of statChart"
        :key="stat.mainTitle"
        class="col-md-6 col-xl-4"
      >
        <StatChart
          :main-title="stat.mainTitle"
          :value="stat.value"
          :sub-value="stat.subValue"
          :chart-color="stat.chartColor"
          :image="stat.image"
        />
      </div>
    </div> -->
<!-- 
    <div class="row">
     <div class="col-xl-3">
				<Overview :items="overviewData" />
			</div>
      	<div class="col-xl-3">
				<div class="card">
					<div class="card-body pb-0">
						<h5 class="card-title header-title">Top 10 Nature Friend</h5>
					
						<div class="mt-3">
							<apexchart
								type="bar"
								height="282"
								:series="targetsBarChart.series"
								:options="targetsBarChart.chartOptions"
							></apexchart>
						</div>
					
					</div>
				</div>
			</div>  -->
  <!--     <div class="col-xl-6">
				
						<apexchart
							height="380"
							type="bar"
							class="apex-charts"
							:series="basicBarChart.series"
							:options="basicBarChart.chartOptions"
						></apexchart>
					
			</div>
    </div> -->
 
 
  </Layout>
</template>
