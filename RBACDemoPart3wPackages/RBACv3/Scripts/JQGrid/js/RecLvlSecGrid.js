


$(document).ready(function () {
   
});


function RecLvlSecGrd(grid, pager, dataUrl, keyID, caption, hideColumns, showColumns) {
    debugger;
    $("#" + grid).jqGrid({

        colNames: ['Application Role Name', 'AppRoleInfoID', 'KeyID', 'RecordID', 'View Access', 'Edit Access', 'Delete Access', 'Grant Access'],
        colModel: [
                        { name: 'AppRoleName', width: 377, index: 'AppRoleName', value: 'Admn' },
                        { name: 'AppRoleInfoID', index: 'AppRoleInfoID', width: 200, key: true, hidden: true, hidedlg: true },
                        { name: 'KeyID', index: 'KeyID', width: 200, hidden: true, hidedlg: true },
                        { name: 'RecordID', index: 'RecordID', width: 200, hidden: true, hidedlg: true },
   		                { name: 'ViewAccess', index: 'ViewAccess', width: 150, formatter: 'checkbox', formatoptions: { disabled: false }, align: 'center' },
                        { name: 'EditAccess', index: 'EditAccess', width: 150, formatter: 'checkbox', formatoptions: { disabled: false }, align: 'center' },
                        { name: 'DeleteAccess', index: 'DeleteAccess', width: 150, formatter: 'checkbox', formatoptions: { disabled: false }, align: 'center' },
                        { name: 'GrantAccess', index: 'GrantAccess', width: 150, formatter: 'checkbox', formatoptions: { disabled: false }, align: 'center' },
        ],
        caption: caption,
        sortname: 'AppRoleName',
        url: apiBaseUrl + dataUrl,
        loadBeforeSend: function (jqXHR) {
            jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
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

        height: '100%',

        //autowidth: true,//parent width
        //shrinkToFit: true,//adjust the colums to grid

        loadonce: true,
        sortorder: "asc",
        gridview: true,
        rownumbers: true,
        rownumWidth: 40,
        beforeSelectRow: function (rowid, e) {
            jQuery("#" + grid).jqGrid('resetSelection');
            return (true);
        }
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
    ////jQuery("#" + grid).jqGrid('filterToolbar', { searchOperators: true });
}


function RecLvlSecGrdUSERS(grid, pager, dataUrl, keyID, caption, hideColumns, showColumns) {
    debugger;
    $("#" + grid).jqGrid({

        colNames: ['Actions', 'UserID', 'KeyID', 'RecordID', 'User Name', 'View Access', 'Edit Access', 'Delete Access', 'Grant Access'],
        colModel: [
                    { name: 'act', index: 'act', sortable: false, width: 150 },
                    { key: false, name: 'UserID', index: 'UserID', key: true, width: 200, hidden: true, hidedlg: true },
                    { key: true, name: 'KeyID', index: 'KeyID', width: 200, hidden: true, hidedlg: true },
                    { key: false, name: 'RecordID', index: 'RecordID', width: 200, hidden: true, hidedlg: true },
                    { key: false, name: 'UserName', index: 'UserName', width: 250 },
   		            { key: false, name: 'ViewAccess', index: 'ViewAccess', width: 150, formatter: 'checkbox', formatoptions: { disabled: false }, align: 'center' },
                    { key: false, name: 'EditAccess', index: 'EditAccess', width: 150, formatter: 'checkbox', formatoptions: { disabled: false }, align: 'center' },
                    { key: false, name: 'DeleteAccess', index: 'DeleteAccess', width: 150, formatter: 'checkbox', formatoptions: { disabled: false }, align: 'center' },
                    { key: false, name: 'GrantAccess', index: 'GrantAccess', width: 150, formatter: 'checkbox', formatoptions: { disabled: false }, align: 'center' },
        ],
        caption: "Users Permissions",
        sortname: 'UserName',
        url: apiBaseUrl + dataUrl,
        loadBeforeSend: function (jqXHR) {
            jqXHR.setRequestHeader("ORSUS", getCookie('ORSUS'));
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

        loadonce: true,
        sortorder: "asc",
        gridview: true,
        rownumbers: true,
        rownumWidth: 40,

        gridComplete: function () {
            var ids = jQuery("#" + grid).jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                var recordId = $('#' + grid).jqGrid('getCell', id, 'RecordID');

                var ViewAccess = $('#' + grid).jqGrid('getCell', recordId, 'ViewAccess');
                var EditAccess = $('#' + grid).jqGrid('getCell', recordId, 'EditAccess');
                var DeleteAccess = $('#' + grid).jqGrid('getCell', recordId, 'DeleteAccess');

                edit = "<a class=\"btn btn-default btn-sm\"  onclick=\"UpdateUser(" + id + "," + recordId + ");\" style=\"border:none !important;width:50%;\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i> Update</a>";
                del = "<a  class=\"btn btn-default btn-sm\"  onclick=\"DeleteUser(" + id + "," + recordId + ");\" style=\"border:none !important;width:50%;\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Delete</a>";
                jQuery("#" + grid).jqGrid('setRowData', ids[i], { act: edit + del });
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
}


$(document).ready(function myfunction() {
    debugger;
    var notAuthorized = GetJsonFromApi('RecLvlSecurity/CheckEditDeleteAccess?TenantID=' + getCookie("TenantId") + '&userId=' + getCookie("UserId") + '&tableName=' + $('#TableName').val() + '&tableKeyIdName=' + $('#TableKeyIdName').val() + '&recordId=' + $('#KeyId').val() + '&alpTableName=' + $('#ALPTableName').val() + '&type=Grant');
    if (notAuthorized == true) {

        $('#screenName').text($('#screenName').text() + $('#TableName').val());
        $('#screenName').css("font-weight", "Bold");


        //$('#setRecPermission').unbind("click");
        //$('#claimOwner').unbind("click");
        //$('#releaseRecord').unbind("click");
        Grid("");


        var RecId = GetJsonFromApi('RecLvlSecurity/CheckRecordOwner?TenantID=' + getCookie("TenantId") + '&TableName=' + $('#TableName').val() + '&TableKeyIdName=' + $('#TableKeyIdName').val() + '&RecordID=' + $('#KeyId').val() + '&Ret_value=true');
        if (RecId == 0) {
            $('#claimOwner').removeClass('disabled');
            $('#releaseRecord').addClass('disabled');
        }
        else {
            $('#claimOwner').addClass('disabled');
            $('#releaseRecord').removeClass('disabled');
        }


        $('#searchByColumn').keyup(function (e) {
            var timer = null;
            clearTimeout(timer);
            timer = setTimeout(searchOn(), 3000);
        });


        function searchOn() {
            $('.gridcontRecordLvlSecurity').empty();
            $(".gridcontRecordLvlSecurity").append('<table id="gridRecordLvlSecurity"></table>  <div id="pagerRecordLvlSecurity"></div>');

            var searchText = $('#searchByColumn').val();
            if (searchText.length > 0) {
                Grid("&filters= and AppRoleName like '%" + searchText + "%'");
            }
            else {
                Grid("");
            }
        }

        function Grid(filter) {

            var recordId = $('#KeyId').val();
            if (recordId == '') {
                recordId = 0;
            }
            var alpTableName = $('#ALPTableName').val();
            if (alpTableName == '') {
                alpTableName = 0;
            }
            RecLvlSecGrd("gridRecordLvlSecurity", "pagerRecordLvlSecurity",
               'RecLvlSecurity/GetRoleprevelises?TenantID=' + getCookie("TenantId") + '&ALPTableName=' + alpTableName + '&RecordID=' + recordId + '' + filter,
               'KeyID', 'Roles Permissions',
               ['TenantID', 'KeyID'],
               ['RecordID']);

            RecLvlSecGrdUSERS("gridUsersList", "pagerUsersList",
               'RecLvlSecurity/GetUserPriviliges?TenantID=' + getCookie("TenantId") + '&ALPTableName=' + alpTableName + '&RecordID=' + recordId,
               'KeyID', 'User Permissions',
               ['TenantID'],
               ['RecordID']);

        }

        $("#userNameSearch").autocomplete({

            source: function (request, response) {
                var temUserList = [];
                var AllMenuByModule = GetJsonFromGlobalApi("UserLogin/UserSearch?tenantId=" + getCookie("TenantId") + "&userText=" + request.term);
                var a = 0;
                for (var i = 0; i < AllMenuByModule.length; i++) {
                    temUserList[a] = { label: AllMenuByModule[i].UserLoginName, value: AllMenuByModule[i].UserLoginName, Id: AllMenuByModule[i].UserID };
                    a = a + 1;
                }
                response(temUserList);
            },
            minLength: 3,
            appendTo: '#usersFlash',
            select: function (event, ui) {
                $("#userNameSearch").val(ui.item.label);
                $("#userId").val(ui.item.Id);
                //alert(ui.item.label + ui.item.Id);
            }
        });



    }
    else {
        $('#modal-container').modal('hide');
        $('#notauthorized').click();
    }

});



//set record permissions
$('#setRecPermission').click(function () {
    debugger;
    //$(document).on('click', '#setRecPermission', function (event) {
    debugger;
    var myGrid = $('#gridRecordLvlSecurity');
    var jsondata = '[';
    var rowcount = $("#gridRecordLvlSecurity").getGridParam("reccount");
    var recordId = $('#KeyId').val();
    if (recordId == '') {
        recordId = 0;
    }
    var alpTableName = $('#ALPTableName').val();
    if (alpTableName == '') {
        alpTableName = 0;
    }
    var TenantID = getCookie("TenantId");
    var RecordID = recordId;

    var listIDs = [];
    listIDs = $("#gridRecordLvlSecurity").getDataIDs();


    for (var i = 0; i < listIDs.length; i++) {
        TenantID = TenantID,
        RecordID = RecordID,
        ALPTableName = alpTableName,
        KeyID = myGrid.jqGrid('getCell', listIDs[i], 'KeyID'),
        RoleID = myGrid.jqGrid('getCell', listIDs[i], 'AppRoleInfoID'),
        ViewAccess = myGrid.jqGrid('getCell', listIDs[i], 'ViewAccess') == "Yes" ? true : false,
        EditAccess = myGrid.jqGrid('getCell', listIDs[i], 'EditAccess') == "Yes" ? true : false,
        DeleteAccess = myGrid.jqGrid('getCell', listIDs[i], 'DeleteAccess') == "Yes" ? true : false,
        GrantAccess = myGrid.jqGrid('getCell', listIDs[i], 'GrantAccess') == "Yes" ? true : false,
        Status = 'Active',
        VersionNumber = 1,
        TableName = $('#TableName').val(),
        TableKeyIdName = $('#TableKeyIdName').val(),
        LastModifiedBy = getCookie("UserId"),
        CreatedBy = getCookie("UserId"),
        ID = 1,
        Ret_value = 'Active',
        CreateDate = '10-10-2015',
        ModifyDate = '10-10-2015'
        if ((ViewAccess == true || EditAccess == true || DeleteAccess == true || GrantAccess == true) && (KeyID == 0)) {
            jsondata += "{'TenantID':'" + TenantID + "','ALPTableName':'" + ALPTableName + "','KeyID':'" + KeyID + "','RoleID':'" + RoleID + "','RecordID':'" + RecordID + "','UserID':'" + 0 + "','ViewAccess':'" + ViewAccess + "','EditAccess':'" + EditAccess + "','DeleteAccess':'" + DeleteAccess + "','GrantAccess':'" + GrantAccess + "','Status':'" + Status + "','VersionNumber':'" + VersionNumber + "','TableName':'" + TableName + "','TableKeyIdName':'" + TableKeyIdName + "','LastModifiedBy':'" + LastModifiedBy + "','CreatedBy':'" + CreatedBy + "','ID':'" + ID + "','Ret_value':'" + Ret_value + "','CreateDate':'" + CreateDate + "','ModifyDate':'" + ModifyDate + "'},";
        }
        else if (KeyID > 0) {
            jsondata += "{'TenantID':'" + TenantID + "','ALPTableName':'" + ALPTableName + "','KeyID':'" + KeyID + "','RoleID':'" + RoleID + "','RecordID':'" + RecordID + "','UserID':'" + 0 + "','ViewAccess':'" + ViewAccess + "','EditAccess':'" + EditAccess + "','DeleteAccess':'" + DeleteAccess + "','GrantAccess':'" + GrantAccess + "','Status':'" + Status + "','VersionNumber':'" + VersionNumber + "','TableName':'" + TableName + "','TableKeyIdName':'" + TableKeyIdName + "','LastModifiedBy':'" + LastModifiedBy + "','CreatedBy':'" + CreatedBy + "','ID':'" + ID + "','Ret_value':'" + Ret_value + "','CreateDate':'" + CreateDate + "','ModifyDate':'" + ModifyDate + "'},";
        }

    }
    var ids = jQuery("#gridRecordLvlSecurity").jqGrid('getDataIDs');
    jsondata += ']';
    if (jsondata != "[]") {
        var result = postJsonData('RecLvlSecurity/SetRoleprevelises', jsondata)
        if (result === 1) {
            $('#setRecPermission').attr('disabled', 'disabled');
            RecLevelSecuiritySuccessAlert();
            $("#gridRecordLvlSecurity").setGridParam({ datatype: 'json', page: 1 }).trigger('reloadGrid');
        }
        if (result === 0) {
            TransactionFailedAlert();
        }
        if (result === -2) {
            $('#modal-container').modal('hide');
            $('#notauthorized').click();
        }
    }
    else {
        RecLevelSecuiritySuccessAlert();
    }

});

// Hide Footer for Users Tab
$('#UsersTab').on('click', function () {
    //$('.modal-footer').hide();
    $('#RolesFooter').hide();
    $('#UserFooter').show();
})

// Show Footer for Roles Tab
$('#RolesTab').on('click', function () {
    $('#RolesFooter').show();
   // $('.modal-footer').show();
    $('#UserFooter').hide();
})


// Add User
$('#AddUser').click(function () {
    var TenantID = getCookie("TenantId");
    var RecordID = $('#KeyId').val();
    var ALPTableName = $('#ALPTableName').val();
    var KeyID = null;
    var RoleID = 0;
    var ViewAccess = $('#viewAccess').is(':checked');
    var EditAccess = $('#editAccess').is(':checked');
    var DeleteAccess = $('#deleteAccess').is(':checked');
    var GrantAccess = $('#grantAccess').is(':checked');
    var Status = 'Active';
    var VersionNumber = 1;
    var TableName = $('#TableName').val();
    var TableKeyIdName = $('#TableKeyIdName').val();
    var LastModifiedBy = getCookie("UserId");
    var CreatedBy = getCookie("UserId");
    var ID = 1;
    var Ret_value = 'Active';
    var CreateDate = '10-10-2015';
    var ModifyDate = '10-10-2015';
    var UserID = $('#userId').val();
    
        var jsondata = "[{'TenantID':'" + TenantID + "','ALPTableName':'" + ALPTableName + "','KeyID':'" + KeyID + "','RoleID':'" + RoleID + "','RecordID':'" + RecordID + "','UserID':'" + UserID + "','ViewAccess':'" + ViewAccess + "','EditAccess':'" + EditAccess + "','DeleteAccess':'" + DeleteAccess + "','GrantAccess':'" + GrantAccess + "','Status':'" + Status + "','VersionNumber':'" + VersionNumber + "','TableName':'" + TableName + "','TableKeyIdName':'" + TableKeyIdName + "','LastModifiedBy':'" + LastModifiedBy + "','CreatedBy':'" + CreatedBy + "','ID':'" + ID + "','Ret_value':'" + Ret_value + "','CreateDate':'" + CreateDate + "','ModifyDate':'" + ModifyDate + "'}]";
        if ($('#userNameSearch').val() != '') {
            if ($('#KeyId').val() != '' && $('#KeyId').val() != 0 && $('#ALPTableName').val() != '' && $('#ALPTableName').val() != 0 && $('#userId').val() != 0) {
                var result = postJsonData('RecLvlSecurity/SetRoleprevelises', jsondata)
                if (result === 1) {
                    $('#setRecPermission').attr('disabled', 'disabled');
                    RecLevelSecuiritySuccessAlert();
                    $("#gridUsersList").setGridParam({ datatype: 'json', page: 1 }).trigger('reloadGrid');
                }
                if (result === 0) {
                    TransactionFailedAlert();
                }
                if (result === -1) {
                    ErrorAlert("User Already Existed");
                }
            }
            else {
                ErrorAlert("Failed to save");
            }
        }
        else {
            ErrorAlert("Please provide user name");
        }    
});



// Claim Ownership
$('#claimOwner').click(function () {
    var Id = $('#gridRecordLvlSecurity').jqGrid('getGridParam', 'ViewAccess');
    var Text = $('#gridRecordLvlSecurity').jqGrid('getCell', Id, 'ViewAccess');
    var recordId = $('#KeyId').val();
    if (recordId == '') {
        recordId = 0;
    }
    var result = postJsonData('RecLvlSecurity/ClaimOwnership?TenantID=' + getCookie("TenantId") + '&RecordOwner=' + getCookie("UserId") + '&TableName=' + $('#TableName').val() + '&TableKeyIdName=' + $('#TableKeyIdName').val() + '&RecordID=' + recordId + '&Ret_value=true')
    if (result === 1) {
        SuccessAlert("Ownership has been successfully claimed");
        $('#releaseRecord').removeClass('disabled');
        $('#claimOwner').addClass('disabled');
    }
    else {
        TransactionFailedAlert();
    }
});


// Release Ownership
$('#releaseRecord').click(function () {
    var recordId = $('#KeyId').val();
    if (recordId == '') {
        recordId = 0;
    }
    var result = postJsonData('RecLvlSecurity/ReleaseOwnership?TenantID=' + getCookie("TenantId") + '&RecordOwner=0&TableName=' + $('#TableName').val() + '&TableKeyIdName=' + $('#TableKeyIdName').val() + '&RecordID=' + recordId + '&Ret_value=true')
    if (result === 1) {
        SuccessAlert("Record has been successfully released");
        $('#claimOwner').removeClass('disabled');
        $('#releaseRecord').addClass('disabled');
    }
    else {
        TransactionFailedAlert();
    }
});


$("#setRecCancel").click(function () {
    // window.location.reload();
});



function UpdateUser(keyID, recordId) {

    var TenantID = getCookie("TenantId");
    var RecordID = recordId;
    var ALPTableName = $('#ALPTableName').val();
    var KeyID = keyID;
    var RoleID = 0;
    var ViewAccess = $('#gridUsersList').jqGrid('getCell', keyID, 'ViewAccess') == "Yes" ? true : false;
    var EditAccess = $('#gridUsersList').jqGrid('getCell', keyID, 'EditAccess') == "Yes" ? true : false;
    var DeleteAccess = $('#gridUsersList').jqGrid('getCell', keyID, 'DeleteAccess') == "Yes" ? true : false;
    var GrantAccess = $('#gridUsersList').jqGrid('getCell', keyID, 'GrantAccess') == "Yes" ? true : false;
    var Status = 'Active';
    var VersionNumber = 1;
    var TableName = $('#TableName').val();
    var TableKeyIdName = $('#TableKeyIdName').val();
    var LastModifiedBy = getCookie("UserId");
    var CreatedBy = getCookie("UserId");
    var ID = 1;
    var Ret_value = 'Active';
    var CreateDate = '10-10-2015';
    var ModifyDate = '10-10-2015';
    var UserID = $('#gridUsersList').jqGrid('getCell', keyID, 'UserID');

    var jsondata = "[{'TenantID':'" + TenantID + "','ALPTableName':'" + ALPTableName + "','KeyID':'" + KeyID + "','RoleID':'" + RoleID + "','RecordID':'" + RecordID + "','UserID':'" + UserID + "','ViewAccess':'" + ViewAccess + "','EditAccess':'" + EditAccess + "','DeleteAccess':'" + DeleteAccess + "','GrantAccess':'" + GrantAccess + "','Status':'" + Status + "','VersionNumber':'" + VersionNumber + "','TableName':'" + TableName + "','TableKeyIdName':'" + TableKeyIdName + "','LastModifiedBy':'" + LastModifiedBy + "','CreatedBy':'" + CreatedBy + "','ID':'" + ID + "','Ret_value':'" + Ret_value + "','CreateDate':'" + CreateDate + "','ModifyDate':'" + ModifyDate + "'}]";

    if ($('#KeyId').val() != '' && $('#KeyId').val() != 0 && $('#ALPTableName').val() != '' && $('#ALPTableName').val() != 0 && $('#gridUsersList').jqGrid('getCell', keyID, 'UserID') != "0") {

        var result = postJsonData('RecLvlSecurity/SetRoleprevelises', jsondata)
        if (result === 1) {
            $('#setRecPermission').attr('disabled', 'disabled');
            RecLevelSecuiritySuccessAlert();
            $("#gridUsersList").setGridParam({ datatype: 'json', page: 1 }).trigger('reloadGrid');
        }
        if (result === 0) {
            TransactionFailedAlert();
        }
    }
    else {
        ErrorAlert("Failed to save");
    }
}



function DeleteUser(keyID, recordId) {
    $.ajax({

        url: apiBaseUrl + '/RecLvlSecurity/DeleteUserPriviliges?TenantID=' + getCookie('TenantId') + '&ALPTableName=' + $('#ALPTableName').val() + '&RecordID=' + recordId + '&KeyID=' + keyID,
        type: "GET",
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        contentType: false, // Not to set any content header
        processData: false, // Not to process data
        success: function (result) {
            $("#gridUsersList").setGridParam({ datatype: 'json', page: 1 }).trigger('reloadGrid');
            SuccessAlert("User Removed Successfully");

        },
        error: function (err) {
            ErrorAlert(err.statusText);
        }
    });
}



function RecLevelSecuiritySuccessAlert() {
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
        //$('#modal-container').modal('hide');
    } else {
    }
});

}


/*** Simple Post Rec Lvl SEC*/
function postJsonData(route, jsondata) {
    var ret = 0;
    $.ajax({
        url: apiBaseUrl + route,
        type: "POST",
        headers: {
            'ORSUS': getCookie('ORSUS')
        },
        async: false,
        data: jsondata,
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            ret = data;
        },
        error: function () {
            ret = 0;
        }
    });
    return ret;
}
