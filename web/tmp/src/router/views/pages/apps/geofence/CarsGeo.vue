<script>
import axios from 'axios'
export default {
  name: 'CarsGeofence',
  components: {},
 	data() {
		return {
			tableData: [],
			title: 'List Cars In Fence',
			items: [
				{
					text: 'Shreyu',
					href: '/',
				},
				{
					text: 'Icons',
					href: '/',
				},
				{
					text: 'Advanced',
					active: true,
				},
			],
			totalRows: 1,
			currentPage: 1,
			perPage: 10,
			pageOptions: [10, 25, 50, 100],
			filter: null,
			filterOn: [],
			sortBy: 'age',
			sortDesc: false,
			fields: [
                { key: 'pkey', label:'ID', sortable: true ,  editable: true },
				{ key: 'name', label:'Name',sortable: true , editable: true},
				{ key: 'description',label:'Descreption', sortable: true , editable: true},
				{ key: 'time_start',label:'Time Start', sortable: true , editable: true},
				{ key: 'time_end', label:'Time End',sortable: true , editable: true},
				{ key: 'rang', label:'Range',sortable: true , editable: true},
				{ key: 'car',label:'Car', sortable: true , editable: true},
                { key: 'actions', label: 'Actions' }
			],
			
		}
	},
	computed: {
		/**
		 * Total no. of records
		 */
		rows() {
			return this.tableData.length
		},
        editableFields() {
        return this.fields.filter(field => { return field.editable === true })
      }
        
	},
	async mounted() {
		// Set the initial number of items
		this.totalRows = this.items.length
         await this.getGeo();
	},
	methods: {
		/**
		 * Search the table data with search input
		 */
		onFiltered(filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length
			this.currentPage = 1
		},
        async getGeo(){
            axios.get('http://localhost:3000/api/get/geofence')
            .then((response)=>{
                console.log('list of cars in fences ',response);
                this.tableData=response.data;
            }).catch(function(error){
                console.log(error);
            })
        },
        Edit(id,item){
			this.$set(item, 'temp', item)
            this.$set(item, 'editing', true)
            /* axios.put(`http://localhost:3000/api/edit/geocars/${id}`,data)
			.then((res)=>{
				console.log("res: ",res)
			}).catch(function(error){
				console.log(error)
			}) */
        },
        Delete(id){
            this.$swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/api/delete/geofence/${id}`)
                .then((res)=>{
                    console.log(res)
                    }).catch(function(error){
                        console.log(error)
                    })
                this.$swal.fire(
                'Deleted!',
                'Car has been deleted.',
                'success'
                )
            }
        })
        
        },
        Show(id){
             axios.get(`http://localhost:3000/fences/${id}`)
			 .then((res)=>{
                console.log(res)
				let obj=res.data;
				let type=(Object.keys(obj))
				let val =(Object.values(obj))
				var arr=String(val[0]).split(',');
				let values=[]
			   	for(let i=0;i<arr.length;i++){
                   values.push(parseFloat(arr[i]))
				}
				let coordinates=[];
				for(let i = 0; i < values.length; i += 2){
                 coordinates.push([values[i] , (values[i+1])]);
                 };
				console.log('type',type)
				console.log('coordinates',coordinates)
				 //Send object to map to draw it  sharing data between components 
				if(type != null && coordinates.length>0){
				//polygon
                  var polygon = L.polygon(coordinates, {
                  color: '#00f',
                  fillOpacity: 0.3,
                  fillColor: '#c2bfed',
                }).addTo(this.lmap)
                console.log('polygon bounds ', polygon.getBounds())
                this.lmap.fitBounds(polygon.getBounds())

				//Rectangle 
				//Circle 
                }
                  
				
			 }).catch(function(error){
				 console.log(error)
			 })
        },
        doEdit(item) {
            this.$set(item, 'temp', item)
            this.$set(item, 'editing', true)
        },
        doSave(item) {
            this.$set(item, 'editing', false)
            for(let key in item.temp){
            if(item[key] != item.temp[key]){
                item[key] = item.temp[key]
            }
            }
        },
        doCancel(item) {
            this.$set(item, 'editing', false)
            this.$delete(item, 'temp')
       }
    }

  
	
}
</script>

<style>
.btn:not(:disabled):not(.disabled) {
    color: #212529;
    background-color: white;
    cursor: pointer;
    border: none;
}

</style>

<template>
         <div id="carsgeo">
         	<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<h4 class="header-title mt-0 mb-1">List Cars In Fence</h4>
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
							<!-- Search -->
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
							<!-- End search -->
						</div>
						<!-- Table -->
						<div class="table-responsive mb-0">
							
							<b-table
								:items="tableData"
								:fields="fields"
								responsive="sm"
								:per-page="perPage"
								:current-page="currentPage"
								:sort-by.sync="sortBy"
								:sort-desc.sync="sortDesc"
								:filter="filter"
								:filter-included-fields="filterOn"
								@filtered="onFiltered"
								fixed
							    >		 
									<template #cell(actions)="row"> 
								  		<b-button  @click="Edit(row.item.pkey,row.item)"><i class="uil uil-edit"></i></b-button>&nbsp;&nbsp;
										<b-button  @click="Delete(row.item.pkey)"><i class="uil uil-trash-alt"></i></b-button>&nbsp;&nbsp;
                                		<b-button  @click="Show(row.item.id)"><i class="uil uil-eye"></i></b-button>
                            	    </template>                           
                            </b-table>
						</div>
						<div class="row">
							<div class="col">
								<div
									class="dataTables_paginate paging_simple_numbers float-right"
								>
									<ul class="pagination pagination-rounded mb-0">
										<!-- pagination -->
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
		</div>
      </div>
</template>
