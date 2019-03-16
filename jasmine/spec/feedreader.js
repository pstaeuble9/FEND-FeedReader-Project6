/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function () {

    /****** First Test Suite - RSS all feeds ******/

    describe('RSS Feeds', function () {

        /* allFeeds variable has been defined and it is not empty.*/

        it('Feeds are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loop through each feed checking the 'url' value
        function checkforValidURLs(feed) {
            var int = 1 + i;
            it('feed ' + int + ' has valid URL', function () {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBeLessThan(9); // Checks if at least it has something more than the http:// text
            });
        }
        // loops through which feeds have valid URLs
        for (i = 0; i < allFeeds.length; i++) {
            checkforValidURLs(allFeeds[i]);
        }
        // Checks if the names are defined
        it('Feeds have valid names', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /****** Second Test Suite - Menu Behaviour ******/

    describe('The menu', function () {

        // This test checks if the body element has the 'menu-hidden' class
        it('should be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // This test checks if the class is added to the body element on click
        it('should change the visibility when menu icon is clicked', function () {

            $('.menu-icon-link').trigger('click'); // When menu is clicked; we expect the 'menu-hidden' class to be removed
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click'); // When menu is clicked; we expect the 'menu-hidden' class to be added
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /****** Third test suite - Initial Entities ******/
    describe('Initial Entities', function () {

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // Checks for at least one entry in the feed
        it('there is at least a single .entry element within the .feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    /****** Fourth Test Suite - Selection of a New Feed ******/
    describe('New Feed Selection', function () {

        // Check if the content is updated when a different feedId is passed

        var defaultContent,
            updatedContent;

        // Runs the loadFeed function
        beforeEach(function (done) {
            loadFeed(0, function () {
                defaultContent = $('.feed').text();

                loadFeed(1, function () {
                    updatedContent = $('.feed').text();
                    done();
                });
            });

        });

        // Check if the variables are different
        it('loads a new feed', function () {
            expect(updatedContent).not.toBe(defaultContent);
        });
    });
}());