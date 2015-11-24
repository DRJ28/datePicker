var module = angular.module('datePicker',[]);
module.controller('myClt', function($scope){
    $scope.name = "Dheeraj";
});

module.directive('datePicker', function() {
  return {
    restrict: 'E',
    scope: {
    },
    template: '<div class=\'bdatepicker\'><input type=\'text\' value={{selectedDate}} id=\'dssId\'></div>'+
                '<div class=\'calender-hidden\'>'+
                    '<div class=\'calender-header\'>'+
                        '<span class=\'previous-button\'></span>'+
                        '<span class=\'month-year\'>{{currentMonthName}}  {{currentYear}}</span>'+
                        '<span class=\'next-button\'></span>'+
                    '</div>'+
                    '<div class=\'calender-body\'>'+
                        '<table>'+
                            '<tr><th ng-repeat=\'i in weekList\'>{{i}}</th></tr>'+
                            '<tr ng-repeat=\'i in dateList track by $index\'><td ng-repeat=\'ii in i track by $index\'>{{ii}}</td></tr>'+
                        '</table>'+
                    '</div>'+
                '</div>',

    link: function(scope, element, attrs){
        //debugger;
        var today = new Date();
        scope.selectedDate='';
        scope.monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        scope.currentMonth = today.getMonth();
        scope.currentMonthName = scope.monthList[scope.currentMonth];
        scope.currentYear = today.getFullYear();
        scope.weekList = ['Su','Mo','Tu','We','Th','Fr','Sa'];
        //scope.dateList = [];
        function setCalender(change){  
            debugger; 
            /*var today = new Date(); */
            if (change) {
                console.log('next previous month');
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

            console.log(scope.currentMonthName);
            scope.dateList = [];
            var firstDay = new Date(scope.currentYear, scope.currentMonth, 1);
            firstDay = firstDay.getDay();
            
            var lastMonth = new Date(scope.currentYear, scope.currentMonth, 0);
            var day1 = 1;
            var day3031 = new Date(scope.currentYear, scope.currentMonth+1, 0);
            day3031 = day3031.getDate();
            var day = lastMonth.getDate() - lastMonth.getDay();
            debugger;
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
        

        element.on('click', function(ele){
            debugger;
            //open calender
            if (ele.srcElement.id == 'dssId') {
                debugger;
                $('#dssId').parent()[0].nextElementSibling.setAttribute("class", "calender-block");
            };

            if ($('.calender-block').has($(ele.srcElement))) {
                //clicked inside calender
                console.log('clicked inside calender');
            };
            console.log(ele.srcElement.innerHTML);
            if (isNaN(parseInt(ele.srcElement.innerHTML))) {
                //close without date
                console.log('');
            }else{
                //it's a number, make date
                debugger;
                scope.selectedDate = ele.srcElement.innerHTML +'/'+ (scope.currentMonth+1) +'/'+ scope.currentYear;
                console.log('user select : ' + scope.selectedDate);
                scope.$apply(function(){
                    scope.selectedDate;
                });
                //close calender
                $('#dssId').parent()[0].nextElementSibling.setAttribute("class", "calender-hidden");
            }
            //ele.srcElement.className
            if (ele.srcElement.className == 'next-button') {
                setCalender(1);
                scope.$apply();
            };
            if (ele.srcElement.className == 'previous-button') {
                setCalender(-1);
                scope.$apply();
            };
        });
    }
  };
});