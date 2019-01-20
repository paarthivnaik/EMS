


$(document).ready(function () {

    $(".modal").attr("data-backdrop", "static");
    var apiBaseUrl = 'http://localhost:64075/api/';
});


/**
  * Post Section data to API
 */
function post(role, route, mode) {
    var resultID = 0;
    var arr = [];
    var i = 0;
    var apiBaseUrl = 'http://localhost:64075/api/';
    var obj = new Object();
    $("[data-role='" + role + "'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
        if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-listentry")) {
            var selVal = $("#" + this.id + " option:selected").val() === '0' ? null : $("#" + this.id + " option:selected").val();
            var selText = $("#" + this.id + " option:selected").html() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selVal;
            obj[$(this).data('attr') + 'Value'] = selText;
        }
        else if ($(this).prop("tagName") === 'DIV') {
            obj[$(this).data('attr')] = $(this).next().find('.note-editable').html();
        }
        else if ($(this)[0].hasAttribute("data-flags")) {
            var res = $(this).val().split(':');
            obj[$(this).data('attr')] = res[0].trim();
            obj[$(this).data('flags')] = res[1].trim();
        }
        else if ($(this)[0].hasAttribute("data-currency")) {
            var selText = $("#" + this.id + " option:selected").html() === '---Select Currency---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selText;
        }
        else if ($(this).is(':checkbox') || $(this).is(':radio')) {
            obj[$(this).data('attr')] = $(this).prop('checked');
        }
    });

    /* Read Mandatory section */

    $("[data-role='mandatory-sec'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
    });
    console.log(obj);

    $.ajax({
        url: apiBaseUrl + route,
        //headers: {
        //    'ORSUS': getCookie('ORSUS')
        //},
        type: "POST",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (data) {
            resultID = data;
            var res = data;
            debugger;
            if (resultID.hasOwnProperty("m_Item1")) {
                res = resultID.m_Item1;
            }
            if (res[0] > 0) {
                if (mode === 'Insert') {
                    ToastSuccess('Your Information Saved Successfully.')
                }
                else if (mode === 'Update') {
                    ToastSuccess('Your Information Updated Successfully.')
                }
                else if (mode === 'UpdateNew') {
                    ToastSuccess('Your Information Updated Successfully.');
                    ResetPage(role);
                }
                else if (mode === 'InsertNew') {
                    ToastSuccess('Your Information Saved Successfully.')
                    ResetPage(role);
                }
            }
            else if (res === -1) {
                RecordExistsAlert();
            }
            else {
                TransactionFailedAlert();
            }
        },
        error: function () {
            TransactionFailedAlert();
            resultID = 0;
        }
    });
    return resultID;
}

function postPopup(role, cfrole, route, tableId, cfContextName) {
    var arr = [];
    var i = 0;
    if ($('#cfsection').length == 1) {
        var recordId = GetQueryStringValues(location.href, 'keyId');
        $("[data-role='" + cfrole + "'] [data-customfieldid]").each(function () {
            arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": $(this).val() };
            arr[i][tableId] = parseInt(recordId);
            i = i + 1;
        });
    }
    var obj = new Object();
    $("[data-role='" + role + "'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
        if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-listentry")) {
            var selVal = $("#" + this.id + " option:selected").val() === '0' ? null : $("#" + this.id + " option:selected").val();
            var selText = $("#" + this.id + " option:selected").html() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selVal;
            obj[$(this).data('attr') + 'Value'] = selText;
        }
        else if ($(this).prop("tagName") === 'DIV') {
            obj[$(this).data('attr')] = $(this).next().find('.note-editable').html();
        }
        else if ($(this)[0].hasAttribute("data-flags")) {
            var res = $(this).val().split(':');
            if (res != undefined && res != "" && res.length > 0) {
                obj[$(this).data('attr')] = res[0].trim();
                obj[$(this).data('flags')] = res[1].trim();
            }
        }
        else if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-text")) {
            var selVal = $("#" + this.id + " option:selected").html() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selVal;
        }
        else if ($(this).prop("type") === 'file') {
            obj[$(this).data('attr')] = $(this).text();
        }
        else if ($(this).is(':checkbox') || $(this).is(':radio')) {
            obj[$(this).data('attr')] = $(this).prop('checked');
        }

    });

    /* Read Mandatory section */

    $("[data-role='mandatory-sec'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
    });


    //obj['RecordOwner'] = getCookie('UserId');
    //obj['CreatedBy'] = getCookie('UserId');
    //obj['ModifiedBy'] = getCookie('UserId');
    obj[cfContextName] = arr;

    console.log(obj);

    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: obj,
        async: false,
        success: function (data) {
            resultID = data;
            var res = data;
            if (resultID.hasOwnProperty("m_Item1")) {
                res = resultID.m_Item1;
            }
            if (res > 0) {
                InsertedSuccessfullyAndCloseAlert();
            }
            else if (res === -1) {
                RecordExistsAlert();
            }
            else {
                TransactionFailedAlert();
            }
        },
        error: function () {
            ErrorAlert('Transaction failed.');
            resultID = 0;
        }
    });
    return resultID;
}

function postUpdate(role, cfrole, route, tableId, cfContextName) {
    var arr = [];
    var i = 0;
    if ($('#cfsection').length == 1) {
        var recordId = GetQueryStringValues(location.href, 'keyId');
        $("[data-role='" + cfrole + "'] [data-customfieldid]").each(function () {
            arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": $(this).val() };
            arr[i][tableId] = parseInt(recordId);
            i = i + 1;
        });
    }
    var obj = new Object();
    $("[data-role='" + role + "'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
        if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-listentry")) {
            var selVal = $("#" + this.id + " option:selected").val() === '0' ? null : $("#" + this.id + " option:selected").val();
            var selText = $("#" + this.id + " option:selected").html() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selVal;
            obj[$(this).data('attr') + 'Value'] = selText;
        }
        else if ($(this).prop("tagName") === 'DIV') {
            obj[$(this).data('attr')] = $(this).next().find('.note-editable').html();
        }
        else if ($(this)[0].hasAttribute("data-flags")) {
            var res = $(this).val().split(':');
            obj[$(this).data('attr')] = res[0].trim();
            obj[$(this).data('flags')] = res[1].trim();
        }
        else if ($(this)[0].hasAttribute("data-country")) {
            var selVal = $("#" + this.id + " select option:selected").val() === '---Select---' ? null : $("#" + this.id + " select option:selected").val();
            obj[$(this).data('attr')] = selVal;

        }
        else if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-text")) {
            var selVal = $("#" + this.id + " option:selected").html() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selVal;
        }
        else if ($(this).prop("type") === 'file') {
            obj[$(this).data('attr')] = $(this).text();
        }
        else if ($(this).is(':checkbox')) {
            obj[$(this).data('attr')] = $(this).prop('checked');
        }
        else if ($(this).is(':radio')) {
            var value = $("input:radio[name='" + $(this).prop("name") + "']:checked").val();
            if (value == 0) {
                value = false;
            }
            else if (value == 1) {
                value = true;
            }
            obj[$(this).data('attr')] = value;
        }
        else if ($(this)[0].hasAttribute("data-time")) {
            var Time = $(this).val().trim();
            if (Time != "") {
                var hr = Time.split(":")[0];
                var mm = (Time.split(":")[1]).split(" ")[0];
                var mode = (Time.split(":")[1]).split(" ")[1].trim();

                if (mode === "PM") {
                    hr = parseInt(hr) + 12;
                }
                Time = hr + ":" + mm + ":" + "00";
                obj[$(this).data('attr')] = Time;
            }
            //var Time = $(this).val();
            //var hr = Time.split(":")[0];
            //var mm = (Time.split(":")[1]).split(" ")[0];
            //var mode = (Time.split(":")[1]).split(" ")[1].trim();

            //if(mode === "PM"){
            //    hr=parseInt(hr)+12;
            //}
            //Time = hr +":"+mm+":"+"00";
            //obj[$(this).data('attr')] =Time;
        }
        else if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-multiselect")) {
            obj[$(this).data('attr')] = $(this).val();
        }

    });

    /* Read Mandatory section */

    $("[data-role='mandatory-sec'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
    });

    obj['TenantId'] = getCookie('TenantId');
    obj['UserId'] = getCookie('UserId');
    obj[cfContextName] = arr;

    console.log(obj);

    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: obj,
        async: false,
        success: function (data) {
            resultID = data;
            var res = data;
            if (resultID.hasOwnProperty("m_Item1")) {
                res = resultID.m_Item1;
            }
            if (res > 0) {
                UpdatedSuccessfullyRefreshAlert();
            }
            else if (res === -1) {
                RecordExistsAlert();
            }
            else {
                TransactionFailedAlert();
            }

        },
        error: function () {
            ErrorAlert('Transaction failed.');
            resultID = 0;
        }
    });
    return resultID;
}
/**
  * Post Section data to API
 */
function postToGlobal(role, route, ableId, mode) {
    var arr = [];
    var i = 0;

    var obj = new Object();
    $("[data-role='" + role + "'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
        if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-text")) {
            var selText = $("#" + this.id + " option:selected").html() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selText;
        }
        else if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-listentry")) {
            var selVal = $("#" + this.id + " option:selected").val() === '0' ? null : $("#" + this.id + " option:selected").val();
            var selText = $("#" + this.id + " option:selected").html() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selVal;
            obj[$(this).data('attr') + 'Value'] = selText;
        }
        else if ($(this).prop("tagName") === 'DIV') {
            obj[$(this).data('attr')] = $(this).next().find('.note-editable').html();
        }
        else if ($(this)[0].hasAttribute("data-flags")) {
            var res = $(this).val().split(':');
            obj[$(this).data('attr')] = res[0].trim();
            obj[$(this).data('flags')] = res[1].trim();
        }

        else if ($(this).is(':checkbox') || $(this).is(':radio')) {
            obj[$(this).data('attr')] = $(this).prop('checked');
        }

    });

    /* Read Mandatory section */

    $("[data-role='mandatory-sec'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
    });

    obj['TenantId'] = getCookie('TenantId');
    obj['TenantID'] = getCookie('TenantId');
    obj['UserId'] = getCookie('UserId');
    obj['RecordOwner'] = getCookie('UserId');
    obj['CreatedBy'] = getCookie('UserId');
    if (mode === 'Insert') {
        obj['VersionNumber'] = 1;
        obj['ViewAccess'] = true;
        obj['Status'] = 'Active';
        obj['CreatedDate'] = GetCurrentDate();
    }
    else {
        obj['LastModifiedBy'] = getCookie('UserId');
        obj['ModifyDate'] = GetCurrentDate();
    }



    console.log(obj);

    $.ajax({
        url: globalApiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: obj,
        async: false,
        success: function (data) {
            resultID = data;
            var res = data;
            if (resultID.hasOwnProperty("m_Item1")) {
                res = resultID.m_Item1;
            }
            if (res > 0) {
                if (mode === 'Insert') {
                    InsertedSuccessfullyAlert();    // Insert Alert
                }
                else if (mode === 'Update') {
                    UpdatedSuccessfullyAlert(); // Update Alert
                }
                else if (mode === 'UpdateRefresh') {
                    UpdatedSuccessfullyRefreshAlert();  // Update Alert & then Refresh Page
                }
                else if (mode === 'InsertAndClose') {
                    InsertedSuccessfullyAndCloseAlert();  // Insert and Close the modal popup
                }
            }
            else if (res === -1) {
                RecordExistsAlert();
            }
            else {
                TransactionFailedAlert();
            }
        },
        error: function () {
            TransactionFailedAlert();
            resultID = 0;
        }
    });
    return resultID;
}



/**
  * Get data from the API and to controls

 */
function bind(route, sec) {
    var hresult = "";
    $.ajax({
        url: route,
        type: 'GET',
        async: false,
        success: function (result) {
            //for - flatten the inner object custom fields
            hresult = result;
            for (var property in result) {
                if ($.isArray(result[property])) {
                    for (var j = 0; j < result[property].length; j++) {
                        if (result[property][j].FieldName != undefined) {
                            result["cst" + result[property][j].FieldName.replace(" ", "")] = result[property][j].FieldValue;
                        }
                        //alert(result[property][j].FieldName);
                    }
                }
            }

            var param = '[data-role=' + sec + '] [data-attr]';
            $(param).each(function () {
                var t = $(this).data('attr');
                var tt = t.split('.');
                var propval = result;
                for (i = 0; i < tt.length; i++) {
                    propval = propval[tt[i]];
                }


                if ($(this).val(propval).val() != null && $(this).val(propval).val().indexOf(":Deleted") != -1) {

                    $(this).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required</span>");
                    $(this).addClass("error");
                    $(this).attr('data-valt', 'required');
                }

                if ($(this).is('select')) {
                    debugger;
                    if (($(this).prop("tagName") === 'SELECT') && (document.getElementById(this.id).multiple == true)) {
                        var multiSelList = propval.split(',');
                        if (multiSelList.length > 1) {
                            $(this).val(multiSelList);
                        }
                        else {
                            $(this).val(multiSelList[0]);
                        }
                    }
                    else if ($(this)[0].hasAttribute("data-currency")) {
                        if (propval != null) {
                            $("#" + this.id + " option:contains(" + propval + ")").attr('selected', 'selected');
                        }
                        else {
                            $("#" + this.id + " option:contains('---Select Currency---')").attr('selected', 'selected');
                        }

                    }
                        //else if ($(this)[0].hasAttribute("data-countryflgs")) {
                        //    
                        //    alert("1");
                        //    if (propval != null) {
                        //        $('#' + this.id).msDropdown().data("dd").setIndexByValue(propval);
                        //    }

                        //}
                    else if ($(this)[0].hasAttribute("data-countryflgs")) {


                        if (propval != null) {
                            $('#' + this.id).msDropdown().data("dd").setIndexByValue(propval);
                        }

                    }
                    else {
                        debugger;

                        if (propval != null && propval != undefined) {
                            $(this).val(propval.toString().trim());
                        }
                        else if (propval == null) {
                            $(this).val('0');
                        }
                    }

                } else if ($(this).is(':checkbox') || $(this).is(':radio')) {
                    //NEW
                    if (typeof propval == "string") {
                        var cbLrdLStatus = propval.split(',');
                        if (cbLrdLStatus.length > 1) {
                            for (var cr = 0; cr < $("[name=" + this.name + "]").length; cr++) {
                                $("#" + this.name + cr).attr("checked", eval(cbLrdLStatus[cr]));
                            }
                        }
                        else {
                            $(this).attr("checked", eval(cbLrdLStatus[0]));
                        }
                    }
                    else {
                        $(this).attr("checked", eval(propval));
                    }

                } else if ($(this).is(':checkbox') || $(this).is(':radio') && $(this).prop("name")) {
                    $(this).attr("checked", propval);
                }
                else if (($(this).attr('type') === 'date')) {
                    if (propval !== null && propval !== undefined) {
                        var d = new Date(propval);
                        var date = d.getDate() <= 9 ? ('0' + d.getDate()) : d.getDate();
                        var month = d.getMonth() < 9 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
                        var year = d.getFullYear();
                        $(this).val(year + "-" + month + "-" + date);
                    }
                }
                else if (($(this).attr('class') === 'summernote1')) {
                    $(this).next().find('.note-editable').html(propval);
                }




                else if ($(this)[0].hasAttribute("data-flags")) {
                    if (propval != null) {

                        $('#' + this.id).intlTelInput("setCountry", propval.toLowerCase().trim());
                        $(this).val(propval + ' : ' + result[$($(this)[0]).data('flags')]);

                    }
                }
                else if ($(this).attr('type') === 'file') {
                    $(this).text(propval);
                }
                else if (($(this).hasClass('datepicker'))) {
                    if (propval !== null && propval !== undefined) {
                        var d = new Date(propval);
                        var date = d.getDate() <= 9 ? ('0' + d.getDate()) : d.getDate();
                        var month = d.getMonth() < 9 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
                        var year = d.getFullYear();
                        $(this).val(month + "/" + date + "/" + year);
                    }
                }
                else
                    $(this).val(propval);
            });
            for (var property in result) {
                if ($.isArray(result[property])) {

                    for (var j = 0; j < result[property].length; j++) {
                        if (result[property][j].FieldName != undefined) {
                            //NEW
                            if ($("[name=" + "cst" + result[property][j].FieldName.replace(" ", "") + "]").is(':checkbox') || $("[name=" + "cst" + result[property][j].FieldName.replace(" ", "") + "]").is(':radio')) {
                                $("#cst" + result[property][j].FieldName.replace(" ", "") + "0").data('keyid', result[property][j].KeyCFID);
                            }
                            else {
                                $("#cst" + result[property][j].FieldName.replace(" ", "")).data('keyid', result[property][j].KeyCFID);
                            }

                        }

                        //OLD
                        //$("#cst" + result[property][j].FieldName.replace(" ", "")).data('keyid', result[property][j].KeyCFID);
                    }
                }
            }




        },
        error: function (data)
        { }
    });
    bindChildControl(hresult);
    bindChildLV(hresult);
}



function bindChildControl(Route) {

    if (Route !== undefined) {

        var rout = Route;
        $('[data-subload]')
        .each(function () {
            var countryid = $(this).data("subload");
            var id = this.id;
            BindCountryStates(countryid, id);
            $(this).val(rout[$(this).data("attr")]);
            $('#' + id).removeAttr('disabled');
        });
    }
}

function bindChildLV(Route) {
    if (Route !== undefined) {
        var rout = Route;
        $('[data-lv]')
        .each(function () {
            var lstEntryNameCtrl = $(this).data("lv");
            var id = this.id;
            var selText = $("#" + lstEntryNameCtrl + " option:selected").html() === '---Select---' ? null : $("#" + lstEntryNameCtrl + " option:selected").html();
            BindLVOnLE(selText, id);
            $(this).val(rout[$(this).data("attr")]);
            $('#' + id).removeAttr('disabled');
        });

    }
}

/**
     * Get only required data from web api and binds to form controls
     * 
     * @param {} apiURL     -- Web API URL
     * @returns {}          -- Void
     */
function bindRequiredData(route, role) {
    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: 'GET',
        async: false,
        success: function (result) {
            //for - flatten the inner object custom fields
            for (var property in result) {
                if ($.isArray(result[property])) {
                    for (var j = 0; j < result[property].length; j++) {
                        if (result[property][j].FieldName != undefined) {
                            result["cst" + result[property][j].FieldName.replace(" ", "")] = result[property][j].FieldValue;
                        }
                        //alert(result[property][j].FieldName);
                    }
                }
            }
            // $('[data-attr]').each(function () {
            $("[data-role='" + role + "'] [data-attr]").each(function () {
                var t = $(this).data('attr');
                var tt = t.split('.');
                var propval = result;
                for (i = 0; i < tt.length; i++) {
                    propval = propval[tt[i]];
                }
                if ($(this).is('select')) {
                    if (propval != null) {
                        $('#' + this.id).val(propval);
                    }
                    //$(this).change();

                } else if ($(this).is(':checkbox') || $(this).is(':radio')) {
                    $(this).attr("checked", propval);
                } else if ($(this).is(':checkbox') || $(this).is(':radio') && $(this).prop("name")) {
                    $(this).attr("checked", propval);
                }
                else if (($(this).attr('type') === 'date')) {
                    if (propval !== null && propval !== undefined) {
                        var d = new Date(propval);
                        var date = d.getDate() <= 9 ? ('0' + d.getDate()) : d.getDate();
                        var month = d.getMonth() < 9 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
                        var year = d.getFullYear();
                        $(this).val(year + "-" + month + "-" + date);
                    }
                }
                else if (($(this).attr('class') === 'summernote1')) {
                    $(this).next().find('.note-editable').html(propval);
                }
                else if ($(this)[0].hasAttribute("data-flags")) {
                    $(this).val(propval + ' : ' + result[$($(this)[0]).data('flags')]);
                }
                else
                    $(this).val(propval);
            });
            for (var property in result) {
                if ($.isArray(result[property])) {
                    for (var j = 0; j < result[property].length; j++) {
                        $("#cst" + result[property][j].FieldName.replace(" ", "")).data('keyid', result[property][j].KeyCFID);
                    }
                }
            }
        }
    });
}
/**
 * Get and Bind Listentry ListValues
 * 
 * @param {} listEntryNames -- List Entry names collection seperated by comma
 * @returns {} 
 */

function BindLELV(listEntryNames) {
    var listEntryNamesCollection = listEntryNames.split(',');

    $(listEntryNamesCollection).each(function (e) {
        $("." + listEntryNamesCollection[e]).html("<option value='0'>---Select---</option>");
    });
    $.ajax({
        url: '/api/ListValues/GetByListEntryName?listEntryName=' + listEntryNames,
        type: 'GET',
        async: false,
        success: function (data) {
            var optionhtml;
            $(data)
                .each(function (key, value) {

                    $(listEntryNamesCollection).each(function (k, v) {
                        if (value.ListEntryName === v) {
                            optionhtml = '<option value="' + value.ListValueID + '">' + value.ListValueName + '</option>';
                            $("." + v).append(optionhtml);
                        }

                    });
                });
        },
        error: function (error) {
            ErrorAlert('Error while fetching LELV data.');
        }
    });
}

function GetJsonFromApi(route) {
    var apiBaseUrl = 'http://localhost:64075/api/';
    var result = '';
    $.ajax({
        url: apiBaseUrl + route,
        type: "POST",
        data: {},
        dataType: "json",
        async: false,
        success: function (data, textStatus, xhr) {
            result = data;
        },
        error: function (xhr, textStatus, errorThrown) {
            ErrorAlert('Error while getting Json from API');
        }
    });
    return result;
}





function NotAuthorized() {
    swal({
        title: "Not Authorized",
        text: "You are not authorized to perform this action.",
        type: "warning"
    });
}


function GetQueryStringValues(URL, param) {
    var url = URL.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] === param) {
            return urlparam[1];
        }
    }
}

function getCookie(key) {
    //var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    //return keyValue ? keyValue[2] : null;

    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}


function PostJsonToApiStringify(route, dataToPost) {
    var result = '';
    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: dataToPost,
        dataType: "json",
        contentType: "application/json",
        async: false,

        success: function (data) {
            resultID = data;
            var res = data;

            if (resultID.hasOwnProperty("m_Item1")) {
                res = resultID.m_Item1;
            }

            if (res > 0) {
                // InsertedSuccessfullyAlert()
                result = 1;
                SuccessAlert('Your Information Saved Successfully.')
            }
            else if (res === -1) {
                result = -1;
                ErrorAlert('Record already exists.');
            }
            else if (res.length > 0) {
                result = res;
                SuccessAlert('Your Information Saved Successfully.')
            }
            else {
                ErrorAlert('Please Contact Administrator.');
            }
        },
        error: function () {
            ErrorAlert('Please Contact Administrator.');
            resultID = 0;
        }




        //success: function (data, textStatus, xhr) {
        //    result = data;
        //},
        //error: function (xhr, textStatus, errorThrown) {
        //    ErrorAlert(' Please Contact Administrator.');
        //}
    });
    return result;
}


//Confirm by Clicking OK Button 

function PostJsonToApiStringifyAsset(route, dataToPost, redirectURL) {
    var resultID = '';
    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: dataToPost,
        dataType: "json",
        contentType: "application/json",
        async: false,

        success: function (data) {
            resultID = data;
            var res = data;
            if (resultID.hasOwnProperty("m_Item1")) {
                res = resultID.m_Item1;
            }
            if (res > 0) {
                // InsertedSuccessfullyAlert()
                SuccessAlertClosePopup('Your Information Saved Successfully.', redirectURL)
            }
            else if (res === -1) {
                ErrorAlert('Record already exists.');
            }
            else {
                ErrorAlert('Please Contact Administrator.');
            }
        },
        error: function () {
            ErrorAlert('Please Contact Administrator.');
            resultID = 0;
        }





    });
    return resultID;
}

/**
 *   Sweet Alerts
 */
function InsertedSuccessfullyAlert() {
    swal({
        title: "Success Message.",
        text: "Your Information Saved Successfully",
        type: "success"
    });
}
function InsertedSuccessfullyAndCloseAlert() {
    swal({
        title: "Success Message.",
        text: "Your Information Saved Successfully",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        //cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        //closeOnCancel: false
    },
 function (isConfirm) {
     if (isConfirm) {
         $('.showSweetAlert').hide();
         $('#modal-container').modal('hide');
         $('.sweet-overlay').hide();
     } else {
     }
 });

}

function InsertedSuccessfullyAndRefreshAlert() {
    swal({
        title: "Success Message.",
        text: "Your Information Saved Successfully",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        //cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        //closeOnCancel: false
    },
 function (isConfirm) {
     if (isConfirm) {
         location.reload();
         //swal("Deleted!", "Your imaginary file has been deleted.", "success");
     } else {
         //swal("Cancelled", "Your imaginary file is safe :)", "error");
     }
 });
}

function UpdatedSuccessfullyAlert() {
    swal({
        title: "Success Message.",
        text: "Your Information Updated Successfully",
        type: "success"
    });
}

function UpdatedSuccessfullyRefreshAlert() {
    swal({
        title: "Success Message.",
        text: "Your Information Updated Successfully",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        //cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        //closeOnCancel: false
    },
   function (isConfirm) {
       if (isConfirm) {
           location.reload();
           //swal("Deleted!", "Your imaginary file has been deleted.", "success");
       } else {
           //swal("Cancelled", "Your imaginary file is safe :)", "error");
       }
   });
}

function UpdatedSuccessfullyAndCloseAlert() {
    swal({
        title: "Success Message.",
        text: "Your Information Updated Successfully",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
    },
 function (isConfirm) {
     if (isConfirm) {
         $('.showSweetAlert').hide();
         $('#modal-container').modal('hide');
         $('.sweet-overlay').hide();
     } else {
     }
 });

}


function RecordExistsAlert() {
    swal({
        title: "Record already exists.",
        text: "",
        type: "warning"
    });
}

function TransactionFailedAlert() {
    swal({
        title: "Transaction Failed.",
        text: "Please Contact Administrator",
        type: "error"
    });
}

function RecLevelSecuiritySuccessAlert() {
    swal({
        title: "Permission Assigned Successfully",
        text: "",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        //cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        //closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {
        $('.showSweetAlert').hide();
        $('#modal-container').modal('hide');
        $('.sweet-overlay').hide();
    } else {
    }
});

}

function Delete(route) {
    var msg = '';
    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        async: false,
        success: function (data) {
            msg = "Record(s) deleted successfully.";
        },
        error: function () {
            msg = "Error while deleting";
        }
    });
    return msg;
}

function AlertAndRoute(msg, route) {
    debugger;
    swal({
        title: msg,
        text: "",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        //cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        //closeOnCancel: false
    },
     function (isConfirm) {
         if (isConfirm) {
             window.location.href = route;
         } else {
         }
     });

}

/** 
  * Notification Alerts 
 */
function InsertNotification() {
    toastr.options = {
        "debug": false,
        "newestOnTop": false,
        "positionClass": "toast-top-center",
        "closeButton": true,
        "debug": false,
        "toastClass": "animated fadeInDown",

    };
    toastr.info('Data Inserted Successfully');
}

function UpdateNotification() {
    toastr.options = {
        "debug": false,
        "newestOnTop": false,
        "positionClass": "toast-top-center",
        "closeButton": true,
        "debug": false,
        "toastClass": "animated fadeInDown",

    };
    toastr.info('Data Updated Successfully');
}

/**
 * Get & bind List of Currency to dropdown
 * 
 * @returns {} 
 */
function BindCurrency(currency) {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: globalApiBaseUrl + "System/GetCurrencyNames",
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        data: "{}",
        async: false,
        dataType: "json",
        success: function (data) {
            var optionhtml = '<option value="0">---Select Currency---</option>';
            $.each(data,
                function (key, value) {
                    optionhtml += '<option value="' + data[key].CurrencyNames + '">' + data[key].CurrencyNames + '</option>';
                });
            $("." + currency).empty();
            $("." + currency).append(optionhtml);
        },
        error: function (error) {
            ErrorAlert("Error while fetching Countries data.");
        }
    });
}

function SimpleAlert(msg) {
    swal(msg, "");
}


/*** Simple Post Rec Lvl SEC*/
function postJsonData(route, jsondata) {
    var flag = 0;
    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        async: false,
        data: jsondata,
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            flag = 1;
            //SuccessAlert('Ownership updates done.')
        },
        error: function () {
            //ErrorAlert('Error while updating ownership.');
            flag = 0;
        }
    });
    return flag;
}




function BindCountries(country) {


    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: globalApiBaseUrl + "System/GetCountryNames",
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        data: "{}",
        async: false,
        dataType: "json",
        success: function (data) {
            var optionhtml = '<option value="0">---Select---</option>';

            $.each(data,
                function (key, value) {

                    // optionhtml += '<option value="' + data[key].CountryID + '">' + data[key].CountryName + '</option>';
                    optionhtml += '<option value="' + data[key].CountryID + '" data-image="../Scripts/CountryFlags/images/msdropdown/icons/blank.gif" data-imagecss="flag ' + data[key].CountryID.toLowerCase().trim() + '" data-title="' + data[key].CountryName + '">' + data[key].CountryName + '</option>';
                    //optionhtml += '<option value="' + data[key].CountryID + '" data-title="' + data[key].CountryName + '" data-image="CountryFlags/images/msdropdown/icons/blank.gif/blank.gif" data-imagecss="flag ad"></option>';

                });
            $("#" + country).empty();
            $("#" + country).append(optionhtml);
        },
        error: function (xhr, textStatus, errorThrown) {
            if (errorThrown == 'Unauthorized') {
                NotAuthorized();
            }
            else {
                ErrorAlert('Please Contact Administrator.');
            }
        }
    });
    $("#" + country).msDropdown();
}

function BindSlots(ele, assetId) {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: apiBaseUrl + "AssetSlots/GetAllSlots?assetId=" + assetId,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        data: "{}",
        async: false,
        dataType: "json",
        success: function (data) {
            var optionhtml = '<option value="0">---Select---</option>';
            $.each(data,
                function (key, value) {
                    optionhtml += '<option value="' + data[key].SlotNumber + '">' + data[key].AssetSlotName + '</option>';
                });
            $("#" + ele).empty();
            $("#" + ele).append(optionhtml);
        },
        error: function (error) {
            ErrorAlert("Error while fetching Asset Slots.");
        }
    });
}
/**
 * Get & bind List of States by country to dropdown
 * 
 * @param {} country 
 * @returns {} 
 */
function BindCountryStates(country, state) {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: globalApiBaseUrl + "System/GetCountryStateNames?coutryid=" + $("#" + country).val(),
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        data: "{}",
        async: false,
        dataType: "json",
        success: function (data) {
            var optionhtml = '<option value="0">---Select---</option>';
            //var flag = 0;
            if (data.length > 0) {
                $("#" + state).removeAttr('disabled');
                $.each(data,
                               function (key, value) {
                                   optionhtml += '<option value="' + data[key].StateID + '">' + data[key].StateName + '</option>';
                               });
            }
            else if ($("#" + country).val() !== "0") {
                optionhtml += '<option value="Other">Other</option>';
                //$("#" + state).prop('disabled', 'disabled');
                //flag = 1;
            }
            $("#" + state).empty();
            $("#" + state).append(optionhtml);
            //if (flag == 1)
            //{ $("#" + state).attr('readonly', 'readonly'); $("#" + state).attr('disabled', 'disabled'); }
        },
        error: function (error) {
            ErrorAlert("Error while fetching Country states data.");
        }
    });
}


/**
* Simple Post
*/
function SimplePost(role, cfrole, route, tableId, cfContextName) {
    var flag = 0;
    var arr = [];
    var i = 0;
    if ($('#cfsection').length == 1) {
        var recordId = GetQueryStringValues(location.href, 'keyId');
        $("[data-role='" + cfrole + "'] [data-customfieldid]").each(function () {

            //NEW CODE
            if (($(this).prop("tagName") === 'SELECT') && (document.getElementById(this.id).multiple == true)) {
                var values = "";
                var selVals = $(this).val();
                if ($(this).val() != null) {
                    for (var ms = 0; ms < $(this).val().length; ms++) {
                        if (ms == $(this).val().length - 1) {
                            values += selVals[ms];
                        }
                        else {
                            values += selVals[ms] + ",";
                        }
                    }
                }


                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": values };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
            else if ($(this).is(':checkbox') || $(this).is(':radio')) {
                var cbLrbL = "";
                if ($("[name=" + this.name + "]").length > 1) {
                    for (var cr = 0; cr < $("[name=" + this.name + "]").length; cr++) {
                        if (cr == $("[name=" + this.name + "]").length - 1) {
                            cbLrbL += $("#" + this.name + cr).prop('checked');
                        }
                        else {
                            cbLrbL += $("#" + this.name + cr).prop('checked') + ",";
                        }
                    }
                }
                else {
                    cbLrbL = $(this).prop('checked');
                }
                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": cbLrbL };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
            else {
                //OLD CODE
                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": $(this).val() };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
        });

    }
    var obj = new Object();
    $("[data-role='" + role + "'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
        if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-listentry")) {
            var selVal = $("#" + this.id + " option:selected").val() === '0' ? null : $("#" + this.id + " option:selected").val();
            var selText = $("#" + this.id + " option:selected").html() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selVal;
            obj[$(this).data('attr') + 'Value'] = selText;
        }
        else if ($(this).prop("tagName") === 'DIV') {
            obj[$(this).data('attr')] = $(this).next().find('.note-editable').html();
        }
        else if ($(this)[0].hasAttribute("data-flags")) {
            var res = $(this).val().split(':');
            obj[$(this).data('attr')] = res[0].trim();
            obj[$(this).data('flags')] = res[1].trim();
        }
        else if ($(this)[0].hasAttribute("data-currency")) {
            var selText = $("#" + this.id + " option:selected").html() === '---Select Currency---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selText;
        }
        else if ($(this).is(':checkbox') || $(this).is(':radio')) {
            obj[$(this).data('attr')] = $(this).prop('checked');
        }
        console.log(obj);
    });

    /* Read Mandatory section */

    $("[data-role='mandatory-sec'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
    });

    obj['TenantID'] = getCookie('TenantId');
    //obj['TenantId'] = getCookie('TenantId');
    obj['UserId'] = getCookie('UserId');
    obj['RecordOwner'] = getCookie('UserId');
    obj['CreatedBy'] = getCookie('UserId');
    obj['VersionNumber'] = 1;
    obj['ViewAccess'] = true;
    obj['Status'] = 'Active';
    obj['CreateDate'] = GetCurrentDate();
    obj['ModifyDate'] = GetCurrentDate();
    //if (mode === 'Insert') {
    //    obj['VersionNumber'] = 1;
    //    obj['ViewAccess'] = true;
    //    obj['Status'] = 'Active';
    //    obj['CreateDate'] = GetCurrentDate();
    //    obj['ModifyDate'] = GetCurrentDate();
    //}
    //else {
    //    obj['LastModifiedBy'] = getCookie('UserId');
    //    obj['ModifyDate'] = GetCurrentDate();
    //}

    obj[cfContextName] = arr;

    console.log(obj);

    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: obj,
        async: false,
        success: function (data) {
            resultID = data;
            var res = data;
            if (resultID.hasOwnProperty("m_Item1")) {
                res = resultID.m_Item1;
            }
            if (res > 0) {
                flag = 1;
            }
            else if (res === -1) {
                flag = -1
            }
            else {
                flag = 0;
            }
        },
        error: function () {
            TransactionFailedAlert();
            resultID = 0;
        }
    });
    return flag;
}




function ErrorAlert(msg) {
    swal({
        title: msg,
        //text: msg,
        type: "warning"
    });
}

function ValidateDate(start, end) {
    var dateOne = new Date(start);
    var dateTwo = new Date(end);
    if (dateOne > dateTwo) {
        return false;
    } else {
        return true;
    }
}



function GetCurrentDate() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = d.getFullYear() + '/' +
    (month < 10 ? '0' : '') + month + '/' +
    (day < 10 ? '0' : '') + day;
    return output;
}


/**
 * Call API & get Json result.
 */
function PostJsonToApi(route, dataToPost) {
    var result = '';
    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: dataToPost,
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (data, textStatus, xhr) {
            result = data;
            //InsertedSuccessfullyAlert('Inserted Successfully');
            return 1;
        },
        error: function (xhr, textStatus, errorThrown) {
            //TransactionFailedAlert('Error while inserting record.');
            return 0;
        }
    });
    return result;
}

function CustomSpin(diff) {
    $(".CustomSpin-" + diff).TouchSpin({
        verticalbuttons: true,
        step: diff
    });
}

function postWithoutMessage(role, cfrole, route, tableId, cfContextName) {
    var arr = [];
    var i = 0;
    if (($('#cfsection').length == 1) && (document.getElementById('customFields').style.display != "none")) {
        var recordId = GetQueryStringValues(location.href, 'keyId');

        $("[data-role='" + cfrole + "'] [data-customfieldid]").each(function () {

            //NEW CODE
            if (($(this).prop("tagName") === 'SELECT') && (document.getElementById(this.id).multiple == true)) {
                var values = "";
                var selVals = $(this).val();
                if ($(this).val() != null) {
                    for (var ms = 0; ms < $(this).val().length; ms++) {
                        if (ms == $(this).val().length - 1) {
                            values += selVals[ms];
                        }
                        else {
                            values += selVals[ms] + ",";
                        }
                    }
                }


                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": values };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
            else if ($(this).is(':checkbox') || $(this).is(':radio')) {
                var cbLrbL = "";
                if ($("[name=" + this.name + "]").length > 1) {
                    for (var cr = 0; cr < $("[name=" + this.name + "]").length; cr++) {
                        if (cr == $("[name=" + this.name + "]").length - 1) {
                            cbLrbL += $("#" + this.name + cr).prop('checked');
                        }
                        else {
                            cbLrbL += $("#" + this.name + cr).prop('checked') + ",";
                        }
                    }
                }
                else {
                    cbLrbL = $(this).prop('checked');
                }
                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": cbLrbL };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
            else {
                //OLD CODE
                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": $(this).val() };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
        });

    }
    var obj = new Object();
    $("[data-role='" + role + "'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
        if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-listentry")) {

            var selVal = $("#" + this.id + " option:selected").val() === 0 ? null : $("#" + this.id + " option:selected").val();
            var selText = $("#" + this.id + " option:selected").text() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selVal;
            obj[$(this).data('attr') + 'Value'] = selText;
        }
        else if ($(this).prop("tagName") === 'DIV') {
            obj[$(this).data('attr')] = $(this).next().find('.note-editable').html();
        }
        else if ($(this)[0].hasAttribute("data-flags")) {
            var res = $(this).val().split(':');
            obj[$(this).data('attr')] = res[0].trim();
            obj[$(this).data('flags')] = res[1].trim();
        }

        else if ($(this).is(':checkbox') || $(this).is(':radio')) {
            obj[$(this).data('attr')] = $(this).prop('checked');
        }

    });
    $("[data-role='mandatory-sec'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
    });
    obj['TenantId'] = getCookie('TenantId');
    obj['UserId'] = getCookie('UserId');
    obj['RecordOwner'] = getCookie('UserId');
    obj['CreatedBy'] = getCookie('UserId');
    obj['ModifiedBy'] = getCookie('UserId');
    obj[cfContextName] = arr;



    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: obj,
        async: false,
        success: function (data) {
            resultID = data;
            var res = data;

            if (resultID.hasOwnProperty("m_Item1")) {
                res = resultID.m_Item1;
            }
            if (res > 0) {
                //SuccessAlert('Your Information Saved Successfully.')
            }
            else if (res == -1) {
                ErrorAlert('Record already exists.');
            }
            else if (res == -2) {
                ErrorAlert('Primary Email Address already exists.');
            }
            else if (res == -3) {
                ErrorAlert('SSN already exists.');
            }
            else if (res == -4) {
                ErrorAlert('Passsport Number already exists.');
            }
            else if (res == -5) {
                ErrorAlert('Interview stages not exists for this entry');
            }
            else if (res == -6) {
                ErrorAlert('Package Line Items does not exist');
            }
            else if (res == -7) {
                ErrorAlert('You can not create more than 5 packages');
            }
            else {
                ErrorAlert('Please Contact Administrator.');

            }

        },
        error: function () {
            ErrorAlert('Please Contact Administrator.');
            resultID = 0;
        }
    });
    return resultID;
}



function SuccessAlert(msg) {
    swal({
        title: "Success Message",
        text: msg,
        type: "success",
        confirmButtonText: "Ok"

    });
}

// redirect on clicking Ok button in Success Popup

function SuccessAlertClosePopup(msg, redirectURL) {
    swal({
        title: "Success Message",
        text: msg,
        type: "success",
        confirmButtonText: "Ok"
    },
function (isConfirm) {
    if (isConfirm) {
        $('.showSweetAlert').hide();
        $('#modal-container').modal('hide');
        $('.sweet-overlay').hide();
        window.location.href = redirectURL;
    } else {
    }
});
}

function postSectionWithoutMessage(role, cfrole, route, tableId, cfContextName) {
    var arr = [];
    var i = 0;
    if ($('#cfsection').length == 1) {
        var recordId = GetQueryStringValues(location.href, 'keyId');

        $("[data-role='" + cfrole + "'] [data-customfieldid]").each(function () {

            //NEW CODE
            if (($(this).prop("tagName") === 'SELECT') && (document.getElementById(this.id).multiple == true)) {
                var values = "";
                var selVals = $(this).val();
                if ($(this).val() != null) {
                    for (var ms = 0; ms < $(this).val().length; ms++) {
                        if (ms == $(this).val().length - 1) {
                            values += selVals[ms];
                        }
                        else {
                            values += selVals[ms] + ",";
                        }
                    }
                }
                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": values };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
            else if ($(this).is(':checkbox') || $(this).is(':radio')) {
                var cbLrbL = "";
                if ($("[name=" + this.name + "]").length > 1) {
                    for (var cr = 0; cr < $("[name=" + this.name + "]").length; cr++) {
                        if (cr == $("[name=" + this.name + "]").length - 1) {
                            cbLrbL += $("#" + this.name + cr).prop('checked');
                        }
                        else {
                            cbLrbL += $("#" + this.name + cr).prop('checked') + ",";
                        }
                    }
                }
                else {
                    cbLrbL = $(this).prop('checked');
                }
                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": cbLrbL };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
            else {
                //OLD CODE
                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": $(this).val() };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
        });

    }
    var obj = new Object();

    $("[data-role='" + role + "'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
        if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-listentry")) {
            var selVal = $("#" + this.id + " option:selected").val() === '0' ? null : $("#" + this.id + " option:selected").val();
            var selText = $("#" + this.id + " option:selected").text() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selVal;

            obj[$(this).data('attr') + 'Value'] = selText;
        }
        else if ($(this).prop("tagName") === 'DIV') {
            obj[$(this).data('attr')] = $(this).next().find('.note-editable').html();
        }
        else if ($(this)[0].hasAttribute("data-flags")) {

            var res = $(this).val().split(':');
            obj[$(this).data('attr')] = res[0].trim();
            obj[$(this).data('flags')] = res[1].trim();
        }

        else if ($(this).is(':checkbox') || $(this).is(':radio')) {
            obj[$(this).data('attr')] = $(this).prop('checked');
        }

    });

    /* Read Mandatory section */

    $("[data-role='mandatory-sec'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
    });

    obj['TenantId'] = getCookie('TenantId');
    obj['UserId'] = getCookie('UserId');
    //obj['RecordOwner'] = getCookie('UserId');
    obj['CreatedBy'] = getCookie('UserId');
    obj['ModifiedBy'] = getCookie('UserId');
    obj[cfContextName] = arr;


    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: obj,
        async: false,
        success: function (data) {
            resultID = data;
            var res = data;
            if (resultID.hasOwnProperty("m_Item1")) {
                res = resultID.m_Item1;
            }
            if (res > 0) {
                //UpdatedSuccessfullyAlert();
                // UpdatedSuccessfullyRefreshAlert();

            }
            else if (res === -1) {
                //RecordExistsAlert();
                ErrorAlert('Record already exists.');
            }
            else if (res == -2) {
                ErrorAlert('Primary Email Address already exists.');
            }
            else if (res == -3) {
                ErrorAlert('SSN already exists.');
            }
            else if (res == -4) {
                ErrorAlert('Passsport Number already exists.');
            }
            else {
                //TransactionFailedAlert();
                ErrorAlert('Please Contact Administrator.');
            }

        },
        error: function () {
            alert('util error');
            ErrorAlert(' Please Contact Administrator.');

            resultID = 0;
        }
    });
    return resultID;
}




function AlertAndRoutemsg(msg, route) {
    swal({
        title: "Success Message",
        text: msg,
        type: "success",
        confirmButtonText: "Ok",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        closeOnConfirm: true,
    },
  function (isConfirm) {
      if (isConfirm) {
          window.location.href = route;
      } else {

      }
  });

}

function PostJsonToApiStringifyNotes(route, dataToPost) {

    var result = '';



    $.ajax({

        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: dataToPost,
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (data, textStatus, xhr) {
            result = data;
        },
        error: function (xhr, textStatus, errorThrown) {

            ErrorAlert(' Please Contact Administrator.');
        }

    });
    return result;
}



function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength)
}


function ConfirmMsgandRefresh(msg) {
    swal({
        title: msg,
        text: "",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        closeOnConfirm: true,
    },
   function (isConfirm) {
       if (isConfirm) {

       } else {
       }
   });
}

function RecLevelSecuiritySuccessAlertUser() {
    swal({
        title: "Permissions Assigned Successfully.",
        text: "",
        type: "success",
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        closeOnConfirm: true,
    },
function (isConfirm) {
    if (isConfirm) {

    } else {
    }
});

}

function ValidateDateTwo(start, end) {
    var dateOne = new Date(start);
    var dateTwo = new Date(end);
    if (dateOne > dateTwo) {
        return false;
    } else {
        return true;
    }
}

function postNew(role, cfrole, route, tableId, cfContextName, mode, KeyId) {
    debugger;
    var arr = [];
    var i = 0;
    if (($('#cfsection').length == 1) && (document.getElementById('customFields').style.display != "none")) {
        var recordId = KeyId;// GetQueryStringValues(location.href, 'keyId');
        $("[data-role='" + cfrole + "'] [data-customfieldid]").each(function () {

            //NEW CODE
            if (($(this).prop("tagName") === 'SELECT') && (document.getElementById(this.id).multiple == true)) {
                var values = "";
                var selVals = $(this).val();
                if ($(this).val() != null) {
                    for (var ms = 0; ms < $(this).val().length; ms++) {
                        if (ms == $(this).val().length - 1) {
                            values += selVals[ms];
                        }
                        else {
                            values += selVals[ms] + ",";
                        }
                    }
                }


                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": values };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
            else if ($(this).is(':checkbox') || $(this).is(':radio')) {
                var cbLrbL = "";
                if ($("[name=" + this.name + "]").length > 1) {
                    for (var cr = 0; cr < $("[name=" + this.name + "]").length; cr++) {
                        if (cr == $("[name=" + this.name + "]").length - 1) {
                            cbLrbL += $("#" + this.name + cr).prop('checked');
                        }
                        else {
                            cbLrbL += $("#" + this.name + cr).prop('checked') + ",";
                        }
                    }
                }
                else {
                    cbLrbL = $(this).prop('checked');
                }
                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": cbLrbL };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
            else {
                //OLD CODE
                arr[i] = { "TenantId": getCookie('TenantId'), 'KeyCFID': $(this).data('keyid'), "CustomFieldId": $(this).data('customfieldid'), "FieldName": $(this).data('fieldname'), "FieldValue": $(this).val() };
                arr[i][tableId] = parseInt(recordId);
                i = i + 1;
            }
        });

    }
    var obj = new Object();
    $("[data-role='" + role + "'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
        if ($(this).prop("tagName") === 'SELECT' && $(this)[0].hasAttribute("data-listentry")) {
            var selVal = $("#" + this.id + " option:selected").val() === '0' ? null : $("#" + this.id + " option:selected").val();
            var selText = $("#" + this.id + " option:selected").html() === '---Select---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selVal;
            obj[$(this).data('attr') + 'Value'] = selText;
        }
        else if ($(this).prop("tagName") === 'DIV') {
            obj[$(this).data('attr')] = $(this).next().find('.note-editable').html();
        }
        else if ($(this)[0].hasAttribute("data-flags")) {
            var res = $(this).val().split(':');
            obj[$(this).data('attr')] = res[0].trim();
            obj[$(this).data('flags')] = res[1].trim();
        }
        else if ($(this)[0].hasAttribute("data-currency")) {
            var selText = $("#" + this.id + " option:selected").html() === '---Select Currency---' ? null : $("#" + this.id + " option:selected").html();
            obj[$(this).data('attr')] = selText;
        }
        else if ($(this).is(':checkbox') || $(this).is(':radio')) {
            obj[$(this).data('attr')] = $(this).prop('checked');
        }
        console.log(obj);
    });

    /* Read Mandatory section */

    $("[data-role='mandatory-sec'] [data-attr]").each(function () {
        obj[$(this).data('attr')] = $(this).val();
    });

    obj['TenantID'] = getCookie('TenantId');
    //obj['TenantId'] = getCookie('TenantId');
    obj['UserId'] = getCookie('UserId');
    obj['RecordOwner'] = getCookie('UserId');
    obj['CreatedBy'] = getCookie('UserId');
    if (mode === 'Insert') {
        obj['VersionNumber'] = 1;
        obj['ViewAccess'] = true;
        //obj['Status'] = 'Active';
        //obj['WorkflowStatus'] = 'Completed';
        //obj['ProvisionStatus'] = 'Provisioned';
        obj['CreateDate'] = GetCurrentDate();
        obj['ModifyDate'] = GetCurrentDate();
    }
    else {
        obj['LastModifiedBy'] = getCookie('UserId');
        obj['ModifyDate'] = GetCurrentDate();
    }

    obj[cfContextName] = arr;

    console.log(obj);
    var resultID = 0;
    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: obj,
        async: false,
        success: function (data) {
            resultID = data;

            debugger
            var res = data;
            if (resultID.hasOwnProperty("m_Item1")) {
                res = resultID.m_Item1;
            }
            if (res > 0) {
                if (mode === 'Insert') {
                    InsertedSuccessfullyAlert();    // Insert Alert
                }
                else if (mode === 'Update') {
                    UpdatedSuccessfullyAlert(); // Update Alert
                }
                else if (mode === 'UpdateRefresh') {
                    UpdatedSuccessfullyRefreshAlert();  // Update Alert & then Refresh Page
                }
                else if (mode === 'InsertAndClose') {
                    InsertedSuccessfullyAndCloseAlert();  // Insert and Close the modal popup
                }
                else if (mode === "InsertAndNew") {
                    AlertAndRoute('Your Information Saved Successfully', removeURLParameter(window.location.href, 'keyId'));   // Save And New
                }
                else if (mode === "InsertNew") {
                    AlertAndRoute('Your Information Saved Successfully', window.location.href);   // Save And New

                }
                else if (mode === "PopupInsertAndNew") {
                    SuccessAlert("Your Information Saved Successfully");
                    ResetPage(role, undefined);
                }

                else if (mode === "PopupUpdateAndNew") {
                    debugger
                    SuccessAlert("Your Information Updated Successfully");
                    ResetPage(role, undefined);
                }
                else if (mode === "UpdateAndNew") {
                    debugger
                    var oUrl = window.location.href.toString().replace('Edit', 'New');
                    url = oUrl.substr(0, oUrl.indexOf('keyId') - 1);
                    //var url = oUrl.replace(GetQueryStringValues(oUrl, 'keyId'), '0')
                    AlertAndRoute('Your Information Updated Successfully', url);            // Update And New
                }


            }
            else if (res === -1) {
                RecordExistsAlert();
            }
            else if (res != null) {
                SuccessAlert("Your Asset Onboarded Successfully");// Update Alert
            }
            else {
                TransactionFailedAlert();
            }
        },
        error: function () {
            TransactionFailedAlert();
            resultID = 0;
        }
    });
    return resultID;
}

function removeURLParameter(route, keyId) {

    swal({
        title: "Success Message",
        text: "Your Information Saved Successfully",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        //cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        //closeOnCancel: false
    },
     function (isConfirm) {
         if (isConfirm) {
             window.location.href = '';
             keyId = 0;
         } else {
         }
     });

}

function RestrictAmountFieldWithFloat(SelectorId) {

    $(SelectorId).on("input keypress keydown keyup", function (e) {

        var valid = /^\d{0,14}(\.\d{0,4})?$/.test(this.value),
            val = this.value;

        if (!valid) {
            console.log("Invalid input!");
            this.value = val.substring(0, val.length - 1);
        }


        if (e.shiftKey || e.ctrlKey || e.which == 109 || e.which == 189 || e.which == 187) {
            e.preventDefault();
        }
    });

}


function bindFromHr(route) {

    var Result = '';
    $.ajax({

        url: WrkfrsapiBaseUrl + route,
        type: 'GET',
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        async: false,
        success: function (result) {

            //for - flatten the inner object custom fields
            hresult = result;
            Result = result;
            for (var property in result) {
                if ($.isArray(result[property])) {
                    for (var j = 0; j < result[property].length; j++) {
                        result["cst" + result[property][j].FieldName.replace(" ", "")] = result[property][j].FieldValue;
                        //alert(result[property][j].FieldName);
                    }
                }
            }
            $('[data-attr]').each(function () {
                var t = $(this).data('attr');
                var tt = t.split('.');
                var propval = result;
                for (i = 0; i < tt.length; i++) {
                    propval = propval[tt[i]];
                }


                if ($(this).is('select')) {
                    if (propval != null) {
                        $('#' + this.id).val(propval);
                    }


                } else if ($(this).is(':checkbox') || $(this).is(':radio')) {
                    $(this).attr("checked", propval);
                } else if ($(this).is(':checkbox') || $(this).is(':radio') && $(this).prop("name")) {
                    $(this).attr("checked", propval);
                }
                else if (($(this).hasClass('datepicker'))) {
                    if (propval !== null && propval !== undefined) {
                        var d = new Date(propval);
                        var date = d.getDate() <= 9 ? ('0' + d.getDate()) : d.getDate();
                        var month = d.getMonth() < 9 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
                        var year = d.getFullYear();
                        $(this).val(month + "/" + date + "/" + year);
                    }
                    else {
                        $(this).val();
                    }
                }

                else if (($(this).attr('class') === 'summernote1')) {
                    $(this).next().find('.note-editable').html(propval);
                }
                else if ($(this)[0].hasAttribute("data-flags")) {
                    if (propval != null) {
                        $('#' + this.id).intlTelInput("setCountry", propval.toLowerCase().trim());
                        $(this).val(propval + ' : ' + result[$($(this)[0]).data('flags')]);
                    }
                }
                else if ($(this).attr('type') === 'file') {
                    $(this).text(propval);
                }
                else if (!$(this)[0].hasAttribute("data-byte"))
                    $(this).val(propval);


                else {

                    $(this).val(propval);
                }
            });
            for (var property in result) {
                if ($.isArray(result[property])) {
                    for (var j = 0; j < result[property].length; j++) {
                        $("#cst" + result[property][j].FieldName.replace(" ", "")).data('keyid', result[property][j].KeyCFID);
                    }
                }
            }
        }
    });

    return Result;



}

function countryflgOnId(CountryCode) {

    $('#' + CountryCode)
        .intlTelInput({
            initialCountry: "us",
            autoPlaceholder: false,
        });
    jQuery('#' + CountryCode).bind('keydown', 'keypress', function (e) {
        e.preventDefault();
    });


    // Get Initially Selected Country From Flags Dropdown and Bind CountryCode  *** Phone1
    var countryData = $('#' + CountryCode).intlTelInput("getSelectedCountryData");
    if (countryData !== undefined) {
        $('#' + CountryCode).val(countryData["iso2"].toUpperCase() + ": +" + countryData["dialCode"]);


        // Get User Selected Country From Flags Dropdown and Bind CountryCode  *** Phone1
        $('#' + CountryCode)
            .on("countrychange",
                function (e, countryData) {
                    var Result = countryData["iso2"].toUpperCase() + ": +" + countryData["dialCode"]
                    $('#' + CountryCode).val(Result);
                });
    }
};



function BindSlotNumbers(ele, assetId) {
    debugger;
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: apiBaseUrl + "AssetSlots/GetSlotNumbers?assetId=" + assetId,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        data: "{}",
        async: false,
        dataType: "json",

        success: function (data) {
            var optionhtml = '<option value="1">---Select---</option>';
            $.each(data,
                function (key, value) {
                    optionhtml += '<option value="' + data[key].SlotNumber + '">' + data[key].SlotNumber + '</option>';
                });
            $("#" + ele).empty();
            $("#" + ele).append(optionhtml);
        },
        error: function (error) {
            ErrorAlert("Error while fetching Asset Slot Numbers.");
        }
    });
}



function isNumberKeyDecimal(evt, id) {

    debugger;
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var inputValue = $("#" + id).val()

    if (evt.keyCode === 46 && inputValue.split('.').length === 2) {
        return false;
    }
    if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function onPaste(id) {

    var TextboxIds = id.split(',');
    $(TextboxIds).each(function (id) {
        $("#" + TextboxIds).on('paste', function (e) {
            e.preventDefault();
        });
    });
}

function customShowHide(currentEle) {

    //event.preventDefault();
    var hpanel = $(currentEle).closest('div.hpanel');
    var icon = $(currentEle).find('i:first');
    var body = hpanel.find('div.panel-body');
    var footer = hpanel.find('div.panel-footer');
    body.slideToggle(300);
    footer.slideToggle(200);

    // Toggle icon from up to down
    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    hpanel.toggleClass('').toggleClass('panel-collapse');
    setTimeout(function () {
        hpanel.resize();
        hpanel.find('[id^=map-]').resize();
    }, 50);
}

function closeCustom(currentEle) {
    event.preventDefault();
    var hpanel = $(currentEle).closest('div.hpanel');
    hpanel.remove();
    if ($('body').hasClass('fullscreen-panel-mode')) { $('body').removeClass('fullscreen-panel-mode'); }
}


function ResetPage(role, GridID) {
    $('[data-role="' + role + '"] [data-attr]').each(function () {
        if ($(this).is('input:text') || $(this).is('textarea') || $(this).is('input:hidden'))
            $(this).val('');

        if ($(this).is('select'))
            $(this).val('0');
        if ($(this).prop("tagName") === 'DIV') {
            $(this).next().find('.note-editable').html('');
        }
        if ($(this).is('input:checkbox'))
            $(this).removeAttr("checked");

        if (GridID != undefined) {
            var gridIds = GridID.split(',');
            $(gridIds).each(function (k, v) {
                $.jgrid.gridUnload('#' + v);

            });
        }

        $("[data-role='VersionNumber']").val(1);

    });
}



//ON Grid Load
function OrsusGridResize(grid) {
    //alert('OrsusGridResize');
    $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

    setTimeout(function () {
        var $grid = $("#" + grid),
        newWidth = $grid.closest("#gbox_" + grid).parent().width();
        if (newWidth != 0) {
            $grid.jqGrid("setGridWidth", newWidth, true);
        }
    }, 100);
}


//ON Tab Click
$('[data-toggle="tab"],.header-link').click(function () {
    //alert('tab');
    $(".ui-jqgrid").each(function () {
        var grdResId = this.id.split('gbox_')[1];

        $("#" + grdResId).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");
        setTimeout(function () {
            var $grid = $("#" + grdResId),
              newWidth = $grid.closest("#gbox_" + grdResId).parent().width();
            if (newWidth != 0) {
                $grid.jqGrid("setGridWidth", newWidth, true);
            }
        }, 100);
    });
});

//ON Window resize
$(window).resize(function () {
    //alert('resize');
    $(".ui-jqgrid").each(function () {
        var grdResId = this.id.split('gbox_')[1];

        $("#" + grdResId).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");
        setTimeout(function () {
            var $grid = $("#" + grdResId),
              newWidth = $grid.closest("#gbox_" + grdResId).parent().width();
            if (newWidth != 0) {
                $grid.jqGrid("setGridWidth", newWidth, true);
            }
        }, 300);
    });
});//.trigger('resize');


function bindItemPage(sec, result) {
    var hresult = result;
    var param = '[data-role=' + sec + '] [data-attr]';
    $(param).each(function () {
        var t = $(this).data('attr');
        var tt = t.split('.');
        var propval = result;
        for (i = 0; i < tt.length; i++) {
            propval = propval[tt[i]];
        }


        if ($(this).val(propval).val() != null && $(this).val(propval).val().indexOf(":Deleted") != -1) {
            $(this).parent().parent().find('strong').after("<span class='errormsg' style='color:red;'>&nbsp;&nbsp;&nbsp;This field is required</span>");
            $(this).addClass("error");
        }

        if ($(this).is('select')) {

            if (($(this).prop("tagName") === 'SELECT') && (document.getElementById(this.id).multiple == true)) {
                var multiSelList = propval.split(',');
                if (multiSelList.length > 1) {
                    $(this).val(multiSelList);
                }
                else {
                    $(this).val(multiSelList[0]);
                }
            }
            else if ($(this)[0].hasAttribute("data-currency")) {

                if (propval != null) {
                    $("#" + this.id + " option:contains(" + propval + ")").attr('selected', 'selected');
                }
                else {
                    $("#" + this.id + " option:contains('---Select Currency---')").attr('selected', 'selected');
                }

            }
                //else if ($(this)[0].hasAttribute("data-countryflgs")) {
                //    
                //    alert("1");
                //    if (propval != null) {
                //        $('#' + this.id).msDropdown().data("dd").setIndexByValue(propval);
                //    }

                //}
            else if ($(this)[0].hasAttribute("data-countryflgs")) {

                if (propval != null) {
                    $('#' + this.id).msDropdown().data("dd").setIndexByValue(propval);
                }

            }
            else {


                if (propval != null && propval != undefined) {
                    $(this).val(propval.toString().trim());
                }
                else if (propval == null) {
                    $(this).val('0');
                }
            }

        } else if ($(this).is(':checkbox') || $(this).is(':radio')) {
            //NEW
            if (typeof propval == "string") {
                var cbLrdLStatus = propval.split(',');
                if (cbLrdLStatus.length > 1) {
                    for (var cr = 0; cr < $("[name=" + this.name + "]").length; cr++) {
                        $("#" + this.name + cr).attr("checked", eval(cbLrdLStatus[cr]));
                    }
                }
                else {
                    $(this).attr("checked", eval(cbLrdLStatus[0]));
                }
            }
            else {
                $(this).attr("checked", eval(propval));
            }

        } else if ($(this).is(':checkbox') || $(this).is(':radio') && $(this).prop("name")) {
            $(this).attr("checked", propval);
        }
        else if (($(this).attr('type') === 'date')) {
            if (propval !== null && propval !== undefined) {
                var d = new Date(propval);
                var date = d.getDate() <= 9 ? ('0' + d.getDate()) : d.getDate();
                var month = d.getMonth() < 9 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
                var year = d.getFullYear();
                $(this).val(year + "-" + month + "-" + date);
            }
        }
        else if (($(this).attr('class') === 'summernote1')) {
            $(this).next().find('.note-editable').html(propval);
        }
        else if ($(this)[0].hasAttribute("data-flags")) {

            if (propval != null) {

                $('#' + this.id).intlTelInput("setCountry", propval.toLowerCase().trim());
                $(this).val(propval + ' : ' + result[$($(this)[0]).data('flags')]);

            }
            else {
                $(this).val("US: +1");
            }
        }
        else if ($(this).attr('type') === 'file') {
            $(this).text(propval);
        }
        else if (($(this).hasClass('datepicker'))) {
            if (propval !== null && propval !== undefined) {
                var d = new Date(propval);
                var date = d.getDate() <= 9 ? ('0' + d.getDate()) : d.getDate();
                var month = d.getMonth() < 9 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
                var year = d.getFullYear();
                $(this).val(month + "/" + date + "/" + year);
            }
        }
        else
            $(this).val(propval);
    });
    bindChildControl(hresult);
    bindChildLV(hresult);
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}


function UpdatedSuccessfullyRerouteAlert(route, mode) {

    swal({
        title: "Success Message.",
        text: "Your Information " + mode + " Successfully",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Ok",
        //cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        //closeOnCancel: false
    },

   function (isConfirm) {
       if (isConfirm) {
           window.location.href = route;

           //swal("Deleted!", "Your imaginary file has been deleted.", "success");
       } else {

           //swal("Cancelled", "Your imaginary file is safe :)", "error");
       }
   });
}

$("#header .hide-menu").on("click", function () {
    $(".ui-jqgrid").each(function () {
        var grdResId = this.id.split('gbox_')[1];


        $("#" + grdResId).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");
        setTimeout(function () {
            var $grid = $("#" + grdResId),
              newWidth = $grid.closest("#gbox_" + grdResId).parent().width();
            if (newWidth != 0) {
                $grid.jqGrid("setGridWidth", newWidth, true);
            }
        }, 300);
    });
});


function CustomAlert(title, message, type, showCancelButton, confirmButtonText, cancelButtonText, closeOnConfirm, closeOnCancel, condition, url) {
    swal({
        title: title,
        text: message,
        type: type,
        allowOutsideClick: false,

        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,

        cancelButtonText: cancelButtonText,

        closeOnConfirm: closeOnConfirm,
        closeOnCancel: closeOnCancel

    },
      function (isConfirm) {
          if (condition == 'NoGatekeepers') {
              if (isConfirm == true) {
              } else {
              }
          }
          else if (condition == 'Refresh') {
              if (isConfirm == true) {
                  window.location.href = window.location.href;
              } else {
              }
          }
      });
}


function PostJsonToApiStringifyAppWF(route, dataToPost) {
    var result = '';
    $.ajax({
        url: apiBaseUrl + route,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "POST",
        data: dataToPost,
        dataType: "json",
        contentType: "application/json",
        async: false,

        success: function (data) {
            result = data;
            var res = data;
            if (result.hasOwnProperty("m_Item1")) {
                res = result.m_Item1;
            }
            if (res.length > 0) {
                // InsertedSuccessfullyAlert()
                SuccessAlert('Your Information Saved Successfully.')
            }
            else if (res === -1) {
                ErrorAlert('Record already exists.');
            }
            else {
                ErrorAlert('Please Contact Administrator.');
            }
        },
        error: function () {
            ErrorAlert('Please Contact Administrator.');
            result = 0;
        }




        //success: function (data, textStatus, xhr) {
        //    result = data;
        //},
        //error: function (xhr, textStatus, errorThrown) {
        //    ErrorAlert(' Please Contact Administrator.');
        //}
    });
    return result;
}
function ToastSuccess(msg) {
    iziToast.success({
        title: 'Success!',
        position: 'topRight',
        message: msg,
    });

}

function ToastError(msg) {
    iziToast.error({
        title: 'Error!',
        position: 'topRight',
        message: msg,
    });

}
function ToastWarning(msg)
{
    iziToast.warning({
        title: 'Caution',
        position: 'topRight',
        message: msg,
    });
}
function ToastNotAuthorized() {
    iziToast.warning({
        title: 'Warning!',
        position: 'topRight',
        message: 'You are Not Authorized for this Action.',
    });
}

function BindEvents(Eventdata) {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: "/api/EventsData/GetAll",
        data: "{}",
        async: false,
        dataType: "json",
        success: function (data) {
            var optionhtml = '<option value="0">---Select---</option>';
            $.each(data,
                function (key, value) {
                    optionhtml += '<option value="' + data[key].EventInfoID + '">' + data[key].EventRefID + '</option>';
                });
            $("#" + Eventdata).empty();
            $("#" + Eventdata).append(optionhtml);
        },
        error: function (xhr, textStatus, errorThrown) {
            if (errorThrown == 'Unauthorized') {
                NotAuthorized();
            }
            else {
                ErrorAlert(' Please contact administrator.');
            }
            resultID = 0;
        }
    });
}

function BindVendors(Vendordata) {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: "/api/VendorData/GetAll",
        data: "{}",
        async: false,
        dataType: "json",
        success: function (data) {
            var optionhtml = '<option value="0">---Select---</option>';
            $.each(data,
                function (key, value) {
                    optionhtml += '<option value="' + data[key].VendorID + '">' + data[key].VendorCode + '</option>';
                });
            $("#" + Vendordata).empty();
            $("#" + Vendordata).append(optionhtml);
        },
        error: function (xhr, textStatus, errorThrown) {
            if (errorThrown == 'Unauthorized') {
                NotAuthorized();
            }
            else {
                ErrorAlert(' Please contact administrator.');
            }
            resultID = 0;
        }
    });
}
