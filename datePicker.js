var module = angular.module('datePicker',[]);
module.controller('myClt', function($scope){
    $scope.name = "Dheeraj";
});

module.directive('datePicker', function() {
  return {
    restrict: 'E',
    scope: {
        ngModel:'='
    },
    template: '<div class=\'bdatepicker\' ng-model=ngModel><input type=\'text\' value={{selectedDate}} id=\'dssId\'></div>'+
                '<div class=\'calender-hidden\'>'+
                    '<div class=\'calender-header\'>'+
                        '<span class=\'previous-button\'></span>'+
                        '<span class=\'month-year\'>{{currentMonthName}}  {{currentYear}}</span>'+
                        '<span class=\'next-button\'></span>'+
                    '</div>'+
                    '<div class=\'calender-body body-display-true\'>'+
                        '<table>'+
                            '<tr><th ng-repeat=\'i in weekList\'>{{i}}</th></tr>'+
                            '<tr ng-repeat=\'i in dateList track by $index\'><td ng-repeat=\'ii in i track by $index\'>{{ii}}</td></tr>'+
                        '</table>'+
                    '</div>'+

                    '<div class=\'calender-body-month body-display-false\'>'+
                        '<table>'+
                            '<tr ng-repeat=\'i in yearMonthList track by $index\'><td ng-repeat=\'ii in i track by $index\'>{{ii}}</td></tr>'+
                        '</table>'+
                    '</div>'+

                    '<div class=\'calender-body-year body-display-false\'>'+
                        '<table>'+
                            '<tr ng-repeat=\'i in yearList track by $index\'><td ng-repeat=\'ii in i track by $index\'>{{ii}}</td></tr>'+
                        '</table>'+
                    '</div>'+

                '</div>',

    link: function(scope, element, attrs, controller){
        var today = new Date();
        scope.selectedDate='';
        scope.screen = 1;
        scope.monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        scope.yearMonthList = [];
        scope.yearList = [];
        scope.currentMonth = today.getMonth();
        scope.currentMonthName = scope.monthList[scope.currentMonth];
        scope.currentYear = today.getFullYear();
        scope.weekList = ['Su','Mo','Tu','We','Th','Fr','Sa'];
        //scope.dateList = [];
        function setCalender(change){  
            /*var today = new Date(); */
            if (change) {
                if (scope.currentMonth == 0 && change == -1) {//change year back 
                    scope.currentYear -=1;
                    scope.currentMonth =11;
                }else if (scope.currentMonth == 11 && change == 1) {//change year back 
                    scope.currentYear +=1;
                    scope.currentMonth = 0;
                }else{
                    scope.currentMonth += change;
                }
 
                scope.currentMonthName = scope.monthList[scope.currentMonth];
            }

            scope.dateList = [];
            var firstDay = new Date(scope.currentYear, scope.currentMonth, 1);
            firstDay = firstDay.getDay();
            
            var lastMonth = new Date(scope.currentYear, scope.currentMonth, 0);
            var day1 = 1;
            var day3031 = new Date(scope.currentYear, scope.currentMonth+1, 0);
            day3031 = day3031.getDate();
            var day = lastMonth.getDate() - lastMonth.getDay();
            for (var i = 0; i < 6 ;i++) {// fill days in calender for current month, fill 6 weeks
                var week = [];            
                for (var j = 0; j < 7; j++) {
                    if (day <= lastMonth.getDate()) {
                        week.push(null);
                        day++    
                    }else{
                        if (day1 <= day3031){
                            week.push(day1++);
                        }else{
                            week.push(null);
                        }
                    }
                };
                scope.dateList.push(week);
            }
        }
        
        setCalender();
        
        element.on('mouseover',function(ele){
            if (!isNaN(parseInt(ele.srcElement.innerHTML)) ) {
                //add hover class calender-body-table-td-hover to "td"
                ele.srcElement.classList.add('calender-body-table-td-hover');
            };
            //on month/year section
            if (ele.srcElement.classList.contains('month-year')) {
                //add hover class calender-body-table-td-hover
                console.log('hover in month-year class');
                ele.srcElement.classList.add('calender-body-table-td-hover');
            }
            
        }).on('mouseout', function(ele){
            //remove hover class(ele.srcElement.classList)
            ele.srcElement.classList.remove('calender-body-table-td-hover');
        });
        element.on('click', function(ele){
            //open calender
            if (ele.srcElement.id == 'dssId') {
                $('#dssId').parent()[0].nextElementSibling.setAttribute("class", "calender-block");
            };
            /*bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb*/
            if (ele.srcElement.classList.contains('month-year')) {
                //open months list; for first time
                //open year list; for second time
                debugger;
                //when {{currentMonthName}}  {{currentYear}} both are present
                if (scope.currentMonthName == '' && scope.screen == 2) {
                    var dateBody = document.getElementsByClassName('calender-body-month');
                    dateBody[0].classList.remove('body-display-true');
                    dateBody[0].classList.add('body-display-false');

                    dateBody = document.getElementsByClassName('calender-body-year');
                    dateBody[0].classList.remove('body-display-false');
                    dateBody[0].classList.add('body-display-true');  

                    /*scope.currentMonthName = ''; */
                    scope.screen = 3;                 

                    var x = scope.currentYear;

                    for (var i = 0; i < 4; i++) {
                        var row=[];
                        for (var j = 0; j < 3 ; j++) {
                            row.push(x++);
                        };
                        scope.yearList.push(row);
                    };
                    console.log('value of x at last ' + x);
                    scope.currentYear = scope.currentYear +'-'+(x-1);
                };
                if (scope.currentMonthName) {// show months list
                    debugger;
                    var dateBody = document.getElementsByClassName('calender-body');
                    dateBody[0].classList.remove('body-display-true');
                    dateBody[0].classList.add('body-display-false');

                    dateBody = document.getElementsByClassName('calender-body-month');
                    dateBody[0].classList.remove('body-display-false');
                    dateBody[0].classList.add('body-display-true');  

                    scope.currentMonthName = ''; 
                    scope.screen = 2;                 

                    var x = 0;
                    for (var i = 0; i < 4; i++) {
                        var row=[];
                        for (var j = 0; j < 3 ; j++) {
                            row.push(scope.monthList[x++]);
                        };
                        scope.yearMonthList.push(row);
                    };
                };
                
                
            }

            if ($('.calender-block').has($(ele.srcElement))) {
                //clicked inside calender
                console.log('clicked inside calender');
            };

            debugger;
            if (!isNaN(parseInt(ele.srcElement.innerHTML)) && scope.currentMonthName != '' ){
                //it's a number, make date
                var setDate = parseInt(ele.srcElement.innerHTML);
                if (setDate<10) {
                    setDate = '0'+setDate;
                };
                scope.selectedDate = setDate +'/'+(scope.currentMonth > 8?'':'0')+ (scope.currentMonth+1) +'/'+ scope.currentYear;
                /*scope.$apply(function(){
                    scope.selectedDate;
                });*/
                //close calender
                $('#dssId').parent()[0].nextElementSibling.setAttribute("class", "calender-hidden");
            }
            //ele.srcElement.className
            if (ele.srcElement.className == 'next-button') {
                setCalender(1);
                //scope.$apply();
            };
            if (ele.srcElement.className == 'previous-button') {
                setCalender(-1);
                //scope.$apply();
            };
            scope.$apply();
        });
    }
  };
});