
//Get Controles which have data-valt---------------------------------------------------------------
/*!
 * jQuery JavaScript Library v1.10.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:48Z
 */
var compareSet1value1;
var compareSet1value2;
var compareSet2value1;
var compareSet2value2;
var compareSet1controlIdName;
var compareSet2controlIdName;
function displayvalidation(valsec) {
    var flag = true;
    compareSet1value1 = "00-00-00";
    compareSet1value2 = "00-00-00";
    compareSet2value1 = "00-00-00";
    compareSet2value2 = "00-00-00";
    $('[data-role=' + valsec + '] [data-valt]')

        .each(function () {
            // -- Test
            //alert($(this).attr('data-valt') +
            //    " - " +
            //    $(this).attr('type') +
            //    " - " +
            //    $(this).prop("tagName") +
            //    "-" +
            //    $(this).prop("name"));
            if ($(this).prop("tagName") === 'SELECT') {
                if (flag === true)
                    flag = myFun($(this).prop("tagName"), $(this).attr('data-valt'), $(this).attr("id"), null, null, $(this).attribute);
                else {
                    myFun($(this).prop("tagName"), $(this).attr('data-valt'), $(this).attr("id"), null, null);
                }
            }
            else if ($(this).attr('type') === 'radio' || $(this).attr('type') === 'checkbox') {
                if (flag === true) {
                    flag = myFun(null, $(this).attr('data-valt'), $(this).attr("id"), $(this).attr('type'), $(this).prop("name"));
                } else {
                    myFun(null, $(this).attr('data-valt'), $(this).attr("id"), $(this).attr('type'), $(this).prop("name"));
                }
            }
            else if ($(this).prop("tagName") === 'TEXTAREA') {
                if (flag === true) {
                    flag = myFun($(this).prop("tagName"), $(this).attr('data-valt'), $(this).attr("id"), null, null, $(this).attribute);
                }
                else
                {
                    myFun($(this).prop("tagName"), $(this).attr('data-valt'), $(this).attr("id"), null, null);
                }
            }
            else {
                if (flag === true) {
                    flag = myFun(null, $(this).attr('data-valt'), $(this).attr("id"), $(this).attr('type'), null);
                } else {
                    {
                        myFun(null, $(this).attr('data-valt'), $(this).attr("id"), $(this).attr('type'), null);
                    }
                }
            }
        });
    return flag;
}

function myFun(tagName, validationType, controlId, inputType, nameAttr) {
    var flag = true;
    switch (inputType) {
        case "text":
            flag = validate(validationType, $("#" + controlId).val(), controlId);
            var res = $("#" + controlId).val().trim();
            $("#" + controlId).val(res);
            //alert($("#" + controlID).val());
            break;
        case "file":
            flag = validate(validationType, $("#" + controlId).val(), controlId);
            break;
        case "number":
            flag = validate(validationType, $("#" + controlId).val(), controlId);
            break;

        case "date":
            flag = validate(validationType, $("#" + controlId).val(), controlId);
            break;
        case "email":
            flag = validate(validationType, $("#" + controlId).val(), controlId);
            break;
        case "radio":
            flag = validate(validationType, $("#" + controlId).val(), controlId);
            break;
        case "checkbox":
            flag = validate(validationType, $("#" + controlId).val(), controlId);
            break;
        case "time":
            flag = validate(validationType, $("#" + controlId).val(), controlId);
            break;
        case "datetime-local":
            flag = validate(validationType, $("#" + controlId).val(), controlId);
            break;
        case "range":
            flag = validate(validationType, $("#" + controlId).val(), controlId);
            break;
        case "url":
            if ($("#" + controlId).val() != "") {
                validationType = "url";
            }

            flag = validate(validationType, $("#" + controlId).val(), controlId);
            break;

    }
    if (tagName === 'SELECT') {
        if (parseInt($("select#" + controlId).prop('selectedIndex')) > 0) {
            $("#" + controlId).removeClass("error");
            $("#" + controlId).parent().parent().find("span.errormsg").remove();
            flag = true;
        } else {
            $("#" + controlId).addClass("error");
            if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
            $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Please select. </span>");
            flag = false;
        }
    }


    if (tagName === 'TEXTAREA') {
        if ($("#" + controlId).val() === '') {
            $("#" + controlId).addClass("error");
            if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
            $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required </span>");
            flag= false;
        } else {
            $("#" + controlId).removeClass("error");
            $("#" + controlId).parent().parent().find("span.errormsg").remove();
            flag= true;
        }
    }

   
    if (inputType === 'radio' || inputType === 'checkbox') {

        flag = validate(validationType, null, controlId, inputType, nameAttr);
    }

    return flag;
}

function validate(validationType, value, controlId, inputType, nameAttr) {
   
    switch (validationType) {
        case "isnumber":
            if ((value.trim()) === '') {
                return true;
            }
            else {
                var number = /[0-9]/g;
                if ((value).match(number)) {

                    $("#" + controlId).removeClass("error");
                    if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                        $("#" + controlId).parent().parent().find("span.errormsg").remove();

                    ret = false;
                }
                else {

                    $("#" + controlId).addClass("error");
                    $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Enter Numbers Only </span>");
                    ret = true;
                }
            }
            break;

        case "isemail":
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if ((value) !== '' && !re.test(value)) {
                $("#" + controlId).addClass("error");
                if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Please enter valid Email </span>");
                return false;
            } else {
                $("#" + controlId).removeClass("error");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                return true;
            }

            break;


        case "range":
            if ((value) === '' || (parseInt(value) < 1 || parseInt(value) > 100)) {
                $("#" + controlId).addClass("error");
                return false;
            } else {
                $("#" + controlId).removeClass("error");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                return true;
            }

            break;
        case "isreguler":

            break;

        case "required":
            if ((value) === '') {
                $("#" + controlId).addClass("error");
                if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required </span>");
                return false;
            } else {
                $("#" + controlId).removeClass("error");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                return true;
            }
        case "isemailrequired":
            if ((value) === '') {
                $("#" + controlId).addClass("error");
                if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required </span>");
                return false;
            } else {
                $("#" + controlId).removeClass("error");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!re.test(value)) {
                    $("#" + controlId).addClass("error");
                    if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                        $("#" + controlId).parent().parent().find("span.errormsg").remove();
                    $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Please enter valid Email </span>");
                    return false;
                } else {
                    $("#" + controlId).removeClass("error");
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                    return true;
                }

                return true;
            }
        case "isdate required":
            var flag = isValidDate(value);
            if (value === "") {
                $("#" + controlId).addClass("error");
                if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required </span>");
                return false;
            }
            else if (!flag) {
                $("#" + controlId).addClass("error");
                if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Invalid date. </span>");
                return false;
            } else {
                $("#" + controlId).removeClass("error");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                return true;
            }
            break;

        case "isdate":
            var flag = isValidDate(value);
            if (!flag) {
                $("#" + controlId).addClass("error");
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Invalid date. </span>");
                return false;
            } else {
                $("#" + controlId).removeClass("error");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                return true;
            }
            break;

        case "compareSet1":
            $("#" + controlId).removeClass("error");
            $("#" + controlId).parent().parent().find("span.errormsg").remove();
            var flag = true;
            flag = isValidDate(value);
            if (!flag) {
                $("#" + controlId).addClass("error");
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Invalid date. </span>");
                flag = false;
                return flag;
            } else {

                if (compareSet1value1 == "00-00-00") {
                    compareSet1value1 = value;
                    compareSet1controlIdName = controlId;
                }
                else {
                    compareSet1value2 = value;
                    if (compareSet1value1 != "" && compareSet1value2 == "") {
                        $("#" + controlId).addClass("error");
                        $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Date Required. </span>");
                        flag = false;
                    }
                    else if (compareSet1value1 == "" && compareSet1value2 != "") {
                        $("#" + compareSet1controlIdName).addClass("error");
                        $("#" + compareSet1controlIdName).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Date Required. </span>");
                        flag = false;
                    }
                    else if (compareSet1value1 > compareSet1value2) {
                        $("#" + controlId).addClass("error");
                        $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Invalid Date. </span>");
                        flag = false;
                    }
                    else {
                        $("#" + controlId).removeClass("error");
                        $("#" + controlId).parent().parent().find("span.errormsg").remove();
                    }
                }
                return flag;
            }

            break;
        case "compareSet2":
            $("#" + controlId).removeClass("error");
            $("#" + controlId).parent().parent().find("span.errormsg").remove();
            var flag = true;
            flag = isValidDate(value);
            if (!flag) {
                $("#" + controlId).addClass("error");
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Invalid date. </span>");
                flag = false;
                return flag;
            } else {

                if (compareSet2value1 == "00-00-00") {
                    compareSet2value1 = value;
                    compareSet2controlIdName = controlId;
                }
                else {
                    compareSet2value2 = value;
                    if (compareSet2value1 != "" && compareSet2value2 == "") {
                        $("#" + controlId).addClass("error");
                        $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Date Required. </span>");
                        flag = false;
                    }
                    else if (compareSet2value1 == "" && compareSet2value2 != "") {
                        $("#" + compareSet2controlIdName).addClass("error");
                        $("#" + compareSet2controlIdName).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Date Required. </span>");
                        flag = false;
                    }
                    else if (compareSet2value1 > compareSet2value2) {
                        $("#" + controlId).addClass("error");
                        $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Invalid Date. </span>");
                        flag = false;
                    }
                    else {
                        $("#" + controlId).removeClass("error");
                        $("#" + controlId).parent().parent().find("span.errormsg").remove();
                    }
                }
                return flag;
            }

            break;
        //case "isdate":
        //    var flag = isValidDate(value);
        //    if ((value) === '' || !flag) {
        //        $("#" + controlId).addClass("error");
        //        if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
        //            $("#" + controlId).parent().parent().find("span.errormsg").remove();
        //        if (!flag)
        //            $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Invalid date. </span>");
        //        else
        //            $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required </span>");
        //        return false;
        //    } else {
        //        $("#" + controlId).removeClass("error");
        //        $("#" + controlId).parent().parent().find("span.errormsg").remove();
        //        return true;
        //    }
        //    break;

        case "ischaronly":
            var filter = /[a-zA-Z]/;
            if (!filter.test(value)) {
                $("#" + controlId).addClass("error");
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Enter Character Only  </span>");
                return false;
            } else {
                $("#" + controlId).removeClass("error");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                return true;
            }
            break;

        case "requirechk2":
            if ($('input[type=' + inputType + '][name=' + nameAttr + ']:checked').length < 2) {
                $('input[type=' + inputType + '][name=' + nameAttr + ']').addClass("error-r");
                if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required </span>");
                return false;
            }

            else {
                $('input[type=' + inputType + '][name=' + nameAttr + ']').removeClass("error-r");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                return true;
            }
            break;

        case "requirechk":
            if ($('input[type=' + inputType + '][name=' + nameAttr + ']:checked').length < 1) {
                $('input[type=' + inputType + '][name=' + nameAttr + ']').addClass("error-r");
                if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required </span>");
                return false;
            }

            else {
                $('input[type=' + inputType + '][name=' + nameAttr + ']').removeClass("error-r");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                return true;
            }
            break;

        case "requiradio":
            if ($('input[type=' + inputType + '][name=' + nameAttr + ']:checked').length < 1) {
                $('input[type=' + inputType + '][name=' + nameAttr + ']').addClass("error-r");
                if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required </span>");
                return false;
            }

            else {
                $('input[type=' + inputType + '][name=' + nameAttr + ']').removeClass("error-r");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                return true;
            }
            break;
        case "url":
            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);
            var t = $("#" + controlId).val();

            if (t.match(regex)) {
                $('input[type=' + inputType + '][name=' + nameAttr + ']').removeClass("error-r");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).removeClass("error");
            } else {
                if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Please enter valid url </span>");
            }
            break;
        case "rangerequired":
            value = $("#" + controlId).next().val()
            if ((value) === '' || (parseInt(value) < 1 || parseInt(value) > 100 || value === '0')) {
                if ($("#" + controlId).parent().parent().find("span.errormsg").length > 0)
                    $("#" + controlId).parent().parent().find("span.errormsg").remove();
                $("#" + controlId).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required </span>");
                return false;
            } else {
                $("#" + controlId).removeClass("error");
                $("#" + controlId).parent().parent().find("span.errormsg").remove();
                return true;
            }

            break;

        default:
            return true;


    }
}

function isValidDate(date) {
    if (date != "") {
        var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);
        if (matches == null) return false;
        var d = matches[2];
        var m = matches[1] - 1;
        var y = matches[3];
        var composedDate = new Date(y, m, d);
        return composedDate.getDate() == d &&
                composedDate.getMonth() == m &&
                composedDate.getFullYear() == y;
    }
    else
        return true;
}

/*Validate if Currency is selected for corresponding costvalues or viceversa*/
function validatecostcurrencycontrols(cost, unit, divid) {
    var isValid = true;

    var costvalue = $("#" + cost).val();
    var unitvalue = $("#" + unit + " option:selected").html() === '---Select Currency---' ? null : $("#" + unit + " option:selected").html();

    $("#" + unit).removeClass("error");
    $("#" + divid).attr("style", "padding-top: 23px");
    $("#" + unit).parent().parent().find("span.errormsg").remove();
    $("#" + cost).removeClass("error");
    $("#" + cost).parent().parent().find("span.errormsg").remove();

    if ((costvalue != "0.00" && costvalue != "0" ) && unitvalue == null) {
        $("#" + unit).addClass("error");
        $("#" + divid).attr("style", "padding-top: 5px");
        $("#" + unit).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Please select. </span>");
        isValid = false;
    }

    if ((costvalue == "0.00" || costvalue == "0") && unitvalue !=null) {
        $("#" + cost).addClass("error");
        $("#" + cost).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Data Required. </span>");
        isValid = false;
    }

    return isValid;
}

/*Validate if Listvalue is selected for corresponding costvalues or viceversa*/
function validateUnitcontrols(cost, unit, divid) {
    var isValid = true;

    var costvalue = $("#" + cost).val();
    var unitvalue = $("#" + unit).val();

    $("#" + unit).removeClass("error");
    $("#" + divid).attr("style", "padding-top: 23px");
    $("#" + unit).parent().parent().find("span.errormsg").remove();
    $("#" + cost).removeClass("error");
    $("#" + cost).parent().parent().find("span.errormsg").remove();

    if ((costvalue != "0" && costvalue != "" )&& unitvalue == "0") {
        $("#" + unit).addClass("error");
        $("#" + divid).attr("style", "padding-top: 5px");
        $("#" + unit).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Please select. </span>");
        isValid = false;
    }

    if ((costvalue == "0" || costvalue == "") && unitvalue != "0") {
        $("#" + cost).addClass("error");
        $("#" + cost).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Data Required. </span>");
        isValid = false;
    }

    return isValid;
}

/*Validate if Listvalue and Currency are selected for corresponding costvalues or viceversa*/
function validatecostcurrencyTypecontrols(cost, type,divtypeid, unit, divid) {
    var isValid = true;

    var costvalue = $("#" + cost).val();
    var unitvalue = $("#" + unit + " option:selected").html() === '---Select Currency---' ? null : $("#" + unit + " option:selected").html();
    var typevalue = $("#" + type).val();

    $("#" + unit).removeClass("error");
    $("#" + divid).attr("style", "padding-top: 23px");
    $("#" + unit).parent().parent().find("span.errormsg").remove();
    $("#" + cost).removeClass("error");
    $("#" + cost).parent().parent().find("span.errormsg").remove();
    $("#" + type).removeClass("error");
    $("#" + divtypeid).attr("style", "padding-top: 23px");
    $("#" + type).parent().parent().find("span.errormsg").remove();

    if ((costvalue != "0.00" && costvalue != "0" && costvalue != "") && typevalue == 0) {
        $("#" + type).addClass("error");
        $("#" + divtypeid).attr("style", "padding-top: 5px");
        $("#" + type).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Please select. </span>");
        isValid = false;
    }

    if ((costvalue != "0.00" && costvalue != "0" && costvalue != "") && unitvalue == null) {
        $("#" + unit).addClass("error");
        $("#" + divid).attr("style", "padding-top: 5px");
        $("#" + unit).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Please select. </span>");
        isValid = false;
    }

    

    if ((costvalue == "0.00" || costvalue == "0" || costvalue == "") && unitvalue != null) {
        $("#" + cost).addClass("error");
        $("#" + cost).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Data Required. </span>");
        isValid = false;
    }

    else if ((costvalue == "0.00" || costvalue == "0" || costvalue == "") && typevalue != 0) {
        $("#" + cost).addClass("error");
        $("#" + cost).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Data Required. </span>");
        isValid = false;
    }

    return isValid;
}


/*Validate startdate and EndDate to check for comparision*/
function validateDateControls(startDate, endDate, targetSdate, targetEdate, startDateName, endDateName, targetSdateName, targetEdateName)
{
    var isValid = true;
    var errormsg = "";
    var startDateValue = $("#" + startDate).val();
    var endDateValue = $("#" + endDate).val();
   

    $("#" + startDate).removeClass("error");
    $("#" + startDate).parent().parent().find("span.errormsg").remove();
    $("#" + endDate).removeClass("error");
    $("#" + endDate).parent().parent().find("span.errormsg").remove();
   
    if (!isValidDate(startDateValue)) {
        $("#" + startDate).addClass("error");
        $("#" + startDate).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Invalid date. </span>");
        isValid = false;
    }
    if (!isValidDate(endDateValue)) {
        $("#" + endDate).addClass("error");
        $("#" + endDate).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Invalid date. </span>");
        isValid = false;
    }
    
    if (isValid && (startDateValue != "" || endDateValue != ""))
   {
     if (new Date(startDateValue).setHours(0, 0, 0, 0) != "" && new Date(endDateValue).setHours(0, 0, 0, 0) == "") {
           $("#" + endDate).addClass("error");
           $("#" + endDate).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Date Required. </span>");
           isValid = false;
       }
        else if (new Date(startDateValue).setHours(0, 0, 0, 0) == "" && new Date(endDateValue).setHours(0, 0, 0, 0) != "") {
           $("#" + startDate).addClass("error");
           $("#" + startDate).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Date Required. </span>");
           isValid = false;
       }
       else if (targetSdate != null && targetEdate != null) {
           var targetSdateValue = $("#" + targetSdate).val();
           var targetEdateValue = $("#" + targetEdate).val();
           if (new Date(startDateValue).setHours(0, 0, 0, 0) < new Date(targetSdateValue).setHours(0, 0, 0, 0)) {
               errormsg = startDateName + " should be greater than " + targetSdateName;
               $("#" + startDate).addClass("error");
               $("#" + startDate).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;" + errormsg + ". </span>");
               isValid = false;
           }
           if (new Date(endDateValue).setHours(0, 0, 0, 0) > new Date(targetEdateValue).setHours(0, 0, 0, 0)) {
               errormsg = endDateName + " should be less than " + targetEdateName;
               $("#" + startDate).addClass("error");
               $("#" + startDate).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;" + errormsg + ". </span>");
               isValid = false;
           }
       }
       else if (new Date(startDateValue).setHours(0, 0, 0, 0) > new Date(endDateValue).setHours(0, 0, 0, 0)) {
           $("#" + endDate).addClass("error");
           $("#" + endDate).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;Invalid Date. </span>");
           isValid = false;
       }
     
      
    }
   return isValid;
}

/*Validate dated with targetDates to check for comparision*/
function validateTargetDateControls(cdate, targetDate, cdateName, targetDateName) {
    var isValid = true;
    var cdateValue = $("#" + cdate).val();
    var targetDateValue = $("#" + targetDate).val();
    $("#" + cdate).removeClass("error");
    $("#" + cdate).parent().parent().find("span.errormsg").remove();
    $("#" + targetDate).removeClass("error");
    $("#" + targetDate).parent().parent().find("span.errormsg").remove();
    if (cdateValue > targetDateValue) {
        var errormsg = cdateName + " should be less than " + targetDateName;
        $("#" + cdate).addClass("error");
        $("#" + cdate).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;" + errormsg + ". </span>");
        isValid = false;
    }
    
   return isValid;

}

function TextBoxOnlyDigits(SelectorId) {

    $(SelectorId).on("input keypress keydown keyup", function (e) {

        var valid = /^\d{0,14}?$/.test(this.value),
            val = this.value;

        if (!valid) {
            console.log("Invalid input!");
            this.value = val.substring(0, val.length - 1);
        }
        if (e.shiftKey || e.which == 109 || e.which == 189 || e.which == 187 || e.ctrlKey) {
            e.preventDefault();
        }
    });

}

function TextBoxOnlyDigitswithdecimals(SelectorId) {

    $(SelectorId).on("input keypress", function (e) {

        var valid = /^\d{0,14}(\.\d{0,2})?$/.test(this.value),
            val = this.value;

        if (!valid) {
            console.log("Invalid input!");
            this.value = val.substring(0, val.length - 1);
        }
        if (e.shiftKey) {
            e.preventDefault();
        }
    });

}

function ValidatePhoneNumbers(Code1, Phone1, Code2, Phone2) {
    debugger;
    var isValid = true;
    var errorMsg = '';
    $("#" + Code1).removeClass("error");
    $("#" + Code1).parent().parent().find("span.errormsg").remove();
    $("#" + Code2).removeClass("error");
    $("#" + Code2).parent().parent().find("span.errormsg").remove();
    if ($("#" + Phone1).val() != "" && $("#" + Phone2).val()) {
        if ($("#" + Code1).val() + $("#" + Phone1).val() == $("#" + Code2).val() + $("#" + Phone2).val()) {
            //errorMsg = errorMsg + "\n" + "\u2022" + "Phone 1 and Phone 2 Should not be Equal";
            errorMsg = errorMsg + "\n" + "Ensure that all Phone Numbers must be Unique";
            $("#" + Code2).addClass("error");
            //$("#" + Code2).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;" + errorMsg + ". </span>");
            isValid = false;
        }
    }
    if (errorMsg != '') {
        flag = false;
        ErrorAlert(errorMsg);

    }
    return isValid;
}

function RestrictAmountFieldWithFloat(SelectorId) {

    $(SelectorId).on("input keypress keydown keyup", function (e) {
        var valid = /^\d{0,12}(\.\d{0,4})?$/.test(this.value),
            val = this.value;

        if (!valid) {
            console.log("Invalid input!");
            this.value = val.substring(0, val.length - 1);
        }
        if (e.shiftKey || e.which == 109 || e.which == 189 || e.which == 187 || e.keyCode == 17 || (e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 189 && e.which != 110 && e.keyCode && !(e.keyCode >= 96 && e.keyCode <= 105)) || ((e.key == ".") && (val.indexOf(e.key) > -1))) {
            e.preventDefault();
        }
    });

}