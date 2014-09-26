﻿/** * @name Lib.Gateway * @class <b>Lib.Gateway</b> a module to dialog between the apps of the Creative Suite * This module allow you to execute a function in Photoshop from InDesign * @author Bastien Eichenberger */H.Gateway = (function (my) {    /**     * Function to execute a script in an other software of the Creative Suite     * @name Lib.Gateway#call_app     * @function     * @param {string} app the name of the application [photoshop, illustrator, indesign, … ]     * @param {function} function_to_execute the function to process     * @param {Object} [obj] a JSON object with the parameters of the function     * @returns {*} the value returned by the function passed as parameter or null     * @throws {Error} if an error occurred in the function passed as parameter     * @example     *     * With parameters     * Lib.Gateway.call_app(     *      'photoshop',     *      function(obj){ alert(obj.my_parameter) },     *      {my_parameter : value}     * );     *     * Without parameters     * Lib.Gateway.call_app(     *      'photoshop',     *      function(){ return 1 + 2 }     * );     * @todo !important replace obj by parameter array     */    my.call_app = function(app, function_to_execute, obj){        var error = null;        var result = null;        var bt = new BridgeTalk();        bt.target = app;        if(obj) {            bt.body = function_to_execute.toSource() + '(' +obj.toSource() + ');';        }        else {            bt.body = function_to_execute + ';';        }        bt.onError = function(ex){            error = ex.body;        }        bt.onResult = function(obj){            result = obj.body;        }        bt.send();        if(error != null) {            throw new Error(error);        }        return result;    }    return my;})(H || {});