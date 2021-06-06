<script>
import Layout from '@layouts/default'
import { authMethods } from '@state/helpers'
import appConfig from '@src/app.config'

/**
 * Login component
 */
export default {
	page: {
		title: 'Fleetium216',
		meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }],
	},
	components: { Layout },
	data() {
		return {
			username: 'admin',
			password: 'password',
			authError: null,
			tryingToLogIn: false,
			isAuthError: false,
		}
	},
	computed: {
		placeholders() {
			return process.env.NODE_ENV === 'production'
				? {}
				: {
						username: 'Use "admin" to log in with the mock API',
						password: 'Use "password" to log in with the mock API',
				  }
		},
	},
	methods: {
		
		...authMethods,
		// Try to log the user in with the username
		// and password they provided.
		tryToLogIn() {
			this.tryingToLogIn = true
			// Reset the authError if it existed.
			this.authError = null
			return this.logIn({
				email: this.username,
				password: this.password,
			})
				.then((token) => {
					if(token.sign_in.length == 0){
						this.tryingToLogIn = true
						this.authError = "Error login"
						this.isAuthError = true
						return;
					}
					this.tryingToLogIn = true
					this.isAuthError = false
					// Redirect to the originally requested page, or to the home page
					this.$router.push(
						this.$route.query.redirectFrom || { name: 'Dashboard' }
					)
				})
				.catch((error) => {
					this.tryingToLogIn = false
					this.authError = error.response ? error.response.data.message : ''
					this.isAuthError = true
				})
		},
	},
}
</script>

<template>
	<Layout>
	
	<!-- 	<div class="account-pages my-5">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-xl-8">
						<div class="card">
							<div class="card-body p-0">
								<div class="row">
									<div class="col-md-12 p-5">
										<div class="mx-auto mb-5">
											<a routerLink="/">
												<img src="@assets/images/logo.png" alt height="24" />
											
											</a>
										</div>

									

										<b-alert
											v-model="isAuthError"
											variant="danger"
											dismissible
											>{{ authError }}</b-alert
										>

										<b-form
											class="authentication-form"
											@submit.prevent="tryToLogIn"
										>
											<div class="form-group">
												<div class="input-group input-group-merge">
													<div class="input-group-prepend">
														<span class="input-group-text">
															<feather
																type="mail"
																class="align-middle icon-dual"
															></feather>
														</span>
													</div>
													<b-form-input
														id="input-1"
														v-model="username"
														type="text"
														required
														placeholder="Enter username"
													></b-form-input>
												</div>
											</div>
											<div class="form-group mt-4">
												<label class="form-control-label">Password</label>
												<router-link
													to="forget-password"
													class="float-right text-muted text-unline-dashed ml-1"
													>Forgot your password?</router-link
												>
												<div class="input-group input-group-merge">
													<div class="input-group-prepend">
														<span class="input-group-text">
															<feather
																type="lock"
																class="align-middle icon-dual"
															></feather>
														</span>
													</div>
													<b-form-input
														id="password"
														v-model="password"
														type="password"
														required
														placeholder="Enter your password"
													></b-form-input>
												</div>
											</div>
											<div class="form-group mb-4">
												<div class="custom-control custom-checkbox">
													<input
														id="checkbox-signin"
														type="checkbox"
														class="custom-control-input"
														checked
													/>
													<label
														class="custom-control-label"
														for="checkbox-signin"
													>
														Remember me
													</label>
												</div>
											</div>
											<b-form-group id="button-group" class="mt-4 mb-1">
												<b-button
													type="submit"
													variant="primary"
													class="btn-block"
													>Log In</b-button
												>
											</b-form-group>
										</b-form>

									</div>

								</div>
							</div>
						
						</div>
						

						<div class="row mt-3">
							<div class="col-12 text-center">
								<p class="text-muted">
									Don't have an account?
									<router-link
										tag="a"
										to="/register"
										class="text-primary font-weight-bold ml-1"
									>
										<b>Sign Up</b>
									</router-link>
								
								</p>
							</div>
						
						</div>
						
					</div>
					
				</div>
			
			</div>
		
		</div> -->
	
		<div class="account-pages my-5">
			<div class="container" >
				<div class="row justify-content-center">
					<div class="col-xl-10">
						<div class="card">
							<div class="card-body p-0">
								<div class="row">
									<div class="col-lg-6 p-5">
										<div class="mx-auto mb-5">
											<a href="/">
												<img src="@assets/images/logo.png" alt 	  style="height: 100px;width: 250px;" />
												
											</a>
										</div>

										

									<!-- 	<form action="#" class="authentication-form">
											<div class="form-group">
												<label class="form-control-label">Name</label>
												<div class="input-group input-group-merge">
													<div class="input-group-prepend">
														<span class="input-group-text">
															<feather type="user" class="icon-dual"></feather>
														</span>
													</div>
													<input
														id="name"
														type="text"
														class="form-control"
														placeholder="Your full name"
														required
													/>
												</div>
											</div>

											<div class="form-group">
												<label class="form-control-label">Email Address</label>
												<div class="input-group input-group-merge">
													<div class="input-group-prepend">
														<span class="input-group-text">
															<feather type="mail" class="icon-dual"></feather>
														</span>
													</div>
													<input
														id="email"
														type="email"
														class="form-control"
														placeholder="hello@coderthemes.com"
													/>
												</div>
											</div>

											<div class="form-group">
												<label class="form-control-label">Password</label>
												<div class="input-group input-group-merge">
													<div class="input-group-prepend">
														<span class="input-group-text">
															<feather type="lock" class="icon-dual"></feather>
														</span>
													</div>
													<input
														id="password"
														type="password"
														class="form-control"
														placeholder="Enter your password"
													/>
												</div>
											</div>

											<div class="form-group mb-4">
												<div class="custom-control custom-checkbox">
													<input
														id="checkbox-signup"
														type="checkbox"
														class="custom-control-input"
														checked
													/>
													<label
														class="custom-control-label"
														for="checkbox-signup"
													>
														I accept
														<a href="javascript: void(0);"
															>Terms and Conditions</a
														>
													</label>
												</div>
											</div>

											<div class="form-group mb-0 text-center">
												<button class="btn btn-primary btn-block" type="submit"
													>Sign Up</button
												>
											</div>
										</form> -->
									
									
									
								
										<b-form
										    style="margin-top:100px;"
											class="authentication-form"
											@submit.prevent="tryToLogIn"
										>
											<div class="form-group">
												<div class="input-group input-group-merge">
													<div class="input-group-prepend">
														<span class="input-group-text">
															<feather
																type="mail"
																class="align-middle icon-dual"
															></feather>
														</span>
													</div>
													<b-form-input
														id="input-1"
														v-model="username"
														type="text"
														required
														placeholder="Enter username"
													></b-form-input>
												</div>
											</div>
											<div class="form-group mt-4">
												<label class="form-control-label">Password</label>
												
												<div class="input-group input-group-merge">
													<div class="input-group-prepend">
														<span class="input-group-text">
															<feather
																type="lock"
																class="align-middle icon-dual"
															></feather>
														</span>
													</div>
													<b-form-input
														id="password"
														v-model="password"
														type="password"
														required
														placeholder="Enter your password"
													></b-form-input>
												</div>
												<router-link
													to="forget-password"
													class="float-right text-muted text-unline-dashed ml-1"
													>Forgot your password?</router-link
												>
											</div>
											<div class="form-group mb-4">
												<div class="custom-control custom-checkbox">
													<input
														id="checkbox-signin"
														type="checkbox"
														class="custom-control-input"
														checked
													/>
													<label
														class="custom-control-label"
														for="checkbox-signin"
													>
														Remember me
													</label>
												</div>
											</div>
											<b-form-group id="button-group" class="mt-4 mb-1">
												<b-button
												style="margin-top:50px;"
													type="submit"
													variant="primary"
													class="btn-block"
													>Log In</b-button
												>
											</b-form-group>
										</b-form>
									</div>

									<div class="col-lg-6 d-none d-md-inline-block">
										<div class="auth-page-sidebar">
									
										
												<a href="/">
												<img src="@assets/images/tracking.jpg" alt style="width:600px;height:600px;" />
												
											</a>
										
										</div>
									</div>
								</div>
							</div>
							<!-- end card-body -->
						</div>
						<!-- end card -->

				
						<!-- end row -->
					</div>
					<!-- end col -->
				</div>
				<!-- end row -->
			</div>
			<!-- end container -->
		</div>
	</Layout>
</template>

<style scoped>

.btn-primary {
    color: #fff;
    background-color: #7ed957!important;
    border-color: #7ed957!important;
}
.custom-control-label::after {
    background-color: #7ed957!important;}
</style>
