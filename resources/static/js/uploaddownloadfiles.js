$(document).ready(function() {
	/**
	 * Upload single file to SpringBoot 
	 * at RestAPI: /api/upload/file/single
	 */
	$('#uploadSingleFileForm').submit(function(evt) {
		evt.preventDefault();

		let formData = new FormData($(this)[0]);

		$.ajax({
			url: '/api/bitcoins/file/upload',
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			enctype: 'multipart/form-data',
			processData: false,
			success: function(response) {
				$('#response').empty();
				if (response.status !== 'error') {
					let displayInfo = response.filename + ' : ' + response.message + '<br>';

					$('#response').append(displayInfo);
					// add some css
					$('#response').css('display', 'block');
					$('#response').css('background-color', '#e6e6ff');
					$('#response').css('border', 'solid 1px black');
					$('#response').css('border-radius', '3px');
					$('#response').css('margin', '10px');
					$('#response').css('padding', '10px');
				} else {
					$('#response').css('display', 'none');
					let error = response.error;
					alert(error);
				}
			},
			error: function(e) {
				alert('Fail! ' + e);
			}
		});

		return false;
	});

	/**
	 * Upload Multiple Files to SpringBoot RestAPI
	 */
	$('#uploadMultipleFilesForm').submit(function(evt) {
		evt.preventDefault();

		let formData = new FormData($(this)[0]);

		$.ajax({
			url: '/api/bitcoins/file/multiple/upload',
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			enctype: 'multipart/form-data',
			processData: false,
			success: function(response) {
				$('#responses').empty();

				let displayInfo = '<ul>';

				for (let i = 0; i < response.length; i++) {
					displayInfo += '<li>' + response[i].filename + '&nbsp; : &nbsp;' + response[i].message;

					displayInfo += '</li>';
				}
				$('#responses').append(displayInfo + '</ul>');
				$('#responses').css('display', 'block');

				// add some css
				$('#responses').css('background-color', '#e6e6ff');
				$('#responses').css('border', 'solid 1px black');
				$('#responses').css('border-radius', '3px');
				$('#responses').css('margin', '10px');
				$('#responses').css('padding', '10px');
			},
			error: function(e) {
				alert('Fail! ' + e);
			}
		});

		return false;
	});
});
