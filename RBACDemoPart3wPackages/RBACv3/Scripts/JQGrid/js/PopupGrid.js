
function PopupGrid(grid, pager, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
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

                for (var i = 0; i < ColN.length; i++) {
                    colNames[i] = ColN[i];

                    if (ColN[i] == keyID) {
                        colModels[i] = { key: true, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (hideColumns.indexOf(ColN[i])>-1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (showColumns.indexOf(ColN[i])>-1) {

                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' }}
                        }
                        else if (ColM[i] == 'DateWithTime') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d M Y h:i A" } }
                        }
                        else if (ColM[i] == 'Int64') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'number'}
                        }
                        else {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i]}
                        }

                    }
                    else {


                        if (ColM[i] == 'DateTime') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }
                        }
                        else if (ColM[i] == 'DateWithTime') {
                            colModels[i] = { key: false, hidden: true, name: ColN[i], index: ColN[i], formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d M Y h:i A" } }
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
                    multiselect: true,

                    height: '100%',

                    autowidth: true,//parent width
                    shrinkToFit: true,//adjust the colums to grid
                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,
                    
                    beforeSelectRow: function (rowid, e) {

                        jQuery("#" + grid).jqGrid('resetSelection');
                        return (true);
                    },
                    loadComplete: function () {

                        var jqRecordsCount = $("#grid").jqGrid('getGridParam', 'reccount');
                        if (jqRecordsCount == 0) {
                            $('#next_pager').addClass('ui-state-disabled');
                            $('#last_pager').addClass('ui-state-disabled');
                            $('#first_pager').addClass('ui-state-disabled');
                            $('#prev_pager').addClass('ui-state-disabled');
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
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });
                   
                $('#cb_' + grid).remove();

                OrsusGridResize(grid);

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

function PopupGridMultiSelect(grid, pager, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns) {
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
                    else if (hideColumns.indexOf(ColN[i])>-1) {
                        colModels[i] = { key: false, hidden: true, hidedlg: true, name: ColN[i], index: ColN[i] }
                    }
                    else if (showColumns.indexOf(ColN[i])>-1) {

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

                    autowidth: true,//parent width
                    shrinkToFit: true,//adjust the colums to grid

                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40
                   
                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });

                $('#cb_' + grid).remove();
                   
                OrsusGridResize(grid);

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

function PopupGridWithButton(grid, pager, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns, path) {
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
                data[0].push("Tree");
                data[1].push("tree");
                data[2].push("View");
                data[3].push("Tree");
                ColN = data[0];//Names
                ColM = data[1]; //datatypes
                ColD = data[2];//display name
                showColumns = data[3];

                var colNames = [];
                var colModels = [];

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
                        else if (ColM[i] == 'tree') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], searchtype: 'text', width: 60 }
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
                var userId = getCookie('UserLoginName') == "tadmin" ? -1 : getCookie('UserId');
                if (dataUrl.indexOf("?") == -1) {
                    dataUrl = dataUrl + '?tenantId=' + getCookie('TenantId') + '&userId=' + userId + '&roles=' + getCookie('Roles');

                }
                else {
                    dataUrl = dataUrl + '&userId=' + userId + '&roles=' + getCookie('Roles');

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
                        for (var i = 0; i < rows.length; i++) {
                            for (var property in rows[i]) {
                                if ($.isArray(rows[i][property])) {

                                    for (var j = 0; j < rows[i][property].length; j++) {
                                        rows[i][rows[i][property][j].FieldName.replace(" ", "")] = rows[i][property][j].FieldValue;
                                    }
                                    delete rows[i][property];
                                }
                            }

                            //if (rows[i].hasOwnProperty("Tree")) {
                            debugger;
                            if (path == "AppRecertification/RcViewPopup") {

                                rows[i].Tree = "<div style=\"text-align:left\"><a title=\"View\" data-toggle=\"modal\" data-backdrop=\"static\"  class=\"modal-link2\"    href=\"../../" + path + "?RecertifyDefinitionId=" + rows[i][keyID] + "\"><i class=\"fa fa-usb\"></i></a></div>";

                            }
                            else {

                                rows[i].Tree = "<div style=\"text-align:left\"><a title=\"View\" data-toggle=\"modal\" data-backdrop=\"static\"  class=\"modal-link2\"    href=\"../../" + path + "?WFDefId=" + rows[i][keyID] + "\"><i class=\"fa fa-usb\"></i></a></div>";
                            }
                            //}
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

                    autowidth: true,//parent width
                    shrinkToFit: true,//adjust the colums to grid

                    //shrinkToFit: true,
                    //width:'100%', //grid width and colums should be stf


                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40,


                    //beforeSelectRow: function (rowid, e) {

                    //    jQuery("#" + grid).jqGrid('resetSelection');
                    //    return (true);
                    //}
                    beforeSelectRow: function (rowid, e) {
                        //jQuery("#" + grid).jqGrid('resetSelection');
                        //return (true);
                        if ($(this).getGridParam('selrow') == rowid) {
                            var row = $('#' + rowid);
                            if (row.hasClass('ui-state-highlight')) {
                                row.removeClass('ui-state-highlight');
                                row.find('.ui-state-highlight').removeClass('ui-state-highlight');

                            }
                            else {
                                row.addClass('ui-state-highlight');
                                row.find('.ui-state-highlight').addClass('ui-state-highlight');
                            }
                            return false;
                        } else {
                            $(this).jqGrid("resetSelection");
                            return true;
                        }
                    }



                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: false, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });



                $('#cb_' + grid).remove();

                //$("#"+grid).navButtonAdd('#' + pager,
                //{
                //    buttonicon: "ui-icon-calculator",
                //    title: "Column chooser",
                //    caption: "Columns",
                //    position: "last",
                //    onClickButton: function () {
                //        jQuery("#" + grid).jqGrid('columnChooser',
                //        {
                //            width: 500,
                //            dialog_opts: {
                //                modal: true,
                //                minWidth: 600,
                //            },
                //        }
                //            );
                //    }
                //});

                OrsusGridResize(grid);
            }
        },
        error: function () {
            alert("Error with AJAX callback");
        }

    });
}

function PopupGridWithCondition(grid, pager, schemaUrl, dataUrl, keyID, caption, hideColumns, showColumns, condition) {
    debugger
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
                        else if (ColM[i] == 'CheckBox') {
                            colModels[i] = { key: false, name: ColN[i], index: ColN[i], formatter: 'checkbox', formatoptions: { disabled: false } }
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
                    multiselect: condition == "mandatoryColumn",

                    height: '100%',

                    autowidth: true,//parent width
                    shrinkToFit: true,//adjust the colums to grid

                    loadonce: false,
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    rownumWidth: 40

                }).navGrid('#' + pager, { edit: false, add: false, del: false, search: true, refresh: true },
                     {  // edit 
                     },
                     {  // add 
                     },
                     {  // delete 
                     },
                     {
                         multipleSearch: true, multipleGroup: true, showQuery: true, closeAfterSearch: true
                     });

                $('#cb_' + grid).remove();

                OrsusGridResize(grid);

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

