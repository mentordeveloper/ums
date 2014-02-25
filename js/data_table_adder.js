$(document).ready(function() {

	$('#global_adder').dataTable({

		"aoColumnDefs" : [ {
			"bSortable" : false,
			"aTargets" : [ 0 ]
		} ],
		"aaSorting" : [ [ 1, 'asc' ] ],
		"aLengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],

		"iDisplayLength" : 5,
	});

});