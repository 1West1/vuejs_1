
let app = new Vue({
	el: "#app",
	data: {
		users: [],
		search: "",
		moreLessDate: true,
		moreLessProgress: true,
		activeDate: false,
		activeProgress: false,
		clearFilterButton: false,
		userIndex: "",
		pageNumber: 0,
		size: 5,
	},
	beforeCreate() {
		axios.get("https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users")
			.then(res => {
				this.users = res.data;
				console.log(this.users);
			});
	},
	watch: {
		search: function(e) {
			if(e) {
				this.clearFilterButton = true;
			} else if (e === "") {
				this.clearFilterButton = false;
			}
		}
	},
	computed: {
		getSearchUsersName() {
			let reg = new RegExp(this.search, "i");
			console.log(this.size);
			const start = this.pageNumber * this.size,
            	  end = start + this.size;
			
			return this.users.filter(user => reg.test(user.username) || reg.test(user.email)).slice(start, end);
		},
		pageCount() {
			let lengthData = this.users.length,
				sizeData = this.size;
			return Math.ceil(lengthData/sizeData);
		}
	},
	methods: {
		clearSearch(e) {
			this.search = "";
			this.activeProgress = false;
			this.activeDate = false;
			this.clearFilterButton = false;
			this.users.sort(function(a, b) {
				if (a.id > b.id) return 1;
  				if (a.id == b.id) return 0;
  				if (a.id < b.id) return -1;
			})
		},
		sortDate(e) {
			this.activeProgress = false;
			this.activeDate = true;
			this.clearFilterButton = true;

			if (this.moreLessDate) {
				this.moreLessDate = false;
				this.users.sort(function(a, b) {
					return new Date(b.registration_date) - new Date(a.registration_date)
				});
			} else {
				this.moreLessDate = true;
				this.users.sort(function(a, b) {
					return new Date(a.registration_date) - new Date(b.registration_date)
				});
			}
		},
		sortProgress(e) {
			this.activeDate = false;
			this.activeProgress = true;
			this.clearFilterButton = true;

			if (this.moreLessProgress) {
				this.moreLessProgress = false;
				this.users.sort(function(a, b) {
					if (a.rating > b.rating) return 1;
	  				if (a.rating == b.rating) return 0;
	  				if (a.rating < b.rating) return -1;
				});			
			} else {
				this.moreLessProgress = true;
				this.users.sort(function(a, b) {
					if (a.rating < b.rating) return 1;
	  				if (a.rating == b.rating) return 0;
	  				if (a.rating > b.rating) return -1;
				});	
			}
		},
		viewModal(index) {
			this.userIndex = index;
		},
		deleteUser() {
			this.users.splice(this.userIndex, 1);
		},
		prevPage() {
			this.pageNumber--;
		},
		nextPage(){
        	this.pageNumber++;
      	},

	}
});