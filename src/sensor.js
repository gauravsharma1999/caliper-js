/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

 /**
 * Caliper Sensor
 * @class
 */

var _ = require('lodash-node');
var client = require('./asyncClient');
var logger = require('./logger');


// Grab an existing namespace object
// or create a blank object if it doesn't exist
// so we can attach non-sensor module exports to it
var Caliper = window.Caliper || {};

/**
 * Represents Caliper Sensor.  
 * @constructor
 */
// The sensor itself
var CaliperSensor = {};

/**
 * Initializes the default client to use. Uses the socket consumer by default.
 * CaliperSensor#initialize
 * @param  array $options passed straight to the client
 */
CaliperSensor.initialize = function (options) {
  if (!_.isUndefined(options)) {
    client.initialize(options);
  }
};


/**
 * Send learning events
 * @param  CaliperEvent $caliperEvent The Caliper Event
 * @return boolean                   whether the measure call succeeded
 */
CaliperSensor.send = function (caliperEvent) {
  client.send(caliperEvent);
};

/**
 * Describe an entity
 * @param  CaliperEntity $caliperEntity The Caliper Entity we are describing
 * @return boolean            whether the describe call succeeded
 */
CaliperSensor.describe = function (caliperEntity) {
  client.describe(caliperEntity);
};

// Stick on the modules that need to be exported under the Caliper namespace
// You only need to require the top-level modules. Browserify
// will walk the dependency graph and load everything correctly
Caliper.Actions = {};
Caliper.Entities = {};
Caliper.Events = {};

// ACTIONS
Caliper.Actions.AnnotationActions     = require('./actions/annotationActions');
Caliper.Actions.AssessmentActions     = require('./actions/assessmentActions');
Caliper.Actions.AssessmentItemActions = require('./actions/assessmentItemActions');
Caliper.Actions.AssignableActions     = require('./actions/assignableActions');
Caliper.Actions.MediaActions          = require('./actions/mediaActions');
Caliper.Actions.OutcomeActions        = require('./actions/outcomeActions');
Caliper.Actions.ReadingActions        = require('./actions/readingActions');
Caliper.Actions.SessionActions        = require('./actions/sessionActions');


// ENTITIES
Caliper.Entities.Entity = require('./entities/entity');

// Core entities
Caliper.Entities.Agent               = require('./entities/agent/agent');
Caliper.Entities.DigitalResource     = require('./entities/digitalResource');
Caliper.Entities.LearningObjective   = require('./entities/learningObjective');
Caliper.Entities.SoftwareApplication = require('./entities/agent/softwareApplication');
Caliper.Entities.WebPage             = require('./entities/reading/webPage');

// LIS entities
Caliper.Entities.Person        = require('./entities/agent/person');
Caliper.Entities.CourseSection = require('./entities/lis/courseSection');
Caliper.Entities.Organization  = require('./entities/agent/organization');

// Annotation entities
Caliper.Entities.Annotation          = require('./entities/annotation/annotation');
Caliper.Entities.BookmarkAnnotation  = require('./entities/annotation/bookmarkAnnotation');
Caliper.Entities.HighlightAnnotation = require('./entities/annotation/highlightAnnotation');
Caliper.Entities.SharedAnnotation    = require('./entities/annotation/sharedAnnotation');
Caliper.Entities.TagAnnotation       = require('./entities/annotation/tagAnnotation');

// Assignable and Assessement entities
Caliper.Entities.AssignableDigitalResource = require('./entities/assignable/assignableDigitalResource');
Caliper.Entities.Attempt                   = require('./entities/assignable/attempt');
Caliper.Entities.Assessment                = require('./entities/assessment/assessment');
Caliper.Entities.AssessmentItem            = require('./entities/assessment/assessmentItem');

// Media Entities
Caliper.Entities.MediaObject   = require('./entities/media/mediaObject');
Caliper.Entities.VideoObject   = require('./entities/media/videoObject');
Caliper.Entities.AudioObject   = require('./entities/media/audioObject');
Caliper.Entities.ImageObject   = require('./entities/media/imageObject');
Caliper.Entities.MediaLocation = require('./entities/media/mediaLocation');

// Reading Entities
Caliper.Entities.EPubVolume = require('./entities/reading/ePubVolume');
Caliper.Entities.Frame      = require('./entities/reading/frame');

// Session Entities
Caliper.Entities.Session = require('./entities/session/session');

// Outcome Entities
Caliper.Entities.Result = require('./entities/outcome/result');

// EVENTS
Caliper.Events.Event               = require('./events/event');
Caliper.Events.AnnotationEvent     = require('./events/annotationEvent');
Caliper.Events.AssessmentEvent     = require('./events/assessmentEvent');
Caliper.Events.AssessmentItemEvent = require('./events/assessmentItemEvent');
Caliper.Events.AssignableEvent     = require('./events/assignableEvent');
Caliper.Events.MediaEvent          = require('./events/mediaEvent');
Caliper.Events.NavigationEvent     = require('./events/navigationEvent');
Caliper.Events.OutcomeEvent        = require('./events/outcomeEvent');
Caliper.Events.SessionEvent        = require('./events/sessionEvent');
Caliper.Events.ViewEvent           = require('./events/viewEvent');

// Replace/Create the global namespace and objects (the sensor) we want there
Caliper.Sensor = CaliperSensor;

// Replace/create Caliper in global namespace
window.Caliper = Caliper;

logger.log('debug', "Added sensor to window global %o", window.Sensor);