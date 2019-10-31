
$(document).ready(function() {
    $('#addTrainButton').click(function() {
        $('#exampleModal').modal('show')
    })

    $('#datetimepicker').datetimepicker({
        format: 'dd/MM/yyyy hh:mm:ss',
        language: 'pt-BR'
    });
})


// <script type="text/javascript">
// $(function () {
//     $('#datetimepicker3').datetimepicker({
//         format: 'LT'
//     });
// });
// </script>