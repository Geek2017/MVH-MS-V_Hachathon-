angular.module('newApp').controller('lettuceCtrl', function($scope) {

    if (localStorage.getItem("LHealthy") && localStorage.getItem("LBacteria") && localStorage.getItem("LViral")) {

        var LHealthy = localStorage.getItem("LHealthy")
        $("#LHealthy").attr("data-percent", LHealthy.toString());

        var LBacteria = localStorage.getItem("LBacteria")
        $("#LBacteria").attr("data-percent", LBacteria.toString());

        var LViral = localStorage.getItem("LViral")
        $("#LViral").attr("data-percent", LViral.toString());

        var LFDowny = localStorage.getItem("LFDowny")
        $("#LFDowny").attr("data-percent", LFDowny.toString());

        var LFSeptoria = localStorage.getItem("LFSeptoria")
        $("#LFSeptoria").attr("data-percent", LFSeptoria.toString());

        var LFWilt = localStorage.getItem("LFWilt")
        $("#LFWilt").attr("data-percent", LFWilt.toString());

        var LFPowdery = localStorage.getItem("LFPowdery")
        $("#LFPowdery").attr("data-percent", LFPowdery.toString());

        var LFungal = localStorage.getItem("LFDowny") * 0.25 + localStorage.getItem("LFSeptoria") * 0.25 + localStorage.getItem("LFWilt") * 0.25 + localStorage.getItem("LFPowdery") * 0.25;

        var fdp = localStorage.getItem("LFDowny");
        $('#fdp').text(fdp + '%');
        $('#fd').attr('style', 'width:' + fdp + '%');

        var fpp = localStorage.getItem("LFPowdery");
        $('#fpp').text(fpp + '%');
        $('#fp').attr('style', 'width:' + fpp + '%');

        var fsp = localStorage.getItem("LFSeptoria");
        $('#fsp').text(fsp + '%');
        $('#fs').attr('style', 'width:' + fsp + '%');

        var fwp = localStorage.getItem("LFWilt");
        $('#fwp').text(fwp + '%');
        $('#fw').attr('style', 'width:' + fwp + '%');

        console.log(LFungal);

        $("#LFungal").attr("data-percent", LFungal.toString());

        var lstate = LFungal + localStorage.getItem("LHealthy") * 0.25 + localStorage.getItem("LBacteria") * 0.25 + localStorage.getItem("LViral") * 0.25

        $("#lstate").attr("data-percent", lstate.toString());

        var lhealth = localStorage.getItem("LHealthy") * 0.25 + lstate;

        $("#lhealth").attr("data-percent", lhealth.toString());



    } else {
        localStorage.setItem("LHealthy", 0);
        localStorage.setItem("LBacteria", 0);
        localStorage.setItem("LBacteria", 0);
        localStorage.setItem("LFDowny", 0);

    }

    $("#uploadtrigger").click(function() {
        $('.file1').trigger('click');
        console.log('click...')
    });

    $(".file1").change(function() {
        openFile(event);
        console.log('date sent..')
    });

    var openFile = function(file) {
        var input = file.target;

        var reader = new FileReader();
        reader.onload = function() {
            var dataURL = reader.result;

            var params = {
                // Request parameters
                "application": "myTestApp"
            };

            var parts = dataURL.split(';base64,');
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            var imgContent = new Blob([uInt8Array], {
                type: contentType
            });

            $.ajax({
                    url: "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/aa2e4cb8-9e72-478b-807d-d7e39c849502/classify/iterations/Iteration10/image?" + $.param(params),
                    beforeSend: function(xhrObj) {
                        // Request headers
                        xhrObj.setRequestHeader("Prediction-Key", "9d40c99161d54d43b36f6970b02b6578");
                        xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                    },
                    type: "POST",
                    // Request body
                    data: imgContent,
                    processData: false
                })
                .done(function(data) {


                    for (var i = 0; i < data.predictions.length; i++) {

                        console.log(data.predictions[i].tagName);

                        if (data.predictions[i].tagName == "L-Healthy") {
                            console.log(data.predictions[i].tagName, data.predictions[i].probability * 100);
                            var LHealthy = data.predictions[i].probability * 100
                            console.log(":::", Math.round(LHealthy));
                            localStorage.setItem('LHealthy', Math.round(LHealthy));
                        }
                        if (data.predictions[i].tagName == "L-Bacteria") {
                            console.log(data.predictions[i].tagName, data.predictions[i].probability * 100);
                            var LBacteria = data.predictions[i].probability * 100
                            console.log(":::", Math.round(LBacteria));
                            localStorage.setItem('LBacteria', Math.round(LBacteria));
                        }
                        if (data.predictions[i].tagName == "L-Viral") {
                            console.log(data.predictions[i].tagName, data.predictions[i].probability * 100);
                            var LViral = data.predictions[i].probability * 100
                            console.log(":::", Math.round(LViral));
                            localStorage.setItem('LViral', Math.round(LViral));
                        }


                        if (data.predictions[i].tagName == "LF-Downy Mildew") {
                            console.log(data.predictions[i].tagName, data.predictions[i].probability * 100);
                            var LFDowny = data.predictions[i].probability * 100
                            console.log(":::", Math.round(LFDowny));
                            localStorage.setItem('LFDowny', Math.round(LFDowny));

                        }
                        if (data.predictions[i].tagName == "LF-Septoria Blight") {
                            console.log(data.predictions[i].tagName, data.predictions[i].probability * 100);
                            var LFSeptoria = data.predictions[i].probability * 100
                            console.log(":::", Math.round(LFSeptoria));
                            localStorage.setItem('LFSeptoria', Math.round(LFSeptoria));

                        }
                        if (data.predictions[i].tagName == "LF-Wilt and Leaf Blight") {
                            console.log(data.predictions[i].tagName, data.predictions[i].probability * 100);
                            var LFWilt = data.predictions[i].probability * 100
                            console.log(":::", Math.round(LFWilt));
                            localStorage.setItem('LFWilt', Math.round(LFWilt));

                        }
                        if (data.predictions[i].tagName == "LF-Powdery Mildew") {
                            console.log(data.predictions[i].tagName, data.predictions[i].probability * 100);
                            var LFPowdery = data.predictions[i].probability * 100
                            console.log(":::", Math.round(LFPowdery));
                            localStorage.setItem('LFPowdery', Math.round(LFPowdery));


                            alert('Image Successfully Analyze....')
                            window.location.href = "#/apple";
                            window.location.href = "#/lettuce";

                        }
                    }






                })
                .fail(function() {
                    alert("error");
                });
        };

        reader.readAsDataURL(input.files[0]);
    };


    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    pageSetUp();

    /*
     * PAGE RELATED SCRIPTS
     */

    $(".js-status-update a").click(function() {
        var selText = $(this).text();
        var $this = $(this);
        $this.parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
        $this.parents('.dropdown-menu').find('li').removeClass('active');
        $this.parent().addClass('active');
    });

    /*
     * TODO: add a way to add more todo's to list
     */

    // initialize sortable
    $(function() {
        $("#sortable1, #sortable2").sortable({
            handle: '.handle',
            connectWith: ".todo",
            update: countTasks
        }).disableSelection();
    });

    // check and uncheck
    $('.todo .checkbox > input[type="checkbox"]').click(function() {
            var $this = $(this).parent().parent().parent();

            if ($(this).prop('checked')) {
                $this.addClass("complete");

                // remove this if you want to undo a check list once checked
                //$(this).attr("disabled", true);
                $(this).parent().hide();

                // once clicked - add class, copy to memory then remove and add to sortable3
                $this.slideUp(500, function() {
                    $this.clone().prependTo("#sortable3").effect("highlight", {}, 800);
                    $this.remove();
                    countTasks();
                });
            } else {
                // insert undo code here...
            }

        })
        // count tasks
    function countTasks() {

        $('.todo-group-title').each(function() {
            var $this = $(this);
            $this.find(".num-of-tasks").text($this.next().find("li").size());
        });

    }

    /*
     * RUN PAGE GRAPHS
     */

    /* TAB 1: UPDATING CHART */
    // For the demo we use generated data, but normally it would be coming from the server

    var data = [],
        totalPoints = 200,
        $UpdatingChartColors = $("#updating-chart").css('color');

    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    }

    // setup control widget
    var updateInterval = 1500;
    $("#updating-chart").val(updateInterval).change(function() {

        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            $(this).val("" + updateInterval);
        }

    });

    // setup plot
    var options = {
        yaxis: {
            min: 0,
            max: 100
        },
        xaxis: {
            min: 0,
            max: 100
        },
        colors: [$UpdatingChartColors],
        series: {
            lines: {
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.4
                    }, {
                        opacity: 0
                    }]
                },
                steps: false

            }
        }
    };

    var plot = $.plot($("#updating-chart"), [getRandomData()], options);

    /* live switch */
    $('input[type="checkbox"]#start_interval').click(function() {
        if ($(this).prop('checked')) {
            $on = true;
            updateInterval = 1500;
            update();
        } else {
            clearInterval(updateInterval);
            $on = false;
        }
    });

    function update() {
        if ($on == true) {
            plot.setData([getRandomData()]);
            plot.draw();
            setTimeout(update, updateInterval);

        } else {
            clearInterval(updateInterval)
        }

    }

    var $on = false;

    /*end updating chart*/

    /* TAB 2: Social Network  */

    $(function() {
        // jQuery Flot Chart
        var twitter = [
                [1, 27],
                [2, 34],
                [3, 51],
                [4, 48],
                [5, 55],
                [6, 65],
                [7, 61],
                [8, 70],
                [9, 65],
                [10, 75],
                [11, 57],
                [12, 59],
                [13, 62]
            ],
            facebook = [
                [1, 25],
                [2, 31],
                [3, 45],
                [4, 37],
                [5, 38],
                [6, 40],
                [7, 47],
                [8, 55],
                [9, 43],
                [10, 50],
                [11, 47],
                [12, 39],
                [13, 47]
            ],
            data = [{
                label: "Twitter",
                data: twitter,
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 0.13
                        }]
                    }
                },
                points: {
                    show: true
                }
            }, {
                label: "Facebook",
                data: facebook,
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 0.13
                        }]
                    }
                },
                points: {
                    show: true
                }
            }];

        var options = {
            grid: {
                hoverable: true
            },
            colors: ["#568A89", "#3276B1"],
            tooltip: true,
            tooltipOpts: {
                //content : "Value <b>$x</b> Value <span>$y</span>",
                defaultTheme: false
            },
            xaxis: {
                ticks: [
                    [1, "JAN"],
                    [2, "FEB"],
                    [3, "MAR"],
                    [4, "APR"],
                    [5, "MAY"],
                    [6, "JUN"],
                    [7, "JUL"],
                    [8, "AUG"],
                    [9, "SEP"],
                    [10, "OCT"],
                    [11, "NOV"],
                    [12, "DEC"],
                    [13, "JAN+1"]
                ]
            },
            yaxes: {

            }
        };

        var plot3 = $.plot($("#statsChart"), data, options);
    });

    // END TAB 2

    // TAB THREE GRAPH //
    /* TAB 3: Revenew  */

    $(function() {

        var trgt = [
                [1354586000000, 153],
                [1364587000000, 658],
                [1374588000000, 198],
                [1384589000000, 663],
                [1394590000000, 801],
                [1404591000000, 1080],
                [1414592000000, 353],
                [1424593000000, 749],
                [1434594000000, 523],
                [1444595000000, 258],
                [1454596000000, 688],
                [1464597000000, 364]
            ],
            prft = [
                [1354586000000, 53],
                [1364587000000, 65],
                [1374588000000, 98],
                [1384589000000, 83],
                [1394590000000, 980],
                [1404591000000, 808],
                [1414592000000, 720],
                [1424593000000, 674],
                [1434594000000, 23],
                [1444595000000, 79],
                [1454596000000, 88],
                [1464597000000, 36]
            ],
            sgnups = [
                [1354586000000, 647],
                [1364587000000, 435],
                [1374588000000, 784],
                [1384589000000, 346],
                [1394590000000, 487],
                [1404591000000, 463],
                [1414592000000, 479],
                [1424593000000, 236],
                [1434594000000, 843],
                [1444595000000, 657],
                [1454596000000, 241],
                [1464597000000, 341]
            ],
            toggles = $("#rev-toggles"),
            target = $("#flotcontainer");

        var data = [{
            label: "Target Profit",
            data: trgt,
            bars: {
                show: true,
                align: "center",
                barWidth: 30 * 30 * 60 * 1000 * 80
            }
        }, {
            label: "Actual Profit",
            data: prft,
            color: '#3276B1',
            lines: {
                show: true,
                lineWidth: 3
            },
            points: {
                show: true
            }
        }, {
            label: "Actual Signups",
            data: sgnups,
            color: '#71843F',
            lines: {
                show: true,
                lineWidth: 1
            },
            points: {
                show: true
            }
        }]

        var options = {
            grid: {
                hoverable: true
            },
            tooltip: true,
            tooltipOpts: {
                //content: '%x - %y',
                //dateFormat: '%b %y',
                defaultTheme: false
            },
            xaxis: {
                mode: "time"
            },
            yaxes: {
                tickFormatter: function(val, axis) {
                    return "$" + val;
                },
                max: 1200
            }

        };

        plot2 = null;

        function plotNow() {
            var d = [];
            toggles.find(':checkbox').each(function() {
                if ($(this).is(':checked')) {
                    d.push(data[$(this).attr("name").substr(4, 1)]);
                }
            });
            if (d.length > 0) {
                if (plot2) {
                    plot2.setData(d);
                    plot2.draw();
                } else {
                    plot2 = $.plot(target, d, options);
                }
            }

        };

        toggles.find(':checkbox').on('change', function() {
            plotNow();
        });
        plotNow()

    });

    /*
     * VECTOR MAP
     */

    data_array = {
        "US": 4977,
        "AU": 4873,
        "IN": 3671,
        "BR": 2476,
        "TR": 1476,
        "CN": 146,
        "CA": 134,
        "BD": 100
    };

    $('#vector-map').vectorMap({
        map: 'world_mill_en',
        backgroundColor: '#fff',
        regionStyle: {
            initial: {
                fill: '#c4c4c4'
            },
            hover: {
                "fill-opacity": 1
            }
        },
        series: {
            regions: [{
                values: data_array,
                scale: ['#85a8b6', '#4d7686'],
                normalizeFunction: 'polynomial'
            }]
        },
        onRegionLabelShow: function(e, el, code) {
            if (typeof data_array[code] == 'undefined') {
                e.preventDefault();
            } else {
                var countrylbl = data_array[code];
                el.html(el.html() + ': ' + countrylbl + ' visits');
            }
        }
    });

    /*
     * FULL CALENDAR JS
     */

    if ($("#calendar").length) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        var calendar = $('#calendar').fullCalendar({

            editable: true,
            draggable: true,
            selectable: false,
            selectHelper: true,
            unselectAuto: false,
            disableResizing: false,

            header: {
                left: 'title', //,today
                center: 'prev, next, today',
                right: 'month, agendaWeek, agenDay' //month, agendaDay,
            },

            select: function(start, end, allDay) {
                var title = prompt('Event Title:');
                if (title) {
                    calendar.fullCalendar('renderEvent', {
                            title: title,
                            start: start,
                            end: end,
                            allDay: allDay
                        }, true // make the event "stick"
                    );
                }
                calendar.fullCalendar('unselect');
            },

            events: [{
                title: 'All Day Event',
                start: new Date(y, m, 1),
                description: 'long description',
                className: ["event", "bg-color-greenLight"],
                icon: 'fa-check'
            }, {
                title: 'Long Event',
                start: new Date(y, m, d - 5),
                end: new Date(y, m, d - 2),
                className: ["event", "bg-color-red"],
                icon: 'fa-lock'
            }, {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d - 3, 16, 0),
                allDay: false,
                className: ["event", "bg-color-blue"],
                icon: 'fa-clock-o'
            }, {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d + 4, 16, 0),
                allDay: false,
                className: ["event", "bg-color-blue"],
                icon: 'fa-clock-o'
            }, {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                className: ["event", "bg-color-darken"]
            }, {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                className: ["event", "bg-color-darken"]
            }, {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
                className: ["event", "bg-color-darken"]
            }, {
                title: 'Smartadmin Open Day',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ["event", "bg-color-darken"]
            }],

            eventRender: function(event, element, icon) {
                if (!event.description == "") {
                    element.find('.fc-event-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
                }
                if (!event.icon == "") {
                    element.find('.fc-event-title').append("<i class='air air-top-right fa " + event.icon + " '></i>");
                }
            }
        });

    };

    /* hide default buttons */
    $('.fc-header-right, .fc-header-center').hide();

    // calendar prev
    $('#calendar-buttons #btn-prev').click(function() {
        $('.fc-button-prev').click();
        return false;
    });

    // calendar next
    $('#calendar-buttons #btn-next').click(function() {
        $('.fc-button-next').click();
        return false;
    });

    // calendar today
    $('#calendar-buttons #btn-today').click(function() {
        $('.fc-button-today').click();
        return false;
    });

    // calendar month
    $('#mt').click(function() {
        $('#calendar').fullCalendar('changeView', 'month');
    });

    // calendar agenda week
    $('#ag').click(function() {
        $('#calendar').fullCalendar('changeView', 'agendaWeek');
    });

    // calendar agenda day
    $('#td').click(function() {
        $('#calendar').fullCalendar('changeView', 'agendaDay');
    });

    /*
     * CHAT
     */

    $.filter_input = $('#filter-chat-list');
    $.chat_users_container = $('#chat-container > .chat-list-body')
    $.chat_users = $('#chat-users')
    $.chat_list_btn = $('#chat-container > .chat-list-open-close');
    $.chat_body = $('#chat-body');

    /*
     * LIST FILTER (CHAT)
     */

    // custom css expression for a case-insensitive contains()
    jQuery.expr[':'].Contains = function(a, i, m) {
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    function listFilter(list) { // header is any element, list is an unordered list
        // create and add the filter form to the header

        $.filter_input.change(function() {
            var filter = $(this).val();
            if (filter) {
                // this finds all links in a list that contain the input,
                // and hide the ones not containing the input while showing the ones that do
                $.chat_users.find("a:not(:Contains(" + filter + "))").parent().slideUp();
                $.chat_users.find("a:Contains(" + filter + ")").parent().slideDown();
            } else {
                $.chat_users.find("li").slideDown();
            }
            return false;
        }).keyup(function() {
            // fire the above change event after every letter
            $(this).change();

        });

    }




});