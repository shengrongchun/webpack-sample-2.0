class Service {
    constructor($http, $q) {
        "ngInject";
        
        this.$http = $http;
        this.$q = $q;
    }

    get(category) {
        const deferred = this.$q.defer();

        this.$http.get(webpack_api_path+'/api/nav/' + category + '.json',{})
            .then( (data) => {//success
                deferred.resolve(data.data);
            }, (data) => {//error
                deferred.reject(data);
            });

        return deferred.promise;
    }
}

export default Service;