app.controller("myCtrl", function ($scope, $http) {
    var Book = function () {
        return {author: "",
            description: "",
            genre: "",
            price: 0.00,
            publish_date: new Date(),
            title: ""};
    };

    var url = "http://localhost:3000/BookSet";

    $scope.Bookset = [];

    $scope.load = function () {


        $http.get(url).success(function (response) {

            $scope.Bookset = response.value;
        });

    };
    $scope.clearEditor = function () {
        $scope.editBook = new Book();
    };
    $scope.edit = function (book) {
        $scope.editBook = book;
    };

    $scope.remove = function (book) {
        //if editBook has no id -> post


        $http.delete(url + "(" + book.id + ")").success(function (response) {
            $scope.load();
            $scope.clearEditor();

        });
    };

    $scope.store = function () {
        //if editBook has no id -> post

        if ($scope.editBook.id) {
            $http.put(url + "(" + $scope.editBook.id + ")", $scope.editBook).success(function (response) {
                $scope.load();
                $scope.clearEditor();

            });
        } else {
            $http.post(url, $scope.editBook).success(function (response) {
                $scope.load();
                $scope.clearEditor();

            });
        }


    };


    var uploadFile = function (blobOrFile) {

        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:3000/putFile', true);
        // Listen to the upload progress.
        var progressBar = document.querySelector('progress');
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                progressBar.value = (e.loaded / e.total) * 100;
                progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
            }
        };

        xhr.send(blobOrFile);
    };


    //see https://howtonode.org/really-simple-file-uploads
    // http://www.html5rocks.com/en/tutorials/file/xhr2/
    $scope.upload = function () {
        var f = document.getElementById('file').files[0];

        uploadFile(new Blob(['UploadFile'], {type: 'application/octet-stream'}));


    };

});
