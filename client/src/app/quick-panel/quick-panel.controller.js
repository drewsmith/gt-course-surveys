(function () {
  'use strict';

  angular
    .module('app.quick-panel')
    .controller('QuickPanelController', QuickPanelController);

  /** @ngInject */
  function QuickPanelController($scope, $state, $mdSidenav, Review, reviews, eventCode) {
    var vm = this;
    var reviewChangeListeners = [];

    // Data

    /**
     * Recent reviews (in the last week).
     *
     * @type {!Array<Review>}
     */
    vm.reviews = reviews;

    // Methods

    vm.goTo = goTo;

    //////////

    init();

    function init() {
      reviewChangeListeners.push($scope.$on(eventCode.REVIEW_CREATED, onReviewChange));
      reviewChangeListeners.push($scope.$on(eventCode.REVIEW_UPDATED, onReviewChange));
      reviewChangeListeners.push($scope.$on(eventCode.REVIEW_REMOVED, onReviewChange));
    }

    /**
     * Handles a review change by refreshing the review list (if the review is a recent one).
     *
     * @param {*} $event
     * @param {!Review} review
     */
    function onReviewChange($event, review) {
      if (Review.isRecent(review)) {
        Review.getRecent().then(function (reviews) {
          vm.reviews = reviews;
        });
      }
    }

    /**
     * Navigates to a give review.
     *
     * @param {!Review} review
     */
    function goTo(review) {
      $mdSidenav('quick-panel').toggle().then(function () {
        $state.go('app.reviews_course', { id: review.course, rid: review.id });
      });
    }
  }
})();
