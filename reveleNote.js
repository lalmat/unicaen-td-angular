var myApp = angular.module('myApp',[]).controller('elevePanels', ['$scope', function($scope) {

  // Tableau des matières enseignées (nous pourrions lui aussi le rendre dynamique)
  $scope.matiereAry = [
    'Physique',
    'Mathematiques',
    'Informatique',
    'Jeux Videos',
    'Geographie',
    'Francais',
    'Anglais'
  ];

  // Tableau des éléves par défaut.
  $scope.eleveAry = [
    {prenom:'Mathieu',nom:'Lallemand',results:{
      'Physique':9,
      'Francais':10,
      'Mathematiques':7,
      'Informatique':19,
      'Jeux Videos':15,
      'Geographie':10,
      'Anglais':15
    }},
  ];

  // Ajout d'un éléve
  $scope.eleveCreate = function(p,n) {
    $scope.eleveAry.push({
      nom:n.toUpperCase(),  // Le nom en majuscule c'est plus jolis
      prenom:p.UCFirst(),   // Méthode créée dans index.html
      results:null
    });
  };

  // Suppression d'un éléve du tableau
  $scope.eleveRemove = function(i) {
    $scope.eleveAry.splice(i,1);
  };

  // Calcul de la moyenne d'un éléve
  $scope.eleveMoy = function(e) {
    var sum = 0,
        nb  = 0;

    for(i in e.results) {
      sum += e.results[i];
      nb++;
    }

     return Math.round((sum/nb)*100)/100; // Arondi à 2 décimales
  };

  $scope.matiereMoy = function(m) {
    var sum = 0,
        nb  = 0;

    for(i in $scope.eleveAry) {
      if ($scope.eleveAry[i].results != null && m in $scope.eleveAry[i].results) {
        sum += $scope.eleveAry[i].results[m];
        nb++;
      }
    }
    return Math.round((sum/nb)*100)/100; // Arondi à 2 décimales
  };

  // Enregistrement du tableau des éléves
  $scope.eleveSave = function() {
    localStorage.setItem('backup-eleveAry', JSON.stringify($scope.eleveAry));
  }

  // Chargement du tableau des éléves
  $scope.eleveLoad = function() {
    $scope.eleveAry = JSON.parse(localStorage.getItem('backup-eleveAry')) || [];
  }
}]
);
