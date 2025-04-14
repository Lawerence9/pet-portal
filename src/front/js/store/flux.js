import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {

	const host = process.env.BACKEND_URL;


	return {
		store: {
			message: null,
			isLogged: false,
			imageRoute: "../../img/protectoras/",
			selectedCategory: "",
			user_id: '',
			sos_id: '',
			user: {},
			userRole: "",
			token: "",
			password: '',
			notice: [],
			selectedNews: [],
			animalShelter: [],
			animalShelterSelected: {},
			veterinary: [],
			veterinarySelected: {},
			adoptions: [],
			selectedAdoption: [],
			correo: {},
			sosCase: [],
			correoSeleccionado: "",
			mapDirection: {}
		},
		actions: {
			getMessage: async () => {
				const uri = `${host}/api/hello`
				const response = await fetch(uri)
				if (!response.ok) {
					console.log("Error:", response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({ message: data.message })
			},
			setMapDirection: (newUser) => { setStore({ mapDirection: newUser }) },
			setUser: (newUser) => { setStore({ user: newUser }) },
			setCorreo: (newCorreo) => { setStore({ correo: newCorreo }) },
			setCorreoSeleccionado: (newUser) => { setStore({ correoSeleccionado: newUser }) },
			setNotice: (newNotice) => { setStore({ notice: newNotice }) },
			setAnimalShelter: (newAnimalShelter) => { setStore({ animalShelter: newAnimalShelter }) },
			setAdoption: (newAdoption) => { setStore({ adoptions: newAdoption }) },
			setVeterinary: (newVeterinary) => { setStore({ veterinary: newVeterinary }) },
			setSosCase: (newSosCase) => { setStore({ sosCase: newSosCase }) },
			setDonation: (newDonation) => { setStore({ donation: newDonation }) },
			setSelectedElements: (elemento) => { setStore({ selectedElement: elemento }) },
			setIsLogged: (value) => { setStore({ isLogged: value }) },
			setiIsEditing: (valor) => { setStore({ isEditing: valor }) },
			clearSelectedNews: () => { setStore({ selectedNews: {} }) },
			setSelectedCategory: (category) => {
				const store = getStore();
				const actions = getActions();
				setStore({ selectedCategory: category });
				actions.getElements(event);
			},
			syncTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				const user = JSON.parse(localStorage.getItem("user"));
				if (token && user) {
					setStore({
						token: token,
						user: user.results.user_name,
						userRole: user.results.role,
						isLogged: true
					});
				}
			},

			login: async (dataToSend) => {

				const uri = `${host}/api/login`;
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error", response.status, response.statusText);
					return false
				}

				const data = await response.json();
				setStore({
					user: data.results.user_name,
					userRole: data.results.role,
					token: data.access_token,
					isLogged: true
				})
				localStorage.setItem("token", data.access_token);
				localStorage.setItem('user', JSON.stringify(data))
				return true
			},

			logout: async (event) => {
				const actions = getActions();
				setStore({ isLogged: false });
				setStore({ user: "" });
				setStore({ userRole: "" })
				const message = {
					text: `Se ha deslogueado con exito`,
					visible: true,
					background: 'warning'
				}
			},

			createUser: async (user) => {
				const store = getStore();
				const uri = `${host}/api/sing-up`;
				const dataToSend = {
					email: user.email,
					password: user.password,
				}
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error:", response.status, response.statusText)
					return
				}
				const data = await response.json();
				setStore({ user: data.results });
				setStore({ isLogged: "true" });
				Navigate("/home");
			},

			createNotice: async (notice) => {
				const store = getStore();
				const uri = `${host}/api/news`;
				const dataToSend = {
					user_id: store.user_id,
					title: notice.title,
					body: notice.body,
					status: notice.status,
					created_at: notice.created_at ?? new Date().toISOString(),
					importance_level: notice.importance_level,
					img_url: notice.img_url
				}
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error:", response.status, response.statusText)
					return
				};
				const data = await response.json();
				return true;
			},


			createAdoption: async (adoption) => {
				const store = getStore();
				const uri = `${host}/api/Adoptions`;
				const dataToSend = {
					user_id: store.user_id,
					status: adoption.status,
					is_active: adoption.is_active,
					how_old: adoption.how_old,
					spacie: adoption.spacie,
					race: adoption.race,
					sex: adoption.sex,
					unadopted_time: adoption.unadopted_time,
					province: adoption.province,
					description: adoption.description,
					image_url: adoption.image_url,
					adoption_priority: adoption.adoption_priority,
				}
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error:", response.status, response.statusText)
					return
				}
				const data = await response.json();
				Navigate("/adoptions");
			},

			createDonation: async (donation) => {
				const store = getStore();
				const uri = `${host}/api/donations`;
				const dataToSend = {
					sos_id: store.sos_id,
					donation_date: donation.donation_date,
					is_public: donation.is_public,
					donnor_name: donation.donnor_name,
					donnor_ammount: donation.donnor_ammount
				}
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error:", response.status, response.statusText)
					return
				}
				const data = await response.json();
				Navigate("/donations");
				// 	setStore({sosDonation: data.results});
			},

			createSosCases: async (soscases) => {
				const store = getStore();
				const uri = `${host}/api/sos-cases`;
				const dataToSend = {
					user_id: store.user_id,
					image_url: soscases.image_url,
					province: soscases.province,
					specie: soscases.specie,
					description: soscases.spdescriptionacie,
					status: soscases.status,
					operation_cost: soscases.operation_cost,
					pending_ammount: soscases.pending_ammount,
					is_active: soscases.is_active
				}
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error:", response.status, response.statusText)
					return
				}
				const data = await response.json();
				Navigate("/sos-cases");
				// 	setStore({sosCase: data.results});
			},
			getUser: async (user) => {
				const uri = `${host}/${user.id}`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					if (response.status == "404") {
						console.log("User not found");
					}
					return
				}
				const data = await response.json();
				setStore({ user: data.results });
				setStore({ isLogged: "true" });
			},

			getUserInfo: async (id) => {
				const store = getStore();
				const actions = getActions();
				const uri = `${host}/api/users/${id}`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					if (response.status == "404") {
						console.log("User not found");

					}
					return
				}
				const data = await response.json();
				setStore({ correo: data.results.email });
			},

			getNotice: async (notice) => {
				const store = getStore();
				const actions = getActions();
				let uri = "";
				if (notice == "all") {
					uri = `${host}/api/news`;
				} else {
					uri = `${host}/api/news/${notice}`;
				}
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					if (response.status == "404") {
						console.log("Notice not found");
					}
					return
				}
				const data = await response.json();
				if (notice === "all") {
					setStore({ notice: data.results });
				} else {
					setStore({ selectedNews: data.results });
				}
			},

			getAnimalShelter: async (shelter) => {
				const store = getStore();
				const actions = getActions();
				let uri = "";
				if (shelter == "all") {
					uri = `${host}/api/animal-shelters`;
					setStore({ animalShelterSelected: "" });
				} else {
					uri = `${host}/api/animal-shelters/${shelter}`;
					setStore({ animalShelter: [] });
				}
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					if (response.status == "404") {
						console.log("Animal Shelter not found");
					}
					return
				}

				const data = await response.json();
				if (shelter == "all") {
					setStore({ animalShelter: data.results });
				} else {
					setStore({ animalShelterSelected: data.results });
					setStore({ correo: data.results.email });
					setStore({ mapDirection: store.animalShelterSelected.address + " " + store.animalShelterSelected.city });
				}
			},

			getAdoptions: async (adoptions) => {
				const store = getStore();
				const actions = getActions();
				let uri = "";
				if (adoptions == "all") {
					uri = `${host}/api/adoptions`;
				} else {
					uri = `${host}/api/adoptions/${adoptions}`;
				}
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					if (response.status == "404") {
						console.log("Adoption not found");
					}
					return
				}
				const data = await response.json();
				if (adoptions === "all") {
					setStore({ adoptions: data.results });
				} else {
					setStore({ selectedAdoption: data.results });
					actions.getUserInfo(data.results.user_id);
				}
			},

			getSosCase: async (event) => {
				if (event) event.preventDefault();
				const store = getStore();
				const actions = getActions();
				const uri = `${host}/api/sos-case/${store.sosCase.id}`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					if (response.status == "404") {
						console.log("SoS Case not found");
					}
					return
				}
				const data = await response.json();
				setStore({ sosCase: data.results });
			},

			getVeterinary: async (veterinary) => {
				const store = getStore();
				const actions = getActions();
				let uri = "";
				if (veterinary == "all") {
					uri = `${host}/api/veterinaries`;
					setStore({ veterinarySelected: "" });
				} else {
					uri = `${host}/api/veterinaries/${veterinary}`;
					setStore({ veterinary: [] });
				}
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					if (response.status == "404") {
						console.log("Veterinary not found");
					}
					return
				}
				const data = await response.json();
				if (veterinary == "all") {
					setStore({ veterinary: data.results });
				} else {
					setStore({ veterinarySelected: data.results });
					setStore({ correo: data.results.email });
				}
			},

			getDonation: async (event) => {
				const store = getStore();
				const actions = getActions();
				const uri = `${host}/api/donations/${store.donation.id}`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					if (response.status == "404") {
						console.log("Veterinary not found");
					}
					return
				}
				const data = await response.json();
				setStore({ donation: data.results });
			},
		}
	}
};

export default getState;
