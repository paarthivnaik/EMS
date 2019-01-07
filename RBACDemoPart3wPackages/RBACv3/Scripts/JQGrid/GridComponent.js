function Navigation(Mode, New, Clone, Edit, Delete, View, KeyId) {
    if (Mode == 'btn_New') {
        window.location.href = New + "?keyId=0";
    }
    else if (Mode == 'btn_Clone') {
        window.location.href = Clone + "?keyId=" + KeyId;
    }
    else if (Mode == 'btn_Edit') {
        window.location.href = Edit + "?keyId=" + KeyId;
    }
    else if (Mode == 'btn_Delete') {
        var deltxt = "Are you sure you want to delete?";
        if (KeyId.length > 1) {
            deltxt = "Multiple records are selected. Are sure you want to delete?"
        }
        swal({
            title: "Delete Warning",
            text: deltxt,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                debugger;
                window.location.href = Delete + "?keyId=" + KeyId;
            } else {

            }
        });
    }
    else if (Mode == 'btn_View') {
        window.location.href = View + "?keyId=" + KeyId;
    }
    else {
        window.location.href = window.location.href;
    }
}

//All Manage page Grid
function ManagePageGrid(schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    debugger;
    var ColN;
    var ColM;
    var ColD;

    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];//display name
                showColumns = data[3];
                debugger;
                ////Manage pagegrid width
                var twidth = $('#managegridwidth').width() - 70;
                var colCount = showColumns.length;
                var eColWidth = twidth / colCount;


                //, width: eColWidth 

                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth, frozen: true }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'm/d/Y' }, width: eColWidth, hidedlg: true, searchrules: { required: true },
                                searchoptions: {
                                    dataInit: function (element) {
                                        $(element).datepicker({
                                            id: ColN[i] + '_datePicker',
                                            dateFormat: 'yy-mm-dd',
                                            showOn: 'focus'
                                        });
                                    },
                                    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                }
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }

                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: eColWidth, searchrules: { required: true },
                                searchoptions: {
                                    dataInit: function (element) {
                                        $(element).datepicker({
                                            id: ColN[i] + '_datePicker',
                                            dateFormat: 'yy-mm-dd',
                                            showOn: 'focus'
                                        });
                                    },
                                    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                }
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }



                    }
                }

                //Checkbox state,menu enabledisable
                idsOfSelectedRows = [],
                updateIdsOfSelectedRows = function (id, isSelected) {
                    var index = $.inArray(id, idsOfSelectedRows);
                    if (!isSelected && index >= 0) {
                        idsOfSelectedRows.splice(index, 1); // remove id from the list
                    } else if (index < 0) {
                        idsOfSelectedRows.push(id);
                    }


                    if (idsOfSelectedRows.length == 0) {
                        $('#btn_Clone').addClass('disabled');
                        $('#btn_Edit').addClass('disabled');
                        $('#btn_Delete').addClass('disabled');
                        $('#btn_View').addClass('disabled');
                    }
                    else if (idsOfSelectedRows.length == 1) {
                        $('#btn_Clone').removeClass('disabled');
                        $('#btn_Edit').removeClass('disabled');
                        $('#btn_Delete').removeClass('disabled');
                        $('#btn_View').removeClass('disabled');
                        keyId = idsOfSelectedRows[0];
                    }
                    else if (idsOfSelectedRows.length > 1) {
                        $('#btn_Clone').addClass('disabled');
                        $('#btn_Edit').addClass('disabled');
                        $('#btn_Delete').removeClass('disabled');
                        $('#btn_View').addClass('disabled');
                    }

                    var sel_row_count = jQuery('#grid').jqGrid('getGridParam', 'selarrrow');
                    var grd_rec_count = $("#grid").jqGrid('getGridParam', 'reccount');

                    if (sel_row_count.length == grd_rec_count) {
                        jQuery('#cb_grid').prop('checked', true);
                    }
                    else {
                        jQuery('#cb_grid').prop('checked', false);
                    }
                };
                debugger;
                $("#grid").jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {

                        var rows = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }

                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#pager'),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,

                    height: '100%',

                    //autowidth: true,//parent width
                    shrinkToFit: false,//adjust the colums to grid

                    loadonce: false,
                    sortorder: "desc",
                    rownumbers: true,
                    rownumWidth: 40,
                    scroll: false,
                    viewrecords: true,
                    onSelectRow: updateIdsOfSelectedRows,
                    onSelectAll: function (aRowids, isSelected) {
                        var i, count, id;
                        for (i = 0, count = aRowids.length; i < count; i++) {
                            id = aRowids[i];
                            updateIdsOfSelectedRows(id, isSelected);
                        }
                    },
                    loadComplete: function () {

                        var jqRecordsCount = $("#grid").jqGrid('getGridParam', 'reccount');
                        if (jqRecordsCount == 0) {
                            $('#next_pager').addClass('ui-state-disabled');
                            $('#last_pager').addClass('ui-state-disabled');
                            $('#first_pager').addClass('ui-state-disabled');
                            $('#prev_pager').addClass('ui-state-disabled');
                        }

                        var $this = $(this), i, count;
                        for (i = 0, count = idsOfSelectedRows.length; i < count; i++) {
                            $this.jqGrid('setSelection', idsOfSelectedRows[i], false);
                        }
                    },


                }).navGrid('#pager', { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true,
                     });


                $("#grid").navButtonAdd('#pager',
                {
                    buttonicon: "ui-icon-calculator",
                    title: "Column chooser",
                    caption: "Columns",
                    position: "last",
                    onClickButton: function () {
                        // call the column chooser method
                        jQuery("#grid").jqGrid('columnChooser',
                        {
                            width: 500,
                            dialog_opts: {
                                modal: true,
                                minWidth: 600,
                            },
                        }
                            );
                    }
                });

                //Vertical Records Per page Internal scroll
                $("#grid").parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');

            }
        },
        error: function () {
            //alert("Error with AJAX callback");
        }

    });
}
function ManagePageGridForAttrbute(schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    debugger;
    var ColN;
    var ColM;
    var ColD;
    var userId = getCookie('UserLoginName') == "tadmin" ? -1 : getCookie('UserId');
    if (dataUrl.indexOf("?") == -1) {
        dataUrl = dataUrl + '?tenantId=' + getCookie('TenantId') + '&userId=' + userId + '&roles=' + getCookie('Roles');

    }
    else {
        dataUrl = dataUrl + '&userId=' + userId + '&roles=' + getCookie('Roles');

    }
    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                data[0].push("Tree");
                data[1].push("tree");
                data[2].push("CI Relation");
                data[3].push("Tree");

                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];//display name
                showColumns = data[3];

                ////Manage pagegrid width
                var twidth = $('#managegridwidth').width() - 70;
                var colCount = showColumns.length;
                var eColWidth = twidth / colCount;


                //, width: eColWidth 

                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: eColWidth, hidedlg: true, searchrules: { required: true },
                                searchoptions: {
                                    dataInit: function (element) {
                                        $(element).datepicker({
                                            id: ColN[i] + '_datePicker',
                                            dateFormat: 'yy-mm-dd',
                                            showOn: 'focus'
                                        });
                                    },
                                    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                }
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else if (ColM[i] == 'tree') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 60, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'], Value: "" }, formatter: DropdownFormatter }
                        }

                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: eColWidth, searchrules: { required: true },
                                searchoptions: {
                                    dataInit: function (element) {
                                        $(element).datepicker({
                                            id: ColN[i] + '_datePicker',
                                            dateFormat: 'yy-mm-dd',
                                            showOn: 'focus'
                                        });
                                    },
                                    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                }
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }



                    }
                }

                //Checkbox state,menu enabledisable
                idsOfSelectedRows = [],
                updateIdsOfSelectedRows = function (id, isSelected) {
                    var index = $.inArray(id, idsOfSelectedRows);
                    if (!isSelected && index >= 0) {
                        idsOfSelectedRows.splice(index, 1); // remove id from the list
                    } else if (index < 0) {
                        idsOfSelectedRows.push(id);
                    }


                    if (idsOfSelectedRows.length == 0) {
                        $('#btn_Clone').addClass('disabled');
                        $('#btn_Edit').addClass('disabled');
                        $('#btn_Delete').addClass('disabled');
                        $('#btn_View').addClass('disabled');
                    }
                    else if (idsOfSelectedRows.length == 1) {
                        $('#btn_Clone').removeClass('disabled');
                        $('#btn_Edit').removeClass('disabled');
                        $('#btn_Delete').removeClass('disabled');
                        $('#btn_View').removeClass('disabled');
                        keyId = idsOfSelectedRows[0];
                    }
                    else if (idsOfSelectedRows.length > 1) {
                        $('#btn_Clone').addClass('disabled');
                        $('#btn_Edit').addClass('disabled');
                        $('#btn_Delete').removeClass('disabled');
                        $('#btn_View').addClass('disabled');
                    }

                    var sel_row_count = jQuery('#grid').jqGrid('getGridParam', 'selarrrow');
                    var grd_rec_count = $("#grid").jqGrid('getGridParam', 'reccount');

                    if (sel_row_count.length == grd_rec_count) {
                        jQuery('#cb_grid').prop('checked', true);
                    }
                    else {
                        jQuery('#cb_grid').prop('checked', false);
                    }
                };


                $("#grid").jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {

                        var rows = data.rows, flag = 1, i = 0;
                        for (; i < rows.length; i++) {
                            for (var property in rows[i]) {

                                if (property == "AttributeData" && data.rows[i].AttributeData != null) {
                                    //var keyValue = data.rows[i].AttributeData.toString().split('--');
                                    var JsonData = JSON.parse(data.rows[i].AttributeData);
                                    $.each(JsonData, function (key, value) {
                                        if (value.trim() == "") {
                                            data.rows[i][key] = null;

                                        }
                                        else {
                                            data.rows[i][key] = JsonData[key].trim();

                                        }
                                    })
                                    //for (var j = 0; j < keyValue.length; j++) {
                                    //    JsonData = JSON.parse(keyValue[j]);
                                    //    var keys = Object.keys(JsonData)[0];
                                    //    var val = JsonData[keys];
                                    //    if (val.trim() == "") {
                                    //        data.rows[i][keys] = null;

                                    //    }
                                    //    else {
                                    //        data.rows[i][keys] = val.trim();

                                    //    }

                                    //}
                                }
                                //if (property == "ItemTypeAttributeData" && data.rows[i].ItemTypeAttributeData != null) {

                                //    var keyValue = data.rows[i].ItemTypeAttributeData.toString().split('--');
                                //    var JsonData;
                                //    for (var j = 0; j < keyValue.length; j++) {
                                //        JsonData = JSON.parse(keyValue[j]);

                                //        if (JsonData.AttributeValue.trim() == "") {
                                //            data.rows[i][JsonData.AttributeName.split('_')[1]] = null;

                                //        }
                                //        else {
                                //            data.rows[i][JsonData.AttributeName.split('_')[1]] = JsonData.AttributeValue.trim();
                                //        }

                                //    }

                                //}
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;

                                    }
                                    delete rows[i][property];

                                }
                                if (rows[i].hasOwnProperty("Tree")) {

                                    rows[i].Tree = "<div style=\"text-align:center\"><a title=\"View\" href=\"../../CIRelationship/view" + "?keyId=" + rows[i][keyID] + "\"><i class=\"fa fa-history\"></i></a></div>";

                                }

                            }

                        }
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#pager'),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,

                    height: '100%',

                    //autowidth: true,//parent width
                    shrinkToFit: false,//adjust the colums to grid

                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,
                    onSelectRow: updateIdsOfSelectedRows,
                    onSelectAll: function (aRowids, isSelected) {
                        debugger
                        var i, count, id;
                        for (i = 0, count = aRowids.length; i < count; i++) {
                            id = aRowids[i];
                            updateIdsOfSelectedRows(id, isSelected);
                        }
                    },
                    loadComplete: function () {
                        var $this = $(this), i, count;
                        for (i = 0, count = idsOfSelectedRows.length; i < count; i++) {
                            $this.jqGrid('setSelection', idsOfSelectedRows[i], false);
                        }

                    },


                }).navGrid('#pager', { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true,
                     });


                $("#grid").navButtonAdd('#pager',
                {
                    buttonicon: "ui-icon-calculator",
                    title: "Column chooser",
                    caption: "Columns",
                    position: "last",
                    onClickButton: function () {
                        // call the column chooser method
                        jQuery("#grid").jqGrid('columnChooser',
                        {
                            width: 500,
                            dialog_opts: {
                                modal: true,
                                minWidth: 600,
                            },
                        }
                            );
                    }
                });

                //OrsusGridResize('grid');
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');
            }
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
}
function DropdownFormatter(cellvalue, options, rowObject) {
    if (cellvalue == '---Select---' || cellvalue == null) {
        return '';
    }
    else
        return cellvalue;
}

//Tenant onboard Form grid
function ManagePageOtherModuleGrid(schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    var ColN;
    var ColM;
    var ColD;
    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];
                showColumns = data[3];
                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'number' }
                        }
                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i] }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], searchtype: 'number' }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i] }
                        }



                    }
                }


                $("#grid").jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiOrgBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {

                        var rows = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#pager'),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,

                    height: '100%',

                    autowidth: true,//parent width
                    shrinkToFit: true,//adjust the colums to grid
                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,
                    onSelectRow: function (id) {
                        var selRowsCount = jQuery('#grid').jqGrid('getGridParam', 'selarrrow').length;
                        if (selRowsCount == 0) {
                            $('#btn_Clone').addClass('disabled');
                            $('#btn_Edit').addClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').addClass('disabled');
                        }
                        else if (selRowsCount == 1) {
                            $('#btn_Clone').removeClass('disabled');
                            $('#btn_Edit').removeClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').removeClass('disabled');
                        }
                        else if (selRowsCount > 1) {
                            $('#btn_Clone').addClass('disabled');
                            $('#btn_Edit').addClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').addClass('disabled');
                        }
                        var sel_row_count = jQuery('#grid').jqGrid('getGridParam', 'selarrrow');
                        var grd_rec_count = $("#grid").jqGrid('getGridParam', 'reccount');

                        if (sel_row_count.length == grd_rec_count) {
                            jQuery('#cb_grid').prop('checked', true);
                        }
                        else {
                            jQuery('#cb_grid').prop('checked', false);
                        }
                    },

                }).navGrid('#pager', { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });



                //Vertical Records Per page Internal scroll
                $("#grid").parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');



            }
        },
        error: function () {
            alert("Error with AJAX callback");
        }

    });

}

//Not Used - Expenses,timesheet,leaves
function ManagePageHRModuleGrid(schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    var ColN;
    var ColM;
    var ColD;
    $.ajax({
        url: apiHRBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];
                showColumns = data[3];

                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'number' }
                        }
                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i] }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], searchtype: 'number' }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i] }
                        }



                    }
                }


                $("#grid").jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiHRBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {

                        var rows = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#pager'),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,

                    height: '100%',

                    autowidth: true,//parent width
                    shrinkToFit: true,//adjust the colums to grid
                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,
                    onSelectRow: function (id) {
                        var selRowsCount = jQuery('#grid').jqGrid('getGridParam', 'selarrrow').length;
                        if (selRowsCount == 0) {
                            $('#btn_Clone').addClass('disabled');
                            $('#btn_Edit').addClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').addClass('disabled');
                        }
                        else if (selRowsCount == 1) {
                            $('#btn_Clone').removeClass('disabled');
                            $('#btn_Edit').removeClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').removeClass('disabled');
                        }
                        else if (selRowsCount > 1) {
                            $('#btn_Clone').addClass('disabled');
                            $('#btn_Edit').addClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').addClass('disabled');
                        }
                        var sel_row_count = jQuery('#grid').jqGrid('getGridParam', 'selarrrow');
                        var grd_rec_count = $("#grid").jqGrid('getGridParam', 'reccount');

                        if (sel_row_count.length == grd_rec_count) {
                            jQuery('#cb_grid').prop('checked', true);
                        }
                        else {
                            jQuery('#cb_grid').prop('checked', false);
                        }
                    },

                }).navGrid('#pager', { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });



                //Vertical Records Per page Internal scroll
                $("#grid").parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');


            }
        },
        error: function () {
            alert("Error with AJAX callback");
        }

    });

}

//security images
function OtherInfoGridForPopup(grid, pager, tenantId, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns, editUrl, deleteUrl) {

    //var ColN = [];
    //var ColM = [];
    //for (var s = 0; s < schemaUrl.length; s++) {
    //    ColN[s] = schemaUrl[s][0];
    //    ColM[s] = schemaUrl[s][1];
    //}


    EditUrl = editUrl;
    var ColN;
    var ColM;
    var ColD;
    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {
            if (st == "success") {
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];
                showColumns = data[3];





                var colNames = [];
                var colModels = [];

                //colNames[0] = 'Actions';
                //colModels[0] = { name: 'act', index: 'act', width: 100, sortable: false };

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: 200 }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: 200 }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 200 }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'number', width: 250 }
                        }
                        else if (ColM[i] == 'act') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], width: 100, sortable: false }
                        }
                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], width: 280 }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 200 }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], searchtype: 'number', width: 250 }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], width: 200 }
                        }



                    }
                }


                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {

                        var rows = data.rows;
                        for (var i = 0; rows != null && i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + pager),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: false,

                    height: '100%',

                    //autowidth: true,//parent width
                    //shrinkToFit: true,//adjust the colums to grid

                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,
                    gridComplete: function () {
                        var ids = jQuery("#" + grid).jqGrid('getDataIDs');
                        for (var i = 0; i < ids.length; i++) {
                            var id = ids[i];
                            ////edit = "<a class=\"btn-sm modal-link\" style=\"border:none !important;\"  href=\"" + editUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\">";
                            del = "<a  class=\"btn btn-default btn-sm\" style=\"border:none !important;width:100%;\"  onclick=\"verifydelete(" + id + ");\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";
                            jQuery("#" + grid).jqGrid('setRowData', ids[i], { act: del });
                            jQuery("#" + grid).trigger('reloadGrid');
                        }
                    },

                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit options
                     },
                     {  // add options
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });

                //Vertical Records Per page Internal scroll
                $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#" + grid),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');


            }
        },
        error: function () {
            alert("Error with AJAX callback");
        }
    });

}

function OtherInfoGridForCI(grid, pager, tenantId, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns, editUrl, deleteUrl) {

    var ColN;
    var ColM;
    var ColD;
    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {
            if (st == "success") {
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];
                showColumns = data[3];
                var colNames = [];
                var colModels = [];
                colNames[0] = 'Actions';
                colModels[0] = { name: 'act', index: 'act', width: 100, sortable: false, align: 'center' };
                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];
                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (hideColumns.includes(ColN[i])) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (showColumns.includes(ColN[i])) {
                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'number' }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], width: 280, searchtype: 'bool', formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i] }
                        }
                    }
                    else {
                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], searchtype: 'number' }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i] }
                        }
                    }
                }
                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {
                        var rows = data.rows;
                        for (var i = 0; rows != null && i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {
                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + pager),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },

                    multiselect: false,
                    height: '100%',
                    autowidth: true,//parent width
                    shrinkToFit: true,//adjust the colums to grid
                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,
                    gridComplete: function () {
                        var ids = jQuery("#" + grid).jqGrid('getDataIDs');
                        for (var i = 0; i < ids.length; i++) {
                            var id = ids[i];
                            //var tenantId = $('#' + grid).jqGrid('getCell', id, 'TenantId');


                            edit = "<a title=\"Edit\" class=\"btn btn-default class=\"btn-sm \" style=\"border:none !important;\"  href=\"" + editUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Edit</a>";

                            var url = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";

                            del = "<a title=\"delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessage(" + url + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";

                            jQuery("#" + grid).jqGrid('setRowData', ids[i], { act: edit + del });

                        }

                    },
                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },

                     {  // edit options

                     },

                     {  // add options

                     },

                     {  // delete 

                     },

                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true

                     });
                OrsusGridResize(grid);
            }

        },

        error: function () {
            alert("Error with AJAX callback");
        }
    });
    //$(window).bind('resize', function () {

    //    gridParentWidth = $(window).width() - 315;

    //    $("#" + grid).setGridWidth(gridParentWidth);

    //}).trigger('resize');
}
//Not Used
function OtherInfoGrid(grid, pager, tenantId, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns, editUrl, deleteUrl) {
    debugger;
    var ColN = [];
    var ColM = [];
    for (var s = 0; s < schemaUrl.length; s++) {
        ColN[s] = schemaUrl[s][0];
        ColM[s] = schemaUrl[s][1];
    }



    //var ColN;
    //var ColM;
    //$.ajax({
    //    url: schemaUrl,
    //    type: "Get",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data, st) {
    //        if (st == "success") {
    //            ColN = data[0];//Names
    //            ColM = data[1]; //datatypes


    var colNames = [];
    var colModels = [];

    colNames[0] = 'Actions';
    colModels[0] = { name: 'act', index: 'act', width: 100, sortable: false };

    for (var i = 0; i < ColN.length; i++) {
        colNames[i + 1] = ColN[i];

        if (ColN[i] == keyID) {
            colModels[i + 1] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
        }
        else if (hideColumns.indexOf(ColN[i]) > -1) {
            colModels[i + 1] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
        }
        else if (showColumns.indexOf(ColN[i]) > -1) {

            if (ColM[i] == 'DateTime') {
                colModels[i + 1] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
            }
            else if (ColM[i] == 'Int64') {
                colModels[i + 1] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'number' }
            }
            else {
                colModels[i + 1] = { key: false, name: ColN[i], index: ColN[i] }
            }

        }
        else {


            if (ColM[i] == 'DateTime') {
                colModels[i + 1] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
            }
            else if (ColM[i] == 'Int64') {
                colModels[i + 1] = { key: false, hidden: true, name: ColN[i], index: ColN[i], searchtype: 'number' }
            }
            else {
                colModels[i + 1] = { key: false, hidden: true, name: ColN[i], index: ColN[i] }
            }



        }
    }


    $("#" + grid).jqGrid({
        colNames: colNames,
        colModel: colModels,
        caption: caption,
        sortname: keyID,
        url: apiBaseUrl + dataUrl,
        loadBeforeSend: function (jqXHR) {
            jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
        },
        beforeProcessing: function (data) {

            var rows = data.rows;
            for (var i = 0; rows != null && i < rows.length; i++) {
                for (var property in rows[i]) {
                    if ($.isArray(rows[i][property])) {

                        for (var j = 0; j < rows[i][property].length; j++) {
                            rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                        }
                        delete rows[i][property];
                    }
                }
            }
            data.rows = rows;
            return data;
        },
        datatype: 'json',
        mtype: 'Get',
        pager: jQuery('#' + pager),
        rowNum: 10,
        rowList: [10, 25, 50, 100],
        viewrecords: true,
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        multiselect: false,

        height: '100%',

        autowidth: true,//parent width
        shrinkToFit: true,//adjust the colums to grid

        loadonce: false,
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        rownumWidth: 40,
        gridComplete: function () {

            var ids = jQuery("#" + grid).jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                //var tenantId = $('#' + grid).jqGrid('getCell', id, 'TenantId');
                //
                edit = "<a class=\"btn-sm modal-link\" style=\"border:none !important;\"  href=\"" + editUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Edit</a>";
                del = "<a  class=\"btn btn-default btn-sm\" style=\"border:none !important;\" href=\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";
                jQuery("#" + grid).jqGrid('setRowData', ids[i], { act: edit + del });
            }
        },

    }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
         {  // edit options
         },
         {  // add options
         },
         {  // delete 
         },
         {
             multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
         });


    //Vertical Records Per page Internal scroll
    $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

    //Responsive grid
    $(window).on("resize", function () {
        setTimeout(function () {
            var $grid = $("#" + grid),
            newWidth = $grid.closest(".ui-jqgrid").parent().width();
            $grid.jqGrid("setGridWidth", newWidth, true);
        }, 300);
    }).trigger('resize');

}

//Application Roles 
function OtherInfoGridDeleteOnly(grid, pager, tenantId, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns, deleteUrl) {
    //var ColN = [];
    //var ColM = [];
    //for (var s = 0; s < schemaUrl.length; s++) {
    //    ColN[s] = schemaUrl[s][0];
    //    ColM[s] = schemaUrl[s][1];
    //}
    debugger;
    var ColN;
    var ColM;
    var ColD;
    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {
            if (st == "success") {
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];
                showColumns = data[3];

                var colNames = [];
                var colModels = [];

                //colNames[0] = 'Actions';
                //colModels[0] = { name: 'act', index: 'act', width: 100, sortable: false };

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];
                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'number' }
                        }
                        else if (ColM[i] == 'act') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], width: 100, sortable: false }
                        }
                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], width: 1400 }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], searchtype: 'number' }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], width: 1400 }
                        }



                    }
                }


                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    //caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {

                        var rows = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + pager),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: false,

                    height: '100%',

                    autowidth: true,//parent width
                    shrinkToFit: true,//adjust the colums to grid

                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,
                    gridComplete: function () {
                        var ids = jQuery("#" + grid).jqGrid('getDataIDs');
                        for (var i = 0; i < ids.length; i++) {
                            var id = ids[i];
                            var url = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                            del = "<a  class=\"btn btn-default btn-sm\" style=\"border:none !important;width:100%;\" onclick='WarningMessagePopup(" + url + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";
                            jQuery("#" + grid).jqGrid('setRowData', ids[i], { act: del });
                        }
                    },

                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit options
                     },
                     {  // add options
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });


                //Vertical Records Per page Internal scroll
                $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#" + grid),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');


            }
        },
        error: function () {
            alert("Error with AJAX callback");
        }
    });


}

//Req Privileged Account
function ManagePageRequestGrid(schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    // debugger;
    var ColN;
    var ColM;
    var ColD;
    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];
                showColumns = data[3];

                var twidth = $('#managegridwidth').width() - 70;
                var colCount = showColumns.length;
                var eColWidth = twidth / colCount;

                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: eColWidth, hidedlg: true }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'number', width: eColWidth, hidedlg: true }
                        }
                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], width: eColWidth, hidedlg: true }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: eColWidth }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], searchtype: 'number', width: eColWidth }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], width: eColWidth }
                        }



                    }
                }


                $("#grid").jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {

                        var rows = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                                if (property == "WorkflowStatus") {

                                    if (rows[i][property] == "Completed") {
                                        rows[i][property] = '<div style="text-align:center"><button title="Completed" class="btn btn-success btn-circle" style="width:10%;height:10%" type="button"></button></div>'
                                    }
                                    else if (rows[i][property] == "Pending") {
                                        rows[i][property] = '<div style="text-align:center"><button title="Pending" class="btn btn-warning btn-circle" type="button" style="width:10%;height:10%;"></button></div>'
                                    }
                                    else if (rows[i][property] == "Rejected") {
                                        rows[i][property] = '<div style="text-align:center"><button title="Rejected" class="btn btn-danger btn-circle" type="button" style="width:10%;height:10%;"></button></div>'
                                    }
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#pager'),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,

                    height: '100%',

                    //autowidth: true,//parent width
                    shrinkToFit: false,//adjust the colums to grid

                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,
                    onSelectRow: function (id) {
                        var selRowsCount = jQuery('#grid').jqGrid('getGridParam', 'selarrrow').length;
                        if (selRowsCount == 0) {
                            $('#btn_Clone').addClass('disabled');
                            $('#btn_Edit').addClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').addClass('disabled');
                        }

                        else if (selRowsCount >= 1) {

                            $('#btn_New').addClass('disabled');
                            $('#btn_Clone').addClass('disabled');
                            $('#btn_Edit').removeClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').addClass('disabled');
                        }

                        var sel_row_count = jQuery('#grid').jqGrid('getGridParam', 'selarrrow');
                        var grd_rec_count = $("#grid").jqGrid('getGridParam', 'reccount');

                        if (sel_row_count.length == grd_rec_count) {
                            jQuery('#cb_grid').prop('checked', true);
                        }
                        else {
                            jQuery('#cb_grid').prop('checked', false);
                        }
                    },
                    onSelectAll: function (id, status) {
                        var selRowsCount = jQuery('#grid').jqGrid('getGridParam', 'selarrrow').length;
                        if (selRowsCount >= 1) {
                            $('#btn_Clone').addClass('disabled');
                            $('#btn_Edit').removeClass('disabled');
                            $('#btn_Delete').removeClass('disabled');
                            $('#btn_View').addClass('disabled');
                        } else if (selRowsCount == 0) {
                            $('#btn_Clone').addClass('disabled');
                            $('#btn_Edit').addClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').addClass('disabled');
                        }
                    },

                    gridComplete: function () {
                        var count = jQuery("#grid").getGridParam("reccount");
                        if (count >= 1) {
                            // $('#btn_New').addClass('disabled');
                            $('#btn_Clone').addClass('disabled');
                            $('#btn_Edit').addClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').addClass('disabled');
                        } else if (count == 0) {
                            $('#btn_Clone').addClass('disabled');
                            $('#btn_Edit').addClass('disabled');
                            $('#btn_Delete').addClass('disabled');
                            $('#btn_View').addClass('disabled');
                        }
                    }


                }).navGrid('#pager', { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });


                $("#grid").navButtonAdd('#pager',
                {
                    buttonicon: "ui-icon-calculator",
                    title: "Column chooser",
                    caption: "Columns",
                    position: "last",
                    onClickButton: function () {
                        // call the column chooser method
                        jQuery("#grid").jqGrid('columnChooser',
                        {
                            width: 500,
                            dialog_opts: {
                                modal: true,
                                minWidth: 600,
                            },
                        }
                            );
                    }
                });

                //Vertical Records Per page Internal scroll
                $("#grid").parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');
            }
        },
        error: function () {
            alert("Error with AJAX callback");
        }

    });


}

//ListEntry
function OtherInfoGridOnCondition(grid, pager, tenantId, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns, editUrl, deleteUrl, condtion) {
    debugger;
    //var ColN = [];
    //var ColM = [];
    //for (var s = 0; s < schemaUrl.length; s++) {
    //    ColN[s] = schemaUrl[s][0];
    //    ColM[s] = schemaUrl[s][1];
    //}




    var ColN;
    var ColM;
    var ColD;
    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {
            if (st == "success") {
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];
                showColumns = data[3];




                var colNames = [];
                var colModels = [];
                //colNames[0] = 'Actions';
                //colModels[0] = { name: 'act', index: 'act', width: 60, sortable: false, align: 'center' };
                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: 280 }
                    }
                    else if (hideColumns.includes(ColN[i])) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: 280 }
                    }
                    else if (showColumns.includes(ColN[i])) {
                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 280 }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'number', width: 280 }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], width: 280, searchtype: 'bool', formatter: booleanFormatter }
                        }
                        else if (ColM[i] == 'act') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], width: 100, sortable: false }
                        }
                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], width: 280 }
                        }
                    }
                    else {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 280 }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], searchtype: 'number', width: 280 }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], width: 280 }
                        }

                    }
                }

                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {
                        debugger;
                        var rows = data.rows;
                        for (var i = 0; rows != null && i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {
                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + pager),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: false,
                    height: '100%',
                    autowidth: true,//parent width
                    shrinkToFit: true,//adjust the colums to grid
                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,
                    gridComplete: function () {
                        var ids = jQuery("#" + grid).jqGrid('getDataIDs');
                        debugger;
                        var EntryType = 'nothing';
                        for (var i = 0; i < ids.length; i++) {
                            var id = ids[i];
                            if (condtion == "ListValues") {
                                debugger;
                                value = $('#' + grid).jqGrid('getCell', id, 'EntryType');
                                var editurl = "\"" + editUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                edit = "<a id=\"edit_" + id + "\" title=\"Edit\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\"  onclick='AlertUser(" + editurl + ",\"" + value + "\"" + ",\"edit\"," + id + ")'><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Edit</a>";
                                //var delurl = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                //del = "<a  title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='AlertUser(" + delurl + ",\"" + value + "\"" + ",\"delete\")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> </a>";
                                var delurl = "";
                                del = "";
                            }
                            else if (condtion == "NoEdit") {
                                edit = "";
                                var delurl = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessage(" + url + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";
                            }
                            else if (condtion == "GateKeeper") {
                                edit = "";
                                del = "";
                                edit = "<a title=\"Edit\" class=\"modal-link btn-sm\" style=\"border:none !important;\"  href=\"" + editUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Edit</a>";
                                var url = "\"" + deleteUrl + "?keyId=" + id + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopup(" + url + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";
                            }
                            else if (condtion == "Services") {

                                edit = "<a  title=\"Edit\" class=\"modal-link btn-sm\" style=\"border:none !important;\"  href=\"" + editUrl + "?keyId=" + id + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Edit</a>";
                                var url = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopup(" + url + ", " + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";
                            }

                            else if (condtion == "KeyEndPoints") {
                                edit = "";
                                var url = "\"" + deleteUrl + "?keyId=" + id + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\"  onclick='WarningMessageCondition(" + url + ",\"KeyEndPoints\")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";

                                var usage = "<a title=\"Usage\" class=\"modal-link btn-info btn-sm\" style=\"border:none !important;\"  href=\"/RestAPI/KeyUsage?keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-history\" aria-hidden=\"true\"></i> Usage </a>";
                                jQuery("#" + grid).jqGrid('setRowData', ids[i], { Usage: usage });
                            }
                            else if (condtion == "EndpointKeys") {
                                edit = "";
                                del = "";

                                var usage = "<a title=\"Usage\" class=\"modal-link btn-info btn-sm\" style=\"border:none !important;\"  href=\"/RestAPI/KeyUsage?keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-history\" aria-hidden=\"true\"></i> Usage </a>";
                                jQuery("#" + grid).jqGrid('setRowData', ids[i], { Usage: usage });
                            }

                            else {
                                edit = "<a title=\"Edit\" class=\"modal-link btn-sm\" style=\"border:none !important;\"  href=\"" + editUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Edit</a>";
                                var url = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessage(" + url + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";
                            }
                            jQuery("#" + grid).jqGrid('setRowData', ids[i], { act: edit + del });
                        }
                    },
                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit options
                     },
                     {  // add options
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });


                //Vertical Records Per page Internal scroll
                $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#" + grid),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');


            }
        },
        error: function () {
            alert("Error with AJAX callback");
        }
    });


}


function verifydelete(id) {
    var keyID = id;

    url = EditUrl + "&keyId=" + keyID;
    var data = GetJsonFromApi(url);
    var EntryType = data.EntryType;
    if (EntryType == "System") {
        ErrorAlert("This Record Cannot be Deleted As it is System Type");
    }
    else {
        $.ajax({
            //  url: '/Administration/Delete?tenantId=' + getCookie('TenantId') + '&keyId=' + keyID + '',
            url: apiBaseUrl + 'SecurityImages/Delete?tenantid=' + getCookie('TenantId') + '&keyId=' + keyID + '',
            headers: {
                'ORSUS': getCookie('ORSUS')
            },
            type: "Get",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data

            success: function (result) {
                debugger;
                if (result != -1) {
                    $("#gridSecImages").trigger('reloadGrid');
                    SuccessAlert("Security Image Deleted Successfully");
                    this.close();
                }
                else {
                    ErrorAlert("This Record Cannot be Deleted");
                }
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    }

}

function WarningMessage(Url) {
    debugger;
    swal({
        title: "Delete Warning",
        text: "Are you sure you want to delete?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            window.location.href = Url;
        } else {

        }
    });
}


function WarningMessageCondition(Url, Condition) {
    swal({
        title: "Delete Warning",
        text: "Are you sure you want to delete?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (Condition == 'KeyEndPoints') {
                setTimeout(function () {
                    var del = GetJsonFromApi(Url);
                    if (del == true) {
                        $("#gridKeyEndPoints").setGridParam({ datatype: 'json', page: 1 }).trigger('reloadGrid');
                        CustomAlert("Success!", "Deleted Successfully.", 'success', false, 'Ok', '', true, true, 'NoAction', '');
                    }
                }, 300);
            }
        } else {

        }
    });
}


function AlertUser(Url, Value, Action, id) {
    debugger;
    if (Action == 'delete') {
        if (Value == 'System') {
            ErrorAlert("System Values cannot be deleted");
        }
        else {
            WarningMessage(Url);
        }
    }
    else if (Action == 'edit') {
        if (Value == 'System') {
            ErrorAlert("System Values cannot be modified");
        }
        else {

            //$('#edit_').attr('data-target', '#modal-container');
            //$('#edit_').attr('data-toggle', 'modal');
            //$('#edit_').attr('href', Url);
            //$('#edit_' + id).attr('Class', 'modal-link btn-sm');


            $('#edit_' + id).attr('data-toggle', 'modal');
            $('#edit_' + id).attr('href', Url);
            $('#edit_' + id).attr('Class', 'modal-link2 btn-sm');
            $('#edit_' + id).attr('data-target', '#modal-container2');

        }
    }
}

function OtherInfoGridWarningMessage(Url) {
    swal({
        title: "Delete Warning",
        text: "Are you sure you want to delete?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            window.location.href = Url;
        } else {

        }
    });
}

function booleanFormatter(cellvalue, options, rowObject) {

    if (cellvalue == true) {
        return 'Yes';
    }
    else {
        return 'No';
    }
}

function WarningMessagePopup(Url, grid) {
    swal({
        title: "Delete Warning",
        text: "Are you sure you want to delete?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            debugger;
            $.ajax({
                url: apiBaseUrl + Url,
                headers: {
                    'ORSUS': getCookie('ORSUS')
                },
                ///Added to change every methods to HttpPost
                type: 'Post',
                ///
                async: false,
                success: function (data) {

                    if (data)
                        console.log(data)
                    SuccessAlert('Record Deleted Successfully');
                    if ($(grid).prop('nodeName') == "TABLE") {
                        $(grid).trigger('reloadGrid');

                    }
                    else {
                        $("#" + grid).trigger('reloadGrid');
                    }

                }
            });
        } else {

        }
    });
}




//All ManagePageGridForIncidentsandRequests
function ManagePageGridForIncidentsFrozenView(grid, pager, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    debugger;
    var ColN;
    var ColM;
    var ColD;
    //var TimeLog;

    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                data[0].push("QuickManage");
                data[1].push("manage");
                data[2].push("Quick Manage");
                data[3].push("QuickManage");

                data[0].push("AddTimeLog");
                data[1].push("manage");
                data[2].push("Add TimeLog");
                data[3].push("AddTimeLog");
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];//display name
                showColumns = data[3];
                debugger;
                ////Manage pagegrid width
                var twidth = $('#managegridwidth').width() - 70;
                var colCount = showColumns.length;
                var eColWidth = twidth / colCount;


                //, width: eColWidth 

                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth, frozen: true }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, name: ColN[i], index: ColN[i], formatter: 'date', width: eColWidth, hidedlg: true, searchrules: { required: true }
                                //searchoptions: {
                                //    dataInit: function (element) {
                                //        $(element).datepicker({
                                //            id: ColN[i] + '_datePicker',
                                //            dateFormat: 'yy-mm-dd',
                                //            showOn: 'focus'
                                //        });
                                //    },
                                //    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                //},
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else if (ColM[i] == 'manage') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'], Value: "" } }
                        }
                        else if (ColN[i] == 'IncidentID') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 100, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] }, frozen: true }
                        }
                        else if (ColN[i] == 'IncidentDescription') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 400, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] }, frozen: true, formatter: IncidentSubjectformatter }
                        }
                        else if (ColN[i] == 'RequestedByName') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 130, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] }, frozen: true }
                        }

                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', width: eColWidth, searchrules: { required: true }
                                //searchoptions: {
                                //    dataInit: function (element) {
                                //        $(element).datepicker({
                                //            id: ColN[i] + '_datePicker',
                                //            dateFormat: 'yy-mm-dd',
                                //            showOn: 'focus'
                                //        });
                                //    },
                                //    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                //}
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }



                    }
                }

                //Checkbox state,menu enabledisable
                idsOfSelectedRows = [],
                updateIdsOfSelectedRows = function (id, isSelected) {
                    var index = $.inArray(id, idsOfSelectedRows);
                    if (!isSelected && index >= 0) {
                        idsOfSelectedRows.splice(index, 1); // remove id from the list
                    } else if (index < 0) {
                        idsOfSelectedRows.push(id);
                    }
                    if (idsOfSelectedRows.length == 0) {
                        $('#btn_Assign').attr("disabled", "disabled");
                        $('#btn_pickup').attr("disabled", "disabled");
                        $('#btn_bulkupdate').attr("disabled", "disabled");
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').attr("disabled", "disabled");
                        $('#btn_Delete').attr("disabled", "disabled");

                        $('#btn_Assign').addClass('avoid-clicks');
                        $('#btn_pickup').addClass('avoid-clicks');
                        $('#btn_bulkupdate').addClass('avoid-clicks');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Delete').addClass('avoid-clicks');
                        $('#btn_merge').addClass('avoid-clicks');
                    }
                    else if (idsOfSelectedRows.length == 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').removeAttr('disabled');
                        $('#btn_Delete').removeAttr('disabled');

                        $('#btn_Edit').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');

                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');

                        keyId = idsOfSelectedRows[0];
                    }
                    else if (idsOfSelectedRows.length > 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').removeAttr('disabled');
                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');
                        $('#btn_merge').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');
                        $('#btn_Delete').removeAttr('disabled');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Edit').attr("disabled", "disabled");
                    }
                    var sel_row_count = jQuery('#' + grid).jqGrid('getGridParam', 'selarrrow');
                    var grd_rec_count = $("#" + grid).jqGrid('getGridParam', 'reccount');

                    if (sel_row_count.length == grd_rec_count) {
                        jQuery('#cb_' + grid).prop('checked', true);
                    }
                    else {
                        jQuery('#cb_' + grid).prop('checked', false);
                    }
                };
                debugger;

                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {
                        debugger;
                        var rows = data.rows;
                        TimeLog = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                                if (property == "PriorityValue") {

                                    if (rows[i][property] == "High") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--high tickets__list--dropdown"></span>High</span></div>'
                                    }
                                    else if (rows[i][property] == "Medium") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Medium</span></div>'
                                    }
                                    else if (rows[i][property] == "Low" || rows[i][property] == "LOW") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--low tickets__list--dropdown"></span>Low</span></div>'
                                    }
                                }

                                else if (property == "IncidentStatusValue") {

                                    if (rows[i][property] == "On Hold") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--high tickets__list--dropdown"></span>On Hold</span></div>'
                                    }
                                    else if (rows[i][property] == "Open") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Open</span></div>'
                                    }
                                    else if (rows[i][property] == "Waiting for Update") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Waiting for Update</span></div>'
                                    }
                                    else if (rows[i][property] == "Work Inprogress") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Work Inprogress</span></div>'
                                    }
                                }
                                else if (property == "UrgencyValue") {

                                    if (rows[i][property] == "High") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--high tickets__list--dropdown"></span>High</span></div>'
                                    }
                                    else if (rows[i][property] == "Low") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Low</span></div>'
                                    }
                                    else if (rows[i][property] == "Normal") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Normal</span></div>'
                                    }
                                    else if (rows[i][property] == "Urgent") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Urgent</span></div>'
                                    }
                                }
                                if (property == "QuickManage") {

                                    rows[i].QuickManage = "<div style=\"text-align:center\"><a title=\"QuickManage\" data-toggle=\"modal\" data-backdrop=\"static\"  class=\"modal-link\"    href=\"../../Incidents/QuickManage" + "?keyId=" + rows[i][keyID] + "\"><i class=\"fa fa-edit fa-2x\"></i></a></div>";

                                }
                                else if (property == "AddTimeLog") {
                                    rows[i].AddTimeLog = "<div id=\"fvcountup" + rows[i].IncidentInfoID + "\" class=\"AddTimeLogCount\" value=\"" + rows[i].IncidentTimeLogID + "\" style=\" text-align: center\"><p id=\"fvhours" + rows[i].IncidentInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"fvminutes" + rows[i].IncidentInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"fvseconds" + rows[i].IncidentInfoID + "\" style=\"display: inline-block;\">00</p></div> <div id=\"fvbuttons" + rows[i].IncidentInfoID + "\" title=\"Incident time log\" style=\"margin: -18px 4px -16px 46px;\"> <a id=\"fvbtnStart" + rows[i].IncidentInfoID + "\" onclick=\"Start('" + rows[i].IncidentInfoID + "','" + rows[i].LogStartTime + "','fv');\" style=\"width: 16%;color:white; min-width: 60px; padding: 2px 15px;\"><i id=\"" + rows[i].IncidentInfoID + "\" class=\"fa fa-play\" aria-hidden=\"true\" title=\"start\" style=\"color: #2cb901;font-size: 18px;\"></i></a>&nbsp&nbsp<a id=\"fvbtnStop" + rows[i].IncidentInfoID + "\" onclick=\"Stop('" + rows[i].IncidentInfoID + "','" + rows[i].LogStartTime + "','fv');\"><i id=\"" + rows[i].IncidentInfoID + "\" class=\"fa fa-stop\" aria-hidden=\"true\" title=\"stop\" style=\"color: #a70707; font-size: 17px;\"></i></a> </div> ";
                                }
                                else if (property == "CreatedOn") {

                                    rows[i].CreatedOn = dateToStr(rows[i][property]);
                                    // rows[i].CreatedOn = '<time class="timeago" datetime="' + rows[i][property] + '">' + rows[i][property] + '</time>';
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + pager),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    //viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,
                    rownumbers: true,
                    height: '100%',

                    autowidth: true,//parent width  //shrinkToFit: true,//adjust the colums to grid
                    loadonce: false,
                    shrinkToFit: true, // must be set with frozen columns, otherwise columns will be shrank to fit the grid width

                    sortorder: "desc",
                    rownumWidth: 40,
                    scroll: false,
                    onSelectRow: updateIdsOfSelectedRows,
                    onSelectAll: function (aRowids, isSelected) {
                        var i, count, id;
                        for (i = 0, count = aRowids.length; i < count; i++) {
                            id = aRowids[i];
                            updateIdsOfSelectedRows(id, isSelected);
                        }
                    },
                    loadComplete: function () {
                        debugger;
                        var jqRecordsCount = $("#" + grid).jqGrid('getGridParam', 'reccount');
                        if (jqRecordsCount == 0) {
                            $('#next_' + pager).addClass('ui-state-disabled');
                            $('#last_' + pager).addClass('ui-state-disabled');
                            $('#first_' + pager).addClass('ui-state-disabled');
                            $('#prev_' + pager).addClass('ui-state-disabled');
                        }

                        var $this = $(this), i, count;
                        for (i = 0, count = idsOfSelectedRows.length; i < count; i++) {
                            $this.jqGrid('setSelection', idsOfSelectedRows[i], false);
                        }
                        IncidentTemeLog(TimeLog, "fv"); //fv refers Frozen View Grid id's
                    },


                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true,
                     });



                $("#" + grid).navButtonAdd('#' + pager,
                {
                    buttonicon: "ui-icon-calculator",
                    title: "Column chooser",
                    caption: "Columns",
                    position: "last",
                    onClickButton: function () {
                        // call the column chooser method
                        jQuery("#" + grid).jqGrid('columnChooser',
                        {
                            width: 500,
                            dialog_opts: {
                                modal: true,
                                minWidth: 600,
                            },
                        }
                            );
                    }
                });
                $("#" + grid).jqGrid("setFrozenColumns");


                //Vertical Records Per page Internal scroll
                $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#" + grid),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');

            }


        },
        error: function () {
            //alert("Error with AJAX callback");
        }

    });
}



//All ManagePageGridForRequestsandRequests
function ManagePageGridForRequestsFrozenView(grid, pager, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    debugger;
    var ColN;
    var ColM;
    var ColD;
    //var TimeLog;

    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                data[0].push("QuickManage");
                data[1].push("manage");
                data[2].push("Quick Manage");
                data[3].push("QuickManage");

                data[0].push("AddTimeLog");
                data[1].push("manage");
                data[2].push("Add TimeLog");
                data[3].push("AddTimeLog");
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];//display name
                showColumns = data[3];
                debugger;
                ////Manage pagegrid width
                var twidth = $('#managegridwidth').width() - 70;
                var colCount = showColumns.length;
                var eColWidth = twidth / colCount;


                //, width: eColWidth 

                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth, frozen: true }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, name: ColN[i], index: ColN[i], formatter: 'date', width: eColWidth, hidedlg: true, searchrules: { required: true }
                                //searchoptions: {
                                //    dataInit: function (element) {
                                //        $(element).datepicker({
                                //            id: ColN[i] + '_datePicker',
                                //            dateFormat: 'yy-mm-dd',
                                //            showOn: 'focus'
                                //        });
                                //    },
                                //    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                //},
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else if (ColM[i] == 'manage') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'], Value: "" } }
                        }
                        else if (ColN[i] == 'RequestID') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 100, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] }, frozen: true }
                        }
                        else if (ColN[i] == 'RequestDescription') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 400, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] }, frozen: true, formatter: RequestSubjectformatter }
                        }
                        else if (ColN[i] == 'RequestedByName') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 130, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] }, frozen: true }
                        }

                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', width: eColWidth, searchrules: { required: true }
                                //searchoptions: {
                                //    dataInit: function (element) {
                                //        $(element).datepicker({
                                //            id: ColN[i] + '_datePicker',
                                //            dateFormat: 'yy-mm-dd',
                                //            showOn: 'focus'
                                //        });
                                //    },
                                //    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                //}
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }



                    }
                }

                //Checkbox state,menu enabledisable
                idsOfSelectedRows = [],
                updateIdsOfSelectedRows = function (id, isSelected) {
                    var index = $.inArray(id, idsOfSelectedRows);
                    if (!isSelected && index >= 0) {
                        idsOfSelectedRows.splice(index, 1); // remove id from the list
                    } else if (index < 0) {
                        idsOfSelectedRows.push(id);
                    }
                    if (idsOfSelectedRows.length == 0) {
                        $('#btn_Assign').attr("disabled", "disabled");
                        $('#btn_pickup').attr("disabled", "disabled");
                        $('#btn_bulkupdate').attr("disabled", "disabled");
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').attr("disabled", "disabled");
                        $('#btn_Delete').attr("disabled", "disabled");

                        $('#btn_Assign').addClass('avoid-clicks');
                        $('#btn_pickup').addClass('avoid-clicks');
                        $('#btn_bulkupdate').addClass('avoid-clicks');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Delete').addClass('avoid-clicks');
                        $('#btn_merge').addClass('avoid-clicks');
                    }
                    else if (idsOfSelectedRows.length == 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').removeAttr('disabled');
                        $('#btn_Delete').removeAttr('disabled');

                        $('#btn_Edit').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');

                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');

                        keyId = idsOfSelectedRows[0];
                    }
                    else if (idsOfSelectedRows.length > 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').removeAttr('disabled');
                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');
                        $('#btn_merge').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');
                        $('#btn_Delete').removeAttr('disabled');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Edit').attr("disabled", "disabled");
                    }
                    var sel_row_count = jQuery('#' + grid).jqGrid('getGridParam', 'selarrrow');
                    var grd_rec_count = $("#" + grid).jqGrid('getGridParam', 'reccount');

                    if (sel_row_count.length == grd_rec_count) {
                        jQuery('#cb_' + grid).prop('checked', true);
                    }
                    else {
                        jQuery('#cb_' + grid).prop('checked', false);
                    }
                };
                debugger;

                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {
                        debugger;
                        var rows = data.rows;
                        TimeLog = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                                if (property == "PriorityValue") {

                                    if (rows[i][property] == "High") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--high tickets__list--dropdown"></span>High</span></div>'
                                    }
                                    else if (rows[i][property] == "Medium") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Medium</span></div>'
                                    }
                                    else if (rows[i][property] == "Low" || rows[i][property] == "LOW") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--low tickets__list--dropdown"></span>Low</span></div>'
                                    }
                                }

                                else if (property == "RequestStatusValue") {

                                    if (rows[i][property] == "On Hold") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--high tickets__list--dropdown"></span>On Hold</span></div>'
                                    }
                                    else if (rows[i][property] == "Open") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Open</span></div>'
                                    }
                                    else if (rows[i][property] == "Waiting for Update") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Waiting for Update</span></div>'
                                    }
                                    else if (rows[i][property] == "Work Inprogress") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Work Inprogress</span></div>'
                                    }
                                }
                                else if (property == "UrgencyValue") {

                                    if (rows[i][property] == "High") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--high tickets__list--dropdown"></span>High</span></div>'
                                    }
                                    else if (rows[i][property] == "Low") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Low</span></div>'
                                    }
                                    else if (rows[i][property] == "Normal") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Normal</span></div>'
                                    }
                                    else if (rows[i][property] == "Urgent") {
                                        rows[i][property] = '<div class="col-lg-3"><span class="ember-power-select-selected-item"><span class="tickets__list--medium tickets__list--dropdown"></span>Urgent</span></div>'
                                    }
                                }
                                if (property == "QuickManage") {

                                    rows[i].QuickManage = "<div style=\"text-align:center\"><a title=\"QuickManage\" data-toggle=\"modal\" data-backdrop=\"static\"  class=\"modal-link\"    href=\"../../Requests/QuickManage" + "?keyId=" + rows[i][keyID] + "\"><i class=\"fa fa-edit fa-2x\"></i></a></div>";

                                }
                                else if (property == "AddTimeLog") {
                                    if (rows[i].IsActiveTimeLog)
                                        rows[i].AddTimeLog = "<div id=\"fvcountup" + rows[i].RequestInfoID + "\" class=\"AddTimeLogCount\" value=\"" + rows[i].RequestTimeLogID + "\" style=\" text-align: center\"><p id=\"fvhours" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"fvminutes" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"fvseconds" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p></div> <div id=\"fvbuttons" + rows[i].RequestInfoID + "\" title=\"Request time log\" style=\"margin: -18px 4px -16px 46px;\"> <a id=\"fvbtnStart" + rows[i].RequestInfoID + "\" onclick=\"Start('" + rows[i].RequestInfoID + "','" + rows[i].LogStartTime + "','fv');\" style=\"width: 16%;color:white; min-width: 60px; padding: 2px 15px;\"><i id=\"" + rows[i].RequestInfoID + "\" class=\"fa fa-play\" aria-hidden=\"true\" title=\"start\" style=\"color: #2cb901;font-size: 18px;\"></i></a>&nbsp&nbsp<a id=\"fvbtnStop" + rows[i].RequestInfoID + "\" onclick=\"Stop('" + rows[i].RequestInfoID + "','" + rows[i].LogStartTime + "','fv');\"><i id=\"" + rows[i].RequestInfoID + "\" class=\"fa fa-stop\" aria-hidden=\"true\" title=\"stop\" style=\"color: #a70707; font-size: 17px;\"></i></a> </div> ";
                                    else
                                        rows[i].AddTimeLog = "<div id=\"fvcountup" + rows[i].RequestInfoID + "\" class=\"AddTimeLogCount\" value=\"" + rows[i].RequestTimeLogID + "\" style=\" text-align: center\"><p id=\"fvhours" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"fvminutes" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"fvseconds" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p></div> <div id=\"fvbuttons" + rows[i].RequestInfoID + "\" title=\"Request time log\" style=\"margin: -18px 4px -16px 46px;\"> <a id=\"fvbtnStart" + rows[i].RequestInfoID + "\" onclick=\"Start('" + rows[i].RequestInfoID + "','" + rows[i].LogStartTime + "','fv');\" style=\"width: 16%;color:white; min-width: 60px; padding: 2px 15px;pointer-events:none\"><i id=\"" + rows[i].RequestInfoID + "\" class=\"fa fa-play\" aria-hidden=\"true\" title=\"start\" style=\"color: gray;font-size: 18px;\"></i></a>&nbsp&nbsp<a style='pointer-events:none;'  id=\"fvbtnStop" + rows[i].RequestInfoID + "\" onclick=\"Stop('" + rows[i].RequestInfoID + "','" + rows[i].LogStartTime + "','fv');\"><i id=\"" + rows[i].RequestInfoID + "\" class=\"fa fa-stop\" aria-hidden=\"true\" title=\"stop\" style=\"color: gray; font-size: 17px;\"></i></a> </div> ";
                                }
                                else if (property == "CreatedOn") {

                                    rows[i].CreatedOn = dateToStr(rows[i][property]);
                                    // rows[i].CreatedOn = '<time class="timeago" datetime="' + rows[i][property] + '">' + rows[i][property] + '</time>';
                                }
                                
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + pager),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    //viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,
                    rownumbers: true,
                    height: '100%',

                    autowidth: true,//parent width  //shrinkToFit: true,//adjust the colums to grid
                    loadonce: false,
                    shrinkToFit: true, // must be set with frozen columns, otherwise columns will be shrank to fit the grid width

                    sortorder: "desc",
                    rownumWidth: 40,
                    scroll: false,
                    onSelectRow: updateIdsOfSelectedRows,
                    onSelectAll: function (aRowids, isSelected) {
                        var i, count, id;
                        for (i = 0, count = aRowids.length; i < count; i++) {
                            id = aRowids[i];
                            updateIdsOfSelectedRows(id, isSelected);
                        }
                    },
                    loadComplete: function () {
                        debugger;
                        var jqRecordsCount = $("#" + grid).jqGrid('getGridParam', 'reccount');
                        if (jqRecordsCount == 0) {
                            $('#next_' + pager).addClass('ui-state-disabled');
                            $('#last_' + pager).addClass('ui-state-disabled');
                            $('#first_' + pager).addClass('ui-state-disabled');
                            $('#prev_' + pager).addClass('ui-state-disabled');
                        }

                        var $this = $(this), i, count;
                        for (i = 0, count = idsOfSelectedRows.length; i < count; i++) {
                            $this.jqGrid('setSelection', idsOfSelectedRows[i], false);
                        }
                        RequestTemeLog(TimeLog, "fv"); //fv refers Frozen View Grid id's
                    },


                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true,
                     });



                $("#" + grid).navButtonAdd('#' + pager,
                {
                    buttonicon: "ui-icon-calculator",
                    title: "Column chooser",
                    caption: "Columns",
                    position: "last",
                    onClickButton: function () {
                        // call the column chooser method
                        jQuery("#" + grid).jqGrid('columnChooser',
                        {
                            width: 500,
                            dialog_opts: {
                                modal: true,
                                minWidth: 600,
                            },
                        }
                            );
                    }
                });
                $("#" + grid).jqGrid("setFrozenColumns");


                //Vertical Records Per page Internal scroll
                $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#" + grid),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');

            }


        },
        error: function () {
            //alert("Error with AJAX callback");
        }

    });
}


function dateToStr(cellvalue) {

    input_date = cellvalue; //+ " UTC";
    // convert times in milliseconds
    var input_time_in_ms = new Date(input_date).getTime();
    var current_time_in_ms = new Date().getTime();
    var elapsed_time = current_time_in_ms - input_time_in_ms;

    function numberEnding(number) {
        return (number > 1) ? 's ago' : '';
    }

    var temp = Math.floor(elapsed_time / 1000);
    var years = Math.floor(temp / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years);
    }
    //TODO: Months! Maybe weeks? 
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds);
    }
    return 'less than a second'; //'just now' //or other string you like;
}


function IncidentSubjectformatter(cellvalue, options, rowObject) {
    return cellvalue + '<br/><div class="col-lg-6"><strong>Priority :</strong></div>' + rowObject.PriorityValue + '<br/> <div class="col-lg-6"><strong>Incident Status :</strong></div></span> ' + rowObject.IncidentStatusValue + '<br/><div class="col-lg-6"><strong>Urgency :</strong></div>' + rowObject.UrgencyValue + '<br/> <div class="col-lg-6"><strong>Created On :</strong></div>' + '<div class="col-lg-3">' + rowObject.CreatedOn + '</div><br/> <div class="col-lg-6"><strong>Assigned To:</strong></div>' + '<div class="col-lg-3">' + rowObject.TechnicianName + '</div>'
}


function RequestSubjectformatter(cellvalue, options, rowObject) {
    return cellvalue + '<br/><div class="col-lg-6"><strong>Priority :</strong></div>' + rowObject.PriorityValue + '<br/> <div class="col-lg-6"><strong>Request Status :</strong></div></span> ' + rowObject.RequestStatusValue + '<br/><div class="col-lg-6"><strong>Urgency :</strong></div>' + rowObject.UrgencyValue + '<br/> <div class="col-lg-6"><strong>Created On :</strong></div>' + '<div class="col-lg-3">' + rowObject.CreatedOn + '</div><br/> <div class="col-lg-6"><strong>Assigned To:</strong></div>' + '<div class="col-lg-3">' + rowObject.TechnicianName + '</div>'
}


function OtherInfoGridForDelete(grid, pager, tenantId, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns, editUrl, deleteUrl, condtion) {
    debugger;
    var ColN;
    var ColM;
    var ColD;
    var userId = getCookie('UserLoginName') == "tadmin" ? -1 : getCookie('UserId');
    if (dataUrl.indexOf("?") == -1) {
        dataUrl = dataUrl + '?tenantId=' + getCookie('TenantId') + '&userId=' + userId + '&roles=' + getCookie('Roles');

    }
    else {
        dataUrl = dataUrl + '&userId=' + userId + '&roles=' + getCookie('Roles');

    }

    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {
            if (st == "success") {
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];
                showColumns = data[3];

                var colNames = [];
                var colModels = [];


                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];
                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (hideColumns.includes(ColN[i])) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: 280 }
                    }
                    else if (showColumns.includes(ColN[i])) {
                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: 280 }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'number', width: 280 }
                        }
                        else if (ColM[i] == 'act') {
                            if (condtion != "NoAction")
                                colModels[i] = { name: 'act', index: 'act', width: 100, sortable: false, align: 'center' }
                            else
                                colModels[i] = { name: 'act', index: 'act', width: 280, sortable: false, align: 'center' }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'select', width: 280, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], width: 280 }
                        }
                    }
                    else {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], searchtype: 'number' }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'select', width: 280, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i] }
                        }

                    }
                }
                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {
                        var rows = data.rows;
                        for (var i = 0; rows != null && i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {
                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + pager),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: false,
                    height: '100%',
                    autowidth: true,//parent width
                    shrinkToFit: true,//adjust the colums to grid
                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,

                    gridComplete: function () {

                        var ids = jQuery("#" + grid).jqGrid('getDataIDs');
                        var EntryType = 'nothing';
                        for (var i = 0; i < ids.length; i++) {
                            var id = ids[i];
                            if (editUrl.indexOf("?") > -1) {
                                if (editUrl.indexOf("&") == -1)
                                    editUrl = editUrl + "&";
                            }
                            else { editUrl = editUrl + "?" }

                            var hrefClass = "modal-link btn-sm";
                            if (condtion == 'Popup')
                                hrefClass = "modal-link2 btn-sm";
                            else if (condtion == 'ROIEdit')
                                hrefClass = "btn btn-default btn-md";

                            if (condtion == "ListValues") {

                                //edit = "<a id=\"edit\" title=\"Edit\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\"  onclick='AlertUser(" + editurl + ",\"" + value + "\"" + ",\"edit\")'><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> </a>";
                                edit = "<a title=\"Edit\" class=\"" + hrefClass + "\" style=\"border:none !important;\"  href=\"" + editUrl + "keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> </a>";

                                var del = "";
                            }
                            else if (condtion == "NoEdit" || condtion == "ApiCallWithGridRefreshChange") {
                                debugger;
                                edit = "";
                                var delurl = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopup(" + delurl + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>Delete </a>";

                            }
                            else if (condtion == "NoEditException") {
                                edit = "";
                                var delurl = "\"" + deleteUrl + "&keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopup(" + delurl + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> </a>";

                            }
                            else if (condtion == "NoEditPopup") {
                                edit = "";
                                var delurl = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopup(" + delurl + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> </a>";
                            }
                            else if (condtion == "NoDelete") {
                                value = $('#' + grid).jqGrid('getCell', id, 'EntryType');
                                var editurl = "\"" + editUrl + "keyId=" + id + "&tenantId=" + tenantId + "\"";
                                edit = "<a id=\"edit\" title=\"Edit\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\"  onclick='AlertUser(" + editurl + ",\"" + value + "\"" + ",\"edit\")'><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> </a>";
                                del = "";
                            }
                            else if (condtion == "NoEditDisableDelete") {
                                edit = "";
                                var delurl = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;pointer-events:none;\" onclick='WarningMessagePopup(" + delurl + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>Delete </a>";

                            }
                            else if (condtion == "DisableEditDelete") {
                                edit = "<a id=\"edit\" title=\"Edit\" class=\"btn btn-default btn-sm\" style=\"border:none !important;pointer-events:none;\" ><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>Edit </a>";
                                var delurl = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;pointer-events:none;\" onclick='WarningMessagePopup(" + delurl + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>Delete </a>";

                            }
                            else if (condtion == "Popup") {

                                edit = "<a title=\"Edit\" class=\"" + hrefClass + "\" style=\"border:none !important;\"  href=\"" + editUrl + "keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> </a>";
                                var url = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopup(" + url + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> </a>";
                            }
                            else if (condtion == 'Owner' || condtion == 'GOwner') {


                                edit = "<a title=\"Edit\" class=\"" + hrefClass + "\" style=\"border:none !important;\"  href=\"" + editUrl + "keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> </a>";
                                var url = "\"" + deleteUrl + "&keyId=" + id + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningPopupWithChildPopup(" + url + "," + grid + "," + "\"" + condtion + "\"" + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> </a>";

                            }
                            else if (condtion == 'NoAction') {
                                edit = "";
                                del = "";
                            }
                            else if (condtion == "TempDelete") {
                                edit = "";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick=$(\'#" + id + "\').remove() ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> </a>";
                            }

                            else if (condtion == "NoEditWithTransactionID") {
                                edit = "";
                                var delurl = "\"" + deleteUrl + "&keyId=" + id + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopup(" + delurl + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> </a>";
                            }
                            else if (condtion == "ApiCallWithGridRefresh" ) {
                                debugger;
                                edit = "<a title=\"Edit\" class=\"" + hrefClass + "\" style=\"border:none !important;\"  href=\"" + editUrl + "keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>Edit </a>";
                                var url = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopup(" + url + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>Delete </a>";
                            }
                            else if (condtion == "ItemQuantityPopup") {

                                quantity_QuantityPopup = $('#' + grid).jqGrid('getCell', id, 'Quantity');
                                subtype_QuantityPopup = $('#' + grid).jqGrid('getCell', id, 'ItemSubTypeName');
                                type_QuantityPopup = $('#' + grid).jqGrid('getCell', id, 'ItemTypeName');
                                className_QuantityPopup = $('#' + grid).jqGrid('getCell', id, 'ItemClassName');
                                SKUNumber_QuantityPopup = $('#' + grid).jqGrid('getCell', id, 'SKUNumber');

                                var editHref = editUrl + "keyId=" + id + "&tenantId=" + tenantId;


                                edit = "<a title=\"Edit\" class=\"" + hrefClass + "\" style=\"border:none !important;\"  href=\"" + editHref + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>Edit </a>";
                                var url = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\" style=\"border:none !important;\" onclick='WarningMessagePopupAsset(" + url + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete </a>";
                            }
                            else if (condtion == "ApiCallWithGridRefreshAsset") {

                                edit = "<a title=\"Edit\" class=\"" + hrefClass + "\" style=\"border:none !important;\"  href=\"" + editUrl + "keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Edit </a>";
                                var url = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopupAsset(" + url + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete </a>";
                            }
                            else if (condtion == "NoEditWithAssign") {
                                var edit = "";
                                var delurl = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMsgPostFunctionlity(" + delurl + "," + grid + "," + "\"" + condtion + "\"" + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete </a>";
                            }
                            else if (condtion == "ApiCallWithGridRefreshAssetForItemOnBoard") {
                                debugger;
                                edit = "<a title=\"Edit\" class=\"" + hrefClass + "\" style=\"border:none !important;\"  href=\"" + editUrl + "keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Edit </a>";
                                var url = "\"" + deleteUrl + "?ItemInfoID=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopupAsset(" + url + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete </a>";
                            }
                            else if (condtion == "ROIEdit") {
                                debugger;
                                edit = "<a title=\"Edit\" class=\"" + hrefClass + "\" style=\"border:none !important;\"  href=\"" + editUrl + "keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Edit </a>";
                                var url = "\"" + deleteUrl + "?ItemInfoID=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessagePopupAsset(" + url + "," + grid + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete </a>";
                            }
                            else {
                                edit = "<a title=\"Edit\" class=\"" + hrefClass + "\" style=\"border:none !important;\"  href=\"" + editUrl + "keyId=" + id + "&tenantId=" + tenantId + "\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Edit </a>";
                                var url = "\"" + deleteUrl + "?keyId=" + id + "&tenantId=" + tenantId + "\"";
                                del = "<a title=\"Delete\" class=\"btn btn-default btn-sm\" style=\"border:none !important;\" onclick='WarningMessage(" + url + ")' ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";
                            }
                            jQuery("#" + grid).jqGrid('setRowData', ids[i], { act: edit + del });
                        }
                    },
                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit options
                     },
                     {  // add options
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });
                if (condtion == 'ApiCallWithGridRefreshChange') {
                    debugger
                    var $grid = $("#" + grid),
                         newWidth = $grid.closest(".ui-jqgrid").parent().width();
                    $grid.jqGrid("setGridWidth", newWidth, true);
                }
                else if (condtion != 'Popup')
                    $(window).bind('resize', function () {
                        gridParentWidth = $(window).width() - 315;
                        $("#" + grid).setGridWidth(gridParentWidth);
                    }).trigger('resize');
                else
                    $(window).bind('resize', function () {
                        gridParentWidth = $(window).width() - 650;
                        $("#" + grid).setGridWidth(gridParentWidth);
                    }).trigger('resize');
            }
        },
        error: function () {
            ErrorAlert("Error with AJAX callback");
        }
    });
}


function ManagePageGridForIncidentsStackView(grid, pager, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    // debugger;
    var ColN;
    var ColM;
    var ColD;
    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                data[0].push("QuickManage");
                data[1].push("manage");
                data[2].push("Quick Manage");
                data[3].push("QuickManage");

                data[0].push("AddTimeLog");
                data[1].push("manage");
                data[2].push("Add TimeLog");
                data[3].push("AddTimeLog");
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];//display name
                showColumns = data[3];
                debugger;
                ////Manage pagegrid width
                var twidth = $('#managegridwidth').width() - 70;
                var colCount = showColumns.length;
                var eColWidth = twidth / colCount;


                //, width: eColWidth 

                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth, frozen: true }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, name: ColN[i], index: ColN[i], formatter: 'date', width: eColWidth, hidedlg: true, searchrules: { required: true }

                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else if (ColM[i] == 'manage') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'], Value: "" } }
                        }
                        else if (ColN[i] == 'IncidentID') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 100, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] }, }
                        }
                        else if (ColN[i] == 'IncidentDescription') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 400, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] }, formatter: Incidentformatter }
                        }
                        else if (ColN[i] == 'RequestedByName') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 130, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }

                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', width: eColWidth, searchrules: { required: true }
                                //searchoptions: {
                                //    dataInit: function (element) {
                                //        $(element).datepicker({
                                //            id: ColN[i] + '_datePicker',
                                //            dateFormat: 'yy-mm-dd',
                                //            showOn: 'focus'
                                //        });
                                //    },
                                //    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                //}
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }



                    }
                }

                //Checkbox state,menu enabledisable
                idsOfSelectedRows = [],
                updateIdsOfSelectedRows = function (id, isSelected) {
                    var index = $.inArray(id, idsOfSelectedRows);
                    if (!isSelected && index >= 0) {
                        idsOfSelectedRows.splice(index, 1); // remove id from the list
                    } else if (index < 0) {
                        idsOfSelectedRows.push(id);
                    }

                    debugger;

                    if (idsOfSelectedRows.length == 0) {
                        $('#btn_Assign').attr("disabled", "disabled");
                        $('#btn_pickup').attr("disabled", "disabled");
                        $('#btn_bulkupdate').attr("disabled", "disabled");
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').attr("disabled", "disabled");
                        $('#btn_Delete').attr("disabled", "disabled");

                        $('#btn_Assign').addClass('avoid-clicks');
                        $('#btn_pickup').addClass('avoid-clicks');
                        $('#btn_bulkupdate').addClass('avoid-clicks');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Delete').addClass('avoid-clicks');
                        $('#btn_merge').addClass('avoid-clicks');
                    }
                    else if (idsOfSelectedRows.length == 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').removeAttr('disabled');
                        $('#btn_Delete').removeAttr('disabled');

                        $('#btn_Edit').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');

                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');

                        keyId = idsOfSelectedRows[0];
                    }
                    else if (idsOfSelectedRows.length > 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').removeAttr('disabled');
                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');
                        $('#btn_merge').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');
                        $('#btn_Delete').removeAttr('disabled');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Edit').attr("disabled", "disabled");
                    }

                    var sel_row_count = jQuery('#' + grid).jqGrid('getGridParam', 'selarrrow');
                    var grd_rec_count = $("#" + grid).jqGrid('getGridParam', 'reccount');

                    if (sel_row_count.length == grd_rec_count) {
                        jQuery('#cb_' + grid).prop('checked', true);
                    }
                    else {
                        jQuery('#cb_' + grid).prop('checked', false);
                    }
                };
                debugger;

                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {

                        var rows = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                                if (property == "AddTimeLog") {
                                    //rows[i].AddTimeLog = "<div id=\"tvtimelog" + rows[i].IncidentInfoID + "\" style=\" text-align: center; display: none;\"> </div> <div id=\"tvcountup" + rows[i].IncidentInfoID + "\" value=\"" + rows[i].IncidentTimeLogID + "\" style=\" text-align: center\"> <p id=\"tvdays" + rows[i].IncidentInfoID + "\" style=\"display: inline-block;\">00</p> <p class=\"timeRefDays\" style=\"display: inline-block;\">d</p>  <p id=\"tvhours" + rows[i].IncidentInfoID + "\" style=\"display: inline-block;\">00</p>   <p class=\"timeRefHours\" style=\"display: inline-block;\">h</p>   <p id=\"tvminutes" + rows[i].IncidentInfoID + "\" style=\"display: inline-block;\">00</p>   <p class=\"timeRefMinutes\" style=\"display: inline-block;\">m</p>   <p id=\"tvseconds" + rows[i].IncidentInfoID + "\" style=\"display: inline-block;\">00</p>   <p class=\"timeRefSeconds\" style=\"display: inline-block;\">s</p> </div> <div id=\"tvbuttons" + rows[i].IncidentInfoID + "\" title=\"Incident time log\"> <a id=\"tvbtnStart" + rows[i].IncidentInfoID + "\" onclick=\"tvStart('" + rows[i].IncidentInfoID + "','" + rows[i].LogStartTime + "','" + rows[i].IsPaused + "');\" style=\"width: 16%;color:white; min-width: 60px; padding: 2px 12px;\"><i id=\"" + rows[i].IncidentInfoID + "\" class=\"fa fa-play\" aria-hidden=\"true\" title=\"start\" style=\"color: #2cb901;font-size: 18px;\"></i></a>&nbsp&nbsp<a id=\"tvbtnStop" + rows[i].IncidentInfoID + "\" onclick=\"tvStop('" + rows[i].IncidentInfoID + "','" + rows[i].LogStartTime + "');\" style=\"width: 16%;color:white; min-width: 60px; padding: 2px 12px;\"><i id=\"" + rows[i].IncidentInfoID + "\" class=\"fa fa-stop\" aria-hidden=\"true\" title=\"start\" style=\"color: #a70707; font-size: 17px;\"></i></a> </div> ";
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + grid),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    //viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,
                    rownumbers: true,
                    height: '100%',

                    autowidth: true,//parent width  //shrinkToFit: true,//adjust the colums to grid
                    loadonce: false,
                    shrinkToFit: true, // must be set with frozen columns, otherwise columns will be shrank to fit the grid width

                    sortorder: "desc",
                    rownumWidth: 40,
                    scroll: false,
                    onSelectRow: updateIdsOfSelectedRows,
                    onSelectAll: function (aRowids, isSelected) {
                        var i, count, id;
                        for (i = 0, count = aRowids.length; i < count; i++) {
                            id = aRowids[i];
                            updateIdsOfSelectedRows(id, isSelected);
                        }
                    },
                    loadComplete: function () {

                        var jqRecordsCount = $("#" + grid).jqGrid('getGridParam', 'reccount');
                        if (jqRecordsCount == 0) {
                            $('#next_' + pager).addClass('ui-state-disabled');
                            $('#last_' + pager).addClass('ui-state-disabled');
                            $('#first_' + pager).addClass('ui-state-disabled');
                            $('#prev_' + pager).addClass('ui-state-disabled');
                        }

                        var $this = $(this), i, count;
                        for (i = 0, count = idsOfSelectedRows.length; i < count; i++) {
                            $this.jqGrid('setSelection', idsOfSelectedRows[i], false);
                        }

                    },


                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true,
                     });



                $("#" + grid).navButtonAdd('#' + pager,
                {
                    buttonicon: "ui-icon-calculator",
                    title: "Column chooser",
                    caption: "Columns",
                    position: "last",
                    onClickButton: function () {
                        // call the column chooser method
                        jQuery("#" + grid).jqGrid('columnChooser',
                        {
                            width: 500,
                            dialog_opts: {
                                modal: true,
                                minWidth: 600,
                            },
                        }
                            );
                    }
                });



                //Vertical Records Per page Internal scroll
                $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#" + grid),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');

            }


        },
        error: function () {
            //alert("Error with AJAX callback");
        }

    });
}


function ManagePageGridForRequestsStackView(grid, pager, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    // debugger;
    var ColN;
    var ColM;
    var ColD;
    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                data[0].push("QuickManage");
                data[1].push("manage");
                data[2].push("Quick Manage");
                data[3].push("QuickManage");

                data[0].push("AddTimeLog");
                data[1].push("manage");
                data[2].push("Add TimeLog");
                data[3].push("AddTimeLog");
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];//display name
                showColumns = data[3];
                debugger;
                ////Manage pagegrid width
                var twidth = $('#managegridwidth').width() - 70;
                var colCount = showColumns.length;
                var eColWidth = twidth / colCount;


                //, width: eColWidth 

                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth, frozen: true }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, name: ColN[i], index: ColN[i], formatter: 'date', width: eColWidth, hidedlg: true, searchrules: { required: true }

                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else if (ColM[i] == 'manage') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'], Value: "" } }
                        }
                        else if (ColN[i] == 'RequestID') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 100, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] }, }
                        }
                        else if (ColN[i] == 'RequestDescription') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 400, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] }, formatter: Requestformatter }
                        }
                        else if (ColN[i] == 'RequestedByName') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: 130, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }

                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', width: eColWidth, searchrules: { required: true }
                                //searchoptions: {
                                //    dataInit: function (element) {
                                //        $(element).datepicker({
                                //            id: ColN[i] + '_datePicker',
                                //            dateFormat: 'yy-mm-dd',
                                //            showOn: 'focus'
                                //        });
                                //    },
                                //    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                //}
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }



                    }
                }

                //Checkbox state,menu enabledisable
                idsOfSelectedRows = [],
                updateIdsOfSelectedRows = function (id, isSelected) {
                    var index = $.inArray(id, idsOfSelectedRows);
                    if (!isSelected && index >= 0) {
                        idsOfSelectedRows.splice(index, 1); // remove id from the list
                    } else if (index < 0) {
                        idsOfSelectedRows.push(id);
                    }

                    debugger;

                    if (idsOfSelectedRows.length == 0) {
                        $('#btn_Assign').attr("disabled", "disabled");
                        $('#btn_pickup').attr("disabled", "disabled");
                        $('#btn_bulkupdate').attr("disabled", "disabled");
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').attr("disabled", "disabled");
                        $('#btn_Delete').attr("disabled", "disabled");

                        $('#btn_Assign').addClass('avoid-clicks');
                        $('#btn_pickup').addClass('avoid-clicks');
                        $('#btn_bulkupdate').addClass('avoid-clicks');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Delete').addClass('avoid-clicks');
                        $('#btn_merge').addClass('avoid-clicks');
                    }
                    else if (idsOfSelectedRows.length == 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').removeAttr('disabled');
                        $('#btn_Delete').removeAttr('disabled');

                        $('#btn_Edit').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');

                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');

                        keyId = idsOfSelectedRows[0];
                    }
                    else if (idsOfSelectedRows.length > 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').removeAttr('disabled');
                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');
                        $('#btn_merge').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');
                        $('#btn_Delete').removeAttr('disabled');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Edit').attr("disabled", "disabled");
                    }

                    var sel_row_count = jQuery('#' + grid).jqGrid('getGridParam', 'selarrrow');
                    var grd_rec_count = $("#" + grid).jqGrid('getGridParam', 'reccount');

                    if (sel_row_count.length == grd_rec_count) {
                        jQuery('#cb_' + grid).prop('checked', true);
                    }
                    else {
                        jQuery('#cb_' + grid).prop('checked', false);
                    }
                };
                debugger;

                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {

                        var rows = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                                if (property == "AddTimeLog") {
                                    //rows[i].AddTimeLog = "<div id=\"tvtimelog" + rows[i].RequestInfoID + "\" style=\" text-align: center; display: none;\"> </div> <div id=\"tvcountup" + rows[i].RequestInfoID + "\" value=\"" + rows[i].RequestTimeLogID + "\" style=\" text-align: center\"> <p id=\"tvdays" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p> <p class=\"timeRefDays\" style=\"display: inline-block;\">d</p>  <p id=\"tvhours" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p>   <p class=\"timeRefHours\" style=\"display: inline-block;\">h</p>   <p id=\"tvminutes" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p>   <p class=\"timeRefMinutes\" style=\"display: inline-block;\">m</p>   <p id=\"tvseconds" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p>   <p class=\"timeRefSeconds\" style=\"display: inline-block;\">s</p> </div> <div id=\"tvbuttons" + rows[i].RequestInfoID + "\" title=\"Request time log\"> <a id=\"tvbtnStart" + rows[i].RequestInfoID + "\" onclick=\"tvStart('" + rows[i].RequestInfoID + "','" + rows[i].LogStartTime + "','" + rows[i].IsPaused + "');\" style=\"width: 16%;color:white; min-width: 60px; padding: 2px 12px;\"><i id=\"" + rows[i].RequestInfoID + "\" class=\"fa fa-play\" aria-hidden=\"true\" title=\"start\" style=\"color: #2cb901;font-size: 18px;\"></i></a>&nbsp&nbsp<a id=\"tvbtnStop" + rows[i].RequestInfoID + "\" onclick=\"tvStop('" + rows[i].RequestInfoID + "','" + rows[i].LogStartTime + "');\" style=\"width: 16%;color:white; min-width: 60px; padding: 2px 12px;\"><i id=\"" + rows[i].RequestInfoID + "\" class=\"fa fa-stop\" aria-hidden=\"true\" title=\"start\" style=\"color: #a70707; font-size: 17px;\"></i></a> </div> ";
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + grid),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    //viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,
                    rownumbers: true,
                    height: '100%',

                    autowidth: true,//parent width  //shrinkToFit: true,//adjust the colums to grid
                    loadonce: false,
                    shrinkToFit: true, // must be set with frozen columns, otherwise columns will be shrank to fit the grid width

                    sortorder: "desc",
                    rownumWidth: 40,
                    scroll: false,
                    onSelectRow: updateIdsOfSelectedRows,
                    onSelectAll: function (aRowids, isSelected) {
                        var i, count, id;
                        for (i = 0, count = aRowids.length; i < count; i++) {
                            id = aRowids[i];
                            updateIdsOfSelectedRows(id, isSelected);
                        }
                    },
                    loadComplete: function () {

                        var jqRecordsCount = $("#" + grid).jqGrid('getGridParam', 'reccount');
                        if (jqRecordsCount == 0) {
                            $('#next_' + pager).addClass('ui-state-disabled');
                            $('#last_' + pager).addClass('ui-state-disabled');
                            $('#first_' + pager).addClass('ui-state-disabled');
                            $('#prev_' + pager).addClass('ui-state-disabled');
                        }

                        var $this = $(this), i, count;
                        for (i = 0, count = idsOfSelectedRows.length; i < count; i++) {
                            $this.jqGrid('setSelection', idsOfSelectedRows[i], false);
                        }

                    },


                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true,
                     });



                $("#" + grid).navButtonAdd('#' + pager,
                {
                    buttonicon: "ui-icon-calculator",
                    title: "Column chooser",
                    caption: "Columns",
                    position: "last",
                    onClickButton: function () {
                        // call the column chooser method
                        jQuery("#" + grid).jqGrid('columnChooser',
                        {
                            width: 500,
                            dialog_opts: {
                                modal: true,
                                minWidth: 600,
                            },
                        }
                            );
                    }
                });



                //Vertical Records Per page Internal scroll
                $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#" + grid),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');

            }


        },
        error: function () {
            //alert("Error with AJAX callback");
        }

    });
}

function Incidentformatter(cellvalue, options, rowObject) {
    var temp = '<div class="col-lg-1 ">' +
                                '<span class="i-circle">' + rowObject.RequestedByName.substring(0, 1).toUpperCase() + '</span></div>' +
                            '<div class="col-lg-9">' +
                                '<div>' +
                                    '<span>' + '#' + rowObject.IncidentID + '</span> <span>' + rowObject.IncidentDescription + '</spaan>' +
                                    '<div class="mic-info">' +
                                 '<div class="child_div">' +
    '<svg aria-hidden="true" data-prefix="far" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"></path></svg>' +
'<strong> Requester :</strong>  <span>' + rowObject.RequestedByName + '</span></div>';
    if (rowObject.IncidentSourceValue == 'Email') {
        temp += '<div class="child_div">' +
             '<svg aria-hidden="true" data-prefix="far" data-icon="envelope-open" class="svg-inline--fa fa-envelope-open fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M494.586 164.516c-4.697-3.883-111.723-89.95-135.251-108.657C337.231 38.191 299.437 0 256 0c-43.205 0-80.636 37.717-103.335 55.859-24.463 19.45-131.07 105.195-135.15 108.549A48.004 48.004 0 0 0 0 201.485V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V201.509a48 48 0 0 0-17.414-36.993zM464 458a6 6 0 0 1-6 6H54a6 6 0 0 1-6-6V204.347c0-1.813.816-3.526 2.226-4.665 15.87-12.814 108.793-87.554 132.364-106.293C200.755 78.88 232.398 48 256 48c23.693 0 55.857 31.369 73.41 45.389 23.573 18.741 116.503 93.493 132.366 106.316a5.99 5.99 0 0 1 2.224 4.663V458zm-31.991-187.704c4.249 5.159 3.465 12.795-1.745 16.981-28.975 23.283-59.274 47.597-70.929 56.863C336.636 362.283 299.205 400 256 400c-43.452 0-81.287-38.237-103.335-55.86-11.279-8.967-41.744-33.413-70.927-56.865-5.21-4.187-5.993-11.822-1.745-16.981l15.258-18.528c4.178-5.073 11.657-5.843 16.779-1.726 28.618 23.001 58.566 47.035 70.56 56.571C200.143 320.631 232.307 352 256 352c23.602 0 55.246-30.88 73.41-45.389 11.994-9.535 41.944-33.57 70.563-56.568 5.122-4.116 12.601-3.346 16.778 1.727l15.258 18.526z"></path></svg>' +
              '<strong> Resource :</strong>   <span>' + rowObject.IncidentSourceValue + '</span>    </div>';
    }
    else if (rowObject.IncidentSourceValue == 'Telephone') {
        temp += '<div class="child_div">' +
                  '<svg aria-hidden="true" data-prefix="fas" data-icon="mobile-alt" class="svg-inline--fa fa-mobile-alt fa-w-10 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"></path></svg>' +
               '<strong> Resource :</strong>   <span>' + rowObject.IncidentSourceValue + '</span>    </div>';
    }

    else if (rowObject.IncidentSourceValue == 'Chat') {
        temp += '<div class="child_div">' +
                 '<svg aria-hidden="true" data-prefix="far" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path></svg>' +
             '<strong> Resource :</strong>   <span>' + rowObject.IncidentSourceValue + '</span>    </div>';
    }

    else if (rowObject.IncidentSourceValue == 'SMS') {

        temp += '<div class="child_div">' +

                                '<svg aria-hidden="true" data-prefix="far" data-icon="comment-alt" class="svg-inline--fa fa-comment-alt fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm16 352c0 8.8-7.2 16-16 16H288l-12.8 9.6L208 428v-60H64c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h384c8.8 0 16 7.2 16 16v288z"></path></svg>' +
                            '<strong> Resource :</strong>   <span>' + rowObject.IncidentSourceValue + '</span>    </div>';
    }
    else if (rowObject.IncidentSourceValue == 'Web Form') {
        temp += '<div class="child_div">' +
                                    '<svg aria-hidden="true" data-prefix="fas" data-icon="globe" class="svg-inline--fa fa-globe fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path></svg>' +
                                     '<strong> Resource :</strong>   <span>' + rowObject.IncidentSourceValue + '</span>    </div>';

    }
    temp += '<div class="child_div"> ' +
            '<svg aria-hidden="true" data-prefix="far" data-icon="clock" class="svg-inline--fa fa-clock fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>' +
           '<strong>Source Time:</strong>  <span>' + dateToStr(rowObject.CreatedOn) + '</span> </div>';

    temp += '<div class="child_div">' +
                                  '<svg aria-hidden="true" data-prefix="far" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"></path></svg>' +
                                   '<strong> Assigned To :</strong>   <span>' + rowObject.TechnicianName + '</span>    </div></div> </div></div><div class="col-lg-2">';
    if (rowObject.PriorityValue == 'Low') {
        temp += '<div ><strong> Priority :</strong> <span class="tickets__list--low tickets__list--dropdown"></span>  <span>' + rowObject.PriorityValue + '</span></div>';
    }
    else if (rowObject.PriorityValue == 'Medium') {
        temp += '<div ><strong> Priority :</strong> <span class="tickets__list--medium tickets__list--dropdown"></span>  <span>' + rowObject.PriorityValue + '</span></div>';
    }

    else if (rowObject.PriorityValue == 'High') {
        temp += '<div ><strong> Priority :</strong> <span class="tickets__list--high tickets__list--dropdown"></span>  <span>' + rowObject.PriorityValue + '</span></div>';
    }
    else if (rowObject.PriorityValue == 'Normal') {
        temp += '<div ><strong> Priority :</strong> <span class="tickets__list--urgent tickets__list--dropdown"></span>  <span>' + rowObject.PriorityValue + '</span></div>';
    }

    if (rowObject.UrgencyValue == 'Low') {
        temp += '<div ><strong> Urgency :</strong> <span class="tickets__list--low tickets__list--dropdown"></span>  <span>' + rowObject.UrgencyValue + '</span></div>';
    }

    else if (rowObject.UrgencyValue == 'Urgent') {
        temp += '<div ><strong> Urgency :</strong> <span class="tickets__list--medium tickets__list--dropdown"></span>  <span>' + rowObject.UrgencyValue + '</span></div>';
    }
    else if (rowObject.UrgencyValue == 'High') {
        temp += '<div ><strong> Urgency :</strong> <span class="tickets__list--high tickets__list--dropdown"></span>  <span>' + rowObject.UrgencyValue + '</span></div>';
    }
    else if (rowObject.UrgencyValue == 'Normal') {
        temp += '<div ><strong> Urgency :</strong> <span class="tickets__list--urgent tickets__list--dropdown"></span>  <span>' + rowObject.UrgencyValue + '</span></div>';
    }
    if (rowObject.IncidentStatusValue == 'On Hold') {
        temp += '<div><strong> Status :</strong> <span class="tickets__list--low tickets__list--dropdown"></span>  <span>' + rowObject.IncidentStatusValue + '</span></div>';
    } else if (rowObject.IncidentStatusValue == 'Open') {
        temp += '<div><strong> Status :</strong> <span class="tickets__list--medium tickets__list--dropdown"></span>  <span>' + rowObject.IncidentStatusValue + '</span></div>';

    } else if (rowObject.IncidentStatusValue == 'Waiting for Update') {
        temp += '<div><strong> Status :</strong> <span class="tickets__list--high tickets__list--dropdown"></span>  <span>' + rowObject.IncidentStatusValue + '</span></div>';
    } else if (rowObject.IncidentStatusValue == 'Work Inprogress') {
        temp += '<div><strong> Status :</strong> <span class="tickets__list--urgent tickets__list--dropdown"></span>  <span>' + rowObject.IncidentStatusValue + '</span></div>';
    }

    temp += '<div ><a class="btn btn-primary" style="padding: 4px 37px;">Manage</a></div></div></div></div></div></div>';








    // var temp = '<div class=""><span  class="i-circle">' + rowObject.RequestedByName.substring(0, 1).toUpperCase() + '</span><span>' + '#' + rowObject.IncidentID + '</span> <span><strong>' + rowObject.IncidentDescription + '</strong> <br/>Requested By:Balaji `</span></div>';


    //var temp=
    //        '<table class="table table-filter" style="background:none;margin-bottom:0px !important">' +
    //            '<tbody>'+

    //                '<tr data-status="pagado" class="incidents" style="background:none !important">' +
    //                    '<td style="border-right-style:none;padding-top: 25px;"><a href="#" class="pull-left"><span class="i-circle">' + rowObject.RequestedByName.substring(0, 1).toUpperCase() + '</span></a></td>' +
    //                    '<td style="border-right-style:none;padding-top: 31px;"><span>' + '#' + rowObject.IncidentID + '</span></td>' +
    //                    '<td style="border-right-style:none;padding-top: 13px;">' +
    //                        '<div class="summary">'+rowObject.IncidentDescription+' </div>'+
    //                        '<div class="child_div">'+
    //                            '<svg aria-hidden="true" data-prefix="far" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"></path></svg>'+
    //                        '<strong> Requester :</strong>  <span>'+ rowObject.RequestedByName+'</span></div> ';
    //if(rowObject.IncidentSourceValue == 'Email')
    //{
    //    temp+= '<div class="child_div">' +
    //         '<svg aria-hidden="true" data-prefix="far" data-icon="envelope-open" class="svg-inline--fa fa-envelope-open fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M494.586 164.516c-4.697-3.883-111.723-89.95-135.251-108.657C337.231 38.191 299.437 0 256 0c-43.205 0-80.636 37.717-103.335 55.859-24.463 19.45-131.07 105.195-135.15 108.549A48.004 48.004 0 0 0 0 201.485V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V201.509a48 48 0 0 0-17.414-36.993zM464 458a6 6 0 0 1-6 6H54a6 6 0 0 1-6-6V204.347c0-1.813.816-3.526 2.226-4.665 15.87-12.814 108.793-87.554 132.364-106.293C200.755 78.88 232.398 48 256 48c23.693 0 55.857 31.369 73.41 45.389 23.573 18.741 116.503 93.493 132.366 106.316a5.99 5.99 0 0 1 2.224 4.663V458zm-31.991-187.704c4.249 5.159 3.465 12.795-1.745 16.981-28.975 23.283-59.274 47.597-70.929 56.863C336.636 362.283 299.205 400 256 400c-43.452 0-81.287-38.237-103.335-55.86-11.279-8.967-41.744-33.413-70.927-56.865-5.21-4.187-5.993-11.822-1.745-16.981l15.258-18.528c4.178-5.073 11.657-5.843 16.779-1.726 28.618 23.001 58.566 47.035 70.56 56.571C200.143 320.631 232.307 352 256 352c23.602 0 55.246-30.88 73.41-45.389 11.994-9.535 41.944-33.57 70.563-56.568 5.122-4.116 12.601-3.346 16.778 1.727l15.258 18.526z"></path></svg>'+
    //          '<strong> Resource :</strong>   <span>'+rowObject.IncidentSourceValue+'</span>    </div>';
    //}
    //else if(rowObject.IncidentSourceValue == 'Telephone')
    //{
    //    temp+=  '<div class="child_div">'+ 
    //              '<svg aria-hidden="true" data-prefix="fas" data-icon="mobile-alt" class="svg-inline--fa fa-mobile-alt fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"></path></svg>'+
    //           '<strong> Resource :</strong>   <span>'+rowObject.IncidentSourceValue+'</span>    </div>';
    //}

    //else if(rowObject.IncidentSourceValue == 'Chat') 
    //{
    //    temp+=  '<div class="child_div">' +
    //             '<svg aria-hidden="true" data-prefix="far" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path></svg>'+
    //         '<strong> Resource :</strong>   <span>'+rowObject.IncidentSourceValue+'</span>    </div>';
    //}

    //else if(rowObject.IncidentSourceValue == 'SMS')
    //{

    //    temp+='<div class="child_div">'+

    //                            '<svg aria-hidden="true" data-prefix="far" data-icon="comment-alt" class="svg-inline--fa fa-comment-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm16 352c0 8.8-7.2 16-16 16H288l-12.8 9.6L208 428v-60H64c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h384c8.8 0 16 7.2 16 16v288z"></path></svg>'+
    //                        '<strong> Resource :</strong>   <span>'+rowObject.IncidentSourceValue+'</span>    </div>';
    //}
    //else if(rowObject.IncidentSourceValue == 'Web Form')
    //{
    //    temp+=    '<div class="child_div">'+ 
    //                                '<svg aria-hidden="true" data-prefix="fas" data-icon="globe" class="svg-inline--fa fa-globe fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path></svg>'+
    //                                 '<strong> Resource :</strong>   <span>'+rowObject.IncidentSourceValue+'</span>    </div>';

    //}    
    //temp+=       '<div class="child_div"> '+

    //           '<svg aria-hidden="true" data-prefix="far" data-icon="clock" class="svg-inline--fa fa-clock fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>'+
    //       '<strong>Source Time:</strong>  <span>'+ dateToStr(rowObject.CreatedOn)+'</span>   </div>'+

    //   '</td>';
    //temp += '<td>';
    //if(rowObject.PriorityValue == 'Low')
    //{
    //    temp+=   '<div ><strong> Priority :</strong> <span class="tickets__list--low tickets__list--dropdown"></span>  <span>'+rowObject.PriorityValue+'</span></div>';
    //}
    //else if(rowObject.PriorityValue == 'Medium') 
    //{
    //    temp+=   '<div ><strong> Priority :</strong> <span class="tickets__list--medium tickets__list--dropdown"></span>  <span>'+rowObject.PriorityValue+'</span></div>';
    //}

    //else if(rowObject.PriorityValue == 'High') 
    //{
    //    temp+=   '<div ><strong> Priority :</strong> <span class="tickets__list--high tickets__list--dropdown"></span>  <span>'+rowObject.PriorityValue+'</span></div>';
    //}
    //else if(rowObject.PriorityValue == 'Normal')
    //{
    //    temp+=   '<div ><strong> Priority :</strong> <span class="tickets__list--urgent tickets__list--dropdown"></span>  <span>'+rowObject.PriorityValue+'</span></div>';
    //}

    //if(rowObject.UrgencyValue == 'Low') 
    //{
    //    temp+='<div ><strong> Urgency :</strong> <span class="tickets__list--low tickets__list--dropdown"></span>  <span>'+rowObject.UrgencyValue+'</span></div>';
    //}

    //else if(rowObject.UrgencyValue == 'Urgent') 
    //{
    //    temp+='<div ><strong> Urgency :</strong> <span class="tickets__list--medium tickets__list--dropdown"></span>  <span>'+rowObject.UrgencyValue+'</span></div>';
    //}
    //else if(rowObject.UrgencyValue == 'High') 
    //{
    //    temp+='<div ><strong> Urgency :</strong> <span class="tickets__list--high tickets__list--dropdown"></span>  <span>'+rowObject.UrgencyValue+'</span></div>';
    //}
    //else if(rowObject.UrgencyValue == 'Normal')
    //{
    //    temp+='<div ><strong> Urgency :</strong> <span class="tickets__list--urgent tickets__list--dropdown"></span>  <span>'+rowObject.UrgencyValue+'</span></div>';
    //}
    //if (rowObject.IncidentStatusValue == 'On Hold') {
    //                                temp+= '<div><strong> Status :</strong> <span class="tickets__list--low tickets__list--dropdown"></span>  <span>'+rowObject.IncidentStatusValue+'</span></div>';
    //} else if (rowObject.IncidentStatusValue == 'Open') {
    //                                temp+= '<div><strong> Status :</strong> <span class="tickets__list--medium tickets__list--dropdown"></span>  <span>'+rowObject.IncidentStatusValue+'</span></div>';

    //                            } else if(rowObject.IncidentStatusValue == 'Waiting for Update') {
    //                                temp+= '<div><strong> Status :</strong> <span class="tickets__list--high tickets__list--dropdown"></span>  <span>'+rowObject.IncidentStatusValue+'</span></div>';
    //                            } else if(rowObject.IncidentStatusValue == 'Work Inprogress') { 
    //                                temp+= '<div><strong> Status :</strong> <span class="tickets__list--urgent tickets__list--dropdown"></span>  <span>'+rowObject.IncidentStatusValue+'</span></div>';
    //                         } 

    //                            temp += '<div ><a class="btn btn-primary">Manage</a></div></td></tr></tbody></table>';                  
    return temp;
}

function Requestformatter(cellvalue, options, rowObject) {
    var temp = '<div class="col-lg-1 ">' +
                                '<span class="i-circle">' + rowObject.RequestedByName.substring(0, 1).toUpperCase() + '</span></div>' +
                            '<div class="col-lg-9">' +
                                '<div>' +
                                    '<span>' + '#' + rowObject.RequestID + '</span> <span>' + rowObject.RequestDescription + '</spaan>' +
                                    '<div class="mic-info">' +
                                 '<div class="child_div">' +
    '<svg aria-hidden="true" data-prefix="far" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"></path></svg>' +
'<strong> Requester :</strong>  <span>' + rowObject.RequestedByName + '</span></div>';
    if (rowObject.RequestSourceValue == 'Email') {
        temp += '<div class="child_div">' +
             '<svg aria-hidden="true" data-prefix="far" data-icon="envelope-open" class="svg-inline--fa fa-envelope-open fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M494.586 164.516c-4.697-3.883-111.723-89.95-135.251-108.657C337.231 38.191 299.437 0 256 0c-43.205 0-80.636 37.717-103.335 55.859-24.463 19.45-131.07 105.195-135.15 108.549A48.004 48.004 0 0 0 0 201.485V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V201.509a48 48 0 0 0-17.414-36.993zM464 458a6 6 0 0 1-6 6H54a6 6 0 0 1-6-6V204.347c0-1.813.816-3.526 2.226-4.665 15.87-12.814 108.793-87.554 132.364-106.293C200.755 78.88 232.398 48 256 48c23.693 0 55.857 31.369 73.41 45.389 23.573 18.741 116.503 93.493 132.366 106.316a5.99 5.99 0 0 1 2.224 4.663V458zm-31.991-187.704c4.249 5.159 3.465 12.795-1.745 16.981-28.975 23.283-59.274 47.597-70.929 56.863C336.636 362.283 299.205 400 256 400c-43.452 0-81.287-38.237-103.335-55.86-11.279-8.967-41.744-33.413-70.927-56.865-5.21-4.187-5.993-11.822-1.745-16.981l15.258-18.528c4.178-5.073 11.657-5.843 16.779-1.726 28.618 23.001 58.566 47.035 70.56 56.571C200.143 320.631 232.307 352 256 352c23.602 0 55.246-30.88 73.41-45.389 11.994-9.535 41.944-33.57 70.563-56.568 5.122-4.116 12.601-3.346 16.778 1.727l15.258 18.526z"></path></svg>' +
              '<strong> Resource :</strong>   <span>' + rowObject.RequestSourceValue + '</span>    </div>';
    }
    else if (rowObject.RequestSourceValue == 'Telephone') {
        temp += '<div class="child_div">' +
                  '<svg aria-hidden="true" data-prefix="fas" data-icon="mobile-alt" class="svg-inline--fa fa-mobile-alt fa-w-10 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"></path></svg>' +
               '<strong> Resource :</strong>   <span>' + rowObject.RequestSourceValue + '</span>    </div>';
    }

    else if (rowObject.RequestSourceValue == 'Chat') {
        temp += '<div class="child_div">' +
                 '<svg aria-hidden="true" data-prefix="far" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path></svg>' +
             '<strong> Resource :</strong>   <span>' + rowObject.RequestSourceValue + '</span>    </div>';
    }

    else if (rowObject.RequestSourceValue == 'SMS') {

        temp += '<div class="child_div">' +

                                '<svg aria-hidden="true" data-prefix="far" data-icon="comment-alt" class="svg-inline--fa fa-comment-alt fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm16 352c0 8.8-7.2 16-16 16H288l-12.8 9.6L208 428v-60H64c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h384c8.8 0 16 7.2 16 16v288z"></path></svg>' +
                            '<strong> Resource :</strong>   <span>' + rowObject.RequestSourceValue + '</span>    </div>';
    }
    else if (rowObject.RequestSourceValue == 'Web Form') {
        temp += '<div class="child_div">' +
                                    '<svg aria-hidden="true" data-prefix="fas" data-icon="globe" class="svg-inline--fa fa-globe fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path></svg>' +
                                     '<strong> Resource :</strong>   <span>' + rowObject.RequestSourceValue + '</span>    </div>';

    }
    temp += '<div class="child_div"> ' +
            '<svg aria-hidden="true" data-prefix="far" data-icon="clock" class="svg-inline--fa fa-clock fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>' +
           '<strong>Source Time:</strong>  <span>' + dateToStr(rowObject.CreatedOn) + '</span> </div>';

    temp += '<div class="child_div">' +
                                  '<svg aria-hidden="true" data-prefix="far" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16 stackicon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"></path></svg>' +
                                   '<strong> Assigned To :</strong>   <span>' + rowObject.TechnicianName + '</span>    </div></div> </div></div><div class="col-lg-2">';
    if (rowObject.PriorityValue == 'Low') {
        temp += '<div ><strong> Priority :</strong> <span class="tickets__list--low tickets__list--dropdown"></span>  <span>' + rowObject.PriorityValue + '</span></div>';
    }
    else if (rowObject.PriorityValue == 'Medium') {
        temp += '<div ><strong> Priority :</strong> <span class="tickets__list--medium tickets__list--dropdown"></span>  <span>' + rowObject.PriorityValue + '</span></div>';
    }

    else if (rowObject.PriorityValue == 'High') {
        temp += '<div ><strong> Priority :</strong> <span class="tickets__list--high tickets__list--dropdown"></span>  <span>' + rowObject.PriorityValue + '</span></div>';
    }
    else if (rowObject.PriorityValue == 'Normal') {
        temp += '<div ><strong> Priority :</strong> <span class="tickets__list--urgent tickets__list--dropdown"></span>  <span>' + rowObject.PriorityValue + '</span></div>';
    }

    if (rowObject.UrgencyValue == 'Low') {
        temp += '<div ><strong> Urgency :</strong> <span class="tickets__list--low tickets__list--dropdown"></span>  <span>' + rowObject.UrgencyValue + '</span></div>';
    }

    else if (rowObject.UrgencyValue == 'Urgent') {
        temp += '<div ><strong> Urgency :</strong> <span class="tickets__list--medium tickets__list--dropdown"></span>  <span>' + rowObject.UrgencyValue + '</span></div>';
    }
    else if (rowObject.UrgencyValue == 'High') {
        temp += '<div ><strong> Urgency :</strong> <span class="tickets__list--high tickets__list--dropdown"></span>  <span>' + rowObject.UrgencyValue + '</span></div>';
    }
    else if (rowObject.UrgencyValue == 'Normal') {
        temp += '<div ><strong> Urgency :</strong> <span class="tickets__list--urgent tickets__list--dropdown"></span>  <span>' + rowObject.UrgencyValue + '</span></div>';
    }
    if (rowObject.RequestStatusValue == 'On Hold') {
        temp += '<div><strong> Status :</strong> <span class="tickets__list--low tickets__list--dropdown"></span>  <span>' + rowObject.RequestStatusValue + '</span></div>';
    } else if (rowObject.RequestStatusValue == 'Open') {
        temp += '<div><strong> Status :</strong> <span class="tickets__list--medium tickets__list--dropdown"></span>  <span>' + rowObject.RequestStatusValue + '</span></div>';

    } else if (rowObject.RequestStatusValue == 'Waiting for Update') {
        temp += '<div><strong> Status :</strong> <span class="tickets__list--high tickets__list--dropdown"></span>  <span>' + rowObject.RequestStatusValue + '</span></div>';
    } else if (rowObject.RequestStatusValue == 'Work Inprogress') {
        temp += '<div><strong> Status :</strong> <span class="tickets__list--urgent tickets__list--dropdown"></span>  <span>' + rowObject.RequestStatusValue + '</span></div>';
    }

    temp += '<div ><a class="btn btn-primary" style="padding: 4px 37px;">Manage</a></div></div></div></div></div></div>';

           
    return temp;
}

function ManagePageGridTableViewforIncidents(grid, pager, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    debugger;
    var ColN;
    var ColM;
    var ColD;

    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                data[0].push("AddTimeLog");
                data[1].push("manage");
                data[2].push("Add TimeLog");
                data[3].push("AddTimeLog");
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];//display name
                showColumns = data[3];
                debugger;
                ////Manage pagegrid width
                var twidth = $('#managegridwidth').width() - 70;
                var colCount = showColumns.length;
                var eColWidth = twidth / colCount;


                //, width: eColWidth 

                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth, frozen: true }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'm/d/Y' }, width: eColWidth, hidedlg: true, searchrules: { required: true },
                                //searchoptions: {
                                //    dataInit: function (element) {
                                //        $(element).datepicker({
                                //            id: ColN[i] + '_datePicker',
                                //            dateFormat: 'yy-mm-dd',
                                //            showOn: 'focus'
                                //        });
                                //    },
                                //    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                //}
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }

                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: eColWidth, searchrules: { required: true },
                                //searchoptions: {
                                //    dataInit: function (element) {
                                //        $(element).datepicker({
                                //            id: ColN[i] + '_datePicker',
                                //            dateFormat: 'yy-mm-dd',
                                //            showOn: 'focus'
                                //        });
                                //    },
                                //    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                //}
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }



                    }
                }

                //Checkbox state,menu enabledisable
                idsOfSelectedRows = [],
                updateIdsOfSelectedRows = function (id, isSelected) {
                    var index = $.inArray(id, idsOfSelectedRows);
                    if (!isSelected && index >= 0) {
                        idsOfSelectedRows.splice(index, 1); // remove id from the list
                    } else if (index < 0) {
                        idsOfSelectedRows.push(id);
                    }

                    debugger;
                    if (idsOfSelectedRows.length == 0) {
                        $('#btn_Assign').attr("disabled", "disabled");
                        $('#btn_pickup').attr("disabled", "disabled");
                        $('#btn_bulkupdate').attr("disabled", "disabled");
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').attr("disabled", "disabled");
                        $('#btn_Delete').attr("disabled", "disabled");

                        $('#btn_Assign').addClass('avoid-clicks');
                        $('#btn_pickup').addClass('avoid-clicks');
                        $('#btn_bulkupdate').addClass('avoid-clicks');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Delete').addClass('avoid-clicks');
                        $('#btn_merge').addClass('avoid-clicks');
                    }
                    else if (idsOfSelectedRows.length == 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').removeAttr('disabled');
                        $('#btn_Delete').removeAttr('disabled');

                        $('#btn_Edit').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');

                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');

                        keyId = idsOfSelectedRows[0];
                    }
                    else if (idsOfSelectedRows.length > 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').removeAttr('disabled');
                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');
                        $('#btn_merge').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');
                        $('#btn_Delete').removeAttr('disabled');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Edit').attr("disabled", "disabled");
                    }


                    var sel_row_count = jQuery('#' + grid).jqGrid('getGridParam', 'selarrrow');
                    var grd_rec_count = $("#" + grid).jqGrid('getGridParam', 'reccount');

                    if (sel_row_count.length == grd_rec_count) {
                        jQuery('#cb_' + grid).prop('checked', true);
                    }
                    else {
                        jQuery('#cb_' + grid).prop('checked', false);
                    }
                };

                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {
                        var rows = data.rows;
                        TimeLog = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                                if (property == "AddTimeLog") {
                                    rows[i].AddTimeLog = "<div id=\"tvcountup" + rows[i].IncidentInfoID + "\" class=\"AddTimeLogCount\" value=\"" + rows[i].IncidentTimeLogID + "\" style=\" text-align: center\"><p id=\"tvhours" + rows[i].IncidentInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"tvminutes" + rows[i].IncidentInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"tvseconds" + rows[i].IncidentInfoID + "\" style=\"display: inline-block;\">00</p></div> <div id=\"tvbuttons" + rows[i].IncidentInfoID + "\" title=\"Incident time log\" style=\"margin: -22px 34px -12px 33px;\"> <a id=\"tvbtnStart" + rows[i].IncidentInfoID + "\" onclick=\"Start('" + rows[i].IncidentInfoID + "','" + rows[i].LogStartTime + "','tv');\" style=\"width: 16%;color:white; min-width: 60px; padding: 2px 12px;\"><i id=\"" + rows[i].IncidentInfoID + "\" class=\"fa fa-play\" aria-hidden=\"true\" title=\"start\" style=\"color: #2cb901;font-size: 18px;\"></i></a>&nbsp&nbsp<a id=\"tvbtnStop" + rows[i].IncidentInfoID + "\" onclick=\"Stop('" + rows[i].IncidentInfoID + "','" + rows[i].LogStartTime + "','tv');\"><i id=\"" + rows[i].IncidentInfoID + "\" class=\"fa fa-stop\" aria-hidden=\"true\" title=\"stop\" style=\"color: #a70707; font-size: 17px;\"></i></a> </div> ";
                                }
                                else if (property == "CreatedOn") {
                                    rows[i].CreatedOn = dateToStr(rows[i][property]);
                                    // rows[i].CreatedOn = '<time class="timeago" datetime="' + rows[i][property] + '">' + rows[i][property] + '</time>';
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + pager),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,

                    height: '100%',

                    //autowidth: true,//parent width
                    shrinkToFit: false,//adjust the colums to grid

                    loadonce: false,
                    sortorder: "desc",
                    rownumbers: true,
                    rownumWidth: 40,
                    scroll: false,
                    viewrecords: true,
                    onSelectRow: updateIdsOfSelectedRows,
                    onSelectAll: function (aRowids, isSelected) {
                        var i, count, id;
                        for (i = 0, count = aRowids.length; i < count; i++) {
                            id = aRowids[i];
                            updateIdsOfSelectedRows(id, isSelected);
                        }
                    },
                    loadComplete: function () {

                        var jqRecordsCount = $("#" + grid).jqGrid('getGridParam', 'reccount');
                        if (jqRecordsCount == 0) {
                            $('#next_' + pager).addClass('ui-state-disabled');
                            $('#last_' + pager).addClass('ui-state-disabled');
                            $('#first_' + pager).addClass('ui-state-disabled');
                            $('#prev_' + pager).addClass('ui-state-disabled');
                        }

                        var $this = $(this), i, count;
                        for (i = 0, count = idsOfSelectedRows.length; i < count; i++) {
                            $this.jqGrid('setSelection', idsOfSelectedRows[i], false);
                        }
                        IncidentTemeLog(TimeLog, "tv"); //tv refers Table View Grid id's
                    },


                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true,
                     });


                $("#" + grid).navButtonAdd('#' + pager,
                {
                    buttonicon: "ui-icon-calculator",
                    title: "Column chooser",
                    caption: "Columns",
                    position: "last",
                    onClickButton: function () {
                        // call the column chooser method
                        jQuery("#" + grid).jqGrid('columnChooser',
                        {
                            width: 500,
                            dialog_opts: {
                                modal: true,
                                minWidth: 600,
                            },
                        }
                            );

                    }
                });

                //Vertical Records Per page Internal scroll
                $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#" + grid),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');

            }
        },
        error: function () {
            //alert("Error with AJAX callback");
        }

    });
}

function ManagePageGridTableViewforRequests(grid, pager, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
    debugger;
    var ColN;
    var ColM;
    var ColD;

    $.ajax({
        url: apiBaseUrl + schemaUrl,
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        type: "Get",
        contentType: "application/json; charset=utf-8",
        //data: {},
        dataType: "json",
        //async: false,
        success: function (data, st) {

            if (st == "success") {
                data[0].push("AddTimeLog");
                data[1].push("manage");
                data[2].push("Add TimeLog");
                data[3].push("AddTimeLog");
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];//display name
                showColumns = data[3];
                debugger;
                ////Manage pagegrid width
                var twidth = $('#managegridwidth').width() - 70;
                var colCount = showColumns.length;
                var eColWidth = twidth / colCount;


                //, width: eColWidth 

                var colNames = [];
                var colModels = [];

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth, frozen: true }
                    }
                    else if (hideColumns.indexOf(ColN[i]) > -1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i], width: eColWidth }
                    }
                    else if (showColumns.indexOf(ColN[i]) > -1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'm/d/Y' }, width: eColWidth, hidedlg: true, searchrules: { required: true },
                                //searchoptions: {
                                //    dataInit: function (element) {
                                //        $(element).datepicker({
                                //            id: ColN[i] + '_datePicker',
                                //            dateFormat: 'yy-mm-dd',
                                //            showOn: 'focus'
                                //        });
                                //    },
                                //    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                //}
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }

                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, hidedlg: true, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = {
                                key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }, width: eColWidth, searchrules: { required: true },
                                //searchoptions: {
                                //    dataInit: function (element) {
                                //        $(element).datepicker({
                                //            id: ColN[i] + '_datePicker',
                                //            dateFormat: 'yy-mm-dd',
                                //            showOn: 'focus'
                                //        });
                                //    },
                                //    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge']
                                //}
                            }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'number', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] } }
                        }
                        else if (ColM[i] == 'Boolean') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'select', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq'], value: "IS NULL:Null;False:No;True:Yes" }, formatter: booleanFormatter }
                        }
                        else {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], stype: 'text', width: eColWidth, searchrules: { required: true }, searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc'] } }
                        }



                    }
                }

                //Checkbox state,menu enabledisable
                idsOfSelectedRows = [],
                updateIdsOfSelectedRows = function (id, isSelected) {
                    var index = $.inArray(id, idsOfSelectedRows);
                    if (!isSelected && index >= 0) {
                        idsOfSelectedRows.splice(index, 1); // remove id from the list
                    } else if (index < 0) {
                        idsOfSelectedRows.push(id);
                    }

                    debugger;
                    if (idsOfSelectedRows.length == 0) {
                        $('#btn_Assign').attr("disabled", "disabled");
                        $('#btn_pickup').attr("disabled", "disabled");
                        $('#btn_bulkupdate').attr("disabled", "disabled");
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').attr("disabled", "disabled");
                        $('#btn_Delete').attr("disabled", "disabled");

                        $('#btn_Assign').addClass('avoid-clicks');
                        $('#btn_pickup').addClass('avoid-clicks');
                        $('#btn_bulkupdate').addClass('avoid-clicks');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Delete').addClass('avoid-clicks');
                        $('#btn_merge').addClass('avoid-clicks');
                    }
                    else if (idsOfSelectedRows.length == 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').attr("disabled", "disabled");
                        $('#btn_Edit').removeAttr('disabled');
                        $('#btn_Delete').removeAttr('disabled');

                        $('#btn_Edit').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');

                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');

                        keyId = idsOfSelectedRows[0];
                    }
                    else if (idsOfSelectedRows.length > 1) {
                        $('#btn_Assign').removeAttr('disabled');
                        $('#btn_pickup').removeAttr('disabled');
                        $('#btn_bulkupdate').removeAttr('disabled');
                        $('#btn_merge').removeAttr('disabled');
                        $('#btn_Assign').removeClass('avoid-clicks');
                        $('#btn_pickup').removeClass('avoid-clicks');
                        $('#btn_bulkupdate').removeClass('avoid-clicks');
                        $('#btn_merge').removeClass('avoid-clicks');
                        $('#btn_Delete').removeClass('avoid-clicks');
                        $('#btn_Delete').removeAttr('disabled');
                        $('#btn_Edit').addClass('avoid-clicks');
                        $('#btn_Edit').attr("disabled", "disabled");
                    }


                    var sel_row_count = jQuery('#' + grid).jqGrid('getGridParam', 'selarrrow');
                    var grd_rec_count = $("#" + grid).jqGrid('getGridParam', 'reccount');

                    if (sel_row_count.length == grd_rec_count) {
                        jQuery('#cb_' + grid).prop('checked', true);
                    }
                    else {
                        jQuery('#cb_' + grid).prop('checked', false);
                    }
                };

                $("#" + grid).jqGrid({
                    colNames: ColD,
                    colModel: colModels,
                    caption: caption,
                    sortname: keyID,
                    url: apiBaseUrl + dataUrl,
                    loadBeforeSend: function (jqXHR) {
                        jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
                    },
                    beforeProcessing: function (data) {
                        var rows = data.rows;
                        TimeLog = data.rows;
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                                if (property == "AddTimeLog") {
                                    if (rows[i].IsActiveTimeLog)
                                        rows[i].AddTimeLog = "<div id=\"tvcountup" + rows[i].RequestInfoID + "\" class=\"AddTimeLogCount\" value=\"" + rows[i].RequestTimeLogID + "\" style=\" text-align: center\"><p id=\"tvhours" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"tvminutes" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"tvseconds" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p></div> <div id=\"tvbuttons" + rows[i].RequestInfoID + "\" title=\"Request time log\" style=\"margin: -22px 34px -12px 33px;\"> <a id=\"tvbtnStart" + rows[i].RequestInfoID + "\" onclick=\"Start('" + rows[i].RequestInfoID + "','" + rows[i].LogStartTime + "','tv');\" style=\"width: 16%;color:white; min-width: 60px; padding: 2px 12px;\"><i id=\"" + rows[i].RequestInfoID + "\" class=\"fa fa-play\" aria-hidden=\"true\" title=\"start\" style=\"color: #2cb901;font-size: 18px;\"></i></a>&nbsp&nbsp<a id=\"tvbtnStop" + rows[i].RequestInfoID + "\" onclick=\"Stop('" + rows[i].RequestInfoID + "','" + rows[i].LogStartTime + "','tv');\"><i id=\"" + rows[i].RequestInfoID + "\" class=\"fa fa-stop\" aria-hidden=\"true\" title=\"stop\" style=\"color: #a70707; font-size: 17px;\"></i></a> </div> ";                                        
                                    else
                                        rows[i].AddTimeLog = "<div id=\"tvcountup" + rows[i].RequestInfoID + "\" class=\"AddTimeLogCount\" value=\"" + rows[i].RequestTimeLogID + "\" style=\" text-align: center\"><p id=\"tvhours" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"tvminutes" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p><p style=\"display: inline-block;\">:</p><p id=\"tvseconds" + rows[i].RequestInfoID + "\" style=\"display: inline-block;\">00</p></div> <div id=\"tvbuttons" + rows[i].RequestInfoID + "\" title=\"Request time log\" style=\"margin: -22px 34px -12px 33px;\"> <a id=\"tvbtnStart" + rows[i].RequestInfoID + "\" onclick=\"Start('" + rows[i].RequestInfoID + "','" + rows[i].LogStartTime + "','tv');\" style=\"width: 16%;color:white; min-width: 60px; padding: 2px 12px;pointer-events:none;\"><i id=\"" + rows[i].RequestInfoID + "\" class=\"fa fa-play\" aria-hidden=\"true\" title=\"start\" style=\"color: gray;font-size: 18px;\"></i></a>&nbsp&nbsp<a style='pointer-events:none;' id=\"tvbtnStop" + rows[i].RequestInfoID + "\" onclick=\"Stop('" + rows[i].RequestInfoID + "','" + rows[i].LogStartTime + "','tv');\"><i id=\"" + rows[i].RequestInfoID + "\" class=\"fa fa-stop\" aria-hidden=\"true\" title=\"stop\" style=\"color: gray; font-size: 17px;\"></i></a> </div> ";

                                    
                                }
                                else if (property == "CreatedOn") {
                                    rows[i].CreatedOn = dateToStr(rows[i][property]);
                                    // rows[i].CreatedOn = '<time class="timeago" datetime="' + rows[i][property] + '">' + rows[i][property] + '</time>';
                                }
                            }
                        }
                        data.rows = rows;
                        return data;
                    },
                    datatype: 'json',
                    mtype: 'Get',
                    pager: jQuery('#' + pager),
                    rowNum: 10,
                    rowList: [10, 25, 50, 100],
                    viewrecords: true,
                    emptyrecords: 'No records to display',
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: false,
                        Id: "0"
                    },
                    multiselect: true,

                    height: '100%',

                    //autowidth: true,//parent width
                    shrinkToFit: false,//adjust the colums to grid

                    loadonce: false,
                    sortorder: "desc",
                    rownumbers: true,
                    rownumWidth: 40,
                    scroll: false,
                    viewrecords: true,
                    onSelectRow: updateIdsOfSelectedRows,
                    onSelectAll: function (aRowids, isSelected) {
                        var i, count, id;
                        for (i = 0, count = aRowids.length; i < count; i++) {
                            id = aRowids[i];
                            updateIdsOfSelectedRows(id, isSelected);
                        }
                    },
                    loadComplete: function () {

                        var jqRecordsCount = $("#" + grid).jqGrid('getGridParam', 'reccount');
                        if (jqRecordsCount == 0) {
                            $('#next_' + pager).addClass('ui-state-disabled');
                            $('#last_' + pager).addClass('ui-state-disabled');
                            $('#first_' + pager).addClass('ui-state-disabled');
                            $('#prev_' + pager).addClass('ui-state-disabled');
                        }

                        var $this = $(this), i, count;
                        for (i = 0, count = idsOfSelectedRows.length; i < count; i++) {
                            $this.jqGrid('setSelection', idsOfSelectedRows[i], false);
                        }
                        RequestTemeLog(TimeLog, "tv"); //tv refers Table View Grid id's
                    },


                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true,
                     });


                $("#" + grid).navButtonAdd('#' + pager,
                {
                    buttonicon: "ui-icon-calculator",
                    title: "Column chooser",
                    caption: "Columns",
                    position: "last",
                    onClickButton: function () {
                        // call the column chooser method
                        jQuery("#" + grid).jqGrid('columnChooser',
                        {
                            width: 500,
                            dialog_opts: {
                                modal: true,
                                minWidth: 600,
                            },
                        }
                            );

                    }
                });

                //Vertical Records Per page Internal scroll
                $("#" + grid).parents('div.ui-jqgrid-bdiv').css("max-height", "230px");

                //Responsive grid
                $(window).on("resize", function () {
                    setTimeout(function () {
                        var $grid = $("#" + grid),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();
                        $grid.jqGrid("setGridWidth", newWidth, true);
                    }, 300);
                }).trigger('resize');

            }
        },
        error: function () {
            //alert("Error with AJAX callback");
        }

    });
}

function IncidentTemeLog(TimeLog, gridid) {
    for (i = 0; i < TimeLog.length; i++) {
        var id = TimeLog[i].IncidentInfoID;
        if (TimeLog[i].IncidentTimeLogID > 0 && TimeLog[i].IsCompleted == 0) {
            debugger;
            $("#" + gridid + "countup" + TimeLog[i].IncidentInfoID + "").val(TimeLog[i].IncidentTimeLogID);

            if (!TimeLog[i].IsPaused) {
                $("#" + gridid + "btnStart" + id + " #" + id + "").addClass('fa-pause').removeClass("fa-play");
                $("#" + gridid + "btnStart" + id + " #" + id + "").removeAttr("title").prop('title', 'pause')
                $('#' + gridid + 'timelog' + id + '').css('display', 'none');
                //TimerOn(TimeLog[i].LogStartTime, id, gridid);

                /*uncomment for pause functionality*/
                if (TimeLog[i].LogPauseTime != null) {


                    var start_time_in_ms = new Date(TimeLog[i].LogStartTime).getTime();

                    var pause_time_in_ms = new Date(TimeLog[i].LogPauseTime).getTime();

                    var elapsed_time = pause_time_in_ms - start_time_in_ms;
                    var current_time = new Date().getTime();

                    ResumeTimer(elapsed_time, current_time, id, gridid);


                    // $('#' + gridid + 'countup' + id + '').css('display', 'block');
                    // TimerOn(TimeLog[i], id, gridid);
                } else {
                    TimerOn(TimeLog[i], id, gridid);
                }

            } else if (TimeLog[i].IsPaused) {
                //$('#' + gridid + 'countup' + id + '').css('display', 'none');
                //TimerOn(TimeLog[i], id, gridid);   
                $('#' + gridid + 'countup' + id + ' p').empty();
                TimerOff(TimeLog[i].LogStartTime, TimeLog[i].LogPauseTime, "Paused");
                //TimerOff(TimeLog[i].LogStartTime, TimeLog[i].LogPauseTime, "Paused");

                $("#" + gridid + "btnStop" + id + "").css("pointer-events", "none").attr('disabled', 'disabled');
                $("#" + gridid + "btnStart" + id + " #" + id + "").prop('title', 'resume')
            }
        }
        else if (TimeLog[i].IsCompleted == 1) {

            $("#" + gridid + "btnStop" + TimeLog[i].IncidentInfoID + "").css("pointer-events", "none").attr('disabled', 'disabled');
            //$('#' + gridid + 'countup' + TimeLog[i].IncidentInfoID + '').css('display', 'none');
            $('#' + gridid + 'buttons' + TimeLog[i].IncidentInfoID + '').css('display', 'none');
            debugger;
            TimerOff(TimeLog[i].LogStartTime, TimeLog[i].LogEndTime, "Completed");
        }
        function TimerOn(cellvalue, id, gridid) {
            input_date = cellvalue.LogStartTime;  // convert times in milliseconds
            var input_time_in_ms = new Date(input_date).getTime();
            var current_time_in_ms = new Date().getTime();
            var elapsed_time = current_time_in_ms - input_time_in_ms;

            var temp = Math.floor(elapsed_time / 1000);

            var years = Math.floor(temp / 31536000);
            var days = Math.floor((temp %= 31536000) / 86400);
            var hours = days * 24 + Math.floor((temp %= 86400) / 3600);
            var minutes = Math.floor((temp %= 3600) / 60);
            var seconds = temp % 60;

            //document.getElementById('' + gridid + 'days' + id + '').firstChild.nodeValue = days.toString().length == 1 ? "0" + days.toString() : days;
            document.getElementById('' + gridid + 'hours' + id + '').firstChild.nodeValue = hours.toString().length == 1 ? "0" + hours.toString() : hours;
            document.getElementById('' + gridid + 'minutes' + id + '').firstChild.nodeValue = minutes.toString().length == 1 ? "0" + minutes.toString() : minutes;
            document.getElementById('' + gridid + 'seconds' + id + '').firstChild.nodeValue = seconds.toString().length == 1 ? "0" + seconds.toString() : seconds;

            clearTimeout(TimerOn.to);
            if (cellvalue.IsPaused) return;


            TimerOn.to = setTimeout(function () { TimerOn(cellvalue, id, gridid); }, 1000);
        }
        function TimerOff(LogStartTime, LogOutTime, mode) {
            var input_time_in_ms = new Date(LogStartTime).getTime();  // convert times in milliseconds
            var out_time_in_ms = new Date(LogOutTime).getTime();
            var elapsed_time = out_time_in_ms - input_time_in_ms;

            var temp = Math.floor(elapsed_time / 1000);

            var years = Math.floor(temp / 31536000);
            var days = Math.floor((temp %= 31536000) / 86400);
            var hours = days * 24 + Math.floor((temp %= 86400) / 3600);
            var minutes = Math.floor((temp %= 3600) / 60);
            var seconds = temp % 60;

            days = days.toString().length == 1 ? "0" + days.toString() : days;
            hours = hours.toString().length == 1 ? "0" + hours.toString() : hours;
            minutes = minutes.toString().length == 1 ? "0" + minutes.toString() : minutes;
            seconds = seconds.toString().length == 1 ? "0" + seconds.toString() : seconds;

            var duration = hours + ':' + minutes + ':' + seconds;
            $('#' + gridid + 'timelog' + id + '').css('display', 'block');
            $('#' + gridid + 'countup' + id + '').empty();
            optionhtml = "<span> <b> " + mode + "</b><br/> " + duration + "</span>";
            if (mode == "Completed")
                $('#' + gridid + 'countup' + TimeLog[i].IncidentInfoID + '').append(optionhtml).css('margin-bottom', '-15px');
            else
                $('#' + gridid + 'countup' + TimeLog[i].IncidentInfoID + '').append(optionhtml);

        }


        function ResumeTimer(cellvalue, current_time, id, gridid) {
            var current_time_in_ms = new Date().getTime();

            cellvalue = cellvalue + 1000;

            var temp = Math.floor(cellvalue / 1000);

            var years = Math.floor(temp / 31536000);
            var days = Math.floor((temp %= 31536000) / 86400);
            var hours = days * 24 + Math.floor((temp %= 86400) / 3600);
            var minutes = Math.floor((temp %= 3600) / 60);
            var seconds = temp % 60;
            //document.getElementById('' + gridid + 'days' + id + '').firstChild.nodeValue = days.toString().length == 1 ? "0" + days.toString() : days;
            document.getElementById('' + gridid + 'hours' + id + '').firstChild.nodeValue = hours.toString().length == 1 ? "0" + hours.toString() : hours;
            document.getElementById('' + gridid + 'minutes' + id + '').firstChild.nodeValue = minutes.toString().length == 1 ? "0" + minutes.toString() : minutes;
            document.getElementById('' + gridid + 'seconds' + id + '').firstChild.nodeValue = seconds.toString().length == 1 ? "0" + seconds.toString() : seconds;

            clearTimeout(ResumeTimer.to);
            ResumeTimer.to = setTimeout(function () { ResumeTimer(cellvalue, current_time, id, gridid); }, 1000);
        }
    }
}

function RequestTemeLog(TimeLog, gridid) {
    for (i = 0; i < TimeLog.length; i++) {
        var id = TimeLog[i].RequestInfoID;
        if (TimeLog[i].RequestTimeLogID > 0 && TimeLog[i].IsCompleted == 0) {
            debugger;
            $("#" + gridid + "countup" + TimeLog[i].RequestInfoID + "").val(TimeLog[i].RequestTimeLogID);

            if (!TimeLog[i].IsPaused) {
                $("#" + gridid + "btnStart" + id + " #" + id + "").addClass('fa-pause').removeClass("fa-play");
                $("#" + gridid + "btnStart" + id + " #" + id + "").removeAttr("title").prop('title', 'pause')
                $('#' + gridid + 'timelog' + id + '').css('display', 'none');
                //TimerOn(TimeLog[i].LogStartTime, id, gridid);

                /*uncomment for pause functionality*/
                if (TimeLog[i].LogPauseTime != null) {


                    var start_time_in_ms = new Date(TimeLog[i].LogStartTime).getTime();

                    var pause_time_in_ms = new Date(TimeLog[i].LogPauseTime).getTime();

                    var elapsed_time = pause_time_in_ms - start_time_in_ms;
                    var current_time = new Date().getTime();

                    ResumeTimer(elapsed_time, current_time, id, gridid);


                    // $('#' + gridid + 'countup' + id + '').css('display', 'block');
                    // TimerOn(TimeLog[i], id, gridid);
                } else {
                    TimerOn(TimeLog[i], id, gridid);
                }

            } else if (TimeLog[i].IsPaused) {
                //$('#' + gridid + 'countup' + id + '').css('display', 'none');
                //TimerOn(TimeLog[i], id, gridid);   
                $('#' + gridid + 'countup' + id + ' p').empty();
                TimerOff(TimeLog[i].LogStartTime, TimeLog[i].LogPauseTime, "Paused");
                //TimerOff(TimeLog[i].LogStartTime, TimeLog[i].LogPauseTime, "Paused");

                $("#" + gridid + "btnStop" + id + "").css("pointer-events", "none").attr('disabled', 'disabled');
                $("#" + gridid + "btnStart" + id + " #" + id + "").prop('title', 'resume')
            }
        }
        else if (TimeLog[i].IsCompleted == 1) {

            $("#" + gridid + "btnStop" + TimeLog[i].RequestInfoID + "").css("pointer-events", "none").attr('disabled', 'disabled');
            //$('#' + gridid + 'countup' + TimeLog[i].RequestInfoID + '').css('display', 'none');
            $('#' + gridid + 'buttons' + TimeLog[i].RequestInfoID + '').css('display', 'none');
            debugger;
            TimerOff(TimeLog[i].LogStartTime, TimeLog[i].LogEndTime, "Completed");
        }
        function TimerOn(cellvalue, id, gridid) {
            input_date = cellvalue.LogStartTime;  // convert times in milliseconds
            var input_time_in_ms = new Date(input_date).getTime();
            var current_time_in_ms = new Date().getTime();
            var elapsed_time = current_time_in_ms - input_time_in_ms;

            var temp = Math.floor(elapsed_time / 1000);

            var years = Math.floor(temp / 31536000);
            var days = Math.floor((temp %= 31536000) / 86400);
            var hours = days * 24 + Math.floor((temp %= 86400) / 3600);
            var minutes = Math.floor((temp %= 3600) / 60);
            var seconds = temp % 60;

            //document.getElementById('' + gridid + 'days' + id + '').firstChild.nodeValue = days.toString().length == 1 ? "0" + days.toString() : days;
            document.getElementById('' + gridid + 'hours' + id + '').firstChild.nodeValue = hours.toString().length == 1 ? "0" + hours.toString() : hours;
            document.getElementById('' + gridid + 'minutes' + id + '').firstChild.nodeValue = minutes.toString().length == 1 ? "0" + minutes.toString() : minutes;
            document.getElementById('' + gridid + 'seconds' + id + '').firstChild.nodeValue = seconds.toString().length == 1 ? "0" + seconds.toString() : seconds;

            clearTimeout(TimerOn.to);
            if (cellvalue.IsPaused) return;


            TimerOn.to = setTimeout(function () { TimerOn(cellvalue, id, gridid); }, 1000);
        }
        function TimerOff(LogStartTime, LogOutTime, mode) {
            var input_time_in_ms = new Date(LogStartTime).getTime();  // convert times in milliseconds
            var out_time_in_ms = new Date(LogOutTime).getTime();
            var elapsed_time = out_time_in_ms - input_time_in_ms;

            var temp = Math.floor(elapsed_time / 1000);

            var years = Math.floor(temp / 31536000);
            var days = Math.floor((temp %= 31536000) / 86400);
            var hours = days * 24 + Math.floor((temp %= 86400) / 3600);
            var minutes = Math.floor((temp %= 3600) / 60);
            var seconds = temp % 60;

            days = days.toString().length == 1 ? "0" + days.toString() : days;
            hours = hours.toString().length == 1 ? "0" + hours.toString() : hours;
            minutes = minutes.toString().length == 1 ? "0" + minutes.toString() : minutes;
            seconds = seconds.toString().length == 1 ? "0" + seconds.toString() : seconds;

            var duration = hours + ':' + minutes + ':' + seconds;
            $('#' + gridid + 'timelog' + id + '').css('display', 'block');
            $('#' + gridid + 'countup' + id + '').empty();
            optionhtml = "<span> <b> " + mode + "</b><br/> " + duration + "</span>";
            if (mode == "Completed")
                $('#' + gridid + 'countup' + TimeLog[i].RequestInfoID + '').append(optionhtml).css('margin-bottom', '-15px');
            else
                $('#' + gridid + 'countup' + TimeLog[i].RequestInfoID + '').append(optionhtml);

        }


        function ResumeTimer(cellvalue, current_time, id, gridid) {
            var current_time_in_ms = new Date().getTime();

            cellvalue = cellvalue + 1000;

            var temp = Math.floor(cellvalue / 1000);

            var years = Math.floor(temp / 31536000);
            var days = Math.floor((temp %= 31536000) / 86400);
            var hours = days * 24 + Math.floor((temp %= 86400) / 3600);
            var minutes = Math.floor((temp %= 3600) / 60);
            var seconds = temp % 60;
            //document.getElementById('' + gridid + 'days' + id + '').firstChild.nodeValue = days.toString().length == 1 ? "0" + days.toString() : days;
            document.getElementById('' + gridid + 'hours' + id + '').firstChild.nodeValue = hours.toString().length == 1 ? "0" + hours.toString() : hours;
            document.getElementById('' + gridid + 'minutes' + id + '').firstChild.nodeValue = minutes.toString().length == 1 ? "0" + minutes.toString() : minutes;
            document.getElementById('' + gridid + 'seconds' + id + '').firstChild.nodeValue = seconds.toString().length == 1 ? "0" + seconds.toString() : seconds;

            clearTimeout(ResumeTimer.to);
            ResumeTimer.to = setTimeout(function () { ResumeTimer(cellvalue, current_time, id, gridid); }, 1000);
        }
    }
}
