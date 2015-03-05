'use strict';

(function() {
	// Phonecalls Controller Spec
	describe('PhonecallsController', function() {
		// Initialize global variables
		var PhonecallsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Phonecalls controller.
			PhonecallsController = $controller('PhonecallsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one phonecall object fetched from XHR', inject(function(Phonecalls) {
			// Create sample phonecall using the Phonecalls service
			var samplePhonecall = new Phonecalls({
				from: 'jimmy',
				media: 'audio'
			});

			// Create a sample phonecalls array that includes the new phonecall
			var samplePhonecalls = [samplePhonecall];

			// Set GET response
			$httpBackend.expectGET('phonecalls').respond(samplePhonecalls);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.phonecalls).toEqualData(samplePhonecalls);
		}));

		it('$scope.findOne() should create an array with one phonecall object fetched from XHR using a phonecallId URL parameter', inject(function(Phonecalls) {
			// Define a sample phonecall object
			var samplePhonecall = new Phonecalls({
				from: 'jimmy',
				media: 'audio'
			});

			// Set the URL parameter
			$stateParams.phonecallId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/phonecalls\/([0-9a-fA-F]{24})$/).respond(samplePhonecall);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.phonecall).toEqualData(samplePhonecall);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Phonecalls) {
			// Create a sample phonecall object
			var samplePhonecallPostData = new Phonecalls({
				from: 'jimmy',
				media: 'audio'
			});

			// Create a sample phonecall response
			var samplePhonecallResponse = new Phonecalls({
				_id: '525cf20451979dea2c000001',
				from: 'jimmy',
				media: 'audio'
			});

			// Fixture mock form input values
			scope.from = 'jimmy';
			scope.media = 'audio';

			// Set POST response
			$httpBackend.expectPOST('phonecalls', samplePhonecallPostData).respond(samplePhonecallResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.from).toEqual('');
			expect(scope.media).toEqual('');

			// Test URL redirection after the phonecall was created
			expect($location.path()).toBe('/phonecalls/' + samplePhonecallResponse._id);
		}));

		it('$scope.update() should update a valid phonecall', inject(function(Phonecalls) {
			// Define a sample phonecall put data
			var samplePhonecallPutData = new Phonecalls({
				_id: '525cf20451979dea2c000001',
				from: 'jimmy',
				media: 'MEAN Rocks!'
			});

			// Mock phonecall in scope
			scope.phonecall = samplePhonecallPutData;

			// Set PUT response
			$httpBackend.expectPUT(/phonecalls\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/phonecalls/' + samplePhonecallPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid phonecallId and remove the phonecall from the scope', inject(function(Phonecalls) {
			// Create new phonecall object
			var samplePhonecall = new Phonecalls({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new phonecalls array and include the phonecall
			scope.phonecalls = [samplePhonecall];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/phonecalls\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePhonecall);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.phonecalls.length).toBe(0);
		}));
	});
}());
