var items = document.querySelectorAll(".timeline li");

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= (-rect.height + 100) &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + (rect.height - 100)
    );
}

function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
        } else {
            items[i].classList.remove("in-view");
        }
    }
}

window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);

$(function () {
    $.ajax({
        url: 'https://www.codeschool.com/users/asedarski.json',
        dataType: 'jsonp',
        success: function (data) {
            populatePageWithCourses(data.courses.completed, '.completed');
            populatePageWithCourses(data.courses.in_progress, '.inProgress');

        }
    });
});

function populatePageWithCourses(courses, selector) {
    var section = $(selector);
    var tag = '';
    courses.forEach(function(course) {
        tag = '<a href="' + course.url + '" target="_blank">'
            + '<img src="' + course.badge + '" title="' + course.title + '">'
            + '</a>';
        section.append(tag);
    });
}
