/**
 * Module to load an array of HTML elements as the user scrolls to their
 * position on the page
 * @module piecemeal
 * @author raphael.luckom@gmail.com
 * @exports Piecemeal
 * @license GPL v2.0 or later
 */

/**
 * @constructor
 * @alias module:piecemeal
 * @param selector {string} - jquery selector representing unique DOM element 
 *                            into which the provided content should be loaded
 *                            as the user scrolls.
 * @param content {array} - array of html elements / jquery objects / strings
 *                          of HTML that can be appended to the DOM element 
 *                          specified by selector as the user scrolls.
 */
function Piecemeal(selector, content) {
    this.outer = $(selector);
    this.startPos = this.outer.offset().top;
    this.content = content;
    this.content.reverse();
    my = this;
    this.trigger = function() {my.loadContentIfNeeded();};
    $(window).scroll(my.trigger);
    $(my.trigger);
}

Piecemeal.prototype = {

    /**
     * determines where on the page the bottom of the screen is
     * @private
     */
    screenBottom: function() {
        return window.screen.availHeight + window.scrollY;
    },

    /**
     * determines where on the page the bottom of the content is
     * @private
     */
    contentBottom: function() {
        return this.startPos + this.outer.height();
    },

    /**
     * compares contentBottom with screenBottom to see whether we need to 
     * load more content
     * @private
     */
    needContent: function() {
        return (this.contentBottom() < this.screenBottom());
    },

    /**
     * wraps the next content element in a jquery object, sets its onload
     * property to this.loadContentIfNeeded (in case we still need more after
     * it loads) and appends it to the DOM element specified by the selector
     * passed to the constructor.
     * @private
     */
    loadContentIfNeeded: function() {
        if (this.needContent()) {
            var my = this;
            if (this.content.length == 0) {
                $(window).unbind('scroll', my.trigger);
                return;
            }
            var contentToAdd = $(this.content.pop())
                .on('load', my.trigger);
            this.outer.append(contentToAdd);
        }
    }
};
