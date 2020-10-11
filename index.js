
var app = new Vue({
    el: '#app',
    name: 'App',
    data() {
        return {
            data: []
        }
    },
    methods: {
        getRestaurants() {
            fetch('api/restaurants')
            .then(response => { return response.json() })
            .then(data => {  
                console.log('getRestaurants response:', data);
            })
            .catch(err => { alert('Error:', err) }); 
        }
    }
});