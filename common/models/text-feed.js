'use strict';

// var textFeedList = [];
var collector = require('../../server/workers/collector');

module.exports = function(TextFeed) {

  TextFeed.startFeeds = function(cb) {
    // if(textFeedList.length > 0){
    //   return cb(new Error('stop the current feeds'));
    // }

    // TODO: remove this endpoint if we like using the worker process instead
    collector.start();

    cb(null, {data: 'started'});
  };

  TextFeed.remoteMethod(
    'startFeeds',
    {
      accepts: [
      ],
      returns: {arg: 'data', root: true},
      http: {path: '/start', verb: 'get'}
    }
  );

  // TextFeed.stopFeeds = function(cb) {
  //   textFeedList.forEach(function(feed){
  //     feed.stopFeed();
  //   });

  //   textFeedList.length=0;

  //   cb(null, {data: 'stopped'});
  // };

  // TextFeed.remoteMethod(
  //   'stopFeeds',
  //   {
  //     accepts: [
  //     ],
  //     returns: {arg: 'data', root: true},
  //     http: {path: '/stop', verb: 'get'}
  //   }
  // );

  TextFeed.destroyData = function(cb) {
    TextFeed.destroyAll()
    .then(() => cb(null, {data: 'All data destroyed'}))
    .catch(cb);
  };

  TextFeed.remoteMethod(
    'destroyData',
    {
      accepts: [
      ],
      returns: {arg: 'data', root: true},
      http: {path: '/destroy', verb: 'get'}
    }
  );
};